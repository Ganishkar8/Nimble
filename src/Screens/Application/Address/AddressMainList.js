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
import { connect, useDispatch, useSelector } from 'react-redux';
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
// import apiInstance from '../../../Utils/apiInstance';
import apiInstance from '../../../Utils/apiInstance';
import ErrorModal from '../../../Components/ErrorModal';
import TextComp from '../../../Components/TextComp';
import Common from '../../../Utils/Common';
import ButtonViewComp from '../../../Components/ButtonViewComp';
import DeleteConfirmModel from '../../../Components/DeleteConfirmModel';
import tbl_client from '../../../Database/Table/tbl_client';
import tbl_loanApplication from '../../../Database/Table/tbl_loanApplication';
import ErrorMessageModal from '../../../Components/ErrorMessageModal';
import { check } from 'react-native-permissions';
import { deleteNestedClientDetails, updateAsyncNestedClientDetails } from '../../../Utils/redux/actions/loanInitiationAction';

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
  const reduxdispatch = useDispatch(); // Initialize useDispatch hook


  const loanInitiationDetails = useSelector(state => state.loanInitiationReducer.loanInitiationDetails);
  const [loaded, setLoaded] = useState(false); // State to track if data is loaded


  useEffect(() => {
    props.navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' }, tabBarVisible: false });
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    //alert(JSON.stringify(props.loanInitiationDetails))

    // fetchData();

    //props.deleteNestedClientDetails(global.LOANAPPLICATIONID, global.CLIENTID, 'clientDetail', 'clientAddress', 870)
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

  useEffect(() => {
    // Any logic you want to execute when loanInitiationDetails changes
    // For example, dispatch an action to update the details
    if (loaded) {
      updatetrackerStatus('Pending')
    }

  }, [loanInitiationDetails, loaded]);

  const handleBackButton = () => {
    onGoBack();
    return true; // Prevent default back button behavior
  };

  const fetchData = async () => {

    reduxdispatch(updateAsyncNestedClientDetails(global.LOANAPPLICATIONID, global.CLIENTID, 'clientDetail', 'clientManualKycLink', dummyData))
      .then(() => {
        //setTimeout(() => {
        // updatetrackerStatus('Pending');
        setLoaded(true);
        //   setLoading(false);
        // }, 1000);
      })
      .catch(error => {
        // Handle any errors that occurred during the dispatch
        console.error('Error dispatching updateAsyncNestedClientDetails:', error);
      });

    //updatetrackerStatus('Pending');
  }

  const getAddressData = () => {

    // Filter data based on loan application number
    const filteredData = props.loanInitiationDetails.filter(item => item.id === parseInt(global.LOANAPPLICATIONID));

    if (filteredData.length > 0) {

      const hasTrueManualKyc = filteredData[0].clientDetail.some(link => link.isKycManual);
      if (hasTrueManualKyc) {
        setIsManualKYCAvailable(true);
      }

      const clientDetail = filteredData[0].clientDetail.find(client => client.id === parseInt(global.CLIENTID));

      if (clientDetail) {

        if (clientDetail) {
          var sourceavailable = false;
          if (clientDetail.clientManualKycLink) {
            if (clientDetail.clientManualKycLink.length > 0) {

              if (clientDetail.clientManualKycLink[0].manualKycStatus == 'Approved') {
                setKYCManual('0');
              } else {
                if (clientDetail.clientManualKycLink[0].kycDmsId) {
                  setKYCManual('1');
                } else if (clientDetail.clientManualKycLink[0].clientManualDobs.length > 0) {
                  if (clientDetail.clientManualKycLink[0].clientManualDobs[0].dobDmsId) {
                    setKYCManual('1');
                  } else {
                    setKYCManual('0');
                  }
                }
                else if (clientDetail.clientManualKycLink[0].clientManualAddresses) {
                  if (clientDetail.clientManualKycLink[0].clientManualAddresses.length > 0) {
                    if (clientDetail.clientManualKycLink[0].clientManualAddresses[0].addrDmsId) {
                      setKYCManual('1');
                    } else {
                      setKYCManual('0');
                    }
                  }
                }
              }
            } else {
              setKYCManual('0');
            }
          } else {
            setKYCManual('1');
          }
        }
        const addressDetails = clientDetail.clientAddress.filter(item => item.addressType == 'P' || item.addressType == 'C');

        if (addressDetails) {
          setAddressDetails(addressDetails)
          const communicationAddress = addressDetails.find(item => item.addressType === 'C');
          const permanentAddress = addressDetails.find(item => item.addressType === 'P');
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
        // Log or use the addressDetails as needed
        if (global.DEBUG_MODE) console.log("Address Details:", addressDetails);
      } else {
        if (global.DEBUG_MODE) console.log("Client ID not found in clientDetail array.");
      }
    } else {
      if (global.DEBUG_MODE) console.log("Loan application number not found.");
    }
  }

  const FlatView = ({ item }) => {

    var bg = '';

    if (global.USERTYPEID == 1163) {
      bg = 'GREY'
    } else {
      if (item.addressType == 'P') {
        if (item.isEkyc || item.isLms) {
          bg = 'GREY'
        }
      }

    }
    if (global.ALLOWEDIT == "0") {
      bg = 'GREY';
    }
    return (
      <View style={{ marginLeft: 10, marginRight: 10 }}>
        <View>
          <Text style={{ fontSize: 14, fontFamily: 'Poppins-SemiBold', marginTop: 5, color: Colors.black }}>
            {Common.getSystemCodeDescription(props.mobilecodedetail.leadUserCodeDto, 'PRF_SHORT_ADDRESS_TYPE', item.addressType)}
          </Text>
          <Text style={{ fontFamily: 'PoppinsRegular', fontSize: 12, color: Colors.mediumgrey }}>{`${item.addressLine1},${item.addressLine2}`}</Text>
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
              if (global.ALLOWEDIT == "0") {

              } else {
                if (item.addressType == 'P') {
                  if (item.isEkyc || item.isLms) {

                  } else {
                    handleClick('delete', item)
                  }
                } else {
                  handleClick('delete', item)
                }

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

    const baseURL = global.PORT1;
    setLoading(true);
    apiInstance(baseURL)
      .delete(`/api/v2/profile-short/address-details/${addressID}`)
      .then(async response => {
        // Handle the response data
        if (global.DEBUG_MODE) console.log('DeleteAddressResponse::' + JSON.stringify(response.data),);

        setLoading(false);
        if (response.status == 200) {
          deletedata(addressID);
          props.deleteNestedClientDetails(global.LOANAPPLICATIONID, global.CLIENTID, 'clientDetail', 'clientAddress', addressID)
        } else if (response.data.statusCode === 201) {
          setApiError(response.data.message);
          setErrorModalVisible(true);
        } else if (response.data.statusCode === 202) {
          setApiError(response.data.message);
          setErrorModalVisible(true);
        }
      })
      .catch(error => {
        // Handle the error
        if (global.DEBUG_MODE) console.log('DeleteAddressResponse' + JSON.stringify(error.response));
        setLoading(false);
        if (error.response.status == 404) {
          setApiError(Common.error404);
          setErrorModalVisible(true)
        } else if (error.response.status == 400) {
          setApiError(Common.error400);
          setErrorModalVisible(true)
        } else if (error.response.status == 500) {
          setApiError(Common.error500);
          setErrorModalVisible(true)
        } else if (error.response.data != null) {
          setApiError(error.response.data.message);
          setErrorModalVisible(true)
        }
      });

  };

  const deletedata = async (addressID) => {

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
    const baseURL = global.PORT1;
    setLoading(true);
    apiInstance(baseURL)
      .post(`/api/v2/loan-application-status/updateStatus`, appDetails)
      .then(async response => {
        // Handle the response data

        if (global.DEBUG_MODE) console.log('UpdateStatusApiResponse::' + JSON.stringify(response.data),);
        setLoading(false);
        if (response.status == 200) {
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
        }
        else if (response.data.statusCode === 201) {
          setApiError(response.data.message);
          setErrorModalVisible(true);
        } else if (response.data.statusCode === 202) {
          setApiError(response.data.message);
          setErrorModalVisible(true);
        }


      })
      .catch(error => {
        // Handle the error
        if (global.DEBUG_MODE) console.log('UpdateStatusApiResponse' + JSON.stringify(error.response));
        setLoading(false);
        if (error.response.status == 404) {
          setApiError(Common.error404);
          setErrorModalVisible(true)
        } else if (error.response.status == 400) {
          setApiError(Common.error400);
          setErrorModalVisible(true)
        } else if (error.response.status == 500) {
          setApiError(Common.error500);
          setErrorModalVisible(true)
        } else if (error.response.data != null) {
          setApiError(error.response.data.message);
          setErrorModalVisible(true)
        }
      });

  };

  const updatetrackerStatus = (status) => {
    //const clientTypeToUpdate = global.CLIENTTYPE;
    const clientToUpdate = props.loanInitiationDetails.filter(item => item.id === parseInt(global.LOANAPPLICATIONID))[0].clientDetail.find(client => client.id === parseInt(global.CLIENTID));

    // Find the client in the clientDetail array
    // const clientToUpdate = global.LEADTRACKERDATA.clientDetail.find(
    //   (data) => data.clientType === clientTypeToUpdate
    // );

    // Update manualKycStatus if the client is found
    // if (clientToUpdate) {
    //   const manualKycLink = clientToUpdate.clientManualKycLink;

    //   // Assuming manualKycLink is an array and you want to update the first element
    //   if (manualKycLink && manualKycLink.length > 0) {
    //     manualKycLink[0].manualKycStatus = status;
    //   }
    // }


    // const checkManualKycStatus = props.loanInitiationDetails.filter(item => item.id === parseInt(global.LOANAPPLICATIONID))[0].clientDetail
    //   ?.every((data) => data.clientManualKycLink?.every(link => link.manualKycStatus === 'Approved'))
    //   ? '1'
    //   : '0';

    const checkManualKycStatus = loanInitiationDetails
      .filter(item => item.id === parseInt(global.LOANAPPLICATIONID))[0].clientDetail
      .filter(clientDetail => clientDetail && clientDetail.isKycManual);

    console.log("checkManualKycStatus" + JSON.stringify(checkManualKycStatus))

    let statusValue = '0'; // Default status is '0'

    if (checkManualKycStatus.length > 0) {
      // If there are clients with isKycManual true, check manual KYC status for each client
      const allClientsApproved = checkManualKycStatus.every(clientDetail => {
        console.log("OriginalKycStatus" + JSON.stringify(clientDetail.clientManualKycLink[0].manualKycStatus))

        return clientDetail.clientManualKycLink?.every(link => link.manualKycStatus === 'Approved');
      });

      // If all clients have their manual KYC statuses approved, set status to '1'
      if (allClientsApproved) {
        statusValue = '1';
      }
    }

    if (statusValue == '1') {
      global.COMPLETEDSUBSTAGE = 'CB_CHK';
    }

    props.navigation.replace('LoanApplicationMain', { fromScreen: 'AddressDetail' });
  }

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
    const baseURL = global.PORT1;
    setLoading(true);
    apiInstance(baseURL)
      .put(`/api/v2/profile-short/manualKyc/${global.CLIENTID}`, appDetails)
      .then(async response => {
        // Handle the response data
        if (global.DEBUG_MODE) console.log('ApproveKYCApiResponse::' + JSON.stringify(response.data),);

        if (response.status == 200) {
          if (status === 'Rejected') {
            setLoading(false);
            updateFinalLoanStatus();
          } else {

            reduxdispatch(updateAsyncNestedClientDetails(global.LOANAPPLICATIONID, global.CLIENTID, 'clientDetail', 'clientManualKycLink', response.data))
              .then(() => {
                setLoaded(true);
              })
              .catch(error => {
                // Handle any errors that occurred during the dispatch
                console.error('Error dispatching updateAsyncNestedClientDetails:', error);
              });
            // props.updateAsyncNestedClientDetails(global.LOANAPPLICATIONID, global.CLIENTID, 'clientDetail', 'clientManualKycLink', response.data)
            // updatetrackerStatus(status)
          }
        }
        else if (response.data.statusCode === 201) {
          setApiError(response.data.message);
          setErrorModalVisible(true);
        } else if (response.data.statusCode === 202) {
          setApiError(response.data.message);
          setErrorModalVisible(true);
        }


      })
      .catch(error => {
        // Handle the error
        if (global.DEBUG_MODE) console.log('ApproveKYCApiResponse' + JSON.stringify(error.response));
        setLoading(false);
        if (error.response.status == 404) {
          setApiError(Common.error404);
          setErrorModalVisible(true)
        } else if (error.response.status == 400) {
          setApiError(Common.error400);
          setErrorModalVisible(true)
        } else if (error.response.status == 500) {
          setApiError(Common.error500);
          setErrorModalVisible(true)
        } else if (error.response.data != null) {
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
    const baseURL = global.PORT1;
    setLoading(true);
    apiInstance(baseURL)
      .post(`/api/v2/loan-application-status/updateStatus`, appDetails)
      .then(async response => {
        // Handle the response data

        if (global.DEBUG_MODE) console.log('UpdateStatusApiResponse::' + JSON.stringify(response.data),);
        if (response.status == 200) {
          props.navigation.navigate('LoanApplicationTracker', { fromScreen: 'AddressMainList' })
        }
        else if (response.data.statusCode === 201) {
          setApiError(response.data.message);
          setErrorModalVisible(true);
        } else if (response.data.statusCode === 202) {
          setApiError(response.data.message);
          setErrorModalVisible(true);
        }
      })
      .catch(error => {
        // Handle the error
        if (global.DEBUG_MODE) console.log('UpdateStatusApiResponse' + JSON.stringify(error.response));
        setLoading(false);
        if (error.response.status == 404) {
          setApiError(Common.error404);
          setErrorModalVisible(true)
        } else if (error.response.status == 400) {
          setApiError(Common.error400);
          setErrorModalVisible(true)
        } else if (error.response.status == 500) {
          setApiError(Common.error500);
          setErrorModalVisible(true)
        } else if (error.response.data != null) {
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
  const { loanInitiationDetails } = state.loanInitiationReducer;
  return {
    language: language,
    profiledetail: profileDetails,
    mobilecodedetail: mobileCodeDetails,
    loanInitiationDetails: loanInitiationDetails
  }
};

const mapDispatchToProps = dispatch => ({
  languageAction: item => dispatch(languageAction(item)),
  //updateAsyncNestedClientDetails: (loanApplicationId, clientId, key, nestedKey, data) => dispatch(updateAsyncNestedClientDetails(loanApplicationId, clientId, key, nestedKey, data)),
  deleteNestedClientDetails: (loanApplicationId, clientId, key, nestedKey, id) => dispatch(deleteNestedClientDetails(loanApplicationId, clientId, key, nestedKey, id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddressMainList);
