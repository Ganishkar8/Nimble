import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Image,
    FlatList,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    BackHandler
} from 'react-native';

//redux
import { connect } from 'react-redux';
import { languageAction } from '../../Utils/redux/actions/languageAction';
import { language } from '../../Utils/LanguageString';
//
import HeadComp from '../../Components/HeadComp';
import MyStatusBar from '../../Components/MyStatusBar';
import Colors from '../../Utils/Colors';
import TextComp from '../../Components/TextComp';
import LinearGradient from 'react-native-linear-gradient';
import ButtonViewComp from '../../Components/ButtonViewComp';
import Commonstyles from '../../Utils/Commonstyles';
import { useIsFocused } from '@react-navigation/native';
import BottomToastModal from '../../Components/BottomToastModal';
import { useFocusEffect } from '@react-navigation/native';
import tbl_loanApplication from '../../Database/Table/tbl_loanApplication';
import tbl_client from '../../Database/Table/tbl_client';


const data = [

    {
        name: 'Profile Short', id: 1, isSelected: true, nesteddata: [
            {
                nestedName: 'Applicant',
                id: 'AA',
                nestedIsSelected: true,
                subDataIsCompleted: true,
                nestedSubdata: [
                    {
                        name: 'Basic Details',
                        id: 'BD',
                        nestedSubDataIsCompleted: true,
                        parent: 'Applicant',
                    },
                    {
                        name: 'KYC Verification Status',
                        id: 'KVS',
                        nestedSubDataIsCompleted: false,
                        parent: 'Applicant'
                    },
                    {
                        name: 'Personal Details',
                        id: 'PD',
                        nestedSubDataIsCompleted: false,
                        parent: 'Applicant'
                    },
                    {
                        name: 'Address Details',
                        id: 'AD',
                        nestedSubDataIsCompleted: false,
                        parent: 'Applicant'
                    }

                ]
            },
            {
                nestedName: 'Co Applicant',
                id: 'CA',
                nestedIsSelected: false,
                subDataIsCompleted: false,
                nestedSubdata: [
                    {
                        name: 'Basic Details',
                        id: 'BD',
                        nestedSubDataIsCompleted: false,
                        parent: 'CApplicant'
                    },
                    {
                        name: 'KYC Verification Status',
                        id: 'KVS',
                        nestedSubDataIsCompleted: false,
                        parent: 'CApplicant'
                    },
                    {
                        name: 'Personal Details',
                        id: 'PD',
                        nestedSubDataIsCompleted: false,
                        parent: 'CApplicant'
                    },
                    {
                        name: 'Address Details',
                        id: 'AD',
                        nestedSubDataIsCompleted: false,
                        parent: 'CApplicant'
                    }

                ]
            }
        ]
    },
    {
        name: 'CB Check', id: 2, isSelected: false, nesteddata: [
            {
                nestedName: 'Applicant CB Data',
                id: 'AA',
                nestedIsSelected: true
            },
            {
                nestedName: 'Co Applicant CB Data',
                id: 'CA',
                nestedIsSelected: false
            }
        ]
    },
    { name: 'Loan', id: 3, isSelected: false },
    { name: 'BRE', id: 4, isSelected: false }
]

