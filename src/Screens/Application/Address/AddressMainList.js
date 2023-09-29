/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  FlatList,
} from 'react-native';
import {React, useState} from 'react';
import MyStatusBar from '../../../Components/ MyStatusBar';
import HeadComp from '../../../Components/HeadComp';
import {connect} from 'react-redux';
import {languageAction} from '../../../Utils/redux/actions/languageAction';
import {language} from '../../../Utils/LanguageString';
import Loading from '../../../Components/Loading';
import ChildHeadComp from '../../../Components/ChildHeadComp';
import ProgressComp from '../../../Components/ProgressComp';
import Colors from '../../../Utils/Colors';
import Commonstyles from '../../../Utils/Commonstyles';
import IconButtonViewComp from '../../../Components/IconButtonViewComp';
import {TouchableOpacity} from 'react-native-gesture-handler';

const FlatView = ({item}) => (
  <View style={{marginLeft: 10, marginRight: 10}}>
    <View>
      <Text style={{fontSize: 14, fontWeight: 'bold', marginTop: 5}}>
        {item.AddressType}
      </Text>
      <Text>{item.Addressline}</Text>
    </View>

    <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
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
      <View style={{width: '20%'}}>
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

const AddressMainList = (props, {navigation}) => {
  const [loading, setLoading] = useState(false);

  const Data = [
    {
      AddresstypeID: 'P',
      AddressType: 'Permanent Address',
      Addressline: '1ST FLOOR, 15TH CROSS, 100 FT ROAD JP NAGAR',
      Addressline2: '1ST FLOOR, 15TH CROSS, 100 FT ROAD JP NAGAR',
    },
    {
      AddresstypeID: 'R',
      AddressType: 'Residential Address',
      Addressline: '#687, VAJRA',
    },
  ];

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
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
        <Text style={{margin: 10}}>
          {language[0][props.language].str_addressdetail}
        </Text>
      </View>

      <ProgressComp progressvalue={1} textvalue="4 of 4" />

      <View style={{marginBottom: 10}}>
        <IconButtonViewComp
          icon={'+'}
          textValue={language[0][
            props.language
          ].str_addressdetail.toUpperCase()}
          textStyle={{color: Colors.skyBlue, fontSize: 13, fontWeight: 500}}
          viewStyle={Commonstyles.buttonView}
          innerStyle={Commonstyles.buttonViewBorderStyle}
        />
      </View>

      <FlatList
        data={Data}
        renderItem={FlatView}
        keyExtractor={item => item.AddresstypeID}
      />
    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  const {language} = state.languageReducer;
  return {
    language: language,
  };
};

const mapDispatchToProps = dispatch => ({
  languageAction: item => dispatch(languageAction(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddressMainList);
