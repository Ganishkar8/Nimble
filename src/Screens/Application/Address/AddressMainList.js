/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {View, Text, ScrollView, StyleSheet, SafeAreaView,FlatList} from 'react-native';
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

const AddressMainList = (props, {navigation}) => {
  const [loading, setLoading] = useState(false);

  const Data = [
    {Addressline : "#687, VAJRA"},
    {Addressline : "1ST FLOOR, 15TH CROSS, 100 FT ROAD JP NAGAR"}
  ]

  const FlatView = ({item}) => (
    <View>
      <Text>item.Addressline1</Text>
      <Text>item.Addressline2</Text>
    </View>
  )

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView>
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
          <ChildHeadComp
            textval={language[0][props.language].str_profileshort}
          />
        </View>
        <View>
          <Text style = {{margin:10}}>{language[0][props.language].str_addressdetail}</Text>
        </View>
        <ProgressComp  progressvalue={0.25} textvalue="1 of 4" />

        <IconButtonViewComp 
                        icon={"human"}
                        textValue={language[0][props.language].str_addressdetail.toUpperCase()} 
                        textStyle={{ color: Colors.skyBlue, fontSize: 13, fontWeight: 500 }} 
                        viewStyle={Commonstyles.buttonView} 
                        innerStyle={Commonstyles.buttonViewBorderStyle}  />

        <FlatList
              data={Data} 
              renderItem={FlatView}
              keyExtractor={item => item.Addressline}
            />

      </ScrollView>
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
