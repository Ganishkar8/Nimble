/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
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

const AddressDetails = (props, {navigation}) => {
  return (
    // <View>
    //   <Text>AddressDetails</Text>
    // </View>
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView>
        <MyStatusBar backgroundColor={'white'} barStyle="dark-content" />
        <View
          style={{
            width: '100%',
            height: 56,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <HeadComp
            textval={language[0][props.language].str_addaddressbutton}
            props={props}
          />
        </View>
        <View>
          <Text>test</Text>
        </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(AddressDetails);
