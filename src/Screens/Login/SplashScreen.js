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
import Bank_Detail_Table from '../../Database/Table/Bank_Detail_Table';

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
          tbl_SystemMandatoryFields.insertSystemMandatoryFields(
            '7711',
            'CLIENT ID',
            '1',
            'sp_clientid',
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
            'BRANCH ID',
            '1',
            'sp_branchid',
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
            'KYC TYPE',
            '1',
            'sp_kyctype',
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
            'KYC ID',
            '1',
            'sp_kycid',
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
            'CUSTOMER NAME',
            '1',
            'sp_customername',
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
            'LOAN APPLICATION ID',
            '1',
            'sp_loanapplicationid',
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
            'KYC SOURCE',
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
            'TITLE',
            '1',
            'sp_title',
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
            'GENDER',
            '1',
            'sp_gender',
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
            'DATE OF BIRTH',
            '1',
            'sp_dob',
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
            'AGE',
            '1',
            'sp_age',
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
            'FATHER NAME',
            '1',
            'sp_fathername',
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
            'HUSBAND NAME',
            '1',
            'sp_husbandname',
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
            'CASTE',
            '1',
            'sp_caste',
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
            'RELIGION',
            '1',
            'sp_reilgion',
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
            'MOTHER TONGUE',
            '1',
            'sp_mothertongue',
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
            'EDUCATION QUALIFICATION',
            '1',
            'sp_educationqualification',
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
            'TITLE',
            '1',
            'sp_title',
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
            'GENDER',
            '1',
            'sp_gender',
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
                tbl_SystemCodeDetails.insertSystemCodeDetails('CustomerCategory', '1', 'INDIVIDUAL', 'Individual', '1', '0');
                tbl_SystemCodeDetails.insertSystemCodeDetails('CustomerCategory', '2', 'BUSINESS', 'Business', '2', '1')
                tbl_SystemCodeDetails.insertSystemCodeDetails('IndustryType', '1', 'SERVICES', 'Services', '1', '0');
                tbl_SystemCodeDetails.insertSystemCodeDetails('IndustryType', '2', 'MANUFACTURING', 'Manufacturing', '2', '1')
                tbl_SystemCodeDetails.insertSystemCodeDetails('LNTP', '1', 'UNSEC', 'UnSecured', '1', '0');
                tbl_SystemCodeDetails.insertSystemCodeDetails('LNTP', '2', 'SEC', 'Secured', '2', '0');
                tbl_SystemCodeDetails.insertSystemCodeDetails('LNPUR', '1', 'RAW', 'Purchase of Raw Materials', '1', '0');
                tbl_SystemCodeDetails.insertSystemCodeDetails('LNPUR', '2', 'MARR', 'Marriage', '2', '0')
                tbl_SystemCodeDetails.insertSystemCodeDetails('LeadType', '1', 'HOT', 'Hot', '1', '0');
                tbl_SystemCodeDetails.insertSystemCodeDetails('LeadType', '2', 'WARM', 'Warm', '2', '0')
                tbl_SystemCodeDetails.insertSystemCodeDetails('LeadType', '3', 'COLD', 'Cold', '3', '0')
                tbl_SystemCodeDetails.insertSystemCodeDetails('LeadStatus', '1', 'APPROVE', 'Approve', '1', '0');
                tbl_SystemCodeDetails.insertSystemCodeDetails('LeadStatus', '2', 'REJECT', 'Reject', '2', '0');
                tbl_SystemCodeDetails.insertSystemCodeDetails('Reason', '1', 'LEV', 'On Leave', '1', '0');
                tbl_SystemCodeDetails.insertSystemCodeDetails('Reason', '2', 'LEFT', 'Discontinued', '2', '0');
            })

            tbl_UserCodeDetails.deleteAllUserCodeDetails().then(response => {

            })
            setTimeout(() => {
                AsyncStorage.getItem('IsBankRegistered').then(value => {
                    if (value == 'true') {
                        Bank_Detail_Table.getAllBankDetails().then(value => {
                            global.BASEURL = value[0].BankURL;
                            AsyncStorage.getItem('IsLogin').then(value => {
                                if (value == 'true') {
                                    navigation.replace('BottomNavigation')
                                } else {
                                    navigation.replace('LoginScreen')
                                }
                            });
                        })

                    } else {
                        navigation.replace('BankRegistration')
                    }
                });

            }, 2000);
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

        <View style={styles.parentView}>
          <Image
            source={require('../../Images/logoanim.gif')}
            style={{width: 175, height: 175}}
          />

          {/* <Text style={{ color: Colors.darkblack, fontSize: 12, marginLeft: 34 }}>Business Loan</Text> */}
        </View>
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
  imageStyle: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SplashScreen;
