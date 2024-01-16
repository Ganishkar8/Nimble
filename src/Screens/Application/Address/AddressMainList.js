/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  FlatList, TouchableOpacity, BackHandler
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
import DeleteConfirmModel from '../../../Components/DeleteConfirmModel';
import tbl_client from '../../../Database/Table/tbl_client';
import tbl_loanApplication from '../../../Database/Table/tbl_loanApplication';
import ErrorMessageModal from '../../../Components/ErrorMessageModal';

const AddressMainList = (props, { navigation }) => {
  const [loading, setLoading] = useState(false);
  const [addressDetails, setAddressDetails] = useState([]);
  const [addressID, setAddressID] = useState('');
  const isScreenVisible = useIsFocused();
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [apiError, setApiError] = useState('');
  const [refreshFlatlist, setRefreshFlatList] = useState(false);
  const [processModule, setProcessModule] = useState(props.mobilecodedetail.processModule);
  const [processModuleLength, setProcessModuleLength] = useState(global.FILTEREDPROCESSMODULE.length);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [kycManual, setKYCManual] = useState('0');
  const [errMsg, setErrMsg] = useState('');
  const [bottomErrorSheetVisible, setBottomErrorSheetVisible] = useState(false);
  const [communicationAvailable, setCommunicationAvailable] = useState(false);
  const [IsManualKYCAvailable, setIsManualKYCAvailable] = useState(false);
  const [permanentAvailable, setPermanentAvailable] = useState(false);
  const [addAddressVisible, setAddAddressVisible] = useState(false);
  const showBottomSheet = () => setBottomErrorSheetVisible(true);
  const hideBottomSheet = () => setBottomErrorSheetVisible(false);

  useEffect(() => {
    props.navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' }, tabBarVisible: false });
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);

    getAddressData()
    if (global.USERTYPEID == 1163) {
      setAddAddressVisible(false)
    } else {
      setAddAddressVisible(true)
    }

    return () => {
      props.navigation.getParent()?.setOptions({ tabBarStyle: undefined, tabBarVisible: undefined });
      backHandler.remove();
    }
  }, [props.navigation, isScreenVisible]);

  const handleBackButton = () => {
    onGoBack();
    return true; // Prevent default back button behavior
  };

  const getAddressData = () => {

    tbl_client.getAllClientID(global.LOANAPPLICATIONID)
      .then(data => {
        if (global.DEBUG_MODE) console.log('Applicant Data:', data);
        if (data !== undefined && data.length > 0) {
          data.forEach((client) => {
            if (client.isKycManual == '1' || client.isKycManual == true) {
              setIsManualKYCAvailable(true);
              return;
            }
          });
        }

      })
      .catch(error => {
        if (global.DEBUG_MODE) console.error('Error fetching Applicant details:', error);
      });

    tbl_client.getClientBasedOnID(global.LOANAPPLICATIONID, global.CLIENTTYPE).then(value => {
      if (value !== undefined && value.length > 0) {

        setKYCManual(value[0].isKycManual)

        if (global.USERTYPEID == 1163) {
          if (!(value[0].isKycManual == '1')) {

          }
        }

      }
    })

    tbl_clientaddressinfo.getAllAddressDetailsForLoanID(global.LOANAPPLICATIONID, global.CLIENTTYPE)
      .then(data => {
        if (global.DEBUG_MODE) console.log('Address Detail:', data);
        if (data !== undefined && data.length > 0) {
          setAddressDetails(data)
          const communicationAddress = data.find(item => item.address_type === 'C');
          const permanentAddress = data.find(item => item.address_type === 'P');
          if (communicationAddress) {
            setCommunicationAvailable(true);
          } else {
            setCommunicationAvailable(false);
          }
          if (permanentAddress) {
            setPermanentAvailable(true);
          } else {
            setPermanentAvailable(false);
          }
          if (communicationAvailable && permanentAvailable) {
            setAddAddressVisible(false)
          } else {
            setAddAddressVisible(true)
          }
          setRefreshFlatList(!refreshFlatlist)
        }
      })
      .catch(error => {
        if (global.DEBUG_MODE) console.error('Error fetching bank details:', error);
      });
  }

  const FlatView = ({ item }) => {

    var bg = '';

    if (global.USERTYPEID == 1163) {
      bg = 'GREY'
    } else {
      if (item.isKyc == '1') {
        bg = 'GREY'
      } else {

      }
    }
    return (
      <View style={{ marginLeft: 10, marginRight: 10 }}>
        <View>
          <Text style={{ fontSize: 14, fontFamily: 'Poppins-SemiBold', marginTop: 5, color: Colors.black }}>
            {Common.getSystemCodeDescription(props.mobilecodedetail.leadUserCodeDto, 'PRF_SHORT_ADDRESS_TYPE', item.address_type)}
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

            if (global.USERTYPEID == 1163) {

            } else {
              if (item.isKyc != '1') {
                handleClick('delete', item)
              }
            }
          }
          }>
            <View >
              <IconButtonViewComp
                textValue={'Delete'.toUpperCase()}
                textStyle={{
                  color: bg == 'GREY' ? Colors.lightgrey : Colors.skyBlue,
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
    )

  }

  const handleClick = (value, data) => {
    if (value === 'edit') {
      props.navigation.navigate('AddressDetails', { addressType: data })
    } else if (value === 'new') {
      props.navigation.navigate('AddressDetails', { addressType: 'new' })
    } else if (value === 'delete') {
      setAddressID(data.id);
      setDeleteModalVisible(true);
    }
  }


  const deleteAddressData = () => {

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
    if (newArray.length > 0) {
      const communicationAddress = newArray.find(item => item.address_type === 'C');
      const permanentAddress = newArray.find(item => item.address_type === 'P');
      if (communicationAddress) {
        setCommunicationAvailable(true);
      } else {
        setCommunicationAvailable(false);
      }
      if (permanentAddress) {
        setPermanentAvailable(true);
      } else {
        setPermanentAvailable(false)
      }
      if (communicationAvailable && permanentAvailable) {
        setAddAddressVisible(false)
      } else {
        setAddAddressVisible(true)
      }
    }
    setAddressDetails(newArray);
    setRefreshFlatList(!refreshFlatlist);

  }


  const buttonNext = () => {

    if (global.USERTYPEID == 1163) {
      props.navigation.replace('LoanApplicationMain', { fromScreen: 'AddressDetail' });
      return;
    }

    if (validate()) {
      showBottomSheet();
      return;
    }
    updateLoanStatus();

  }

  const updateLoanStatus = () => {

    var module = ''; var page = '';

    if (global.CLIENTTYPE == 'APPL') {
      module = 'PRF_SHRT_APLCT';
      page = 'PRF_SHRT_APLCT_ADDRS_DTLS';
    } else if (global.CLIENTTYPE == 'CO-APPL') {
      module = 'PRF_SHRT_COAPLCT';
      page = 'PRF_SHRT_COAPLCT_ADDRS_DTLS';
    } else if (global.CLIENTTYPE == 'GRNTR') {
      module = 'PRF_SHRT_GRNTR';
      page = 'PRF_SHRT_GRNTR_ADDRS_DTLS';
    }

    const appDetails = {
      "loanApplicationId": global.LOANAPPLICATIONID,
      "loanWorkflowStage": "LN_APP_INITIATION",
      "subStageCode": "PRF_SHRT",
      "moduleCode": module,
      "pageCode": page,
      "status": "Completed"
    }
    const baseURL = '8901';
    setLoading(true);
    apiInstancelocal(baseURL)
      .post(`/api/v2/loan-application-status/updateStatus`, appDetails)
      .then(async response => {
        // Handle the response data

        if (global.DEBUG_MODE) console.log('UpdateStatusApiResponse::' + JSON.stringify(response.data),);
        setLoading(false);
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
        global.isDedupeDone = '0';
        global.isMobileVerified = '0';
        global.CLIENTID = '';
        global.isAadharVerified = '0';
        if (processModuleLength == 1) {
          if (!IsManualKYCAvailable) {
            global.COMPLETEDSUBSTAGE = 'CB_CHK';
          }
        } else if (processModuleLength == 2) {
          if (global.CLIENTTYPE == 'APPL') {
          } else if (global.CLIENTTYPE == 'CO-APPL') {
            if (!IsManualKYCAvailable) {
              global.COMPLETEDSUBSTAGE = 'CB_CHK';
            }
          } else if (global.CLIENTTYPE == 'GRNTR') {
            if (!IsManualKYCAvailable) {
              global.COMPLETEDSUBSTAGE = 'CB_CHK';
            }
          }
        } else if (processModuleLength == 3) {
          if (global.CLIENTTYPE == 'APPL') {

          } else if (global.CLIENTTYPE == 'CO-APPL') {

          } else if (global.CLIENTTYPE == 'GRNTR') {
            if (!IsManualKYCAvailable) {
              global.COMPLETEDSUBSTAGE = 'CB_CHK';
            }
          }
        }

        props.navigation.replace('LoanApplicationMain', { fromScreen: 'AddressDetail' });


      })
      .catch(error => {
        // Handle the error
        if (global.DEBUG_MODE) console.log('UpdateStatusApiResponse' + JSON.stringify(error.response));
        setLoading(false);
        if (error.response.data != null) {
          setApiError(error.response.data.message);
          setErrorModalVisible(true)
        }
      });

  };

  const approveManualKYC = (status) => {

    const filteredKYCData = global.LEADTRACKERDATA.clientDetail
      .filter(data => data.clientType === global.CLIENTTYPE)

    const appDetails = {
      "kycType": filteredKYCData[0].clientManualKycLink[0].kycType,
      "kycValue": filteredKYCData[0].clientManualKycLink[0].kycValue,
      "kycDmsId": filteredKYCData[0].clientManualKycLink[0].kycDmsId,
      "kycExpiryDate": filteredKYCData[0].clientManualKycLink.kycExpiryDate,
      "manualKycStatus": status,
      "manualKycApprovedBy": global.USERNAME
    }
    const baseURL = '8901';
    setLoading(true);
    apiInstancelocal(baseURL)
      .put(`api/v2/profile-short/manualKyc/${global.CLIENTID}`, appDetails)
      .then(async response => {
        // Handle the response data
        if (global.DEBUG_MODE) console.log('ApproveKYCApiResponse::' + JSON.stringify(response.data),);
        setLoading(false);
        if (status === 'Rejected') {
          updateFinalLoanStatus();
        } else {
          props.navigation.replace('LoanApplicationMain', { fromScreen: 'AddressDetail' });
        }



      })
      .catch(error => {
        // Handle the error
        if (global.DEBUG_MODE) console.log('ApproveKYCApiResponse' + JSON.stringify(error.response));
        setLoading(false);
        if (error.response.data != null) {
          setApiError(error.response.data.message);
          setErrorModalVisible(true)
        }
      });

  };

  const updateFinalLoanStatus = () => {

    var module = ''; var page = '';

    if (global.CLIENTTYPE == 'APPL') {
      module = 'PRF_SHRT_APLCT';
      // page = 'PRF_SHRT_APLCT_ADDRS_DTLS';
    } else if (global.CLIENTTYPE == 'CO-APPL') {
      module = 'PRF_SHRT_COAPLCT';
      // page = 'PRF_SHRT_COAPLCT_ADDRS_DTLS';
    } else if (global.CLIENTTYPE == 'GRNTR') {
      module = 'PRF_SHRT_GRNTR';
      // page = 'PRF_SHRT_GRNTR_ADDRS_DTLS';
    }

    const appDetails = {
      "loanApplicationId": global.LOANAPPLICATIONID,
      "loanWorkflowStage": "LN_APP_INITIATION",
      "subStageCode": "PRF_SHRT",
      "moduleCode": null,
      "pageCode": null,
      "status": "Rejected"
    }
    const baseURL = '8901';
    setLoading(true);
    apiInstancelocal(baseURL)
      .post(`/api/v2/loan-application-status/updateStatus`, appDetails)
      .then(async response => {
        // Handle the response data

        if (global.DEBUG_MODE) console.log('UpdateStatusApiResponse::' + JSON.stringify(response.data),);

        props.navigation.navigate('LoanApplicationTracker', { fromScreen: 'AddressMainList' })

      })
      .catch(error => {
        // Handle the error
        if (global.DEBUG_MODE) console.log('UpdateStatusApiResponse' + JSON.stringify(error.response));
        setLoading(false);
        if (error.response.data != null) {
          setApiError(error.response.data.message);
          setErrorModalVisible(true)
        }
      });

  };

  const onGoBack = () => {
    props.navigation.replace('LoanApplicationMain', { fromScreen: 'AddressDetail' })
  }

  const closeErrorModal = () => {
    setErrorModalVisible(false);
  };

  const validate = () => {
    var flag = false;
    var i = 1;
    var errorMessage = '';

    if (!communicationAvailable) {
      errorMessage =
        errorMessage +
        i +
        ')' +
        ' ' +
        "Please Add Communication Address" +
        '\n';
      i++;
      flag = true;
    }

    if (!permanentAvailable) {
      errorMessage =
        errorMessage +
        i +
        ')' +
        ' ' +
        "Please Add Permanent Address" +
        '\n';
      i++;
      flag = true;
    }

    setErrMsg(errorMessage);
    return flag;
  };

  const closeDeleteModal = () => {
    setDeleteModalVisible(false);
  };

  const onDeleteClick = () => {
    setDeleteModalVisible(false);
    deleteAddressData();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <ErrorModal isVisible={errorModalVisible} onClose={closeErrorModal} textContent={apiError} textClose={language[0][props.language].str_ok} />
      <DeleteConfirmModel isVisible={deleteModalVisible} onClose={closeDeleteModal} textContent={language[0][props.language].str_deletedesc} textClose={language[0][props.language].str_no} textDelete={language[0][props.language].str_yes} deleteClick={onDeleteClick} />

      <ErrorMessageModal
        isVisible={bottomErrorSheetVisible}
        hideBottomSheet={hideBottomSheet}
        errMsg={errMsg}
        textError={language[0][props.language].str_error}
        textClose={language[0][props.language].str_ok}
      />
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
        textval={global.CLIENTTYPE == 'APPL' ? language[0][props.language].str_applicantdetails : global.CLIENTTYPE == 'CO-APPL' ? language[0][props.language].str_coapplicantdetails : language[0][props.language].str_guarantordetails}
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

      {addAddressVisible &&
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
      }

      <FlatList
        data={addressDetails}
        renderItem={FlatView}
        extraData={refreshFlatlist}
        keyExtractor={(item, index) => index.toString()}
      />


      {addressDetails.length > 0 && global.USERTYPEID == 1164 && <ButtonViewComp
        textValue={language[0][props.language].str_submit.toUpperCase()}
        textStyle={{ color: Colors.white, fontSize: 13, fontWeight: 500 }}
        viewStyle={[Commonstyles.buttonView, { marginBottom: 20 }]}
        innerStyle={Commonstyles.buttonViewInnerStyle}
        handleClick={buttonNext}
      />
      }

      <View style={{ flexDirection: 'row' }}>

        {kycManual == '1' && global.USERTYPEID == 1163 && <ButtonViewComp
          textValue={language[0][props.language].str_approve.toUpperCase()}
          textStyle={{ color: Colors.white, fontSize: 13, fontWeight: 500 }}
          viewStyle={[Commonstyles.buttonView, { width: '50%', marginBottom: 20 }]}
          innerStyle={Commonstyles.buttonViewInnerStyle}
          handleClick={() => approveManualKYC('Approved')}
        />
        }

        {kycManual == '1' && global.USERTYPEID == 1163 && <ButtonViewComp
          textValue={language[0][props.language].str_reject.toUpperCase()}
          textStyle={{ color: Colors.white, fontSize: 13, fontWeight: 500 }}
          viewStyle={[Commonstyles.buttonView, { width: '50%', marginBottom: 20 }]}
          innerStyle={Commonstyles.buttonViewInnerStyle}
          handleClick={() => { approveManualKYC('Rejected') }}
        />
        }

      </View>



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
