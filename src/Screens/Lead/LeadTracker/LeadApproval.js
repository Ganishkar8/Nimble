import React, { useEffect, useState } from 'react';
import {
    View,
    StatusBar,
    Text,
    Image,
    FlatList,
    StyleSheet,
    TextInput,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
} from 'react-native';
import TextComp from '../../../Components/TextComp';
import Colors from '../../../Utils/Colors';
import MyStatusBar from '../../../Components/MyStatusBar';
import Loading from '../../../Components/Loading';
import { connect } from 'react-redux';
import { languageAction } from '../../../Utils/redux/actions/languageAction';
import { language } from '../../../Utils/LanguageString';
import HeadComp from '../../../Components/HeadComp';
import ButtonViewComp from '../../../Components/ButtonViewComp';
import Commonstyles from '../../../Utils/Commonstyles';
import tbl_SystemCodeDetails from '../../../Database/Table/tbl_SystemCodeDetails';
import PickerComp from '../../../Components/PickerComp';
import TextInputComp from '../../../Components/TextInputComp';
import ErrorMessageModal from '../../../Components/ErrorMessageModal';
import apiInstance from '../../../Utils/apiInstance';
import ErrorModal from '../../../Components/ErrorModal';



const LeadApproval = (props, { navigation, route }) => {

    const [errMsg, setErrMsg] = useState('');
    const [currentPosition, setCurrentPosition] = useState(0);
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [approverComment, setApproverComment] = useState('');
    const [leadStatusLabel, setLeadStatusLabel] = useState('');
    const [leadStatusIndex, setLeadStatusIndex] = useState('');
    const [leadStatusData, setLeadStatusData] = useState([]);
    const [bottomErrorSheetVisible, setBottomErrorSheetVisible] = useState(false);
    const showBottomSheet = () => setBottomErrorSheetVisible(true);
    const hideBottomSheet = () => setBottomErrorSheetVisible(false);
    const [leadData, setLeadData] = useState(props.route.params.leadData);
    const [statusDisable, setStatusDisable] = useState(false);
    const [commentDisable, setCommentDisable] = useState(false);
    const [logData, setLogData] = useState(props.route.params.logDetail);
    const [systemCodeDetail, setSystemCodeDetail] = useState(props.mobilecodedetail.leadSystemCodeDto);
    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [apiError, setApiError] = useState('');

    useEffect(() => {
        //below code is used for hiding  bottom tab
        props.navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' }, tabBarVisible: false });
        //pickerData();
        callPickerApi();

        //alert(leadStatusLabel)

        if (leadData.leadCreationLeadLogDto.leadStatus.toUpperCase() == 'APPROVED' || leadData.leadCreationLeadLogDto.leadStatus.toUpperCase() == 'REJECTED') {
            if (leadData.leadCreationLeadLogDto.leadStatus)
                if (leadData.leadCreationLeadLogDto.approverComments) {
                    setApproverComment(leadData.leadCreationLeadLogDto.approverComments);
                }
            setLeadStatusLabel(leadData.leadCreationLeadLogDto.leadStatus)
        }

        if (global.USERTYPEID == '1164') {
            setStatusDisable(true);
            setCommentDisable(true);
        } else {
            setStatusDisable(false);
            setCommentDisable(false);
            if (leadData.leadCreationLeadLogDto.leadStatus.toUpperCase() == 'APPROVED' || leadData.leadCreationLeadLogDto.leadStatus.toUpperCase() == 'REJECTED') {
                setStatusDisable(true);
                setCommentDisable(true);
            }
        }
        return () =>
            props.navigation.getParent()?.setOptions({ tabBarStyle: undefined, tabBarVisible: undefined });
    }, [navigation]);



    const handleClick = (componentName, textValue) => {

        setApproverComment(textValue)

    }

    const handleReference = (componentName) => {

    };

    const handlePickerClick = (componentName, label, index) => {

        if (componentName === 'leadStatusPicker') {
            setLeadStatusLabel(label);
            setLeadStatusIndex(index);
        }

    }

    const validate = () => {
        var flag = false; var i = 1;
        var errorMessage = '';


        if (leadStatusLabel.length <= 0) {
            errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsselect + "LEAD STATUS" + '\n';
            i++;
            flag = true;
        }


        if (approverComment.length <= 0) {
            errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsenter + "APPROVER COMMENT" + '\n';
            i++;
            flag = true;
        }


        setErrMsg(errorMessage);
        return flag;
    }

    const callPickerApi = () => {

        const dataArray = [];
        systemCodeDetail.filter((data) => data.masterId === 'LEAD_STATUS').map((value, index) => {
            if (value.subCodeId.toUpperCase() == 'APPROVED') {
                dataArray.push({ Description: value.Description, subCodeId: value.subCodeId, checked: false })
            } else if (value.subCodeId.toUpperCase() == 'REJECTED') {
                dataArray.push({ Description: value.Description, subCodeId: value.subCodeId, checked: false })
            }

        });
        setLeadStatusData(dataArray);

        // const baseURL = '8082'
        // setLoading(true)

        // apiInstance(baseURL).get('/api/v1/system-code/master/LEAD_STATUS')
        //     .then(async (response) => {

        //         setLoading(false);
        //         var data = [];
        //         for (var i = 0; i < response.data.length; i++) {
        //             if (response.data[i].id == 1667) {
        //                 data.push(response.data[i])
        //             } else if (response.data[i].id == 1668) {
        //                 data.push(response.data[i])
        //             }
        //         }
        //         setLeadStatusData(data)

        //     })
        //     .catch((error) => {
        //         if (global.DEBUG_MODE) console.log("Error" + JSON.stringify(error.response))
        //         setLoading(false)
        //         alert(error);
        //     });


    }

    const leadApproval = () => {

        if (global.USERTYPEID == '1164') {
            return;
        } else if (statusDisable) {
            return;
        }

        if (validate()) {
            showBottomSheet();
            return;
        }

        const appDetails = {
            "status": leadStatusLabel,
            "comments": approverComment,
            "userId": global.USERID
        }
        const baseURL = global.PORT1
        setLoading(true)
        // alert(props.route.params.leadData.id)
        apiInstance(baseURL).post(`/api/v1/lead-Approved/ByBm/${props.route.params.leadData.id}`, appDetails)
            .then(async (response) => {
                // Handle the response data
                setLoading(false)
                if (response.status == 200) {
                    props.navigation.navigate('LeadManagement', { fromScreen: 'LeadApproval' })
                }
                else if (response.data.statusCode === 201) {
                    setApiError(response.data.message);
                    setErrorModalVisible(true);
                } else if (response.data.statusCode === 202) {
                    setApiError(response.data.message);
                    setErrorModalVisible(true);
                }


            })
            .catch((error) => {
                // Handle the error
                setLoading(false)
                if (global.DEBUG_MODE) console.log("LeadLog::" + JSON.stringify(error.response.data));

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

    const closeErrorModal = () => {
        setErrorModalVisible(false);
    };

    const onGoBack = () => {
        props.navigation.goBack();
    }

    return (

        <SafeAreaView style={[styles.parentView, { backgroundColor: Colors.lightwhite }]}>
            <ErrorModal isVisible={errorModalVisible} onClose={closeErrorModal} textContent={apiError} textClose={language[0][props.language].str_ok} />
            <MyStatusBar backgroundColor={'white'} barStyle="dark-content" />

            <ScrollView style={styles.scrollView}
                contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
                {loading ? <Loading /> : null}

                <View style={{ flex: 1 }}>

                    <ErrorMessageModal isVisible={bottomErrorSheetVisible} hideBottomSheet={hideBottomSheet} errMsg={errMsg} textError={language[0][props.language].str_error} textClose={language[0][props.language].str_ok} />


                    <View style={{ width: '100%', height: 56, alignItems: 'center', justifyContent: 'center', }}>

                        <HeadComp textval={language[0][props.language].str_leadapproval} props={props} onGoBack={onGoBack} />

                    </View>


                    <View style={{ width: '100%', height: 50, justifyContent: 'center' }}>
                        <Text style={{
                            fontSize: 16, color: Colors.mediumgrey, marginLeft: 23, fontFamily: 'PoppinsRegular'
                        }}>{language[0][props.language].str_leadid} :  <Text style={{ color: Colors.black, fontFamily: 'PoppinsRegular' }}>{leadData.leadNumber}</Text></Text>
                    </View>


                    <View style={{ width: '100%', alignItems: 'center', marginTop: '4%' }}>
                        <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, }}>

                            <TextComp textVal={language[0][props.language].str_leadstatus} textStyle={Commonstyles.inputtextStyle} Visible={true} />

                        </View>

                        <PickerComp textLabel={leadStatusLabel} pickerStyle={Commonstyles.picker} Disable={statusDisable} pickerdata={leadStatusData} componentName='leadStatusPicker' handlePickerClick={handlePickerClick} />


                    </View>

                    <View style={{ width: '100%', marginTop: 19, paddingHorizontal: 0, alignItems: 'center', justifyContent: 'center' }}>

                        <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, }}>
                            <TextComp textVal={language[0][props.language].str_approvercomment} textStyle={Commonstyles.inputtextStyle} Visible={true} />
                        </View>

                        <TextInputComp textValue={approverComment} textStyle={[Commonstyles.textinputtextStyle, { maxHeight: 100 }]} type='email-address' Disable={commentDisable} ComponentName='approverComment' returnKey="done" handleClick={handleClick} handleReference={handleReference} length={300} multilines={true} />



                    </View>

                </View>

                <ButtonViewComp textValue={language[0][props.language].str_submit.toUpperCase()} textStyle={{ color: Colors.white, fontSize: 13, fontWeight: 500 }} viewStyle={Commonstyles.buttonView} innerStyle={global.USERTYPEID == '1164' ? Commonstyles.disableBg : statusDisable ? Commonstyles.disableBg : Commonstyles.buttonViewInnerStyle} handleClick={leadApproval} />


            </ScrollView>
        </SafeAreaView>
    );
};

const mapStateToProps = (state) => {
    const { language } = state.languageReducer;
    const { profileDetails } = state.profileReducer;
    const { mobileCodeDetails } = state.mobilecodeReducer;
    return {
        language: language,
        profiledetail: profileDetails,
        mobilecodedetail: mobileCodeDetails
    }
}

const mapDispatchToProps = (dispatch) => ({
    languageAction: (item) => dispatch(languageAction(item)),
});


export default connect(mapStateToProps, mapDispatchToProps)(LeadApproval);

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

});