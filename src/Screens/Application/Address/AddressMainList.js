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
import { React, useState, useEffect } from 'react';
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
import { useIsFocused } from '@react-navigation/native';
import apiInstancelocal from '../../../Utils/apiInstancelocal';
import ErrorModal from '../../../Components/ErrorModal';
import TextComp from '../../../Components/TextComp';
import Common from '../../../Utils/Common';
import ButtonViewComp from '../../../Components/ButtonViewComp';

const AddressMainList = (props, { navigation }) => {
  const [loading, setLoading] = useState(false);
  const [addressDetails, setAddressDetails] = useState([]);
  const isScreenVisible = useIsFocused();
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [apiError, setApiError] = useState('');
  const [refreshFlatlist, setRefreshFlatList] = useState(false);
  const [processModule, setProcessModule] = useState(props.mobilecodedetail.processModule);
  const [processModuleLength, setProcessModuleLength] = useState(0);


  useEffect(() => {
    props.navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' }, tabBarVisible: false });
    const filteredProcessModuleStage = processModule.filter((data) => {
      return data.wfId === 111 && data.process_sub_stage_id === 12;
    })
    if (filteredProcessModuleStage) {
      setProcessModuleLength(filteredProcessModuleStage.length);
    }
    getAddressData()

    return () =>
      props.navigation
        .getParent()
        ?.setOptions({ tabBarStyle: undefined, tabBarVisible: undefined });
  }, [navigation, isScreenVisible]);

  // const getAddressDataOnline = () => {
  //   const baseURL = '8901';
  //   setLoading(true);
  //   apiInstancelocal(baseURL)
  //     .get(`api/v2/profile-short/address-details/12`)
  //     .then(async response => {
  //       // Handle the response data
  //       if (global.DEBUG_MODE) console.log('GetAddressResponse::' + JSON.stringify(response.data),);

  //       setLoading(false);
  //     })
  //     .catch(error => {
  //       // Handle the error
  //       if (global.DEBUG_MODE) console.log('GetAddressError' + JSON.stringify(error.response));
  //       setLoading(false);
  //       if (error.response.data != null) {
  //         setApiError(error.response.data.message);
  //         setErrorModalVisible(true)
  //       }
  //     });
  // }


  const getAddressData = () => {

    tbl_clientaddressinfo.getAllAddressDetailsForLoanID(global.LOANAPPLICATIONID)
      .then(data => {
        if (global.DEBUG_MODE) console.log('Address Detail:', data);
        setAddressDetails(data)
        setRefreshFlatList(!refreshFlatlist)
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
        <Text style={{ fontSize: 14, fontFamily: 'Poppins-SemiBold', marginTop: 5, color: Colors.black }}>
          {Common.getSystemCodeDescription(props.mobilecodedetail.leadUserCodeDto, 'ADDRESS_TYPE', item.address_type)}
        </Text>
        <Text style={{ fontFamily: 'PoppinsRegular', fontSize: 12, color: Colors.mediumgrey }}>{`${item.address_line_1},${item.address_line_2}`}</Text>
        <Text style={{ fontFamily: 'PoppinsRegular', fontSize: 12, color: Colors.mediumgrey }}>{`${item.district},${item.state}`}</Text>
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
        <TouchableOpacity style={{ width: '20%' }} activeOpacity={0.8} onPress={() => {
          if (item.isKyc != '1') {
            handleClick('delete', item)
          }
        }
        }>
          <View >
            <IconButtonViewComp
              textValue={'Delete'.toUpperCase()}
              textStyle={{
                color: item.isKyc == '1' ? Colors.lightgrey : Colors.skyBlue,
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
      alert(data.id)
      deleteAddressData(data.id);
    }
  }


  const deleteAddressData = (addressID) => {

    const baseURL = '8901';
    setLoading(true);
    apiInstancelocal(baseURL)
      .delete(`/api/v2/profile-short/address-details/${addressID}`)
      .then(async response => {
        // Handle the response data
        if (global.DEBUG_MODE) console.log('DeleteAddressResponse::' + JSON.stringify(response.data),);

        setLoading(false);
        deletedata(addressID);
      })
      .catch(error => {
        // Handle the error
        if (global.DEBUG_MODE) console.log('DeleteAddressResponse' + JSON.stringify(error.response));
        setLoading(false);
        if (error.response.data != null) {
          setApiError(error.response.data.message);
          setErrorModalVisible(true)
        }
      });

  };

  const deletedata = async (addressID) => {

    const deletePromises = [
      tbl_clientaddressinfo.deleteDataBasedOnLoanIDAndID(global.LOANAPPLICATIONID, addressID)
    ];
    await Promise.all(deletePromises);

    const newArray = addressDetails.filter(item => item.id !== addressID);
    setAddressDetails(newArray);
    setRefreshFlatList(!refreshFlatlist);

  }

  const closeErrorModal = () => {
    setErrorModalVisible(false);
  };

  const buttonNext = () => {
    if (global.CLIENTTYPE == 'APPL') {
      global.COMPLETEDMODULE = 'PRF_SHRT_APLCT';
      global.COMPLETEDPAGE = 'PRF_SHRT_APLCT_ADDRS_DTLS';
    } else if (global.CLIENTTYPE == 'CO-APPL') {
      global.COMPLETEDMODULE = 'PRF_SHRT_COAPLCT';
      global.COMPLETEDPAGE = 'PRF_SHRT_COAPLCT_ADDRS_DTLS';
    } else if (global.CLIENTTYPE == 'GRNTR') {
      global.COMPLETEDMODULE = 'PRF_SHRT_GRNTR';
      global.COMPLETEDPAGE = 'PRF_SHRT_GRNTR_ADDRS_DTLS';
    }
    if (processModuleLength == 1) {
      props.navigation.navigate('LoanApplicationMain');
    } else if (processModuleLength == 2) {
      if (global.CLIENTTYPE == 'APPL') {
        props.navigation.navigate('ProfileShortBasicDetails');
        global.isDedupeDone = '0';
        global.isMobileVerified = '0';
        global.CLIENTID = '';
        global.isAadharVerified = '0';
      } else if (global.CLIENTTYPE == 'CO-APPL') {
        props.navigation.navigate('LoanApplicationMain');
      } else if (global.CLIENTTYPE == 'GRNTR') {
        props.navigation.navigate('LoanApplicationMain');
      }
    } else if (processModuleLength == 3) {
      if (global.CLIENTTYPE == 'APPL') {
        props.navigation.navigate('ProfileShortBasicDetails');
        global.isDedupeDone = '0';
        global.isMobileVerified = '0';
        global.CLIENTID = '';
        global.isAadharVerified = '0';
      } else if (global.CLIENTTYPE == 'CO-APPL') {
        props.navigation.navigate('ProfileShortBasicDetails');
        global.isDedupeDone = '0';
        global.isMobileVerified = '0';
        global.CLIENTID = '';
        global.isAadharVerified = '0';
      } else if (global.CLIENTTYPE == 'GRNTR') {
        props.navigation.navigate('LoanApplicationMain');
      }
    }
  }

  const onGoBack = () => {
    props.navigation.navigate('LoanApplicationMain')
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <ErrorModal isVisible={errorModalVisible} onClose={closeErrorModal} textContent={apiError} textClose={language[0][props.language].str_ok} />

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
          onGoBack={onGoBack}
        />
      </View>

      <ChildHeadComp
        textval={language[0][props.language].str_applicantdetails}
      />

      <View style={{ width: '100%', alignItems: 'center', marginTop: '3%' }}>
        <View style={{ width: '90%', marginTop: 3 }}>
          <TextComp
            textStyle={{
              color: Colors.mediumgrey,
              fontSize: 15,
              fontFamily: 'Poppins-Medium'
            }}
            textVal={
              language[0][props.language].str_addressdetail
            }></TextComp>

          <ProgressComp progressvalue={1} textvalue="4 of 4" />
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
        extraData={refreshFlatlist}
        keyExtractor={item => item.loanApplicationId}
      />

      {addressDetails.length > 0 && <ButtonViewComp
        textValue={language[0][props.language].str_next.toUpperCase()}
        textStyle={{ color: Colors.white, fontSize: 13, fontWeight: 500 }}
        viewStyle={[Commonstyles.buttonView, { marginBottom: 20 }]}
        innerStyle={Commonstyles.buttonViewInnerStyle}
        handleClick={buttonNext}
      />
      }

    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  const { language } = state.languageReducer;
  const { profileDetails } = state.profileReducer;
  const { mobileCodeDetails } = state.mobilecodeReducer;
  return {
    language: language,
    profiledetail: profileDetails,
    mobilecodedetail: mobileCodeDetails
  }
};

const mapDispatchToProps = dispatch => ({
  languageAction: item => dispatch(languageAction(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddressMainList);
