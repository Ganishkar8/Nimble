/* eslint-disable prettier/prettier */
import React, {useEffect} from 'react';
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

const SplashScreen = ({navigation}) => {
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
            'LOAN AMOUNT',
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
            '7711',
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
          'UNSEC',
          'UnSecured',
          '1',
          '0',
        );
        tbl_SystemCodeDetails.insertSystemCodeDetails(
          'LNTP',
          '2',
          'SEC',
          'Secured',
          '2',
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
          'APPROVE',
          'Approve',
          '1',
          '0',
        );
        tbl_SystemCodeDetails.insertSystemCodeDetails(
          'LeadStatus',
          '2',
          'REJECT',
          'Reject',
          '2',
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
          'AddressType',
          '1',
          'P',
          'Permanent Address',
          '1',
          '0',
        );
        tbl_SystemCodeDetails.insertSystemCodeDetails(
          'AddressType',
          '2',
          'C',
          'Communication Address',
          '2',
          '0',
        );
      });

      tbl_UserCodeDetails.deleteAllUserCodeDetails().then(response => {});
      setTimeout(() => {
        navigation.replace('AddressDetails'); //AddressMainList,AddressDetails
      }, 1000);
    });
  }, []);

  return (
    // enclose all components in this View tag
    <SafeAreaView>
      <View style={styles.parentView}>
        <Image
          source={require('../../Images/splashlogo.png')}
          style={{width: 100, height: 35}}
        />

        <Text style={{color: Colors.darkblack, fontSize: 12, marginLeft: 34}}>
          Business Loan
        </Text>
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
  },
  imageStyle: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SplashScreen;
