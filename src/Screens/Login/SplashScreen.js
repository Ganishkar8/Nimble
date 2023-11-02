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


const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    Sqlitedatabase.createTables().then(table => {
      tbl_SystemMandatoryFields
        .deleteAllSystemMandatoryFields()
        .then(response => {
          tbl_SystemMandatoryFields.insertSystemMandatoryFields(
            '7711',
            'CUSTOMER CATEGORY',
            '1',
            'sp_custcatg',
            '',
            '',
            '0',
            '0',
            '',
            '0',
            '',
            '',
          );
          tbl_SystemMandatoryFields.insertSystemMandatoryFields(
            '7711',
            'FIRST NAME',
            '1',
            'et_firstname',
            '',
            '',
            '0',
            '0',
            '0',
            '',
            '',
            '',
          );
          tbl_SystemMandatoryFields.insertSystemMandatoryFields(
            '7711',
            'MIDDLE NAME',
            '0',
            'et_middlename',
            '',
            '',
            '0',
            '0',
            '0',
            '',
            '',
            '',
          );
          tbl_SystemMandatoryFields.insertSystemMandatoryFields(
            '7711',
            'LAST NAME',
            '1',
            'et_lastname',
            '',
            '',
            '0',
            '0',
            '0',
            '',
            '',
            '',
          );
          tbl_SystemMandatoryFields.insertSystemMandatoryFields(
            '7711',
            'MOBILE NUMBER',
            '1',
            'et_mobilenumber',
            '',
            '',
            '0',
            '0',
            '0',
            '',
            '',
            '',
          );
          tbl_SystemMandatoryFields.insertSystemMandatoryFields(
            '7711',
            'BUSINESS NAME',
            '1',
            'et_businessname',
            '',
            '',
            '0',
            '0',
            '0',
            '',
            '',
            '',
          );
          tbl_SystemMandatoryFields.insertSystemMandatoryFields(
            '7711',
            'INDUSTRY TYPE',
            '1',
            'sp_industrytype',
            '',
            '',
            '0',
            '0',
            '0',
            '',
            '',
            '',
          );
          tbl_SystemMandatoryFields.insertSystemMandatoryFields(
            '7711',
            'INCOME/BUSINESS TURNOVER(MONTHLY)',
            '1',
            'et_incometurnover',
            '',
            '',
            '0',
            '0',
            '0',
            '',
            '',
            '',
          );
          tbl_SystemMandatoryFields.insertSystemMandatoryFields(
            '7711',
            'YEAR',
            '1',
            'et_year',
            '',
            '',
            '0',
            '0',
            '0',
            '',
            '',
            '',
          );
          tbl_SystemMandatoryFields.insertSystemMandatoryFields(
            '7711',
            'MONTHS',
            '1',
            'et_months',
            '',
            '',
            '0',
            '1',
            'MONTHS',
            '',
            '',
            '',
          );
          tbl_SystemMandatoryFields.insertSystemMandatoryFields(
            '7711',
            'LOAN TYPE',
            '1',
            'sp_loantype',
            '',
            '',
            '0',
            '0',
            '',
            '',
            '',
            '',
          );
          tbl_SystemMandatoryFields.insertSystemMandatoryFields(
            '7711',
            'LOAN PURPOSE',
            '1',
            'sp_loanpurpose',
            '',
            '',
            '0',
            '0',
            '',
            '',
            '',
            '',
          );
          tbl_SystemMandatoryFields.insertSystemMandatoryFields(
            '7711',
            "LOAN AMOUNT (MULTIPLE OF 5000's)",
            '1',
            'et_loanamount',
            '',
            '',
            '0',
            '0',
            '',
            '',
            '',
            '',
          );
          tbl_SystemMandatoryFields.insertSystemMandatoryFields(
            '7711',
            'LEAD TYPE',
            '1',
            'sp_leadtype',
            '',
            '',
            '0',
            '0',
            '',
            '',
            '',
            '',
          );
          tbl_SystemMandatoryFields.insertSystemMandatoryFields(
            '7711',
            'ADDRESSTYPE',
            '1',
            'sp_addresstype',
            '',
            '',
            '0',
            '0',
            '',
            '',
            '',
            '',
          );
          tbl_SystemMandatoryFields.insertSystemMandatoryFields(
            '7711',
            'ADDRESS LINE 1',
            '1',
            'sp_kycsource',
            '',
            '',
            '0',
            '0',
            '',
            '',
            '',
            '',
          );
          tbl_SystemMandatoryFields.insertSystemMandatoryFields(
            '7711',
            'ADDRESS LINE 2',
            '0',
            'et_addressline2',
            '',
            '',
            '0',
            '0',
            '',
            '1',
            '',
            '',
          );
          tbl_SystemMandatoryFields.insertSystemMandatoryFields(
            '7711',
            'LANDMARK',
            '0',
            'et_landmark',
            '',
            '',
            '0',
            '0',
            '',
            '',
            '',
            '',
          );
          tbl_SystemMandatoryFields.insertSystemMandatoryFields(
            '7711',
            'PINCODE',
            '1',
            'et_pincode',
            '',
            '',
            '0',
            '0',
            '',
            '',
            '',
            '',
          );
          tbl_SystemMandatoryFields.insertSystemMandatoryFields(
            '7711',
            'CITY/VILLAGE',
            '1',
            'et_cityvillage',
            '',
            '',
            '0',
            '0',
            '',
            '',
            '',
            '',
          );
          tbl_SystemMandatoryFields.insertSystemMandatoryFields(
            '7711',
            'DISTRICT',
            '1',
            'et_district',
            '',
            '',
            '0',
            '0',
            '',
            '',
            '',
            '',
          );
          tbl_SystemMandatoryFields.insertSystemMandatoryFields(
            '7711',
            'STATE',
            '1',
            'et_state',
            '',
            '',
            '0',
            '0',
            '',
            '',
            '',
            '',
          );
          tbl_SystemMandatoryFields.insertSystemMandatoryFields(
            '7711',
            'COUNTRY',
            '1',
            'et_country',
            '',
            '',
            '0',
            '0',
            '',
            '',
            '',
            '',
          );
          tbl_SystemMandatoryFields.insertSystemMandatoryFields(
            '7711',
            'GEO CLASSIFICATION',
            '1',
            'sp_geoclassification',
            '',
            '',
            '0',
            '0',
            '',
            '',
            '',
            '',
          );
          tbl_SystemMandatoryFields.insertSystemMandatoryFields(
            '7711',
            'YEARS AT RESIDENCE',
            '1',
            'et_yearsatresidence',
            '',
            '',
            '0',
            '0',
            '',
            '',
            '',
            '',
          );
          tbl_SystemMandatoryFields.insertSystemMandatoryFields(
            '7711',
            'YEARS IN CURRENT CITY/TOWN',
            '1',
            'et_yearsincurrentcitytown',
            '',
            '',
            '0',
            '0',
            '',
            '',
            '',
            '',
          );
          tbl_SystemMandatoryFields.insertSystemMandatoryFields(
            '7711',
            'ADDRESS OWNERSHIP TYPE',
            '1',
            'sp_addressownershiptype',
            '',
            '',
            '0',
            '0',
            '',
            '',
            '',
            '',
          );
          tbl_SystemMandatoryFields.insertSystemMandatoryFields(
            '7711',
            'OWNER DETAILS',
            '1',
            'sp_ownerdetails',
            '',
            '',
            '0',
            '0',
            '',
            '',
            '',
            '',
          );
          tbl_SystemMandatoryFields.insertSystemMandatoryFields(
            '7711',
            'OWNER NAME',
            '0',
            'et_ownername',
            '',
            '',
            '0',
            '0',
            '',
            '',
            '',
            '',
          );
          tbl_SystemMandatoryFields.insertSystemMandatoryFields(
            '7712',
            'ADDRESS TYPE',
            '1',
            'sp_addresstype',
            '',
            '',
            '0',
            '0',
            '',
            '',
            '',
            '',
          );
          tbl_SystemMandatoryFields.insertSystemMandatoryFields(
            '7712',
            'ADDRESS LINE 1',
            '1',
            'et_addressline1',
            '',
            '',
            '0',
            '0',
            '',
            '',
            '',
            '',
          );
          tbl_SystemMandatoryFields.insertSystemMandatoryFields(
            '7712',
            'ADDRESS LINE 2',
            '0',
            'et_addressline2',
            '',
            '',
            '0',
            '0',
            '',
            '',
            '',
            '',
          );
          tbl_SystemMandatoryFields.insertSystemMandatoryFields(
            '7712',
            'LANDMARK',
            '0',
            'et_landmark',
            '',
            '',
            '0',
            '0',
            '',
            '',
            '',
            '',
          );
          tbl_SystemMandatoryFields.insertSystemMandatoryFields(
            '7712',
            'PINCODE',
            '1',
            'et_pincode',
            '',
            '',
            '0',
            '0',
            '',
            '',
            '',
            '',
          );
          tbl_SystemMandatoryFields.insertSystemMandatoryFields(
            '7712',
            'CITY/VILLAGE',
            '1',
            'et_cityvillage',
            '',
            '',
            '0',
            '0',
            '',
            '',
            '',
            '',
          );
          tbl_SystemMandatoryFields.insertSystemMandatoryFields(
            '7712',
            'DISTRICT',
            '1',
            'et_district',
            '',
            '',
            '0',
            '0',
            '',
            '',
            '',
            '',
          );
          tbl_SystemMandatoryFields.insertSystemMandatoryFields(
            '7712',
            'STATE',
            '1',
            'et_state',
            '',
            '',
            '0',
            '0',
            '',
            '',
            '',
            '',
          );
          tbl_SystemMandatoryFields.insertSystemMandatoryFields(
            '7712',
            'COUNTY',
            '1',
            'et_country',
            'et_country',
            '',
            '',
            '0',
            '0',
            '',
            '',
            '',
            '',
          );
          tbl_SystemMandatoryFields.insertSystemMandatoryFields(
            '7712',
            'MOBILE/LANDLINE NUMBER',
            '1',
            'et_mobilenumber',
            '',
            '',
            '0',
            '0',
            '',
            '',
            '',
            '',
          );
          tbl_SystemMandatoryFields.insertSystemMandatoryFields(
            '7712',
            'EMAIL',
            '1',
            'et_email',
            '',
            '',
            '0',
            '0',
            '',
            '',
            '',
            '',
          );
          tbl_SystemMandatoryFields.insertSystemMandatoryFields(
            '7712',
            'ADRESS OWNERSHIP TYPE',
            '1',
            'sp_addressownershiptype',
            '',
            '',
            '0',
            '0',
            '',
            '',
            '',
            '',
          );
          tbl_SystemMandatoryFields.insertSystemMandatoryFields(
            '7712',
            'OWNER DETAILS',
            '1',
            'sp_ownerdetails',
            '',
            '',
            '0',
            '0',
            '',
            '',
            '',
            '',
          );
          tbl_SystemMandatoryFields.insertSystemMandatoryFields(
            '7712',
            'OWNER NAME',
            '0',
            'et_ownername',
            '',
            '',
            '0',
            '0',
            '',
            '',
            '',
            '',
          );
          tbl_SystemMandatoryFields.insertSystemMandatoryFields(
            '7712',
            'ACCOUNT TYPE',
            '0',
            'sp_accounttype',
            '',
            '',
            '0',
            '0',
            '',
            '',
            '',
            '',
          );
          tbl_SystemMandatoryFields.insertSystemMandatoryFields(
            '7712',
            'ACCOUNT HOLDER NAME AS PER BANK',
            '0',
            'et_accountholdernameasbank',
            '',
            '',
            '0',
            '0',
            '',
            '',
            '',
            '',
          );
          tbl_SystemMandatoryFields.insertSystemMandatoryFields(
            '7712',
            'IFSC CODE',
            '0',
            'et_ifsccode',
            '',
            '',
            '0',
            '0',
            '',
            '',
            '',
            '',
          );
          tbl_SystemMandatoryFields.insertSystemMandatoryFields(
            '7712',
            'BANK NAME',
            '0',
            'et_bankname',
            '',
            '',
            '0',
            '0',
            '',
            '',
            '',
            '',
          );
          tbl_SystemMandatoryFields.insertSystemMandatoryFields(
            '7712',
            'BRANCH NAME',
            '0',
            'st_branchname',
            '',
            '',
            '0',
            '0',
            '',
            '',
            '',
            '',
          );
          tbl_SystemMandatoryFields.insertSystemMandatoryFields(
            '7712',
            'ACCOUNT NUMBER',
            '0',
            'et_accountnumber',
            '',
            '',
            '0',
            '0',
            '',
            '',
            '',
            '',
          );
        });

      tbl_SystemCodeDetails.deleteAllSystemCodeDetails().then(response => {
        tbl_SystemCodeDetails.insertSystemCodeDetails(
          'CustomerCategory',
          '1',
          'INDIVIDUAL',
          'Individual',
          '1',
          '0',
        );
        tbl_SystemCodeDetails.insertSystemCodeDetails(
          'CustomerCategory',
          '2',
          'BUSINESS',
          'Business',
          '2',
          '1',
        );
        tbl_SystemCodeDetails.insertSystemCodeDetails(
          'IndustryType',
          '1',
          'SERVICES',
          'Services',
          '1',
          '0',
        );
        tbl_SystemCodeDetails.insertSystemCodeDetails(
          'IndustryType',
          '2',
          'MANUFACTURING',
          'Manufacturing',
          '2',
          '1',
        );
        tbl_SystemCodeDetails.insertSystemCodeDetails(
          'LNTP',
          '1',
          '440',
          'UnSecured',
          '1',
          '0',
        );
        tbl_SystemCodeDetails.insertSystemCodeDetails(
          'LNTP',
          '2',
          '441',
          'Secured',
          '2',
          '0',
        );
        tbl_SystemCodeDetails.insertSystemCodeDetails(
          'LNTP',
          '3',
          '',
          'NONE',
          '3',
          '0',
        );
        tbl_SystemCodeDetails.insertSystemCodeDetails(
          'LNPUR',
          '1',
          'RAW',
          'Purchase of Raw Materials',
          '1',
          '0',
        );
        tbl_SystemCodeDetails.insertSystemCodeDetails(
          'LNPUR',
          '2',
          'MARR',
          'Marriage',
          '2',
          '0',
        );
        tbl_SystemCodeDetails.insertSystemCodeDetails(
          'LeadType',
          '1',
          'HOT',
          'Hot',
          '1',
          '0',
        );
        tbl_SystemCodeDetails.insertSystemCodeDetails(
          'LeadType',
          '2',
          'WARM',
          'Warm',
          '2',
          '0',
        );
        tbl_SystemCodeDetails.insertSystemCodeDetails(
          'LeadType',
          '3',
          'COLD',
          'Cold',
          '3',
          '0',
        );
        tbl_SystemCodeDetails.insertSystemCodeDetails(
          'LeadStatus',
          '1',
          '1666',
          'Pending',
          '1',
          '0',
        );
        tbl_SystemCodeDetails.insertSystemCodeDetails(
          'LeadStatus',
          '2',
          '1667',
          'Approved',
          '2',
          '0',
        );
        tbl_SystemCodeDetails.insertSystemCodeDetails(
          'LeadStatus',
          '3',
          '1668',
          'Rejected',
          '3',
          '0',
        );
        tbl_SystemCodeDetails.insertSystemCodeDetails(
          'LeadStatus',
          '4',
          '1669',
          'Draft',
          '4',
          '0',
        );
        tbl_SystemCodeDetails.insertSystemCodeDetails(
          'Reason',
          '1',
          'LEV',
          'On Leave',
          '1',
          '0',
        );
        tbl_SystemCodeDetails.insertSystemCodeDetails(
          'Reason',
          '2',
          'LEFT',
          'Discontinued',
          '2',
          '0',
        );
        tbl_SystemCodeDetails.insertSystemCodeDetails(
          'UserType',
          '1',
          '1164',
          'BM',
          '1',
          '0',
        );
        tbl_SystemCodeDetails.insertSystemCodeDetails(
          'UserType',
          '2',
          '1163',
          'FA',
          '2',
          '0',
        );
        tbl_SystemCodeDetails.insertSystemCodeDetails(
          'ADDRESSTYPE',
          '1',
          'P',
          'Permanent Address',
          '1',
          '0',
        );
        tbl_SystemCodeDetails.insertSystemCodeDetails(
          'ADDRESSTYPE',
          '2',
          'C',
          'Communication Address',
          '2',
          '0',
        );
      });

      tbl_SystemMandatoryFields.insertSystemMandatoryFields(
        '7711',
        'PRODUCT TYPE',
        '1',
        'sp_producttype',
        '',
        '',
        '0',
        '0',
        '',
        '',
        '',
        '',
      );
      tbl_SystemMandatoryFields.insertSystemMandatoryFields(
        '7711',
        'CUSTOMER SUBCATEGORY',
        '1',
        'sp_customersubcategory',
        '',
        '',
        '0',
        '0',
        '',
        '',
        '',
        '',
      );
      tbl_SystemMandatoryFields.insertSystemMandatoryFields(
        '7711',
        'CUSTOMER SUBCATEGORY',
        '1',
        'sp_customersubcategory',
        '',
        '',
        '0',
        '0',
        '',
        '',
        '',
        '',
      );
      tbl_SystemMandatoryFields.insertSystemMandatoryFields(
        '7711',
        'MARITAL STATUS',
        '1',
        'sp_maritalstatus',
        '',
        '',
        '0',
        '0',
        '',
        '',
        '',
        '',
      );
      tbl_SystemMandatoryFields.insertSystemMandatoryFields(
        '7711',
        'KYC TYPE1',
        '1',
        'sp_kyctype1',
        '',
        '',
        '0',
        '0',
        '',
        '',
        '',
        '',
      );
      tbl_SystemMandatoryFields.insertSystemMandatoryFields(
        '7711',
        'KYC TYPE2',
        '1',
        'sp_kyctype2',
        '',
        '',
        '0',
        '0',
        '',
        '',
        '',
        '',
      );
      tbl_SystemMandatoryFields.insertSystemMandatoryFields(
        '7711',
        'KYC ID1',
        '1',
        'et_kycID1',
        '',
        '',
        '0',
        '0',
        '',
        '',
        '',
        '',
      );
      tbl_SystemMandatoryFields.insertSystemMandatoryFields(
        '7711',
        'KYC ID2',
        '1',
        'et_kycID2',
        '',
        '',
        '0',
        '0',
        '',
        '',
        '',
        '',
      );
      tbl_SystemMandatoryFields.insertSystemMandatoryFields(
        '7711',
        'NAME',
        '1',
        'sp_name',
        '',
        '',
        '0',
        '0',
        '',
        '',
        '',
        '',
      );
      tbl_SystemMandatoryFields.insertSystemMandatoryFields(
        '7711',
        'EMAIL',
        '0',
        'sp_email',
        '',
        '',
        '0',
        '0',
        '',
        '',
        '',
        '',
      );
      tbl_SystemMandatoryFields.insertSystemMandatoryFields(
        '7711',
        'UDYAM REGISTRATION NUMBER',
        '1',
        'sp_urnumber',
        '',
        '',
        '0',
        '0',
        '',
        '',
        '',
        '',
      );
      tbl_SystemMandatoryFields.insertSystemMandatoryFields(
        '7711',
        'Is MSME?',
        '1',
        'sp_ismsme',
        '',
        '',
        '0',
        '0',
        '',
        '',
        '',
        '',
      );

      tbl_UserCodeDetails.deleteAllUserCodeDetails().then(response => { });
      setTimeout(() => {
        AsyncStorage.getItem('IsBankRegistered').then(value => {
          if (value == 'true') {
            Bank_Detail_Table.getAllBankDetails().then(value => {
              global.BASEURL = value[0].BankURL;
              AsyncStorage.getItem('IsLogin').then(value => {
                if (value == 'true') {
                  navigation.replace('BottomNavigation');
                } else {
                  navigation.replace('LoginScreen');
                }
              });
            });
          } else {
            navigation.replace('BankRegistration');
          }
        });
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

export default SplashScreen;
