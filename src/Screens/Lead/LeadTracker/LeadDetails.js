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
import { DatePickerModal, tr } from 'react-native-paper-dates';

import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import TextComp from '../../../Components/TextComp';
import Colors from '../../../Utils/Colors';
import MyStatusBar from '../../../Components/MyStatusBar';
import Loading from '../../../Components/Loading';
import { BottomSheet } from 'react-native-btr';
import { connect } from 'react-redux';
import { languageAction } from '../../../Utils/redux/actions/languageAction';
import { language } from '../../../Utils/LanguageString';
import { FAB } from 'react-native-paper';
import apiInstance from '../../../Utils/apiInstance';
import tbl_SystemCodeDetails from '../../../Database/Table/tbl_SystemCodeDetails';
import Common from '../../../Utils/Common';
import Commonstyles from '../../../Utils/Commonstyles';
import { useIsFocused } from '@react-navigation/native';
import ErrorModal from '../../../Components/ErrorModal';

const data = [

    { name: 'Filter' },
    { name: 'Sort by' },
    { name: 'Draft' },
    { name: 'Rejected' }
]
const mainFilterDataArr = [

    { name: 'Sort', isSelected: true, id: 'SO' },
    { name: 'Status', isSelected: false, id: 'ST' },
    { name: 'Date', isSelected: false, id: 'DT' },
    { name: 'Type', isSelected: false, id: 'TP' },
    { name: 'Ageing', isSelected: false, id: 'AG' }
]

const statusDataArr = [

    { name: 'Approve', id: 'APR', checked: true },
    { name: 'Pending', id: 'PEN', checked: false },
    { name: 'Rejected', id: 'REJ', checked: false },
    { name: 'Draft', id: 'DFT', checked: false },

]

const typeDataArr = [

    { name: 'Hot', id: 'HOT', checked: true },
    { name: 'Warm', id: 'WARM', checked: false },
    { name: 'Cold', id: 'COLD', checked: false }

]

