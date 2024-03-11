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
import React, { useState, useRef, useEffect } from 'react';
import MyStatusBar from '../../Components/MyStatusBar';
import HeadComp from '../../Components/HeadComp';
import { connect } from 'react-redux';
import { languageAction } from '../../Utils/redux/actions/languageAction';
import { language } from '../../Utils/LanguageString';
import Loading from '../../Components/Loading';
import ChildHeadComp from '../../Components/ChildHeadComp';
import ProgressComp from '../../Components/ProgressComp';
import Entypo from 'react-native-vector-icons/Entypo';
import Colors from '../../Utils/Colors';
import Commonstyles from '../../Utils/Commonstyles';
import IconButtonViewComp from '../../Components/IconButtonViewComp';
import { useIsFocused } from '@react-navigation/native';
import TextComp from '../../Components/TextComp';
import ImageComp from '../../Components/ImageComp';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Common from '../../Utils/Common';
import apiInstance from '../../Utils/apiInstance';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { addPdDetails, deleteTravelDetails } from '../../Utils/redux/actions/PersonalDiscussionAction';
import { addPDStages } from '../../Utils/redux/actions/PDAction';
import ButtonViewComp from '../../Components/ButtonViewComp';


const PdMainScreen = (props, { navigation }) => {
    const [loading, setLoading] = useState(false);
    const [showAllData, setShowAllData] = useState(false);
    const isScreenVisible = useIsFocused();
    const [listData, setListData] = useState(props.route.params.PDData)
    const [clientData, setClientData] = useState([]);
    const [pdStageData, setPDStageData] = useState([]);
    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [apiError, setApiError] = useState('');
    const [allCompleted, setAllCompleted] = useState(false);
    const [psDtatusData, setPDStatusData] = useState(false);
    const [grntrClientID, setGrntrClientID] = useState('');

    useEffect(() => {
        props.navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' }, tabBarVisible: false });
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);

        return () => {
            props.navigation.getParent()?.setOptions({ tabBarStyle: undefined, tabBarVisible: undefined });
            backHandler.remove();
        }
    }, [props.navigation, isScreenVisible]);

    useFocusEffect(
        React.useCallback(() => {

            getClientData();

            return () => {
                console.log('Screen is blurred');
            };
        }, [])
    );


    const handleBackButton = () => {
        onGoBack();
        return true; // Prevent default back button behavior
    };

    const onGoBack = () => {
        props.navigation.goBack();
    }

    const getClientData = () => {

        const baseURL = '8901'
        setLoading(true)


        apiInstance(baseURL).post(`/api/v1/pd/PDMaster/findByLoanApplicationId/${global.LOANAPPLICATIONID}`)
            .then((response) => {
                // Handle the response data
                if (global.DEBUG_MODE) console.log("ResponseDataApi::" + JSON.stringify(response.data));

                if (response.status == 200) {
                    //setClientData(response.data)
                    getClientSubStageData(response.data);
                    if (response.data) {
                        const guarantorDetail = response.data.filter(item => item.clientType == 'GRNTR')
                        if (guarantorDetail) {
                            setGrntrClientID(guarantorDetail[0]?.clientId)
                        }
                    }
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


    const getClientSubStageData = (clientData) => {

        const baseURL = global.PORT1;
        setLoading(true)

        const appDetails = {
            "createdBy": global.USERID,
            "loanApplicationId": global.LOANAPPLICATIONID,
            "subCode": global.PDSTAGE //props.route.params.PDData.subStage
        }

        apiInstance(baseURL).post(`/api/v2/PD/Update/PD_WORKFLOW/createWorkFlow`, appDetails)
            .then((response) => {
                // Handle the response data
                if (global.DEBUG_MODE) console.log("ResponseDataApi::" + JSON.stringify(response.data));

                if (response.status == 200) {

                    // setClientData(response.data.personalDiscussionSubStageLogs)
                    response.data[0].personalDiscussionSubStageLogs.forEach((data) => {
                        clientData = clientData.map((data1) => {
                            var clientType = '';
                            if (data1.clientType == 'APPL') {
                                clientType = 'PD_APPL'
                            } else if (data1.clientType == 'CO-APPL') {
                                clientType = 'PD_CO_APPL'
                            } else if (data1.clientType == 'GRNTR') {
                                clientType = 'PD_GRNTR'
                            }
                            if (clientType === data.subStageCode) {
                                return {
                                    ...data1,
                                    subStageStatus: data.subStageStatus
                                };
                            }
                            return data1;
                        });
                    });
                    const allSubStageCompleted = clientData.every((data1) => {
                        // Check if subStageStatus is completed for each item in clientData
                        return data1.subStageStatus === 'Completed';
                    });
                    if (allSubStageCompleted) {
                        setAllCompleted(true);
                    }
                    setClientData(clientData);
                    props.addPDStages(response.data);

                    setPDStatusData(response.data)

                    setLoading(false)
                }
                else if (response.data.statusCode === 201) {
                    setApiError(response.data.message);
                    setErrorModalVisible(true);
                    setLoading(false)
                } else if (response.data.statusCode === 202) {
                    setApiError(response.data.message);
                    setErrorModalVisible(true);
                    setLoading(false)
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

    const getClientWisePDData = (item) => {

        const baseURL = '8901'
        setLoading(true)

        const appDetails = {
            "clintId": item.clientId,
            "userId": global.USERID,
            "pdLevel": global.PDSTAGE
        }

        apiInstance(baseURL).post(`/api/v1/pd/PDMaster/findByClientId?clintId`, appDetails)
            .then((response) => {
                // Handle the response data ${item.clientId}
                if (global.DEBUG_MODE) console.log("PDDataApi::" + JSON.stringify(response.data));

                if (response.status == 200) {
                    if (!Common.isEmptyObject(response.data)) {
                        response.data.loanApplicationId = global.LOANAPPLICATIONID;
                        props.deleteTravelDetails(global.LOANAPPLICATIONID)
                        props.addPdDetails(response.data);
                        setLoading(false)
                        props.navigation.navigate('PDItems', { clientType: item.clientType });
                    } else {
                        setLoading(false)
                        props.navigation.navigate('PDItems', { clientType: item.clientType });
                    }
                }
                else if (response.data.statusCode === 201) {
                    setLoading(false)
                    setApiError(response.data.message);
                    setErrorModalVisible(true);
                    setLoading(false)
                } else if (response.data.statusCode === 202) {
                    setLoading(false)
                    setApiError(response.data.message);
                    setErrorModalVisible(true);
                    setLoading(false)
                }


            })
            .catch((error) => {
                // Handle the error
                setLoading(false)

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
                if (global.DEBUG_MODE) console.log("PDDataApiError::" + JSON.stringify(error.response.data));
            });
    }

    const buttonNext = (status) => {
        updateLoanStatus(status);
    }

    const updateLoanStatus = (status) => {

        const appDetails = {
            loanApplicationId: global.LOANAPPLICATIONID,
            loanWorkflowStage: 'PD',
            subStageCode: global.PDSTAGE,
            status: status,
        };
        const baseURL = global.PORT1;
        setLoading(true);
        apiInstance(baseURL)
            .post(`/api/v2/loan-application-status/updateStatus`, appDetails)
            .then(async response => {
                // Handle the response data
                if (global.DEBUG_MODE)
                    console.log(
                        'UpdateStatusApiResponse::' + JSON.stringify(response.data),
                    );
                setLoading(false);
                if (response.status == 200) {
                    props.navigation.replace('PDTracker', { fromScreen: 'PDMainscreen' })
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


    const getNonGSTStatus = () => {
        const filteredModule = psDtatusData[0].personalDiscussionSubStageLogs
            .filter(data => data.subStageCode === global.PDSUBSTAGE)[0]
            .personalDiscussionModuleLogs
            .filter(data => data.moduleCode === 'NON_GST_CST_APPL')[0]

        if (filteredModule.moduleStatus.toUpperCase() !== 'COMPLETED') {
            updatePdStatus();
        } else {
            props.navigation.navigate('PDItems', { clientType: global.CLIENTTYPE });
        }

        //alert(JSON.stringify(filteredModule.moduleStatus))

    }

    const updatePdStatus = () => {


        const appDetails = {
            "loanApplicationId": global.LOANAPPLICATIONID,
            "loanWorkflowStage": global.PDSTAGE,
            "subStageCode": global.PDSUBSTAGE,
            "moduleCode": 'NON_GST_CST_APPL',
            "subModule": 'NON_GST_CST_APPL',
            "pageCode": 'PG_NON_GST_CST_APPL',
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
                    props.navigation.navigate('PDItems', { clientType: global.CLIENTTYPE });
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



    const listView = ({ item }) => {

        var bg = ''; clientTypeName = ''
        if (item.clientType == 'APPL') {
            bg = Colors.dimPink
            clientTypeName = 'Applicant';
        } else if (item.clientType == 'CO-APPL') {
            bg = Colors.dimblue
            clientTypeName = 'Co-Applicant';
        } else if (item.clientType == 'GRNTR') {
            bg = Colors.dimSkyBlue
            clientTypeName = 'Guarantor';
        }

        return (
            <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 15 }}>

                <TouchableOpacity activeOpacity={0.8} onPress={() => {

                    global.CLIENTTYPE = item.clientType;
                    global.CLIENTID = item.clientId;
                    if (item.clientType == 'APPL') {
                        global.PDSUBSTAGE = 'PD_APPL';
                        if (global.PDTRACKERDATA.nonGst) {
                            props.navigation.navigate('PDItems', { clientType: item.clientType });
                        } else {
                            getNonGSTStatus();
                        }
                    } else if (item.clientType == 'CO-APPL') {
                        global.PDSUBSTAGE = 'PD_CO_APPL';
                        props.navigation.navigate('PDItems', { clientType: item.clientType });
                    } else if (item.clientType == 'GRNTR') {
                        global.PDSUBSTAGE = 'PD_GRNTR';
                        props.navigation.navigate('PDItems', { clientType: item.clientType });
                    }


                    //getClientWisePDData(item);
                    // getClientSubStageData()
                    //props.navigation.navigate('PDItems', { clientType: item.clientType });

                }} style={{
                    width: '90%', height: 120, borderColor: '#BBBBBB4D', borderWidth: 1, borderRadius: 10,
                    alignItems: 'center', justifyContent: 'center'
                }}>
                    {item.subStageStatus === 'Completed' &&
                        <View style={{ position: 'absolute', top: 10, bottom: 0, right: 10, alignSelf: 'flex-end' }}>
                            <AntDesign name="checkcircle" size={18} color={Colors.green} />
                        </View>
                    }
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ width: 50, height: 50, backgroundColor: bg, borderRadius: 25, justifyContent: 'center', alignItems: 'center' }}>
                            <ImageComp imageSrc={require('../../Images/applicantimage.png')} imageStylee={{ width: 30, height: 30, resizeMode: 'contain' }} />
                        </View>

                        <TextComp
                            textStyle={{
                                color: Colors.mediumgrey,
                                fontSize: 15,
                                fontFamily: 'Poppins-Medium'
                            }}
                            textVal={
                                clientTypeName
                            }></TextComp>
                    </View>
                </TouchableOpacity>

            </View>

        )
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>

            {loading ? <Loading /> : null}
            <MyStatusBar backgroundColor={'white'} barStyle="dark-content" />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View>

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

                    <View style={{ width: '100%', alignItems: 'center', marginTop: '3%' }}>
                        <View style={{ width: '90%', marginTop: 3 }}>
                            <TextComp
                                textStyle={{
                                    color: Colors.darkblack,
                                    fontSize: 15,
                                    fontFamily: 'Poppins-Medium'
                                }}
                                textVal={
                                    listData.subStageName
                                }></TextComp>
                        </View>
                    </View>

                    <View>
                        <FlatList
                            data={clientData}
                            renderItem={listView}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={(item, index) => index.toString()} />

                    </View>

                    <View style={{ width: '100%', alignItems: 'center', }}>
                        <View
                            style={{
                                width: '100%',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginTop: 20,
                            }}>

                            <TouchableOpacity activeOpacity={0.5} style={{ width: '100%', marginTop: '8%', alignItems: 'center' }}
                                onPress={() => {
                                    if (showAllData) {
                                        setShowAllData(false)
                                    } else {
                                        setShowAllData(true)
                                    }
                                }}>
                                <View style={{ flexDirection: 'row' }}>

                                    <View style={{ width: '52%', justifyContent: 'center' }}>
                                        <Text style={styles.textStyle}>{language[0][props.language].str_loandetails}</Text>
                                    </View>

                                    <View style={{ width: '30%' }}></View>
                                    {showAllData ?
                                        <Entypo name='chevron-up' size={23} color={Colors.black} /> :
                                        <Entypo name='chevron-down' size={23} color={Colors.black} />
                                    }

                                </View>
                                {/* <View style={{ width: '90%', height: .9, backgroundColor: Colors.line, marginTop: 13 }} /> */}
                            </TouchableOpacity>

                        </View>
                    </View>

                    {showAllData ?
                        <View>
                            <View style={{ width: '100%', marginTop: 20, marginLeft: 23 }}>
                                <TextComp
                                    textStyle={{
                                        color: Colors.lightgrey,
                                        fontSize: 15,
                                        fontFamily: 'Poppins-Medium'
                                    }}
                                    textVal={language[0][props.language].str_customercatg}></TextComp>
                                <TextComp
                                    textStyle={{
                                        color: Colors.black,
                                        fontSize: 15,
                                        fontFamily: 'Poppins-Medium'
                                    }}
                                    textVal={
                                        listData.customerCategory
                                    } />
                            </View>


                            <View style={{ width: '100%', marginTop: 20, marginLeft: 23 }}>
                                <TextComp
                                    textStyle={{
                                        color: Colors.lightgrey,
                                        fontSize: 15,
                                        fontFamily: 'Poppins-Medium'
                                    }}
                                    textVal={language[0][props.language].str_customertype} />
                                <TextComp
                                    textStyle={{
                                        color: Colors.black,
                                        fontSize: 15,
                                        fontFamily: 'Poppins-Medium'
                                    }}
                                    textVal={
                                        listData.customerType
                                    } />
                            </View>

                            <View style={{ width: '100%', marginTop: 20, marginLeft: 23 }}>
                                <TextComp
                                    textStyle={{
                                        color: Colors.lightgrey,
                                        fontSize: 15,
                                        fontFamily: 'Poppins-Medium'
                                    }}
                                    textVal={language[0][props.language].str_loanamount}></TextComp>
                                <TextComp
                                    textStyle={{
                                        color: Colors.black,
                                        fontSize: 15,
                                        fontFamily: 'Poppins-Medium'
                                    }}
                                    textVal={
                                        listData.amount.toString()
                                    } />
                            </View>

                            <View style={{ width: '100%', marginTop: 20, marginLeft: 23 }}>
                                <TextComp
                                    textStyle={{
                                        color: Colors.lightgrey,
                                        fontSize: 15,
                                        fontFamily: 'Poppins-Medium'
                                    }}
                                    textVal={language[0][props.language].str_loantype}></TextComp>
                                <TextComp
                                    textStyle={{
                                        color: Colors.black,
                                        fontSize: 15,
                                        fontFamily: 'Poppins-Medium'
                                    }}
                                    textVal={
                                        listData.loanType
                                    } />
                            </View>

                            <View style={{ width: '100%', marginTop: 20, marginLeft: 23 }}>
                                <TextComp
                                    textStyle={{
                                        color: Colors.lightgrey,
                                        fontSize: 15,
                                        fontFamily: 'Poppins-Medium'
                                    }}
                                    textVal={language[0][props.language].str_productId}></TextComp>
                                <TextComp
                                    textStyle={{
                                        color: Colors.black,
                                        fontSize: 15,
                                        fontFamily: 'Poppins-Medium'
                                    }}
                                    textVal={
                                        listData.product
                                    } />
                            </View>

                            <View style={{ width: '100%', marginTop: 20, marginLeft: 23 }}>
                                <TextComp
                                    textStyle={{
                                        color: Colors.lightgrey,
                                        fontSize: 15,
                                        fontFamily: 'Poppins-Medium'
                                    }}
                                    textVal={language[0][props.language].str_laonappid}></TextComp>
                                <TextComp
                                    textStyle={{
                                        color: Colors.black,
                                        fontSize: 15,
                                        fontFamily: 'Poppins-Medium'
                                    }}
                                    textVal={
                                        listData.loanApplicationNumber
                                    } />
                            </View>

                            <View style={{ width: '100%', marginTop: 20, marginLeft: 23 }}>
                                <TextComp
                                    textStyle={{
                                        color: Colors.lightgrey,
                                        fontSize: 15,
                                        fontFamily: 'Poppins-Medium'
                                    }}
                                    textVal={language[0][props.language].str_laonappdate}></TextComp>
                                <TextComp
                                    textStyle={{
                                        color: Colors.black,
                                        fontSize: 15,
                                        fontFamily: 'Poppins-Medium'
                                    }}
                                    textVal={
                                        Common.formatDate(listData.creationDate)
                                    } />
                            </View>

                            <View style={{ width: '100%', marginTop: 20, marginLeft: 23 }}>
                                <TextComp
                                    textStyle={{
                                        color: Colors.lightgrey,
                                        fontSize: 15,
                                        fontFamily: 'Poppins-Medium'
                                    }}
                                    textVal={language[0][props.language].str_loanpurposecategory}></TextComp>
                                <TextComp
                                    textStyle={{
                                        color: Colors.black,
                                        fontSize: 15,
                                        fontFamily: 'Poppins-Medium'
                                    }}
                                    textVal={
                                        listData.loanPurpose
                                    } />
                            </View>

                            <View style={{ width: '100%', marginTop: 20, marginLeft: 23 }}>
                                <TextComp
                                    textStyle={{
                                        color: Colors.lightgrey,
                                        fontSize: 15,
                                        fontFamily: 'Poppins-Medium'
                                    }}
                                    textVal={language[0][props.language].str_workflowstageId}></TextComp>
                                <TextComp
                                    textStyle={{
                                        color: Colors.black,
                                        fontSize: 15,
                                        fontFamily: 'Poppins-Medium'
                                    }}
                                    textVal={
                                        listData.workFlowName
                                    } />
                            </View>
                        </View>
                        : null}

                    {global.PDSTAGE != 'PD_1' &&
                        <View style={{ flexDirection: 'column' }}>
                            <TouchableOpacity activeOpacity={0.5} style={{ width: '100%', marginTop: '8%', alignItems: 'center' }}
                                onPress={() => { props.navigation.navigate('PDFoir', { header: language[0][props.language].str_combinedfoir, clientId: '' }) }}>
                                <View style={{ flexDirection: 'row' }}>

                                    <View style={{ width: '52%', justifyContent: 'center' }}>
                                        <Text style={styles.textStyle}>{language[0][props.language].str_combinedfoir}</Text>
                                    </View>

                                    <View style={{ width: '30%' }}></View>
                                    <Entypo name='chevron-right' size={23} color={Colors.darkblack} />

                                </View>
                                {/* <View style={{ width: '90%', height: .9, backgroundColor: Colors.line, marginTop: 13 }} /> */}
                            </TouchableOpacity>

                            {grntrClientID &&

                                <TouchableOpacity activeOpacity={0.5} style={{ width: '100%', marginTop: '8%', alignItems: 'center', marginBottom: 20 }}
                                    onPress={() => { props.navigation.navigate('PDFoir', { header: language[0][props.language].str_individualfoir, clientId: grntrClientID }) }}>
                                    <View style={{ flexDirection: 'row' }}>

                                        <View style={{ width: '52%', justifyContent: 'center' }}>
                                            <Text style={styles.textStyle}>{language[0][props.language].str_individualfoir}</Text>
                                        </View>

                                        <View style={{ width: '30%' }}></View>
                                        <Entypo name='chevron-right' size={23} color={Colors.darkblack} />

                                    </View>
                                    {/* <View style={{ width: '90%', height: .9, backgroundColor: Colors.line, marginTop: 13 }} /> */}
                                </TouchableOpacity>
                            }

                        </View>
                    }

                    {!showAllData && allCompleted &&
                        <ButtonViewComp
                            textValue={language[0][props.language].str_submit.toUpperCase()}
                            textStyle={{ color: Colors.white, fontSize: 13, fontWeight: 500 }}
                            viewStyle={[Commonstyles.buttonView, { marginBottom: 20 }]}
                            innerStyle={Commonstyles.buttonViewInnerStyle}
                            handleClick={() => { buttonNext('Completed') }}
                        />
                    }

                    {!showAllData && !allCompleted && !(global.PDSTAGE == 'PD_1') && (props.route.params.PDData.status != 'Rejected') &&
                        <ButtonViewComp
                            textValue={language[0][props.language].str_reject.toUpperCase()}
                            textStyle={{ color: Colors.white, fontSize: 13, fontWeight: 500 }}
                            viewStyle={[Commonstyles.buttonView, { marginBottom: 20 }]}
                            innerStyle={Commonstyles.buttonViewInnerStyle}
                            handleClick={() => { buttonNext('Rejected') }}
                        />
                    }

                    {/* <View style={{ width: '100%', alignItems: 'center', marginTop: '3%', justifyContent: 'center', marginBottom: 5 }}>
                <View style={{ width: '90%', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{
                        width: '45%', height: 45, backgroundColor: Colors.darkblue,
                        alignItems: 'center', borderRadius: 25, justifyContent: 'center'
                    }}>
                        <TextComp
                            textStyle={{
                                color: Colors.white,
                                fontSize: 15,
                                fontFamily: 'Poppins-Medium'
                            }}
                            textVal={language[0][props.language].str_approve}></TextComp>
                    </View>
                    <View style={{
                        width: '45%', height: 45, backgroundColor: Colors.darkblue,
                        alignItems: 'center', borderRadius: 25, justifyContent: 'center'
                    }}>
                        <TextComp
                            textStyle={{
                                color: Colors.white,
                                fontSize: 15,
                                fontFamily: 'Poppins-Medium'
                            }}
                            textVal={language[0][props.language].str_reject}></TextComp>
                    </View>
                </View>
            </View> */}

                </View>
            </ScrollView>


        </SafeAreaView >
    );
};

const mapStateToProps = state => {
    const { language } = state.languageReducer;
    const { profileDetails } = state.profileReducer;
    const { mobileCodeDetails } = state.mobilecodeReducer;
    const { pdDetails } = state.personalDiscussionReducer;
    return {
        language: language,
        profiledetail: profileDetails,
        pdDetail: pdDetails,
        mobilecodedetail: mobileCodeDetails
    }
};

const mapDispatchToProps = dispatch => ({
    languageAction: item => dispatch(languageAction(item)),
    addPdDetails: item => dispatch(addPdDetails(item)),
    deleteTravelDetails: item => dispatch(deleteTravelDetails(item)),
    addPDStages: item => dispatch(addPDStages(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PdMainScreen);


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
        width: '100%',
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
        width: 90, borderColor: Colors.pendingBorder, backgroundColor: Colors.pendingBg, alignItems: 'center', padding: 3, borderRadius: 15, borderWidth: 1, marginRight: 10
    },
    approvedbackground: {
        width: 90, borderColor: Colors.approvedBorder, backgroundColor: Colors.approvedBg, alignItems: 'center', padding: 3, borderRadius: 15, borderWidth: 1, marginRight: 10
    },
    rejectedbackground: {
        width: 90, borderColor: Colors.rejectedBorder, backgroundColor: Colors.rejectedBg, alignItems: 'center', padding: 3, borderRadius: 15, borderWidth: 1, marginRight: 10
    },
    draftbackground: {
        width: 90, borderColor: Colors.lightgrey, backgroundColor: '#f2f2f2', alignItems: 'center', padding: 3, borderRadius: 15, borderWidth: 1, marginRight: 10
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
    headText: {
        color: Colors.dimText, fontSize: 12, marginLeft: 10, fontFamily: 'PoppinsRegular'
    },
    childText: {
        color: Colors.black, fontSize: 12, marginLeft: 10, fontFamily: 'Poppins-Medium'
    },
    textStyle: {
        fontSize: 16, color: Colors.mediumgrey, marginTop: 5, fontFamily: 'PoppinsRegular'
    }

});
