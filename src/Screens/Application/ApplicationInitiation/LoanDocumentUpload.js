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
import tbl_bankdetails from '../../../Database/Table/tbl_bankdetails';
import tbl_loanApplication from '../../../Database/Table/tbl_loanApplication';
import ErrorMessageModal from '../../../Components/ErrorMessageModal';
import tbl_loanaddressinfo from '../../../Database/Table/tbl_loanaddressinfo';
import tbl_nomineeDetails from '../../../Database/Table/tbl_nomineeDetails';

const LoanDocumentUpload = (props, { navigation }) => {
    const [loading, setLoading] = useState(false);
    const [nomineeDetails, setNomineeDetails] = useState([]);
    const [nomineeID, setNomineeID] = useState('');
    const isScreenVisible = useIsFocused();
    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [apiError, setApiError] = useState('');
    const [refreshFlatlist, setRefreshFlatList] = useState(false);

    const [deleteModalVisible, setDeleteModalVisible] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [bottomErrorSheetVisible, setBottomErrorSheetVisible] = useState(false);
    const [communicationAvailable, setCommunicationAvailable] = useState(false);
    const showBottomSheet = () => setBottomErrorSheetVisible(true);
    const hideBottomSheet = () => setBottomErrorSheetVisible(false);

    const [documentList, setDocumentList] = useState();

    useEffect(() => {
        props.navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' }, tabBarVisible: false });
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);

        getDocuments();

        return () => {
            props.navigation.getParent()?.setOptions({ tabBarStyle: undefined, tabBarVisible: undefined });
            backHandler.remove();
        }
    }, [props.navigation, isScreenVisible]);

    const handleBackButton = () => {
        onGoBack();
        return true; // Prevent default back button behavior
    };

    const getNomineeData = () => {

        tbl_nomineeDetails.getAllNomineeDetails(global.LOANAPPLICATIONID)
            .then(data => {
                if (global.DEBUG_MODE) console.log('Nominee Detail:', data);
                if (data !== undefined && data.length > 0) {
                    setNomineeDetails(data)

                    setRefreshFlatList(!refreshFlatlist)
                }
            })
            .catch(error => {
                if (global.DEBUG_MODE) console.error('Error fetching bank details:', error);
            });
    }

    const FlatView = ({ item }) => {

        return (
            <View style={{ marginLeft: 10, marginRight: 10 }}>
                <View
                    style={{
                        width: '100%',
                        alignItems: 'center',
                    }}>
                    <View
                        style={{
                            width: '90%',
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: 20,
                        }}>
                        <TouchableOpacity style={{ width: '30%' }} onPress={pickDocument} activeOpacity={0}>
                            <View style={{ width: 40, height: 40, backgroundColor: '#DBDBDB', borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                                <Image
                                    source={require('../../../Images/cloudcomputing.png')}
                                    style={{ width: 28, height: 22 }}
                                />
                                {/* <FontAwesome6 name="cloud-arrow-up" size={25} color="#b5b6b6" /> */}
                            </View>
                        </TouchableOpacity>

                        <Text style={{ width: '50%', color: Colors.dimmText, textAlign: 'left', fontFamily: 'PoppinsRegular' }}>
                            {item.documentCategoryName}
                        </Text>

                        {item.dsmId &&
                            <TouchableOpacity style={{ width: '20%', alignItems: 'flex-end' }}
                                onPress={() => {
                                    //showImageBottomSheet();
                                }}>
                                <Entypo
                                    name="dots-three-vertical"
                                    size={25}
                                    color={Colors.darkblue}
                                />
                            </TouchableOpacity>
                        }

                    </View>
                </View>
            </View>
        )

    }

    const handleClick = (value, data) => {
        if (value === 'edit') {
            props.navigation.navigate('LoanNomineeDetails', { bankType: data })
        } else if (value === 'new') {
            props.navigation.navigate('LoanNomineeDetails', { bankType: 'new' })
        } else if (value === 'delete') {
            deletedata(data.id)
        }
    }


    const deleteAddressData = () => {

        const baseURL = '8901';
        setLoading(true);
        apiInstancelocal(baseURL)
            .delete(`/api/v2/profile-short/address-details/${nomineeID}`)
            .then(async response => {
                // Handle the response data
                if (global.DEBUG_MODE) console.log('DeleteAddressResponse::' + JSON.stringify(response.data),);

                setLoading(false);
                deletedata(nomineeID);
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

    const deletedata = async (id) => {

        const deletePromises = [
            tbl_bankdetails.deleteBankDataBasedOnLoanIDAndType(global.LOANAPPLICATIONID, id)
        ];
        await Promise.all(deletePromises);

        const newArray = nomineeDetails.filter(item => item.id !== id);
        setNomineeDetails(newArray);
        setRefreshFlatList(!refreshFlatlist);

    }


    const buttonNext = () => {

        // if (validate()) {
        //     showBottomSheet();
        //     return;
        // }
        updateLoanStatus();

    }

    const updateLoanStatus = () => {

        var module = ''; var page = '';

        module = 'NMNE_DTLS';
        page = 'NMN_DTLS';

        const appDetails = {
            "loanApplicationId": global.LOANAPPLICATIONID,
            "loanWorkflowStage": "LN_APP_INITIATION",
            "subStageCode": "LN_DEMGRP",
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

                global.COMPLETEDMODULE = 'NMNE_DTLS';
                global.COMPLETEDPAGE = 'NMN_DTLS';


                props.navigation.replace('LoanApplicationMain', { fromScreen: 'BankList' });


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

    const getDocuments = () => {


        const appDetails = {
            "loanApplicationId": global.LOANAPPLICATIONID,
            "clientType": global.CLIENTTYPE,
            "workflowStage": "LN_APP_INITIATION"
        }
        const baseURL = '8096';
        setLoading(true);
        apiInstancelocal(baseURL)
            .post(`/api/v1/stagewise-document-check-configurations/stage-wise/documents`, appDetails)
            .then(async response => {
                // Handle the response data

                if (global.DEBUG_MODE) console.log('DocumentApiResponse::' + JSON.stringify(response.data),);
                setLoading(false);
                setDocumentList(response.data);

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
        props.navigation.replace('LoanApplicationMain', { fromScreen: 'LoanNomineeList' })
    }

    const closeErrorModal = () => {
        setErrorModalVisible(false);
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
                    textval={language[0][props.language].str_loannomineedtls}
                    props={props}
                    onGoBack={onGoBack}
                />
            </View>

            <ChildHeadComp
                textval={language[0][props.language].str_nomineeDetails}
            />

            <View style={{ width: '100%', alignItems: 'center', marginTop: '3%' }}>
                <View style={{ width: '90%', marginTop: 3 }}>
                    <ProgressComp progressvalue={1} textvalue="6 of 6" />
                </View>
            </View>

            <TouchableOpacity activeOpacity={8} onPress={() => handleClick('new')}>
                <View style={{ marginBottom: 10 }}>
                    <IconButtonViewComp
                        icon={'+'}
                        textValue={language[0][
                            props.language
                        ].str_nomineeDetails.toUpperCase()}
                        textStyle={{ color: Colors.skyBlue, fontSize: 13, fontWeight: 500 }}
                        viewStyle={Commonstyles.buttonView}
                        innerStyle={Commonstyles.buttonViewBorderStyle}
                    //handleClick={() => handleClick('new')}
                    />
                </View>
            </TouchableOpacity>

            <FlatList
                data={documentList}
                renderItem={FlatView}
                extraData={refreshFlatlist}
                keyExtractor={(item, index) => index.toString()}
            />


            <ButtonViewComp
                textValue={language[0][props.language].str_submit.toUpperCase()}
                textStyle={{ color: Colors.white, fontSize: 13, fontWeight: 500 }}
                viewStyle={[Commonstyles.buttonView, { marginBottom: 20 }]}
                innerStyle={Commonstyles.buttonViewInnerStyle}
                handleClick={buttonNext}
            />



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

export default connect(mapStateToProps, mapDispatchToProps)(LoanDocumentUpload);
