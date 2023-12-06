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
import tbl_familydetails from '../../../Database/Table/tbl_familydetails';

const FamilyDetailList = (props, { navigation }) => {
    const [loading, setLoading] = useState(false);
    const [relationDetails, setRelationDetails] = useState([]);
    const [relationID, setRelationID] = useState('');
    const isScreenVisible = useIsFocused();
    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [apiError, setApiError] = useState('');
    const [refreshFlatlist, setRefreshFlatList] = useState(false);
    const [processModule, setProcessModule] = useState(props.mobilecodedetail.processModule);
    const [processModuleLength, setProcessModuleLength] = useState(0);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [kycManual, setKYCManual] = useState('0');
    const [errMsg, setErrMsg] = useState('');
    const [bottomErrorSheetVisible, setBottomErrorSheetVisible] = useState(false);
    const [communicationAvailable, setCommunicationAvailable] = useState(false);
    const showBottomSheet = () => setBottomErrorSheetVisible(true);
    const hideBottomSheet = () => setBottomErrorSheetVisible(false);

    useEffect(() => {
        props.navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' }, tabBarVisible: false });
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);

        getRelationData()

        return () => {
            props.navigation.getParent()?.setOptions({ tabBarStyle: undefined, tabBarVisible: undefined });
            backHandler.remove();
        }
    }, [props.navigation, isScreenVisible]);

    const handleBackButton = () => {
        onGoBack();
        return true; // Prevent default back button behavior
    };

    const getRelationData = () => {


        tbl_familydetails.getAllFamilyDetails(global.LOANAPPLICATIONID)
            .then(data => {
                if (global.DEBUG_MODE) console.log('Relation Detail:', data);
                if (data !== undefined && data.length > 0) {
                    setRelationDetails(data)
                    setRefreshFlatList(!refreshFlatlist)
                }
            })
            .catch(error => {
                if (global.DEBUG_MODE) console.error('Error fetching Relation details:', error);
            });
    }

    const FlatView = ({ item }) => {

        var bg = '';

        if (global.USERTYPEID == 1163) {
            bg = 'GREY'
        } else {
            if (item.isKyc == '1') {
                bg = 'GREY'
            }
        }
        return (
            <View style={{ marginLeft: 10, marginRight: 10 }}>
                <View>
                    <Text style={{ fontSize: 14, fontFamily: 'Poppins-SemiBold', marginTop: 5, color: Colors.black }}>
                        {Common.getSystemCodeDescription(props.mobilecodedetail.leadSystemCodeDto, 'RELATIONSHIP', item.relationTypeId)}
                    </Text>
                    <Text style={{ fontFamily: 'PoppinsRegular', fontSize: 12, color: Colors.mediumgrey }}>{`${Common.getSystemCodeDescription(props.mobilecodedetail.leadUserCodeDto, 'TITLE', item.titleId)} ${item.firstName}`}</Text>
                    <Text style={{ fontFamily: 'PoppinsRegular', fontSize: 12, color: Colors.mediumgrey }}>{item.dateOfBirth}</Text>
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
            props.navigation.navigate('LoanDemographicFamilyDetails', { familyDetails: [data], type: 'edit' })
        } else if (value === 'new') {
            props.navigation.navigate('LoanDemographicFamilyDetails', { familyDetails: [], type: 'new' })
        } else if (value === 'delete') {
            setRelationID(data.id);
            setDeleteModalVisible(true);
        }
    }

    const deleteRelationData = () => {

        const baseURL = '8901';
        setLoading(true);
        apiInstancelocal(baseURL)
            .delete(`/api/v2/profile-short/address-details/${relationID}`)
            .then(async response => {
                // Handle the response data
                if (global.DEBUG_MODE) console.log('DeleteAddressResponse::' + JSON.stringify(response.data),);

                setLoading(false);
                deletedata(relationID);
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

    const deletedata = async (relationID) => {

        const deletePromises = [
            tbl_familydetails.deleteFamilyDetailsBasedID(global.LOANAPPLICATIONID, relationID)
        ];
        await Promise.all(deletePromises);
        const newArray = relationDetails.filter(item => item.id !== relationID);
        setRelationDetails(newArray);
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

        module = 'LN_DMGP_APLCT';
        page = 'DMGRC_APPL_FMLY_DTLS';


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

                global.COMPLETEDMODULE = 'LN_DMGP_APLCT';
                global.COMPLETEDPAGE = 'DMGRC_APPL_FMLY_DTLS';

                props.navigation.replace('LoanDemographicBusinessDetail');


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
        props.navigation.replace('LoanApplicationMain', { fromScreen: 'FamilyDetailList' })
    }

    const closeErrorModal = () => {
        setErrorModalVisible(false);
    };

    const validate = () => {
        var flag = false;
        var i = 1;
        var errorMessage = '';

        // if (!communicationAvailable) {
        //     errorMessage =
        //         errorMessage +
        //         i +
        //         ')' +
        //         ' ' +
        //         "Please Add Communication Address" +
        //         '\n';
        //     i++;
        //     flag = true;
        // }

        setErrMsg(errorMessage);
        return flag;
    };

    const closeDeleteModal = () => {
        setDeleteModalVisible(false);
    };

    const onDeleteClick = () => {
        setDeleteModalVisible(false);
        deleteRelationData();
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
                    textval={language[0][props.language].str_loandemographics}
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
                            language[0][props.language].str_familydetails
                        }></TextComp>

                    <ProgressComp progressvalue={1} textvalue="1 of 4" />
                </View>
            </View>

            <TouchableOpacity activeOpacity={8} onPress={() => handleClick('new')}>
                <View style={{ marginBottom: 10 }}>
                    <IconButtonViewComp
                        icon={'+'}
                        textValue={language[0][
                            props.language
                        ].str_familydetails.toUpperCase()}
                        textStyle={{ color: Colors.skyBlue, fontSize: 13, fontWeight: 500 }}
                        viewStyle={Commonstyles.buttonView}
                        innerStyle={Commonstyles.buttonViewBorderStyle}
                    //handleClick={() => handleClick('new')}
                    />
                </View>
            </TouchableOpacity>

            <FlatList
                data={relationDetails}
                renderItem={FlatView}
                extraData={refreshFlatlist}
                keyExtractor={item => item.loanApplicationId}
            />


            {relationDetails.length > 0 && <ButtonViewComp
                textValue={language[0][props.language].str_submit.toUpperCase()}
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

export default connect(mapStateToProps, mapDispatchToProps)(FamilyDetailList);