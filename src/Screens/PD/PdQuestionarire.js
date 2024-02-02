/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react-native/no-inline-styles */
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    SafeAreaView,
    FlatList, TouchableOpacity, BackHandler, Modal,
    TextInput
} from 'react-native';
import { React, useState, useEffect } from 'react';
import MyStatusBar from '../../Components/MyStatusBar';
import HeadComp from '../../Components/HeadComp';
import { connect } from 'react-redux';
import { languageAction } from '../../Utils/redux/actions/languageAction';
import { language } from '../../Utils/LanguageString';
import Loading from '../../Components/Loading';
import ChildHeadComp from '../../Components/ChildHeadComp';
import ProgressComp from '../../Components/ProgressComp';
import Colors from '../../Utils/Colors';
import Commonstyles from '../../Utils/Commonstyles';
import IconButtonViewComp from '../../Components/IconButtonViewComp';
import { useIsFocused } from '@react-navigation/native';
import TextComp from '../../Components/TextComp';
import ImageComp from '../../Components/ImageComp';
import Entypo from 'react-native-vector-icons/Entypo';
import { Picker } from '@react-native-picker/picker';
import ButtonViewComp from '../../Components/ButtonViewComp';
import ModalContainer from '../../Components/ModalContainer';
import TextInputComp from '../../Components/TextInputComp';
import apiInstance from '../../Utils/apiInstance';
import ErrorModal from '../../Components/ErrorModal';
import Common from '../../Utils/Common';
import { updatePDSubStage, updatePDModule, updatePDSubModule, updatePDPage } from '../../Utils/redux/actions/PDAction';