const LeadDetails = (props, { navigation, route }) => {


    const [mainFilterData, setMainFilteredData] = useState(mainFilterDataArr);
    const [leadData, setLeadData] = useState();
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [status, setStatus] = useState('COMP');
    const [leadStatusData, setLeadStatusData] = useState([]);
    const [leadStatus, setLeadStatus] = useState(props.route.params.leadData.leadStatus.toUpperCase());
    const [leadTrackerData, setLeadTrackerData] = useState(props.route.params.leadData);
    const [loanTypeData, setLoanTypeData] = useState([]);
    const isScreenVisible = useIsFocused();

    const [systemCodeDetail, setSystemCodeDetail] = useState(props.mobilecodedetail.leadSystemCodeDto);
    const [userCodeDetail, setUserCodeDetail] = useState(props.mobilecodedetail.leadUserCodeDto);
    const [systemMandatoryField, setSystemMandatoryField] = useState(props.mobilecodedetail.leadSystemMandatoryFieldDto);
    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [apiError, setApiError] = useState('');


    useEffect(() => {
        //below code is used for hiding  bottom tab

        props.navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' }, tabBarVisible: false });

        if (isScreenVisible) {
            Common.getNetworkConnection().then(value => {
                if (value.isConnected == true) {
                    getLeadData();
                } else {
                    alert('Internet is not connected')
                }

            })
        }


        return () =>
            props.navigation.getParent()?.setOptions({ tabBarStyle: undefined, tabBarVisible: undefined });

    }, [navigation, isScreenVisible]);

    const hideAndShow = () => {

        setVisible(!visible);
    }

    const getLeadData = () => {
        const baseURL = '8901'
        setLoading(true)
        apiInstance(baseURL).get(`api/v1/lead-creation-initiation/getByLeadId/${props.route.params.leadData.id}`)
            .then((response) => {
                // Handle the response data
                if (response.status == 200) {
                    if (global.DEBUG_MODE) console.log("LeadDetailsApiResponse::" + JSON.stringify(response.data));
                    setLeadData(response.data)
                } else {
                    setApiError('Server Error!!');
                    setErrorModalVisible(true)
                }
                setLoading(false)
                // const decodedToken = jwtDecode(response.data.jwtToken);
                // console.log("LoginJWTDecode::" + JSON.stringify(decodedToken));
            })
            .catch((error) => {
                // Handle the error
                setLoading(false)
                if (global.DEBUG_MODE) console.log('LeadDetailsApiResponse::::' + JSON.stringify(error.response));
                if (error.response.data != null) {
                    setApiError(error.response.data.message);
                    setErrorModalVisible(true)
                }
            });
    }

    const getLogDetails = (value) => {
        var logArray = [];
        // var approvalavailable = false; var draftavailable = 0; var insertApprovalIndex = 0; var insertDraftIndex = 0; var rejectavailable = false; var insertRejectIndex = 0
        // for (var i = 0; i < leadData.leadCreationLeadLogDtoList.length; i++) {

        //     if (leadData.leadCreationLeadLogDtoList[i].leadStatus == '1669') {
        //         draftavailable = true;
        //         insertDraftIndex = i;
        //         //logArray.push(leadData.leadCreationLeadLogDtoList[i]);
        //     } else if (leadData.leadCreationLeadLogDtoList[i].leadStatus == '1667') {
        //         approvalavailable = true;
        //         insertApprovalIndex = i;
        //         break;

        //     } else if (leadData.leadCreationLeadLogDtoList[i].leadStatus == '1668') {
        //         rejectavailable = true;
        //         insertRejectIndex = i;
        //         break;
        //     }

        // }

        // var position = 0;
        // if (draftavailable) {
        //     logArray.push(leadData.leadCreationLeadLogDtoList[insertDraftIndex]);
        // }

        // if (approvalavailable) {
        //     logArray.push(leadData.leadCreationLeadLogDtoList[insertApprovalIndex]);
        //     position = 1;
        // } else if (rejectavailable) {
        //     logArray.push(leadData.leadCreationLeadLogDtoList[insertRejectIndex]);
        //     position = 1;
        // } else {
        //     logArray.push({
        //         "createdBy": '',
        //         "approvedOn": "",
        //         "id": '',
        //         "leadStatus": '1667',
        //         "leadId": '',
        //         "isActive": ''
        //     })
        // }

        //alert(JSON.stringify(logArray))
        if (value == 'LeadLog') {
            props.navigation.navigate('LeadLog', { leadData: leadData, logDetail: logArray })
        } else {
            props.navigation.navigate('LeadApproval', { leadData: leadData, logDetail: logArray })
        }


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



                    <View style={styles.headerView}>
                        <View style={{
                            width: '100%', height: 50, alignItems: 'center', justifyContent: 'center',
                            flexDirection: 'row'
                        }}>
                            <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ width: '15%', height: 56, alignItems: 'center', justifyContent: 'center' }}>
                                <View >

                                    <Entypo name='chevron-left' size={25} color='#4e4e4e' />

                                </View>
                            </TouchableOpacity>
                            <View style={{ width: '85%', height: 50, justifyContent: 'center' }}>
                                <Text style={{ fontSize: 18, color: '#000', fontWeight: '400' }}>{language[0][props.language].str_leaddetails}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ width: '100%', height: 5, backgroundColor: Colors.skyblue }} />


                    <View style={{ width: '100%', justifyContent: 'center' }}>
                        <View style={{
                            width: '92%', margin: 13, backgroundColor: Colors.white,
                            borderRadius: 6, paddingHorizontal: 0, borderColor: Colors.dimText, borderWidth: 0.5,
                            alignItems: 'center'
                        }}>

                            <View style={{ width: '100%', flexDirection: 'row', marginTop: 13 }}>
                                <View style={{ width: '45%', flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={{ color: Colors.black, fontSize: 14, marginLeft: 20, fontFamily: 'Poppins-Medium' }}>{language[0][props.language].str_leadapprovalstatus}</Text>
                                </View>
                                <View style={{ width: '55%', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                                    <View style={leadStatus == 'APPROVED' ? styles.approvedbackground : leadStatus == 'REJECTED' ? styles.rejectedbackground : styles.pendingbackground}>
                                        <Text style={{ color: Colors.black, fontSize: 12, fontFamily: 'Poppins-Medium' }}>{Common.getSystemCodeDescription(systemCodeDetail, 'LEAD_STATUS', leadStatus)}</Text>
                                    </View>
                                </View>
                            </View>

                            <View style={{ width: '100%', flexDirection: 'row', marginTop: 13, }}>
                                <View style={styles.leftText}>
                                    <Text style={styles.headText}>{language[0][props.language].str_customername}</Text>
                                </View>
                                <View style={styles.rightText}>
                                    <Text style={[styles.childText, { width: '7%' }]}>:</Text>
                                    <Text style={[styles.childText, { width: '93%' }]}>{leadTrackerData.customerName}</Text>
                                </View>
                            </View>
                            <View style={{ width: '100%', flexDirection: 'row', marginTop: 11, }}>
                                <View style={styles.leftText}>
                                    <Text style={styles.headText}>{language[0][props.language].str_leadid}</Text>
                                </View>
                                <View style={styles.rightText}>
                                    <Text style={[styles.childText, { width: '7%' }]}>:</Text>
                                    <Text style={[styles.childText, { width: '93%' }]}>{leadTrackerData.leadId}</Text>
                                </View>
                            </View>
                            <View style={{ width: '100%', flexDirection: 'row', marginTop: 11, }}>
                                <View style={styles.leftText}>
                                    <Text style={styles.headText}>{language[0][props.language].str_leadtype}</Text>
                                </View>
                                <View style={styles.rightText}>
                                    <Text style={[styles.childText, { width: '7%' }]}>:</Text>
                                    <Text style={[styles.childText, { width: '93%' }]}>{leadTrackerData.leadType}</Text>
                                </View>
                            </View>
                            {/* hide */}

                            {visible && <View>

                                {leadStatus == 'APPROVED' && <View style={{ width: '100%', flexDirection: 'row', marginTop: 11, }}>
                                    <View style={styles.leftText}>
                                        <Text style={styles.headText}>{language[0][props.language].str_approvername}</Text>
                                    </View>
                                    <View style={styles.rightText}>
                                        <Text style={[styles.childText, { width: '7%' }]}>:</Text>
                                        <Text style={[styles.childText, { width: '93%' }]}>{leadTrackerData.leadStatus.toUpperCase() == 'APPROVED' ? leadTrackerData.approverName : ''}  </Text>
                                    </View>
                                </View>
                                }

                                <View style={{ width: '100%', flexDirection: 'row', marginTop: 11, }}>
                                    <View style={styles.leftText}>
                                        <Text style={styles.headText}>{language[0][props.language].str_productId}</Text>
                                    </View>
                                    <View style={styles.rightText}>
                                        <Text style={[styles.childText, { width: '7%' }]}>:</Text>
                                        <Text style={[styles.childText, { width: '93%' }]}>{leadTrackerData.product}</Text>
                                    </View>
                                </View>

                                <View style={{ width: '100%', flexDirection: 'row', marginTop: 11, }}>
                                    <View style={styles.leftText}>
                                        <Text style={styles.headText}>{language[0][props.language].str_loanamount}</Text>
                                    </View>
                                    <View style={styles.rightText}>
                                        <Text style={[styles.childText, { width: '7%' }]}>:</Text>
                                        <Text style={[styles.childText, { width: '93%' }]}><Text style={{ fontFamily: 'AntDesign' }}>₹ </Text>{leadTrackerData.loanAmount}</Text>
                                    </View>
                                </View>

                                <View style={{ width: '100%', flexDirection: 'row', marginTop: 11, }}>
                                    <View style={styles.leftText}>
                                        <Text style={styles.headText}>{language[0][props.language].str_loantype}</Text>
                                    </View>
                                    <View style={styles.rightText}>
                                        <Text style={[styles.childText, { width: '7%' }]}>:</Text>
                                        <Text style={[styles.childText, { width: '93%' }]}>{Common.getSystemCodeDescription(systemCodeDetail, 'LNTP', leadData.leadCreationLoanDetails.loanType)}</Text>
                                    </View>
                                </View>

                                {global.USERTYPEID == '1163' && <View style={{ width: '100%', flexDirection: 'row', marginTop: 11, }}>
                                    <View style={styles.leftText}>
                                        <Text style={styles.headText}>{language[0][props.language].str_currentleadownerid}</Text>
                                    </View>
                                    <View style={styles.rightText}>
                                        <Text style={[styles.childText, { width: '7%' }]}>:</Text>
                                        <Text style={[styles.childText, { width: '93%' }]}>{leadTrackerData.agentName}</Text>
                                    </View>
                                </View>}

                                <View style={{ width: '100%', flexDirection: 'row', marginTop: 11, }}>
                                    <View style={styles.leftText}>
                                        <Text style={styles.headText}>{language[0][props.language].str_creationdate}</Text>
                                    </View>
                                    <View style={styles.rightText}>
                                        <Text style={[styles.childText, { width: '7%' }]}>:</Text>
                                        <Text style={[styles.childText, { width: '93%' }]}>{Common.formatDate(leadTrackerData.creationDate)}</Text>
                                    </View>
                                </View>

                                {leadStatus == 'APPROVED' &&
                                    <View style={{ width: '100%', flexDirection: 'row', marginTop: 11, }}>
                                        <View style={styles.leftText}>
                                            <Text style={styles.headText}>{language[0][props.language].str_completiondate}</Text>
                                        </View>
                                        <View style={styles.rightText}>
                                            <Text style={[styles.childText, { width: '7%' }]}>:</Text>
                                            <Text style={[styles.childText, { width: '93%' }]}>{leadStatus == 'APPROVED' ? Common.formatDate(leadTrackerData.completionDate) : ''}</Text>
                                        </View>
                                    </View>
                                }

                                <View style={{ width: '100%', flexDirection: 'row', marginTop: 11, }}>
                                    <View style={styles.leftText}>
                                        <Text style={styles.headText}>{language[0][props.language].str_ageing}</Text>
                                    </View>
                                    <View style={styles.rightText}>
                                        <Text style={[styles.childText, { width: '7%' }]}>:</Text>
                                        <Text style={[styles.childText, { width: '93%' }]}>{leadTrackerData.ageing} days</Text>
                                    </View>
                                </View>
                            </View>
                            }
                            <TouchableOpacity onPress={hideAndShow} activeOpacity={10} style={{ width: '100%', marginTop: 20, marginBottom: 10 }}>
                                <View style={{ justifyContent: 'center', alignSelf: 'center' }}>
                                    {visible ? (
                                        <AntDesign name='up' size={12} color={Colors.black} />
                                    ) : <AntDesign name='down' size={12} color={Colors.black} />}

                                </View>
                            </TouchableOpacity>

                        </View>

                        <TouchableOpacity onPress={() => { global.LEADTYPE = 'COMP'; global.leadNumber = leadData.leadNumber; props.navigation.navigate('LeadCreationBasic', { leadData: leadData }) }} activeOpacity={0.5} style={{ width: '100%', marginTop: '5%', alignItems: 'center' }}>
                            <View style={{ flexDirection: 'row' }}>

                                <View style={{ width: '70%', justifyContent: 'center' }}>
                                    <Text style={{ fontSize: 16, color: Colors.mediumgrey, marginTop: 5, fontFamily: 'PoppinsRegular' }}>{language[0][props.language].str_captureddetails}</Text>
                                </View>

                                <View style={{ width: '10%' }}></View>
                                <Entypo name='chevron-right' size={23} color={Colors.darkblack} style={{ marginLeft: 10 }} />

                            </View>
                        </TouchableOpacity>

                        {global.USERTYPEID == '1163' && <View style={styles.line}></View>}

                        {global.USERTYPEID == '1163' && <TouchableOpacity onPress={() => {
                            if (leadStatus != 'APPROVED') {

                            } else {
                                props.navigation.navigate('ReAssign', { leadData: leadTrackerData })
                            }

                        }} activeOpacity={0.5} style={{ width: '100%', marginTop: '5%', alignItems: 'center' }}>
                            <View style={{ flexDirection: 'row' }}>

                                <View style={{ width: '70%', justifyContent: 'center' }}>
                                    <Text style={{ fontFamily: 'PoppinsRegular', fontSize: 16, color: leadStatus != 'APPROVED' ? Colors.lightgrey : Colors.mediumgrey, marginTop: 5, }}>{language[0][props.language].str_reassign}</Text>
                                </View>

                                <View style={{ width: '10%' }}></View>
                                <Entypo name='chevron-right' size={23} color={leadStatus != 'APPROVED' ? Colors.lightgrey : Colors.darkblack} style={{ marginLeft: 10 }} />

                            </View>
                        </TouchableOpacity>}


                        <View style={styles.line}></View>

                        <TouchableOpacity onPress={() => {
                            if (global.USERTYPEID == '1163') {
                                getLogDetails()
                            } else if (leadStatus != 'PENDING') {
                                getLogDetails()
                            }

                        }} activeOpacity={0.5} style={{ width: '100%', marginTop: '8%', alignItems: 'center' }}>
                            <View style={{ flexDirection: 'row' }}>

                                <View style={{ width: '70%', justifyContent: 'center' }}>
                                    <Text style={{ fontFamily: 'PoppinsRegular', fontSize: 16, color: global.USERTYPEID == '1163' ? Colors.mediumgrey : leadStatus != 'PENDING' ? Colors.darkblack : Colors.lightgrey, marginTop: 5, }}>{language[0][props.language].str_leadapprovals}</Text>
                                </View>

                                <View style={{ width: '10%' }}></View>
                                <Entypo name='chevron-right' size={23} color={global.USERTYPEID == '1163' ? Colors.mediumgrey : leadStatus != 'PENDING' ? Colors.darkblack : Colors.lightgrey} style={{ marginLeft: 10 }} />

                            </View>
                        </TouchableOpacity>

                        <View style={styles.line}></View>

                        <TouchableOpacity onPress={() => getLogDetails('LeadLog')} activeOpacity={0.5} style={{ width: '100%', marginTop: '8%', alignItems: 'center' }}>
                            <View style={{ flexDirection: 'row' }}>

                                <View style={{ width: '70%', justifyContent: 'center' }}>
                                    <Text style={{ fontFamily: 'PoppinsRegular', fontSize: 16, color: Colors.mediumgrey, marginTop: 5, }}>{language[0][props.language].str_leadlog}</Text>
                                </View>

                                <View style={{ width: '10%' }}></View>
                                <Entypo name='chevron-right' size={23} color={Colors.darkblack} style={{ marginLeft: 10 }} />

                            </View>
                        </TouchableOpacity>
                    </View>

                </View>


                <View
                    style={{
                        width: '100%',
                        height: 50,
                        marginTop: 40,
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                    }}>
                    <TouchableOpacity activeOpacity={10} style={global.USERTYPEID == '1163' ? Commonstyles.disableBg : leadStatus == 'APPROVED' ? Commonstyles.buttonViewInnerStyle : Commonstyles.disableBg}>
                        <View >
                            <TextComp textVal={language[0][props.language].str_initiateloanapplication.toUpperCase()} textStyle={{ color: Colors.white, fontSize: 13, fontFamily: 'Poppins-SemiBold', letterSpacing: 0.5 }} />

                        </View>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </SafeAreaView >
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


export default connect(mapStateToProps, mapDispatchToProps)(LeadDetails);

const styles = StyleSheet.create({
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
    container: {
        flex: 1,
        backgroundColor: '#f5f8fa',
        alignItems: 'center'
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
    rejectedbackground: {
        width: 90, borderColor: Colors.rejectedBorder, backgroundColor: Colors.rejectedBg, alignItems: 'center', padding: 3, borderRadius: 15, borderWidth: 1
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
    leftText: {
        width: '45%',
    },
    rightText: {
        width: '55%',
        flexDirection: 'row'

    },
    headText: {
        color: Colors.mediumgrey, fontSize: 13, marginLeft: 20, fontFamily: 'PoppinsRegular'
    },
    childText: {
        color: Colors.black, fontSize: 13, fontFamily: 'Poppins-Medium'
    }

});