const LoanApplicationMain = (props, { navigation }) => {

    const [labels, setLabels] = useState(data);
    const [subData, setSubData] = useState(labels[0].nesteddata);
    const [nestedSubData, setNestedSubData] = useState(labels[0].nesteddata);
    const [refreshFlatlist, setRefreshFlatList] = useState(false);
    const [selectedData, setSelectedData] = useState(labels[0].name);
    const isScreenVisible = useIsFocused();
    const [bottomLeadSheetVisible, setBottomLeadSheetVisible] = useState(false);
    const showLeadBottomSheet = () => {
        if (isMounted) {
            setBottomLeadSheetVisible(true);
            setTimeout(() => { hideLeadBottomSheet() }, 1000);
        }
    };
    const hideLeadBottomSheet = () => setBottomLeadSheetVisible(false);

    const [processSubStageData, setProcessSubStageData] = useState();
    const [processSubStage, setProcessSubStage] = useState(props.mobilecodedetail.processSubStage);

    const [processModuleData, setProcessModuleData] = useState();
    const [processModule, setProcessModule] = useState(props.mobilecodedetail.processModule);

    const [processPageData, setprocessPageData] = useState();
    const [processPage, setprocessPage] = useState(props.mobilecodedetail.processPage);

    const [completedSubStage, setCompletedSubStage] = useState('PRF_SHRT');
    const [completedModule, setCompletedModule] = useState(global.COMPLETEDMODULE);
    const [completedPage, setCompletedPage] = useState(global.COMPLETEDPAGE);
    const [subStageOrder, setsubStageOrder] = useState();
    const [moduleOrder, setModuleOrder] = useState();
    const [pageOrder, setPageOrder] = useState();
    const [isMounted, setIsMounted] = useState(true);
    const [workflowIDLabel, setWorkflowIDLabel] = useState('');

    useEffect(() => {

        props.navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' }, tabBarVisible: false });
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);
        //getProcessSubStage();


        return () => {
            setIsMounted(false);
            props.navigation.getParent()?.setOptions({ tabBarStyle: undefined, tabBarVisible: undefined });
            backHandler.remove();
        }
    }, [props.navigation, isScreenVisible]);

    const handleBackButton = () => {
        onGoBack();
        return true; // Prevent default back button behavior
    };

    useFocusEffect(
        React.useCallback(() => {
            if (props.route.params.fromScreen == 'ConsentScreen') {
                showLeadBottomSheet();
            }
            getWorkFlowID();
            return () => {
                console.log('Screen is blurred');
            };
        }, [])
    );

    const getWorkFlowID = () => {
        tbl_loanApplication.getLoanAppWorkFlowID(global.LOANAPPLICATIONID, 'APPL')
            .then(data => {
                if (global.DEBUG_MODE) console.log('Applicant Data:', data);
                if (data !== undefined && data.length > 0) {
                    getDisplayerOrder(data[0].workflow_id);
                    setWorkflowIDLabel(data[0].workflow_id);
                } else {
                    getDisplayerOrder(props.mobilecodedetail.wfConfig1s[0].wfId);
                    setWorkflowIDLabel(props.mobilecodedetail.wfConfig1s[0].wfId);
                }

            })
            .catch(error => {
                if (global.DEBUG_MODE) console.error('Error fetching Applicant details:', error);
            });
    }

    const getDisplayerOrder = (workFlowID) => {

        workFlowID = parseInt(workFlowID)

        const filteredProcessSubStage = processSubStage.filter((data) => {
            return data.wfId === workFlowID && (data.subStageCode === global.COMPLETEDSUBSTAGE);
        })

        const filteredProcessModule = processModule.filter((data) => {
            return data.wfId === workFlowID && (data.moduleCode === global.COMPLETEDMODULE);
        })

        const filteredProcessPage = processPage.filter((data) => {
            return data.wfId === workFlowID && (data.pageCode === global.COMPLETEDPAGE);
        })

        let moduleOrder = 0;
        let pageOrder = 0;
        if (filteredProcessModule) {
            if (filteredProcessModule.length > 0) {
                moduleOrder = filteredProcessModule[0].displayOrder;
            }
        }
        if (filteredProcessPage) {
            if (filteredProcessPage.length > 0) {
                pageOrder = filteredProcessPage[0].displayOrder;
            }
        }

        setModuleOrder(moduleOrder);
        setPageOrder(pageOrder);
        getProcessSubStage(moduleOrder, pageOrder, workFlowID);

    }

    const nextScreen = () => {
        //props.navigation.navigate('AddressMainList')
        // props.navigation.navigate('ProfileShortBasicDetails')
        findNavigation();
    }

    const findNavigation = async () => {
        let firstIncompleteData = null;

        processModuleData.find((data) => {
            if (firstIncompleteData) { return true; }
            const incompleteNestedSubData = data.nestedSubData.filter((nestedData) => nestedData.nestedSubDataIsCompleted === false);
            if (incompleteNestedSubData.length > 0) {
                firstIncompleteData = { ...data, nestedSubData: incompleteNestedSubData };
            }
            return incompleteNestedSubData.length > 0;
        });
        if (firstIncompleteData.nestedSubData) {
            if (firstIncompleteData.nestedSubData.length > 0) {
                let currentPage = firstIncompleteData.nestedSubData[0];
                if (currentPage.pageCode == 'PRF_SHRT_APLCT_BSC_DTLS') {
                    global.CLIENTTYPE = 'APPL';
                    await getClientID(global.CLIENTTYPE);
                    props.navigation.replace('ProfileShortBasicDetails');
                } else if (currentPage.pageCode == 'PRF_SHRT_APLCT_VRF_STATUS') {
                    global.CLIENTTYPE = 'APPL';
                    await getClientID(global.CLIENTTYPE);
                    props.navigation.replace('ProfileShortKYCVerificationStatus');
                } else if (currentPage.pageCode == 'PRF_SHRT_APLCT_PRSNL_DTLS') {
                    global.CLIENTTYPE = 'APPL';
                    await getClientID('APPL');
                    props.navigation.replace('ProfileShortApplicantDetails');
                } else if (currentPage.pageCode == 'PRF_SHRT_APLCT_ADDRS_DTLS') {
                    global.CLIENTTYPE = 'APPL';
                    await getClientID(global.CLIENTTYPE);
                    props.navigation.replace('AddressMainList');
                } else if (currentPage.pageCode == 'PRF_SHRT_COAPLCT_BSC_DTLS') {
                    global.CLIENTTYPE = 'CO-APPL';
                    await getClientID(global.CLIENTTYPE);
                    props.navigation.replace('ProfileShortBasicDetails');
                } else if (currentPage.pageCode == 'PRF_SHRT_COAPLCT_VRF_STATUS') {
                    global.CLIENTTYPE = 'CO-APPL';
                    await getClientID(global.CLIENTTYPE);
                    props.navigation.replace('ProfileShortKYCVerificationStatus');
                } else if (currentPage.pageCode == 'PRF_SHRT_COAPLCT_PRSNL_DTLS') {
                    global.CLIENTTYPE = 'CO-APPL';
                    await getClientID(global.CLIENTTYPE);
                    props.navigation.replace('ProfileShortApplicantDetails');
                } else if (currentPage.pageCode == 'PRF_SHRT_COAPLCT_ADDRS_DTLS') {
                    global.CLIENTTYPE = 'CO-APPL';
                    await getClientID(global.CLIENTTYPE);
                    props.navigation.replace('AddressMainList');
                } else if (currentPage.pageCode == 'PRF_SHRT_GRNTR_BSC_DTLS') {
                    global.CLIENTTYPE = 'GRNTR';
                    await getClientID(global.CLIENTTYPE);
                    props.navigation.replace('ProfileShortBasicDetails');
                } else if (currentPage.pageCode == 'PRF_SHRT_GRNTR_VRF_STATUS') {
                    global.CLIENTTYPE = 'GRNTR';
                    await getClientID(global.CLIENTTYPE);
                    props.navigation.replace('ProfileShortKYCVerificationStatus');
                } else if (currentPage.pageCode == 'PRF_SHRT_GRNTR_PRSNL_DTLS') {
                    global.CLIENTTYPE = 'GRNTR';
                    await getClientID(global.CLIENTTYPE);
                    props.navigation.replace('ProfileShortApplicantDetails');
                } else if (currentPage.pageCode == 'PRF_SHRT_GRNTR_ADDRS_DTLS') {
                    global.CLIENTTYPE = 'GRNTR';
                    await getClientID(global.CLIENTTYPE);
                    props.navigation.replace('AddressMainList');
                }


            }
        }
        console.log(firstIncompleteData.nestedSubData[0]);

    }

    const getClientID = (clientType) => {
        tbl_client.getOnlyClientBasedOnID(global.LOANAPPLICATIONID, clientType)
            .then(data => {
                if (global.DEBUG_MODE) console.log('Applicant Data:', data);
                if (data !== undefined && data.length > 0) {
                    global.CLIENTID = data[0].id;
                    global.isAadharVerified = data[0].isAadharNumberVerified;
                    return global.CLIENTID;
                } else {
                    global.CLIENTID = '';
                    global.isAadharVerified = '0';
                    global.isDedupeDone = '0';
                    return '';
                }

            })
            .catch(error => {
                if (global.DEBUG_MODE) console.error('Error fetching Applicant details:', error);
            });
    }

    const onClickMainList = (item, substageId) => {

        // if (!(item.subStageCode == 'PRF_SHRT')) {
        //     return;
        // }


        let fiterStatusPosition = processSubStageData
        for (let i = 0; i < fiterStatusPosition.length; i++) {
            if (fiterStatusPosition[i].id == item.id) {
                fiterStatusPosition[i].isSelected = true
                setSelectedData(fiterStatusPosition[i].subStageName)
            } else {
                fiterStatusPosition[i].isSelected = false
            }
        }

        setProcessSubStageData(fiterStatusPosition)

        // const filteredProcessModuleStage = processModule.filter((data) => {
        //     return data.wfId === parseInt(workflowIDLabel) && data.process_sub_stage_id === item.id;
        // }).map((data) => {
        //     const extraJSON = { subDataIsCompleted: true, nestedSubData: [] };
        //     return { ...data, ...extraJSON };
        // }).sort((a, b) => a.displayOrder - b.displayOrder);

        // setProcessModuleData(filteredProcessModuleStage);

        // filteredProcessModuleStage.forEach((data) => {
        //     if (data.wfId === parseInt(workflowIDLabel)) {
        //         processPage.forEach((data1) => {
        //             if (data1.processModuleId === data.id) {
        //                 const extraJSON = { nestedSubDataIsCompleted: true };
        //                 data.nestedSubData.push({ ...data1, ...extraJSON });
        //             }
        //         });
        //         data.nestedSubData.sort((a, b) => a.displayOrder - b.displayOrder);
        //     }
        // });
        // setProcessModuleData(filteredProcessModuleStage);

        const filteredProcessModuleStage = processModule.filter((data) => {
            return data.wfId === parseInt(workflowIDLabel) && data.process_sub_stage_id === item.id;
        }).map((data) => {
            const subDataIsCompleted = data.displayOrder <= moduleOrder;

            const extraJSON = { subDataIsCompleted, nestedSubData: [] };
            return { ...data, ...extraJSON };
        }).sort((a, b) => a.displayOrder - b.displayOrder);

        filteredProcessModuleStage.forEach((data) => {
            if (data.wfId === parseInt(workflowIDLabel)) {
                processPage.forEach((data1) => {
                    if (data1.processModuleId === data.id) {
                        const nestedSubDataIsCompleted = data1.displayOrder <= pageOrder;
                        const extraJSON = { nestedSubDataIsCompleted };
                        data.nestedSubData.push({ ...data1, ...extraJSON });
                    }
                });

                data.nestedSubData.sort((a, b) => a.displayOrder - b.displayOrder);
            }
        });
        setProcessModuleData(filteredProcessModuleStage);

        setRefreshFlatList(!refreshFlatlist)
    }

    const nestedDataClick = async (item) => {

        //if (global.USERTYPEID == 1163) {

        if (item.pageCode == 'PRF_SHRT_APLCT_BSC_DTLS') {
            global.CLIENTTYPE = 'APPL';
            await getClientID(global.CLIENTTYPE);
            props.navigation.replace('ProfileShortBasicDetails');
        } else if (item.pageCode == 'PRF_SHRT_APLCT_VRF_STATUS') {
            global.CLIENTTYPE = 'APPL';
            await getClientID(global.CLIENTTYPE);
            props.navigation.replace('ProfileShortKYCVerificationStatus');
        } else if (item.pageCode == 'PRF_SHRT_APLCT_PRSNL_DTLS') {
            global.CLIENTTYPE = 'APPL';
            await getClientID('APPL');
            props.navigation.replace('ProfileShortApplicantDetails');
        } else if (item.pageCode == 'PRF_SHRT_APLCT_ADDRS_DTLS') {
            global.CLIENTTYPE = 'APPL';
            await getClientID(global.CLIENTTYPE);
            props.navigation.replace('AddressMainList');
        } else if (item.pageCode == 'PRF_SHRT_COAPLCT_BSC_DTLS') {
            global.CLIENTTYPE = 'CO-APPL';
            await getClientID(global.CLIENTTYPE);
            props.navigation.replace('ProfileShortBasicDetails');
        } else if (item.pageCode == 'PRF_SHRT_COAPLCT_VRF_STATUS') {
            global.CLIENTTYPE = 'CO-APPL';
            await getClientID(global.CLIENTTYPE);
            props.navigation.replace('ProfileShortKYCVerificationStatus');
        } else if (item.pageCode == 'PRF_SHRT_COAPLCT_PRSNL_DTLS') {
            global.CLIENTTYPE = 'CO-APPL';
            await getClientID(global.CLIENTTYPE);
            props.navigation.replace('ProfileShortApplicantDetails');
        } else if (item.pageCode == 'PRF_SHRT_COAPLCT_ADDRS_DTLS') {
            global.CLIENTTYPE = 'CO-APPL';
            await getClientID(global.CLIENTTYPE);
            props.navigation.replace('AddressMainList');
        } else if (item.pageCode == 'PRF_SHRT_GRNTR_BSC_DTLS') {
            global.CLIENTTYPE = 'GRNTR';
            await getClientID(global.CLIENTTYPE);
            props.navigation.replace('ProfileShortBasicDetails');
        } else if (item.pageCode == 'PRF_SHRT_GRNTR_VRF_STATUS') {
            global.CLIENTTYPE = 'GRNTR';
            await getClientID(global.CLIENTTYPE);
            props.navigation.replace('ProfileShortKYCVerificationStatus');
        } else if (item.pageCode == 'PRF_SHRT_GRNTR_PRSNL_DTLS') {
            global.CLIENTTYPE = 'GRNTR';
            await getClientID(global.CLIENTTYPE);
            props.navigation.replace('ProfileShortApplicantDetails');
        } else if (item.pageCode == 'PRF_SHRT_GRNTR_ADDRS_DTLS') {
            global.CLIENTTYPE = 'GRNTR';
            await getClientID(global.CLIENTTYPE);
            props.navigation.replace('AddressMainList');
        } else if (item.pageCode == 'DMGRC_APPL_FMLY_DTLS') {
            global.CLIENTTYPE = 'APPL';
            await getClientID(global.CLIENTTYPE);
            props.navigation.replace('FamilyDetailList');
        } else if (item.pageCode == 'DMGRC_APPL_BSN_DTLS') {
            global.CLIENTTYPE = 'APPL';
            await getClientID(global.CLIENTTYPE);
            props.navigation.replace('LoanDemographicBusinessDetail');
        }
        //}

    }


    const getProcessSubStage = async (moduleOrder, pageOrder, workFlowID) => {

        const filteredProcessSubStage = processSubStage.filter((data) => {
            return data.wfId === workFlowID && (data.stageId === 1);
        }).map((data) => {
            const extraJSON = { isSelected: data.subStageCode === 'PRF_SHRT', subStageIsCompleted: false };
            return { ...data, ...extraJSON };
        }).sort((a, b) => a.displayOrder - b.displayOrder);

        setProcessSubStageData(filteredProcessSubStage);

        const filteredProcessModuleStage = processModule.filter((data) => {
            return data.wfId === workFlowID && data.process_sub_stage_id === filteredProcessSubStage[0].id;
        }).map((data) => {
            const subDataIsCompleted = data.displayOrder <= moduleOrder;

            const extraJSON = { subDataIsCompleted, nestedSubData: [] };
            return { ...data, ...extraJSON };
        }).sort((a, b) => a.displayOrder - b.displayOrder);

        filteredProcessModuleStage.forEach((data) => {
            if (data.wfId === workFlowID) {
                processPage.forEach((data1) => {
                    if (data1.processModuleId === data.id) {
                        const nestedSubDataIsCompleted = data1.displayOrder <= pageOrder;
                        const extraJSON = { nestedSubDataIsCompleted };
                        data.nestedSubData.push({ ...data1, ...extraJSON });
                    }
                });

                data.nestedSubData.sort((a, b) => a.displayOrder - b.displayOrder);
            }
        });


        setProcessModuleData(filteredProcessModuleStage);

    }


    const onGoBack = () => {
        if (props.route.params.fromScreen == 'ApplicationTrackerDetails') {
            props.navigation.goBack();
        } else if (props.route.params.fromScreen == 'ConsentScreen') {
            props.navigation.replace('HomeScreen');
        } else {
            props.navigation.replace('HomeScreen');
        }

    }

    return (

        <View style={{ flex: 1, backgroundColor: '#fefefe' }}>
            <MyStatusBar backgroundColor={'white'} barStyle="dark-content" />
            <View style={{ width: '96%', height: 50, alignItems: 'center' }}>
                <HeadComp textval={language[0][props.language].str_loanapplication} props={props} onGoBack={onGoBack} />
            </View>

            <View style={{ width: '100%', height: 80, backgroundColor: Colors.maroon, marginTop: 10, flexDirection: 'row' }}>
                <View style={{ width: '70%', justifyContent: 'center', marginLeft: 14 }}>
                    <TextComp textVal={language[0][props.language].str_applicationNumber + ': ' + global.TEMPAPPID}
                        textStyle={{ color: Colors.black, fontFamily: 'PoppinsRegular', }} />
                    <TextComp textVal={language[0][props.language].str_applicationStatus + ': 98%'}
                        textStyle={{ color: Colors.dimText, fontFamily: 'PoppinsRegular' }} />
                </View>
                <View style={{ width: '30%', justifyContent: 'center' }}>
                    <Image source={require('../../Images/loanappimage.png')}
                        style={{ width: 70, height: 100, resizeMode: 'contain' }} />
                </View>

            </View>

            <BottomToastModal IsVisible={bottomLeadSheetVisible} onClose={hideLeadBottomSheet} textContent={`Temp Loan Application ID: ${global.TEMPAPPID} created successfully`} />

            <View style={{ width: '85%', marginTop: 30, alignSelf: 'center' }}>
                <FlatList
                    extraData={refreshFlatlist}
                    data={processSubStageData}
                    horizontal={true}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity activeOpacity={1} onPress={() => onClickMainList(item, item.id)}>
                                <View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <LinearGradient colors={item.isSelected ? (['#D2FF21', '#FAD420', '#FFCE20']) : (['#ECECEC', '#DBDBDB', '#ECECEC'])} style={{
                                            width: 60, height: 60, backgroundColor: Colors.skyBlue, margin: 4, borderRadius: 30,
                                            alignItems: 'center', justifyContent: 'center'
                                        }}>
                                            <View >
                                                <View style={{ width: 40, height: 40, backgroundColor: Colors.white, borderRadius: 30, alignItems: 'center', justifyContent: 'center' }}>
                                                    {item.stageId == 1 &&
                                                        <Image source={require('../../Images/pro.png')}
                                                            style={{ width: 22, height: 22, resizeMode: 'contain' }} />
                                                    }
                                                    {item.stageId == 2 &&
                                                        <Image source={require('../../Images/file.png')}
                                                            style={{ width: 22, height: 22, resizeMode: 'contain' }} />
                                                    }
                                                    {item.stageId == 3 &&
                                                        <Image source={require('../../Images/bag.png')}
                                                            style={{ width: 22, height: 22, resizeMode: 'contain' }} />
                                                    }
                                                    {item.stageId == 4 &&
                                                        <Image source={require('../../Images/path.png')}
                                                            style={{ width: 22, height: 22, resizeMode: 'contain' }} />
                                                    }
                                                </View>
                                            </View>
                                        </LinearGradient>
                                        {index != processSubStageData.length - 1 ? (
                                            <View style={{ marginTop: 23 }}>
                                                <Text style={{ fontWeight: 700, color: Colors.black }}>- - -</Text>
                                            </View>
                                        ) : null
                                        }
                                    </View>
                                    <View style={{ alignItems: 'center', marginRight: 5 }}>
                                        <TextComp textVal={item.subStageName}
                                            textStyle={{ color: Colors.black, fontFamily: 'PoppinsRegular' }} />
                                    </View>
                                    <View style={{ marginLeft: 5 }}>

                                        {item.isSelected ?
                                            (<View style={{ width: 60, height: 3, backgroundColor: Colors.skyBlue, borderRadius: 20, marginTop: 20 }} />) : null}
                                    </View>
                                </View>
                            </TouchableOpacity>

                        )
                    }}
                />
                <View style={{ width: '100%', height: 4, backgroundColor: Colors.skyblue, marginTop: 1 }} />
            </View>

            <View style={{ width: '100%', marginLeft: 20, marginTop: 15 }}>
                <TextComp textVal={selectedData} textStyle={{ color: Colors.black, fontFamily: 'Poppins-Medium' }} />
            </View>
            <ScrollView showsVerticalScrollIndicator={false}
                contentContainerStyle={{ width: '100%', marginTop: 20, marginLeft: 10, marginBottom: 40 }}>
                <View>
                    <FlatList
                        data={processModuleData}
                        horizontal={false}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => {
                            return (
                                <TouchableOpacity activeOpacity={1} >
                                    <View>
                                        <View style={{ flexDirection: 'row' }}>
                                            <View style={{
                                                width: 25, height: 25, backgroundColor: item.subDataIsCompleted ? Colors.green : Colors.dimText, borderRadius: 15, margin: 10,
                                                alignItems: 'center', justifyContent: 'center'
                                            }}>
                                                <TextComp textVal={index + 1} textStyle={{ color: Colors.white, fontWeight: 500, marginLeft: 2 }} />
                                            </View>
                                            <View style={{ width: '60%', borderWidth: 0.5, borderColor: Colors.dimText, margin: 5, borderRadius: 20, alignItems: 'center', justifyContent: 'center' }}>
                                                <TextComp textVal={item.moduleDescription} textStyle={{ color: item.subDataIsCompleted ? Colors.skyBlue : Colors.dimText, fontFamily: 'Poppins-Medium', marginLeft: 2 }} />
                                            </View>
                                        </View>
                                        {item.nestedSubData ? (
                                            <View style={{ width: 1, height: 30, backgroundColor: item.subDataIsCompleted ? Colors.green : Colors.dimText, marginLeft: 23 }} />
                                        ) : null
                                        }
                                        {/* <View style={{ width: 1, height: 30, backgroundColor: Colors.green, marginLeft: 23 }} /> */}

                                        <FlatList
                                            data={item.nestedSubData}
                                            keyExtractor={(item, index) => index.toString()}
                                            renderItem={({ item, index }) => {
                                                return (
                                                    <TouchableOpacity activeOpacity={0.8} onPress={() => nestedDataClick(item)}>
                                                        <View>
                                                            <View style={{ flexDirection: 'row' }}>
                                                                <View style={{
                                                                    width: 10, height: 10, backgroundColor: item.nestedSubDataIsCompleted ? Colors.green : Colors.dimText, borderRadius: 15, margin: 10,
                                                                    alignItems: 'center', justifyContent: 'center', marginLeft: 18
                                                                }}>

                                                                </View>
                                                                <View style={{ width: '60%', margin: 5, borderRadius: 20, justifyContent: 'center' }}>
                                                                    <TextComp textVal={item.pageName} textStyle={{ color: item.nestedSubDataIsCompleted ? Colors.skyBlue : Colors.dimText, fontFamily: 'Poppins-Medium', marginLeft: 2 }} />
                                                                </View>
                                                            </View>
                                                            {/* {index != subData.length - 1 ? (
                                                            <View style={{ width: 1, height: 30, backgroundColor: Colors.green, marginLeft: 23 }} />
                                                        ) : null
                                                        } */}
                                                            <View style={{ width: 1, height: 30, backgroundColor: item.nestedSubDataIsCompleted ? Colors.green : Colors.dimText, marginLeft: 23 }} />

                                                        </View>
                                                    </TouchableOpacity>

                                                )
                                            }}
                                        />

                                    </View>
                                </TouchableOpacity>

                            )
                        }}
                    />
                </View>
            </ScrollView>
            {global.USERTYPEID == 1164 && <ButtonViewComp textValue={language[0][props.language].str_editprofileshort.toUpperCase()} textStyle={{ color: Colors.white, fontSize: 13, fontWeight: 500 }} viewStyle={[Commonstyles.buttonView, { marginBottom: 10 }]} innerStyle={Commonstyles.buttonViewInnerStyle} handleClick={nextScreen} />}
        </View>

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
export default connect(mapStateToProps, mapDispatchToProps)(LoanApplicationMain);


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#f5f8fa',
        alignItems: 'center'
    },

});