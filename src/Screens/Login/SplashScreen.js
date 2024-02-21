/* eslint-disable prettier/prettier */
/* prettier-ignore */
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Image,
  View,
  Platform,
  Alert,
  Text,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../../Utils/Colors';
import Sqlitedatabase from '../../Database/Sqlitedatabase';
import tbl_SystemMandatoryFields from '../../Database/Table/tbl_SystemMandatoryFields';
import tbl_UserCodeDetails from '../../Database/Table/tbl_UserCodeDetails';
import tbl_SystemCodeDetails from '../../Database/Table/tbl_SystemCodeDetails';
import Bank_Detail_Table from '../../Database/Table/Bank_Detail_Table';
import Video from 'react-native-video';
import { connect } from 'react-redux';


const SplashScreen = (props, { navigation }) => {
  useEffect(() => {

    Sqlitedatabase.createTables().then(table => {

      setTimeout(() => {

        if (props.bankDetails.length > 0) {
          global.BASEURL = props.bankDetails[0].BankURL;
          props.navigation.replace('LoginScreen');
        } else {
          props.navigation.replace('BankRegistration');
        }

        // AsyncStorage.getItem('IsBankRegistered').then(value => {
        //   if (value == 'true') {
        //     Bank_Detail_Table.getAllBankDetails().then(value => {
        //       global.BASEURL = value[0].BankURL;
        //       AsyncStorage.getItem('IsLogin').then(value => {
        //         if (value == 'true') {
        //           props.navigation.replace('BottomNavigation');
        //         } else {
        //           props.navigation.replace('LoginScreen');
        //         }
        //       });
        //     });
        //   } else {
        //     props.navigation.replace('BankRegistration');
        //   }
        // });
      }, 3000);
    });
  }, []);
  const [videoDimensions, setVideoDimensions] = useState({ width: 0, height: 0 });

  const handleVideoLoad = (data) => {
    const { width, height } = data.naturalSize;
    setVideoDimensions({ width, height });
  };
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [screenType, setScreenType] = useState('content');

  const onFullScreen = () => {
    setIsFullScreen(isFullScreen);
    if (screenType == 'content') setScreenType('cover');
    else setScreenType('content');
  };
  return (
    // enclose all components in this View tag
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: Colors.white }}>
        {/* <Image
          source={require('../../Images/logoanim.gif')}
          style={{ width: 175, height: 175 }}
        /> */}

        <Video
          //source={{ uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' }}
          source={require('../../Images/logoanimation.mp4')}
          onFullScreen={isFullScreen}
          //repeat={true}
          style={styles.parentView}
          resizeMode="contain"

        />

        {/* <Text style={{ color: Colors.darkblack, fontSize: 12, marginLeft: 34 }}>Business Loan</Text> */}
      </View>
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  parentView: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
  mediaPlayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'black',
    justifyContent: 'center',
  },
  imageStyle: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const mapStateToProps = (state) => {
  const { language } = state.languageReducer;
  const { bankDetails } = state.bankDetailReducer;
  return {
    language: language,
    bankDetails: bankDetails
  }
}

export default connect(mapStateToProps)(SplashScreen);