const PdQuestionarire = (props, { navigation }) => {
    const [loading, setLoading] = useState(false);
    const [remarks, setRemarks] = useState('');
    const [pdQuestions, setPdQuestions] = useState([]);
    const [refreshFlatlist, setRefreshFlatList] = useState(false);
    const isScreenVisible = useIsFocused();
    const [spinnerList, setSpinnerList] = useState([]);
    const [tempItem, setTempItem] = useState([]);
    const [currentPageId, setCurrentPageId] = useState(props.route.params.pageId);
    const [currentPageCode, setCurrentPageCode] = useState(props.route.params.pageCode);
    const [parentQuestionId, setParentQuestionId] = useState(0);
    const [defaultSatisficationLabel, setDefaultSatisficationLabel] = useState('');
    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [apiError, setApiError] = useState('');
    const [leadsystemCodeDetail, setLeadSystemCodeDetail] = useState(
        props.mobilecodedetail.leadSystemCodeDto,
    );
    const [systemCodeDetail, setSystemCodeDetail] = useState(
        props.mobilecodedetail.t_SystemCodeDetail,
    );
    const [leaduserCodeDetail, setLeadUserCodeDetail] = useState(
        props.mobilecodedetail.leadUserCodeDto,
    );
    const [userCodeDetail, setUserCodeDetail] = useState(
        props.mobilecodedetail.t_UserCodeDetail,
    );

    const [remarksModalVisible, setRemarksModalVisible] = useState(false);
    const showRemarksSheet = (item) => {
        setRemarksModalVisible(true)
        setRemarks(item.remarks)
        setTempItem(item)
    };
    const hideRemarksSheet = () => setRemarksModalVisible(false);

    useEffect(() => {
        props.navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' }, tabBarVisible: false });
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);
        getSystemCodeDetail();
        return () => {
            props.navigation.getParent()?.setOptions({ tabBarStyle: undefined, tabBarVisible: undefined });
            backHandler.remove();
        }
    }, [props.navigation, isScreenVisible]);

    const handleBackButton = () => {
        onGoBack();
        return true; // Prevent default back button behavior
    };

    const onGoBack = () => {
        props.navigation.replace('PdQuestionSubStage');
    }

    const getSystemCodeDetail = async () => {

        const filteredResponseData = leaduserCodeDetail
            .filter(data => data.masterId === 'PD_RESPONSE')
            .sort((a, b) => a.displayOrder - b.displayOrder);
        setDefaultSatisficationLabel(filteredResponseData[0].subCodeId)
        setSpinnerList(filteredResponseData);

        getQuestions(filteredResponseData[0].subCodeId);

    };

    const getQuestions = (defaultSatisficationLabel) => {

        const baseURL = global.PORT1;
        setLoading(true)

        const appDetails = {
            "clientId": global.CLIENTID,
            "userId": global.USERID,
            "pageId": currentPageId,
            "date": new Date()
        }

        if (global.PDSTAGE == 'PD_2') {

            if (currentPageCode == 'PG_BAS_DET_APPL') {
                appDetails.previousPage = 2;
            } else if (currentPageCode == 'PG_UND_BUSS_APPL') {
                appDetails.previousPage = 3;
            } else if (currentPageCode == 'PG_FIN_DET_APPL') {
                appDetails.previousPage = 4;
            } else if (currentPageCode == 'PG_CRE_WORTH_APPL') {
                appDetails.previousPage = 5;
            } else if (currentPageCode == 'PG_BAS_DET_CO_APPL') {
                appDetails.previousPage = 15;
            } else if (currentPageCode == 'PG_UND_BUSS_CO_APPL') {
                appDetails.previousPage = 16;
            } else if (currentPageCode == 'PG_FIN_DET_CO_APPL') {
                appDetails.previousPage = 17;
            } else if (currentPageCode == 'PG_CRE_WORTH_CO_APPL') {
                appDetails.previousPage = 18;
            } else if (currentPageCode == 'PG_BAS_DET_GRNTR') {
                appDetails.previousPage = 27;
            } else if (currentPageCode == 'PG_UND_BUSS_GRNTR') {
                appDetails.previousPage = 28;
            } else if (currentPageCode == 'PG_FIN_DET_GRNTR') {
                appDetails.previousPage = 29;
            } else if (currentPageCode == 'PG_CRE_WORTH_GRNTR') {
                appDetails.previousPage = 30;
            }

        } else if (global.PDSTAGE == 'PD_3') {
            if (currentPageCode == 'PG_BAS_DET_APPL') {
                appDetails.previousPage = 39;
            } else if (currentPageCode == 'PG_UND_BUSS_APPL') {
                appDetails.previousPage = 40;
            } else if (currentPageCode == 'PG_FIN_DET_APPL') {
                appDetails.previousPage = 41;
            } else if (currentPageCode == 'PG_CRE_WORTH_APPL') {
                appDetails.previousPage = 42;
            } else if (currentPageCode == 'PG_BAS_DET_CO_APPL') {
                appDetails.previousPage = 52;
            } else if (currentPageCode == 'PG_UND_BUSS_CO_APPL') {
                appDetails.previousPage = 53;
            } else if (currentPageCode == 'PG_FIN_DET_CO_APPL') {
                appDetails.previousPage = 54;
            } else if (currentPageCode == 'PG_CRE_WORTH_CO_APPL') {
                appDetails.previousPage = 55;
            } else if (currentPageCode == 'PG_BAS_DET_GRNTR') {
                appDetails.previousPage = 64;
            } else if (currentPageCode == 'PG_UND_BUSS_GRNTR') {
                appDetails.previousPage = 65;
            } else if (currentPageCode == 'PG_FIN_DET_GRNTR') {
                appDetails.previousPage = 66;
            } else if (currentPageCode == 'PG_CRE_WORTH_GRNTR') {
                appDetails.previousPage = 67;
            }
        }

        apiInstance(baseURL).post(`api/v1/pd/PdQAcheck/findbyClientId`, appDetails)
            .then((response) => {
                // Handle the response data
                if (global.DEBUG_MODE) console.log("ResponseDataApi::" + JSON.stringify(response.data));

                if (response.status == 200) {
                    if (response.data.pdQAcheckDto) {
                        setParentQuestionId(response.data.pdQAcheckDto.id)
                        setPdQuestions(response.data.quationAnswers)
                    } else {
                        const updatedData = response.data.quationAnswers.map(obj => ({ ...obj, satisfactionLevel: defaultSatisficationLabel }));
                        if (global.DEBUG_MODE) console.log("UpdatedData::" + JSON.stringify(updatedData));
                        setPdQuestions(updatedData)
                    }

                    setLoading(false)
                }
                else if (response.data.statusCode === 201) {
                    setLoading(false)
                    setApiError(response.data.message);
                    setErrorModalVisible(true);
                } else if (response.data.statusCode === 202) {
                    setLoading(false)
                    setApiError(response.data.message);
                    setErrorModalVisible(true);
                }

            })
            .catch((error) => {
                // Handle the error
                setLoading(false)
                if (global.DEBUG_MODE) console.log("ResponseDataApi::" + JSON.stringify(error.response.data));
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
    }

    const getAllStatus = () => {
        const filteredModule = props.pdSubStage[0].personalDiscussionSubStageLogs
            .filter(data => data.subStageCode === global.PDSUBSTAGE)[0]
            .personalDiscussionModuleLogs
            .filter(data => data.moduleCode === global.PDMODULE)[0]

        if (filteredModule) {

            // Use the every function to check if all mandatory submodules are completed
            const allMandatorySubmodulesCompleted = filteredModule.personalDiscussionSubModuleLogs.every(subModule => {
                const isPDSubmodule = subModule.subModuleCode === global.PDSUBMODULE.trim();
                let result = true;
                if (!isPDSubmodule) {
                    result = !isPDSubmodule && subModule.isMandatory && subModule.subModuleStatus === 'Completed';
                }
                return result;
            });

            if (allMandatorySubmodulesCompleted) {
                if (global.DEBUG_MODE) console.log('All mandatory submodules are completed.');
                //props.updatePDSubStage(global.PDSUBSTAGE);
                props.updatePDModule(global.PDSUBSTAGE, global.PDMODULE);
                props.updatePDSubModule(global.PDSUBSTAGE, global.PDMODULE, global.PDSUBMODULE);
                props.updatePDPage(global.PDSUBSTAGE, global.PDMODULE, global.PDSUBMODULE, currentPageCode);
                props.navigation.replace('PdQuestionSubStage')
            } else {
                if (global.DEBUG_MODE) console.log('Not all mandatory submodules are completed.');
                props.updatePDSubModule(global.PDSUBSTAGE, global.PDMODULE, global.PDSUBMODULE);
                props.updatePDPage(global.PDSUBSTAGE, global.PDMODULE, global.PDSUBMODULE, currentPageCode);
                props.navigation.replace('PdQuestionSubStage')
            }
        } else {
            if (global.DEBUG_MODE) console.log('Module not found.');
        }



    }

    const postQuestions = () => {

        const baseURL = global.PORT1;
        setLoading(true)

        const appDetails = {
            "createdBy": global.USERID,
            "createdDate": new Date(),
            "id": parentQuestionId,
            "clientType": global.CLIENTTYPE,
            "pdLevel": global.PDSTAGE,
            "quationAnswers": pdQuestions,
            "personalDiscussionQARefference": []
        }

        apiInstance(baseURL).post(`api/v1/pd/PdQAcheck/loan-application-number/${global.LOANAPPLICATIONNUM}/clientId/${global.CLIENTID}`, appDetails)
            .then((response) => {
                // Handle the response data
                if (global.DEBUG_MODE) console.log("PostQuestionApi::" + JSON.stringify(response));

                if (response.status == 200 || response.status == 201) {
                    updatePdStatus();
                }
                else if (response.data.statusCode === 201) {
                    setLoading(false)
                    setApiError(response.data.message);
                    setErrorModalVisible(true);
                } else if (response.data.statusCode === 202) {
                    setLoading(false)
                    setApiError(response.data.message);
                    setErrorModalVisible(true);
                }

            })
            .catch((error) => {
                // Handle the error
                setLoading(false)
                if (global.DEBUG_MODE) console.log("ResponseDataApi::" + JSON.stringify(error.response.data));
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
    }

    const updatePdStatus = () => {

        const appDetails = {
            "loanApplicationId": global.LOANAPPLICATIONID,
            "loanWorkflowStage": global.PDSTAGE,
            "subStageCode": global.PDSUBSTAGE,
            "moduleCode": global.PDMODULE,
            "subModule": global.PDSUBMODULE,
            "pageCode": currentPageCode,
            "status": "Completed",
            "userId": global.USERID
        };

        const baseURL = global.PORT1;
        setLoading(true);
        apiInstance(baseURL)
            .post(`/api/v2/PD/Update/PD_WORKFLOW/updateStatus`, appDetails)
            .then(async response => {
                // Handle the response data
                if (global.DEBUG_MODE) console.log('UpdatePDStatusApiResponse::' + JSON.stringify(response.data),);
                setLoading(false);
                if (response.status == 200) {
                    getAllStatus();
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
                if (global.DEBUG_MODE)
                    console.log(
                        'UpdateStatusApiResponse' + JSON.stringify(error.response),
                    );
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

    const addItem = () => {
        const newData = [...pdQuestions];
        for (let i = 0; i < newData.length; i++) {
            if (newData[i].pdQuestionId === tempItem.pdQuestionId) {
                newData[i] = { ...newData[i], remarks: remarks };
            }
        }
        setPdQuestions(newData);
        console.log("UpdatedValueText::" + JSON.stringify(newData))
        setRefreshFlatList(!refreshFlatlist)
        hideRemarksSheet()
    }
    const setSelectedValue = (itemValue, item) => {

        //const itemIndex = pdQuestions.findIndex((item) => item.id === itemId);

        const newData = [...pdQuestions];
        for (let i = 0; i < newData.length; i++) {
            if (newData[i].pdQuestionId === item.pdQuestionId) {
                newData[i] = { ...newData[i], satisfactionLevel: itemValue };
            }
        }
        setPdQuestions(newData);
        console.log("UpdatedValue::" + JSON.stringify(newData))
        setRefreshFlatList(!refreshFlatlist)
    }

    const submitQuestionare = () => {
        console.log('QuestionFinalData::' + JSON.stringify(pdQuestions))
        postQuestions();
    }


    const handleClick = (componentName, textValue) => {
        if (componentName === 'remarks') {
            setRemarks(textValue);
        }
    }

    const closeErrorModal = () => {
        setErrorModalVisible(false);
    };

    const FlatView = ({ item, index }) => {
        let rem = item.remarks

        return (
            <View style={{ width: '93%', alignItems: 'center' }}>

                <View style={{ width: '100%', marginLeft: 20, marginTop: 20 }}>
                    <View style={{ width: '92%', alignSelf: 'center' }}>
                        <Text style={{ fontSize: 15, color: Colors.darkblack, fontFamily: 'PoppinsRegular', marginTop: 3 }}>
                            {index + 1}. {item.quation}
                        </Text>

                        {/* <Text style={{ fontSize: 10, color: Colors.lightgrey, fontFamily: 'Poppins-Medium', marginTop: 3 }}>
                            {language[0][props.language].str_responses}
                        </Text> */}

                    </View>

                    <Picker
                        selectedValue={item.satisfactionLevel}
                        enabled={true}
                        mode='dropdown'
                        dropdownIconColor={Colors.black}
                        themeVariant='light'
                        onValueChange={(itemValue, itemIndex) => {
                            setSelectedValue(itemValue, item)
                        }}>
                        {/* {componentName == 'productIdPicker' && */}

                        {
                            spinnerList.map(item1 => {
                                let labelValue;
                                return <Picker.Item value={item1.subCodeId} label={item1.Description} style={{ backgroundColor: '#fff', color: '#000', fontFamily: 'PoppinsRegular' }} />
                            })
                        }
                    </Picker>
                    <View style={{ width: '91%', height: 1, backgroundColor: Colors.dimText, marginLeft: 15 }} />

                    {item.remarks &&

                        <View style={{ width: '91%', alignSelf: 'center', marginTop: 5 }}>
                            <Text style={{ fontSize: 13, color: Colors.lightgrey, fontFamily: 'Poppins-Medium', marginTop: 3 }}>
                                {language[0][props.language].str_remarks}
                            </Text>
                            <View style={{ width: '100%', height: 100, backgroundColor: '#F5F8FA', marginTop: 5 }}>
                                <Text style={{ fontSize: 15, color: Colors.black, fontFamily: 'PoppinsRegular', marginTop: 3, padding: 10 }}>
                                    {item.remarks}
                                </Text>
                            </View>
                        </View>


                    }

                    <View style={{ alignItems: 'flex-end', marginTop: 15 }}>
                        <View
                            style={{
                                marginTop: 10,
                                width: '90%',
                                flexDirection: 'row',
                                justifyContent: 'flex-end',
                                marginRight: 15
                            }}>
                            <TouchableOpacity onPress={() => showRemarksSheet(item)}>
                                {item.remarks ?
                                    (<Text
                                        style={{
                                            color: Colors.darkblue,
                                            fontFamily: 'Poppins-Medium'
                                        }}>
                                        + Edit Remarks
                                    </Text>) : <Text
                                        style={{
                                            color: Colors.darkblue,
                                            fontFamily: 'Poppins-Medium'
                                        }}>
                                        + Add Remarks
                                    </Text>}
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                {/* <View style={{ width: '90%', height: 0.5, backgroundColor: Colors.dimblue }} /> */}
            </View>
        )

    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            {loading ? <Loading /> : null}
            <MyStatusBar backgroundColor={'white'} barStyle="dark-content" />
            <ErrorModal
                isVisible={errorModalVisible}
                onClose={closeErrorModal}
                textContent={apiError}
                textClose={language[0][props.language].str_ok}
            />
            <View
                style={{
                    width: '100%',
                    height: 56,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                <HeadComp
                    textval={language[0][props.language].str_pd}
                    props={props}
                    onGoBack={onGoBack}
                />
            </View>
            <View style={{ width: '93%', flexDirection: 'row', marginLeft: 20 }}>
                <Text style={{ fontSize: 15, color: Colors.lightgrey, fontFamily: 'Poppins-Medium', marginTop: 3 }}>
                    {props.route.params.pageDesc}
                </Text>
            </View>
            <View style={{ flex: 1 }}>

                <ModalContainer
                    visible={remarksModalVisible}
                    closeModal={hideRemarksSheet}
                    modalstyle={styles.modalContent}
                    contentComponent={
                        <View style={[styles.parentView, { backgroundColor: Colors.lightwhite, width: '90%' }]}>
                            <ScrollView
                                style={styles.scrollView}
                                contentContainerStyle={styles.contentContainer}
                                showsVerticalScrollIndicator={false}
                                keyboardShouldPersistTaps="handled">
                                <View style={{ flex: 1 }}>

                                    <View style={{ width: '100%', marginTop: 19, paddingHorizontal: 0, alignItems: 'center', justifyContent: 'center' }}>

                                        <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, }}>
                                            <TextComp textVal={'Remarks'} textStyle={Commonstyles.inputtextStyle} Visible={true} />
                                        </View>

                                        <TextInputComp textValue={remarks} textStyle={[Commonstyles.textinputtextStyle, { maxHeight: 100 }]} type='email-address' Disable={false} ComponentName='remarks' returnKey="done" handleClick={handleClick} length={150} multilines={true} />

                                    </View>

                                    <View style={{ alignItems: 'flex-end', marginTop: 25 }}>
                                        <ButtonViewComp textValue={language[0][props.language].str_add.toUpperCase()} textStyle={{ color: Colors.white, fontSize: 13, fontWeight: 500 }} viewStyle={[Commonstyles.buttonView, { width: 100, height: 20 }]} innerStyle={[Commonstyles.buttonViewInnerStyle, { height: 35 }]} handleClick={() => addItem()} />
                                    </View>

                                </View>
                            </ScrollView>
                        </View>
                    } />

                <FlatList
                    data={pdQuestions}
                    renderItem={FlatView}
                    extraData={refreshFlatlist}
                    keyExtractor={(item, index) => index.toString()}
                />

                <ButtonViewComp
                    textValue={language[0][props.language].str_submit.toUpperCase()}
                    textStyle={{ color: Colors.white, fontSize: 13, fontWeight: 500, marginBottom: 5 }}
                    viewStyle={[Commonstyles.buttonView, { marginBottom: 10 }]}
                    innerStyle={Commonstyles.buttonViewInnerStyle}
                    handleClick={submitQuestionare}
                />
            </View>
        </SafeAreaView >
    );
};

const mapStateToProps = state => {
    const { language } = state.languageReducer;
    const { profileDetails } = state.profileReducer;
    const { mobileCodeDetails } = state.mobilecodeReducer;
    const { pdSubStages } = state.pdStagesReducer;
    return {
        language: language,
        profiledetail: profileDetails,
        mobilecodedetail: mobileCodeDetails,
        pdSubStage: pdSubStages
    }
};

const mapDispatchToProps = dispatch => ({
    languageAction: item => dispatch(languageAction(item)),
    updatePDSubStage: item => dispatch(updatePDSubStage(item)),
    updatePDModule: (subStage, module) => dispatch(updatePDModule(subStage, module)),
    updatePDSubModule: (subStage, module, subModule) => dispatch(updatePDSubModule(subStage, module, subModule)),
    updatePDPage: (subStage, module, subModule, page) => dispatch(updatePDPage(subStage, module, subModule, page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PdQuestionarire);

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#f5f8fa',
        alignItems: 'center'
    },
    parentView: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    contentContainer: {

        paddingBottom: 50,
        flexGrow: 1
    },
    headerView: {
        width: ('100%'),
        paddingVertical: 15,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    viewStyle: {
        alignItems: 'center',
        paddingHorizontal: 20, marginLeft: 9, marginRight: 4,
        borderColor: '#e3e3e3',
        marginBottom: 4,
        marginStart: 12,
        paddingVertical: 7,
        borderWidth: 1,
        borderRadius: 8,
    },
    bottomNavigationView: {
        backgroundColor: '#fff',
        width: '100%',
        height: 400,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },

    textColor: {
        color: '#000',
        fontSize: 14,
        fontWeight: '400'
    },
    viewStyleFilter: {
        alignItems: 'center', justifyContent: 'center',
    },
    viewStyleStatusData: {
        alignItems: 'center'
    },
    picker: {
        height: 50,
        width: '85%',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        textAlign: 'center'
    },
    pendingbackground: {
        width: 90, borderColor: Colors.pendingBorder, backgroundColor: Colors.pendingBg, alignItems: 'center', padding: 3, borderRadius: 15, borderWidth: 1
    },
    approvedbackground: {
        width: 90, borderColor: Colors.approvedBorder, backgroundColor: Colors.approvedBg, alignItems: 'center', padding: 3, borderRadius: 15, borderWidth: 1
    },
    line: {
        backgroundColor: '#f1f1f1', // Change the color as needed
        height: 1,
        width: '90%', marginLeft: '5%',
        marginTop: '5%', alignItems: 'center'         // Adjust the height as needed
    },
    disableBg: {
        width: '88%', height: 50, backgroundColor: Colors.disableBg,
        borderRadius: 45, alignItems: 'center', justifyContent: 'center'
    },
    enableBg: {
        width: '88%', height: 50, backgroundColor: Colors.enableBg,
        borderRadius: 45, alignItems: 'center', justifyContent: 'center'
    }, fab: {
        position: 'absolute',
        margin: 0,
        right: 0,
        bottom: 12,
        width: '100%',

    },
    modalContent: {
        width: '90%',  // Set width to 90% of the screen width
        aspectRatio: 1.5,
        backgroundColor: 'white',
        padding: 10,
        margin: 10,
        borderRadius: 20,
        alignItems: 'center',
    },

});
