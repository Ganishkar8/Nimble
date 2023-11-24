/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  FlatList, TouchableOpacity
} from 'react-native';
import { React, useState, useEffect, useFocusEffect } from 'react';
import MyStatusBar from '../../../Components/MyStatusBar';
import HeadComp from '../../../Components/HeadComp';
import { connect } from 'react-redux';
import { languageAction } from '../../../Utils/redux/actions/languageAction';
import { language } from '../../../Utils/LanguageString';
import Loading from '../../../Components/Loading';
import ChildHeadComp from '../../../Components/ChildHeadComp';
import ProgressComp from '../../../Components/ProgressComp';
import Colors from '../../../Utils/Colors';
import Commonstyles from '../../../Utils/Commonstyles';
import IconButtonViewComp from '../../../Components/IconButtonViewComp';
import tbl_clientaddressinfo from '../../../Database/Table/tbl_clientaddressinfo';
import tbl_UserCodeDetails from '../../../Database/Table/tbl_UserCodeDetails';




const AddressMainList = (props, { navigation }) => {
  const [loading, setLoading] = useState(false);
  const [addressDetails, setAddressDetails] = useState([]);

  useEffect(() => {
    props.navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' }, tabBarVisible: false });
    getAddressData()
    return () =>
      props.navigation
        .getParent()
        ?.setOptions({ tabBarStyle: undefined, tabBarVisible: undefined });
  }, [props.navigation]);


  const getAddressData = () => {
    tbl_clientaddressinfo.getAllAddressDetailsForLoanID('12345')
      .then(data => {
        if (global.DEBUG_MODE) console.log('Address Detail:', data);
        setAddressDetails(data)
        // for(let i = 0; i < data.length; i++){

        // }

      })
      .catch(error => {
        if (global.DEBUG_MODE) console.error('Error fetching bank details:', error);
      });
  }

  const FlatView = ({ item }) => (

    <View style={{ marginLeft: 10, marginRight: 10 }}>
      <View>
        <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 5 }}>
          {item.address_type}
        </Text>
        <Text>{item.address_line_1}</Text>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
        <TouchableOpacity activeOpacity={8} onPress={() => handleClick('edit', item)}>
          <View>
            <IconButtonViewComp
              textValue={'Edit'.toUpperCase()}
              textStyle={{
                color: Colors.skyBlue,
                fontSize: 13,
                fontWeight: 500,
              }}
              viewStyle={{
                width: '100%',
                // height: 50,
                marginTop: 10,
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}
              innerStyle={{
                width: '100%',
                // height: 50,
                marginTop: 10,
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}

            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={8} onPress={() => handleClick('delete', item)}>
          <View style={{ width: '20%' }}>
            <IconButtonViewComp
              textValue={'Delete'.toUpperCase()}
              textStyle={{
                color: Colors.skyBlue,
                fontSize: 13,
                fontWeight: 500,
              }}
              viewStyle={{
                width: '100%',
                // height: 50,
                marginTop: 10,
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}
              innerStyle={{
                width: '100%',
                // height: 50,
                marginTop: 10,
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}
            />
          </View>
        </TouchableOpacity>
      </View>

      <View
        style={{
          borderBottomWidth: 1,
          borderBottomColor: '#DFE6EA',
          marginVertical: 10,
          marginHorizontal: 10,
          paddingBottom: 10,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}
      />
    </View>

  );

  const handleClick = (value, data) => {
    if (value === 'edit') {
      props.navigation.navigate('AddressDetails', { addressType: data })
    } else if (value === 'new') {
      props.navigation.navigate('AddressDetails', { addressType: 'new' })
    } else if (value === 'delete') {
      tbl_clientaddressinfo.deleteDataBasedOnLoanIDAndAddressType(data.loanApplicationId,data.address_type)
      getAddressData()
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      {loading ? <Loading /> : null}
      <MyStatusBar backgroundColor={'white'} barStyle="dark-content" />

      <View
        style={{
          width: '100%',
          height: 56,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <HeadComp
          textval={language[0][props.language].str_profileshort}
          props={props}
        />
      </View>
      <View>
        <ChildHeadComp textval={language[0][props.language].str_profileshort} />
      </View>
      <View>
        <Text style={{ margin: 10 }}>
          {language[0][props.language].str_addressdetail}
        </Text>
      </View>
      <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ width: '97%' }}>
          <ProgressComp progressvalue={0.5} textvalue="1 of 4" />
        </View>
      </View>
      <TouchableOpacity activeOpacity={8} onPress={() => handleClick('new')}>
        <View style={{ marginBottom: 10 }}>
          <IconButtonViewComp
            icon={'+'}
            textValue={language[0][
              props.language
            ].str_addressdetail.toUpperCase()}
            textStyle={{ color: Colors.skyBlue, fontSize: 13, fontWeight: 500 }}
            viewStyle={Commonstyles.buttonView}
            innerStyle={Commonstyles.buttonViewBorderStyle}
          //handleClick={() => handleClick('new')}
          />
        </View>
      </TouchableOpacity>

      <FlatList
        data={addressDetails}
        renderItem={FlatView}
        keyExtractor={item => item.loanApplicationId}
      />
    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  const { language } = state.languageReducer;
  return {
    language: language,
  };
};

const mapDispatchToProps = dispatch => ({
  languageAction: item => dispatch(languageAction(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddressMainList);
