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
import Common from '../../Utils/Common';
import apiInstance from '../../Utils/apiInstance';


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

    const [completedSubStage, setCompletedSubStage] = useState(global.COMPLETEDSUBSTAGE);
    const [completedModule, setCompletedModule] = useState(global.COMPLETEDMODULE);
    const [completedPage, setCompletedPage] = useState(global.COMPLETEDPAGE);
    const [subStageOrder, setsubStageOrder] = useState();
    const [moduleOrder, setModuleOrder] = useState();
    const [pageOrder, setPageOrder] = useState();
    const [isMounted, setIsMounted] = useState(true);
    const [workflowIDLabel, setWorkflowIDLabel] = useState('');
    const [buttonText, setButtonText] = useState('');
    const [cbCheckStatus, setCbCheckStatus] = useState('');
    const [cbBreCheckStatus, setBreCbCheckStatus] = useState('');
    const [currentStage, setCurrentStage] = useState('');
    const [loading, setLoading] = useState(false);
    const [isLoanCompleted, setIsLoanCompleted] = useState(false);
    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [apiError, setApiError] = useState('');

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
            getCurrentStatus();

            return () => {
                console.log('Screen is blurred');
            };
        }, [])
    );


    const getCurrentStatus = () => {

        const baseURL = global.PORT1;;
        setLoading(true);
        apiInstance(baseURL)
            .get(`api/v2/current-status/${global.LOANAPPLICATIONID}`)
            .then(async response => {
                // Handle the response data
                if (global.DEBUG_MODE) console.log('CBCheckApiResponse::' + JSON.stringify(response.data),);
                setLoading(false);
                if (response.status == 200) {

                    const filterLNAPP = response.data.loanApplicationStatus.filter((data) => data.loanWorkflowStage === 'LN_APP_INITIATION');
                    const filterSubStage = filterLNAPP[0].subStageLog.filter((data) => data.subStageCode === 'CB_CHK');
                    const filtermodule = filterSubStage[0].moduleLog.filter((data) => data.moduleCode === 'CB_BRE_DCSN');
                    const filterPage = filtermodule[0].pageLog.filter((data) => data.pageCode === 'CB_CHK_BRE_DCSN');
                    if (response.data.pageCode == 'CB_CHK_BRE_DCSN') {
                        global.COMPLETEDMODULE = 'CB_RSPNS';
                        global.COMPLETEDPAGE = 'CB_CHK_CB_RSPNS';
                    }
                    if (filterPage) {
                        setBreCbCheckStatus(filterPage[0].pageStatus);
                    }
                    const filterLoan = filterLNAPP[0].subStageLog.filter((data) => data.subStageCode === 'LN_DEMGRP');
                    if (filterLoan[0].subStageStatus == 'Completed') {
                        setIsLoanCompleted(true);
                    }
                    setCbCheckStatus(filterSubStage[0].subStageStatus)
                    getWorkFlowID();
                } else if (response.data.statusCode === 201) {
                    setApiError(response.data.message);
                    setErrorModalVisible(true);
                    getWorkFlowID();
                } else if (response.data.statusCode === 202) {
                    setApiError(response.data.message);
                    setErrorModalVisible(true);
                    getWorkFlowID();
                }
            })
            .catch(error => {
                // Handle the error
                if (global.DEBUG_MODE) console.log('CBCheckApiResponse' + JSON.stringify(error.response));
                setLoading(false);
                getWorkFlowID();
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

    const getWorkFlowID = () => {
        alert(JSON.stringify(props.mobilecodedetail.wfConfig1s[0].wfId))
        tbl_loanApplication.getLoanAppWorkFlowID(global.LOANAPPLICATIONID, 'APPL')
            .then(data => {
                if (global.DEBUG_MODE) console.log('Loan Application Data:', data);
                if (data !== undefined && data.length > 0) {
                    if (data[0].workflow_id.toString().length > 0) {
                        getDisplayerOrder(data[0].workflow_id);
                        setWorkflowIDLabel(data[0].workflow_id);
                    } else {
                        getDisplayerOrder(props.mobilecodedetail.wfConfig1s[0].wfId);
                        setWorkflowIDLabel(props.mobilecodedetail.wfConfig1s[0].wfId);
                    }

                } else {

                    getDisplayerOrder(props.mobilecodedetail.wfConfig1s[0].wfId);
                    //getDisplayerOrder(126);
                    setWorkflowIDLabel(props.mobilecodedetail.wfConfig1s[0].wfId);
                    //setWorkflowIDLabel(126);
                }

            })
            .catch(error => {
                if (global.DEBUG_MODE) console.error('Error fetching Loan Applicant details:', error);
            });
    }

    const getDisplayerOrder = (workFlowID) => {

        workFlowID = parseInt(workFlowID)

        var substage = global.COMPLETEDSUBSTAGE;
        var stageId = 1;
        let subStageOrder = 0;
        if (substage.length <= 0) {
            substage = 'PRF_SHRT';
            setCurrentStage('PRF_SHRT')
            global.COMPLETEDSUBSTAGE = 'PRF_SHRT';
        } else {
            setCurrentStage(substage)
        }

        const filteredProcessSubStage = processSubStage.filter((data) => {
            return data.wfId === workFlowID && (data.subStageCode === substage);
        })

        if (filteredProcessSubStage.length > 0) {
            stageId = filteredProcessSubStage[0].stageId;
            subStageOrder = filteredProcessSubStage[0].displayOrder;
        }

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
        getProcessSubStage(stageId, subStageOrder, moduleOrder, pageOrder, workFlowID);


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
                    global.isMobileVerified = '0';
                    global.CURRENTPAGEID = currentPage.pageId;
                    await getClientID(global.CLIENTTYPE);
                    props.navigation.replace('ProfileShortBasicDetails');
                } else if (currentPage.pageCode == 'PRF_SHRT_APLCT_VRF_STATUS') {
                    global.CLIENTTYPE = 'APPL';
                    global.CURRENTPAGEID = currentPage.pageId;
                    await getClientID(global.CLIENTTYPE);
                    props.navigation.replace('ProfileShortKYCVerificationStatus');
                } else if (currentPage.pageCode == 'PRF_SHRT_APLCT_PRSNL_DTLS') {
                    global.CLIENTTYPE = 'APPL';
                    global.CURRENTPAGEID = currentPage.pageId;
                    await getClientID('APPL');
                    props.navigation.replace('ProfileShortApplicantDetails');
                } else if (currentPage.pageCode == 'PRF_SHRT_APLCT_ADDRS_DTLS') {
                    global.CLIENTTYPE = 'APPL';
                    global.CURRENTPAGEID = currentPage.pageId;
                    await getClientID(global.CLIENTTYPE);
                    props.navigation.replace('AddressMainList');
                } else if (currentPage.pageCode == 'PRF_SHRT_COAPLCT_BSC_DTLS') {
                    global.CLIENTTYPE = 'CO-APPL';
                    global.CURRENTPAGEID = currentPage.pageId;
                    await getClientID(global.CLIENTTYPE);
                    props.navigation.replace('ProfileShortBasicDetails');
                } else if (currentPage.pageCode == 'PRF_SHRT_COAPLCT_VRF_STATUS') {
                    global.CLIENTTYPE = 'CO-APPL';
                    global.CURRENTPAGEID = currentPage.pageId;
                    await getClientID(global.CLIENTTYPE);
                    props.navigation.replace('ProfileShortKYCVerificationStatus');
                } else if (currentPage.pageCode == 'PRF_SHRT_COAPLCT_PRSNL_DTLS') {
                    global.CLIENTTYPE = 'CO-APPL';
                    global.CURRENTPAGEID = currentPage.pageId;
                    await getClientID(global.CLIENTTYPE);
                    props.navigation.replace('ProfileShortApplicantDetails');
                } else if (currentPage.pageCode == 'PRF_SHRT_COAPLCT_ADDRS_DTLS') {
                    global.CLIENTTYPE = 'CO-APPL';
                    global.CURRENTPAGEID = currentPage.pageId;
                    await getClientID(global.CLIENTTYPE);
                    props.navigation.replace('AddressMainList');
                } else if (currentPage.pageCode == 'PRF_SHRT_GRNTR_BSC_DTLS') {
                    global.CLIENTTYPE = 'GRNTR';
                    global.CURRENTPAGEID = currentPage.pageId;
                    await getClientID(global.CLIENTTYPE);
                    props.navigation.replace('ProfileShortBasicDetails');
                } else if (currentPage.pageCode == 'PRF_SHRT_GRNTR_VRF_STATUS') {
                    global.CLIENTTYPE = 'GRNTR';
                    global.CURRENTPAGEID = currentPage.pageId;
                    await getClientID(global.CLIENTTYPE);
                    props.navigation.replace('ProfileShortKYCVerificationStatus');
                } else if (currentPage.pageCode == 'PRF_SHRT_GRNTR_PRSNL_DTLS') {
                    global.CLIENTTYPE = 'GRNTR';
                    global.CURRENTPAGEID = currentPage.pageId;
                    await getClientID(global.CLIENTTYPE);
                    props.navigation.replace('ProfileShortApplicantDetails');
                } else if (currentPage.pageCode == 'PRF_SHRT_GRNTR_ADDRS_DTLS') {
                    global.CLIENTTYPE = 'GRNTR';
                    global.CURRENTPAGEID = currentPage.pageId;
                    await getClientID(global.CLIENTTYPE);
                    props.navigation.replace('AddressMainList');
                } else if (currentPage.pageCode == 'CB_CHK_CB_RSPNS') {
                    global.CURRENTPAGEID = currentPage.pageId;
                    props.navigation.navigate('CBResponseScreen');
                } else if (currentPage.pageCode == 'CB_CHK_BRE_DCSN') {
                    global.CURRENTPAGEID = currentPage.pageId;
                    props.navigation.navigate('CBStatus', { pageStatus: cbBreCheckStatus });
                } else if (currentPage.pageCode == 'DMGRC_APPL_FMLY_DTLS') {
                    global.CLIENTTYPE = 'APPL';
                    global.CURRENTPAGEID = currentPage.pageId;
                    await getClientID(global.CLIENTTYPE);
                    props.navigation.replace('FamilyDetailList');
                } else if (currentPage.pageCode == 'DMGRC_APPL_BSN_DTLS') {
                    global.CLIENTTYPE = 'APPL';
                    global.CURRENTPAGEID = currentPage.pageId;
                    await getClientID(global.CLIENTTYPE);
                    await props.navigation.replace('LoanDemographicBusinessDetail');
                } else if (currentPage.pageCode == 'DMGRC_APPL_BSN_ADDR_DTLS') {
                    global.CLIENTTYPE = 'APPL';
                    global.CURRENTPAGEID = currentPage.pageId;
                    await getClientID(global.CLIENTTYPE);
                    props.navigation.replace('LoanAddressList');
                } else if (currentPage.pageCode == 'DMGRC_APPL_GST_DTLS') {
                    global.CLIENTTYPE = 'APPL';
                    global.CURRENTPAGEID = currentPage.pageId;
                    await getClientID(global.CLIENTTYPE);
                    props.navigation.replace('LoanDemographicsGSTDetails');
                } else if (currentPage.pageCode == 'DMGRC_APPL_FNCL_DTLS') {
                    global.CLIENTTYPE = 'APPL';
                    global.CURRENTPAGEID = currentPage.pageId;
                    await getClientID(global.CLIENTTYPE);
                    props.navigation.replace('LoanDemographicsFinancialDetails');
                } else if (currentPage.pageCode == 'DMGRC_APPL_BNK_DTLS') {
                    global.CLIENTTYPE = 'APPL';
                    global.CURRENTPAGEID = currentPage.pageId;
                    await getClientID(global.CLIENTTYPE);
                    props.navigation.replace('BankList');
                } else if (currentPage.pageCode == 'DMGRC_COAPPL_BSN_DTLS') {
                    global.CLIENTTYPE = 'CO-APPL';
                    global.CURRENTPAGEID = currentPage.pageId;
                    await getClientID(global.CLIENTTYPE);
                    await props.navigation.replace('LoanDemographicBusinessDetail');
                } else if (currentPage.pageCode == 'DMGRC_COAPPL_BSN_ADDR_DTLS') {
                    global.CLIENTTYPE = 'CO-APPL';
                    global.CURRENTPAGEID = currentPage.pageId;
                    await getClientID(global.CLIENTTYPE);
                    props.navigation.replace('LoanAddressList');
                } else if (currentPage.pageCode == 'DMGRC_COAPPL_FNCL_DTLS') {
                    global.CLIENTTYPE = 'CO-APPL';
                    global.CURRENTPAGEID = currentPage.pageId;
                    await getClientID(global.CLIENTTYPE);
                    props.navigation.replace('LoanDemographicsFinancialDetails');
                } else if (currentPage.pageCode == 'DMGRC_COAPPL_BNK_DTLS') {
                    global.CLIENTTYPE = 'CO-APPL';
                    global.CURRENTPAGEID = currentPage.pageId;
                    await getClientID(global.CLIENTTYPE);
                    props.navigation.replace('BankList');
                } else if (currentPage.pageCode == 'DMGRC_GRNTR_BSN_DTLS') {
                    global.CLIENTTYPE = 'GRNTR';
                    global.CURRENTPAGEID = currentPage.pageId;
                    await getClientID(global.CLIENTTYPE);
                    await props.navigation.replace('LoanDemographicBusinessDetail');
                } else if (currentPage.pageCode == 'DMGRC_GRNTR_BSN_ADDR_DTLS') {
                    global.CLIENTTYPE = 'GRNTR';
                    global.CURRENTPAGEID = currentPage.pageId;
                    await getClientID(global.CLIENTTYPE);
                    props.navigation.replace('LoanAddressList');
                } else if (currentPage.pageCode == 'DMGRC_GRNTR_FNCL_DTLS') {
                    global.CLIENTTYPE = 'GRNTR';
                    await getClientID(global.CLIENTTYPE);
                    global.CURRENTPAGEID = currentPage.pageId;
                    props.navigation.replace('LoanDemographicsFinancialDetails');
                } else if (currentPage.pageCode == 'DMGRC_GRNTR_BNK_DTLS') {
                    global.CLIENTTYPE = 'GRNTR';
                    global.CURRENTPAGEID = currentPage.pageId;
                    await getClientID(global.CLIENTTYPE);
                    props.navigation.replace('BankList');
                } else if (currentPage.pageCode == 'LN_PRDT_SLCTN') {
                    global.CLIENTTYPE = 'APPL';
                    global.CURRENTPAGEID = currentPage.pageId;
                    await getClientID(global.CLIENTTYPE);
                    props.navigation.replace('LoanDemographicProductSelection');
                } else if (currentPage.pageCode == 'NMN_DTLS') {
                    global.CLIENTTYPE = 'APPL';
                    global.CURRENTPAGEID = currentPage.pageId;
                    await getClientID(global.CLIENTTYPE);
                    props.navigation.replace('LoanNomineeList');
                } else if (currentPage.pageCode == 'DOC_UPLD_APPLCNT') {
                    global.CLIENTTYPE = 'APPL';
                    global.CURRENTPAGEID = currentPage.pageId;
                    await getClientID(global.CLIENTTYPE);
                    props.navigation.replace('LoanDocumentUpload');
                } else if (currentPage.pageCode == 'DOC_UPLD_COAPPLCNT') {
                    global.CLIENTTYPE = 'CO-APPL';
                    global.CURRENTPAGEID = currentPage.pageId;
                    await getClientID(global.CLIENTTYPE);
                    props.navigation.replace('LoanDocumentUpload');
                } else if (currentPage.pageCode == 'DOC_UPLD_GRNTR') {
                    global.CLIENTTYPE = 'GRNTR';
                    global.CURRENTPAGEID = currentPage.pageId;
                    await getClientID(global.CLIENTTYPE);
                    props.navigation.replace('LoanDocumentUpload');
                } else if (currentPage.pageCode == 'BRE_VIEW') {
                    global.CLIENTTYPE = 'APPL';
                    global.CURRENTPAGEID = currentPage.pageId;
                    await getClientID(global.CLIENTTYPE);
                    props.navigation.replace('BREView');
                }


            }
        }
        if (Common.DEBUG_MODE) console.log(firstIncompleteData.nestedSubData[0]);

    }

    const getClientID = async (clientType) => {
        await tbl_client.getOnlyClientBasedOnID(global.LOANAPPLICATIONID, clientType)
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
                    global.isMobileVerified = '0';
                    return '';
                }

            })
            .catch(error => {
                if (global.DEBUG_MODE) console.error('Error fetching Applicant details:', error);
            });
    }

    const onClickMainList = (item, substageId) => {

        setCurrentStage(item.subStageCode);
        if (global.COMPLETEDSUBSTAGE == 'PRF_SHRT') {
            if (item.subStageCode == 'CB_CHK') {
                return;
            } else if (item.subStageCode == 'LN_DEMGRP') {
                return;
            } else if (item.subStageCode == 'BRE') {
                return;
            }
        } else if (global.COMPLETEDSUBSTAGE == 'CB_CHK') {
            if (item.subStageCode == 'LN_DEMGRP') {
                return;
            } else if (item.subStageCode == 'BRE') {
                return;
            }
        } else if (global.COMPLETEDSUBSTAGE == 'LN_DEMGRP') {
            if (item.subStageCode == 'BRE') {
                return;
            }
        }

        if (item.subStageCode == 'PRF_SHRT') {
            setButtonText(language[0][props.language].str_editprofileshort.toUpperCase())
        } else if (item.subStageCode == 'CB_CHK') {
            setButtonText(language[0][props.language].str_triggerCBResponse.toUpperCase())
        } else if (item.subStageCode == 'LN_DEMGRP') {
            setButtonText(language[0][props.language].str_editLoan.toUpperCase())
        } else if (item.subStageCode == 'BRE') {
            setButtonText(language[0][props.language].str_viewbreresult.toUpperCase())
        }


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
        global.FILTEREDPROCESSMODULE = filteredProcessModuleStage;
        setRefreshFlatList(!refreshFlatlist)
    }

    const nestedDataClick = async (item) => {
        const isConditionMet = processModuleData.some(item =>
            item.nestedSubData.some(subItem =>
                subItem.pageCode === "CB_CHK_CB_RSPNS" && subItem.nestedSubDataIsCompleted
            )
        );

        //    if (global.USERTYPEID == 1163) {

        if (item.pageCode == 'PRF_SHRT_APLCT_BSC_DTLS') {
            global.CLIENTTYPE = 'APPL';
            global.CURRENTPAGEID = item.pageId;
            await getClientID(global.CLIENTTYPE);
            props.navigation.replace('ProfileShortBasicDetails');
        } else if (item.pageCode == 'PRF_SHRT_APLCT_VRF_STATUS') {
            global.CLIENTTYPE = 'APPL';
            global.CURRENTPAGEID = item.pageId;
            await getClientID(global.CLIENTTYPE);
            props.navigation.replace('ProfileShortKYCVerificationStatus');
        } else if (item.pageCode == 'PRF_SHRT_APLCT_PRSNL_DTLS') {
            global.CLIENTTYPE = 'APPL';
            global.CURRENTPAGEID = item.pageId;
            await getClientID(global.CLIENTTYPE);
            props.navigation.replace('ProfileShortApplicantDetails');
        } else if (item.pageCode == 'PRF_SHRT_APLCT_ADDRS_DTLS') {
            global.CLIENTTYPE = 'APPL';
            global.CURRENTPAGEID = item.pageId;
            await getClientID(global.CLIENTTYPE);
            props.navigation.replace('AddressMainList');
        } else if (item.pageCode == 'PRF_SHRT_COAPLCT_BSC_DTLS') {
            global.CLIENTTYPE = 'CO-APPL';
            global.CURRENTPAGEID = item.pageId;
            await getClientID(global.CLIENTTYPE);
            props.navigation.replace('ProfileShortBasicDetails');
        } else if (item.pageCode == 'PRF_SHRT_COAPLCT_VRF_STATUS') {
            global.CLIENTTYPE = 'CO-APPL';
            global.CURRENTPAGEID = item.pageId;
            await getClientID(global.CLIENTTYPE);
            props.navigation.replace('ProfileShortKYCVerificationStatus');
        } else if (item.pageCode == 'PRF_SHRT_COAPLCT_PRSNL_DTLS') {
            global.CLIENTTYPE = 'CO-APPL';
            global.CURRENTPAGEID = item.pageId;
            await getClientID(global.CLIENTTYPE);
            props.navigation.replace('ProfileShortApplicantDetails');
        } else if (item.pageCode == 'PRF_SHRT_COAPLCT_ADDRS_DTLS') {
            global.CLIENTTYPE = 'CO-APPL';
            global.CURRENTPAGEID = item.pageId;
            await getClientID(global.CLIENTTYPE);
            props.navigation.replace('AddressMainList');
        } else if (item.pageCode == 'PRF_SHRT_GRNTR_BSC_DTLS') {
            global.CLIENTTYPE = 'GRNTR';
            global.CURRENTPAGEID = item.pageId;
            await getClientID(global.CLIENTTYPE);
            props.navigation.replace('ProfileShortBasicDetails');
        } else if (item.pageCode == 'PRF_SHRT_GRNTR_VRF_STATUS') {
            global.CLIENTTYPE = 'GRNTR';
            global.CURRENTPAGEID = item.pageId;
            await getClientID(global.CLIENTTYPE);
            props.navigation.replace('ProfileShortKYCVerificationStatus');
        } else if (item.pageCode == 'PRF_SHRT_GRNTR_PRSNL_DTLS') {
            global.CLIENTTYPE = 'GRNTR';
            global.CURRENTPAGEID = item.pageId;
            await getClientID(global.CLIENTTYPE);
            props.navigation.replace('ProfileShortApplicantDetails');
        } else if (item.pageCode == 'PRF_SHRT_GRNTR_ADDRS_DTLS') {
            global.CLIENTTYPE = 'GRNTR';
            global.CURRENTPAGEID = item.pageId;
            await getClientID(global.CLIENTTYPE);
            props.navigation.replace('AddressMainList');
        } else if (item.pageCode == 'DMGRC_APPL_FMLY_DTLS') {
            if (isLoanCompleted) {
                global.CLIENTTYPE = 'APPL';
                global.CURRENTPAGEID = item.pageId;
                await getClientID(global.CLIENTTYPE);
                props.navigation.replace('FamilyDetailList');
            }
        } else if (item.pageCode == 'DMGRC_APPL_BSN_DTLS') {
            if (isLoanCompleted) {
                global.CLIENTTYPE = 'APPL';
                global.CURRENTPAGEID = item.pageId;
                await getClientID(global.CLIENTTYPE);
                await props.navigation.replace('LoanDemographicBusinessDetail');
            }
        } else if (item.pageCode == 'DMGRC_APPL_BSN_ADDR_DTLS') {
            if (isLoanCompleted) {
                global.CLIENTTYPE = 'APPL';
                global.CURRENTPAGEID = item.pageId;
                await getClientID(global.CLIENTTYPE);
                props.navigation.replace('LoanAddressList');
            }
        } else if (item.pageCode == 'DMGRC_APPL_GST_DTLS') {
            if (isLoanCompleted) {
                global.CLIENTTYPE = 'APPL';
                global.CURRENTPAGEID = item.pageId;
                await getClientID(global.CLIENTTYPE);
                props.navigation.replace('LoanDemographicsGSTDetails');
            }
        } else if (item.pageCode == 'DMGRC_APPL_FNCL_DTLS') {
            if (isLoanCompleted) {
                global.CLIENTTYPE = 'APPL';
                global.CURRENTPAGEID = item.pageId;
                await getClientID(global.CLIENTTYPE);
                props.navigation.replace('LoanDemographicsFinancialDetails');
            }
        } else if (item.pageCode == 'DMGRC_APPL_BNK_DTLS') {
            if (isLoanCompleted) {
                global.CLIENTTYPE = 'APPL';
                global.CURRENTPAGEID = item.pageId;
                await getClientID(global.CLIENTTYPE);
                props.navigation.replace('BankList');
            }
        } else if (item.pageCode == 'DMGRC_COAPPL_BSN_DTLS') {
            if (isLoanCompleted) {
                global.CLIENTTYPE = 'CO-APPL';
                global.CURRENTPAGEID = item.pageId;
                await getClientID(global.CLIENTTYPE);
                await props.navigation.replace('LoanDemographicBusinessDetail');
            }
        } else if (item.pageCode == 'DMGRC_COAPPL_BSN_ADDR_DTLS') {
            if (isLoanCompleted) {
                global.CLIENTTYPE = 'CO-APPL';
                global.CURRENTPAGEID = item.pageId;
                await getClientID(global.CLIENTTYPE);
                props.navigation.replace('LoanAddressList');
            }
        } else if (item.pageCode == 'DMGRC_COAPPL_FNCL_DTLS') {
            if (isLoanCompleted) {
                global.CLIENTTYPE = 'CO-APPL';
                global.CURRENTPAGEID = item.pageId;
                await getClientID(global.CLIENTTYPE);
                props.navigation.replace('LoanDemographicsFinancialDetails');
            }
        } else if (item.pageCode == 'DMGRC_COAPPL_BNK_DTLS') {
            if (isLoanCompleted) {
                global.CLIENTTYPE = 'CO-APPL';
                global.CURRENTPAGEID = item.pageId;
                await getClientID(global.CLIENTTYPE);
                props.navigation.replace('BankList');
            }
        } else if (item.pageCode == 'DMGRC_GRNTR_BSN_DTLS') {
            if (isLoanCompleted) {
                global.CLIENTTYPE = 'GRNTR';
                global.CURRENTPAGEID = item.pageId;
                await getClientID(global.CLIENTTYPE);
                await props.navigation.replace('LoanDemographicBusinessDetail');
            }
        } else if (item.pageCode == 'DMGRC_GRNTR_BSN_ADDR_DTLS') {
            if (isLoanCompleted) {
                global.CLIENTTYPE = 'GRNTR';
                global.CURRENTPAGEID = item.pageId;
                await getClientID(global.CLIENTTYPE);
                props.navigation.replace('LoanAddressList');
            }
        } else if (item.pageCode == 'DMGRC_GRNTR_FNCL_DTLS') {
            if (isLoanCompleted) {
                global.CLIENTTYPE = 'GRNTR';
                await getClientID(global.CLIENTTYPE);
                global.CURRENTPAGEID = item.pageId;
                props.navigation.replace('LoanDemographicsFinancialDetails');
            }
        } else if (item.pageCode == 'DMGRC_GRNTR_BNK_DTLS') {
            if (isLoanCompleted) {
                global.CLIENTTYPE = 'GRNTR';
                global.CURRENTPAGEID = item.pageId;
                await getClientID(global.CLIENTTYPE);
                props.navigation.replace('BankList');
            }
        } else if (item.pageCode == 'CB_CHK_CB_RSPNS') {

            props.navigation.replace('CBResponseScreen');

        } else if (item.pageCode == 'CB_CHK_BRE_DCSN') {
            if (isConditionMet) {

                props.navigation.replace('CBStatus', { pageStatus: cbBreCheckStatus });

            }
        } else if (item.pageCode == 'DOC_UPLD_APPLCNT') {
            if (isLoanCompleted) {
                global.CLIENTTYPE = 'APPL';
                global.CURRENTPAGEID = item.pageId;
                await getClientID(global.CLIENTTYPE);
                props.navigation.replace('LoanDocumentUpload');
            }
        } else if (item.pageCode == 'DOC_UPLD_COAPPLCNT') {
            if (isLoanCompleted) {
                global.CLIENTTYPE = 'CO-APPL';
                global.CURRENTPAGEID = item.pageId;
                await getClientID(global.CLIENTTYPE);
                props.navigation.replace('LoanDocumentUpload');
            }
        } else if (item.pageCode == 'DOC_UPLD_GRNTR') {
            if (isLoanCompleted) {
                global.CLIENTTYPE = 'GRNTR';
                global.CURRENTPAGEID = item.pageId;
                await getClientID(global.CLIENTTYPE);
                props.navigation.replace('LoanDocumentUpload');
            }
        } else if (item.pageCode == 'LN_PRDT_SLCTN') {
            if (isLoanCompleted) {
                global.CLIENTTYPE = 'APPL';
                global.CURRENTPAGEID = item.pageId;
                await getClientID(global.CLIENTTYPE);
                props.navigation.replace('LoanDemographicProductSelection');
            }
        } else if (item.pageCode == 'NMN_DTLS') {
            if (isLoanCompleted) {
                global.CLIENTTYPE = 'APPL';
                await getClientID(global.CLIENTTYPE);
                global.CURRENTPAGEID = item.pageId;
                props.navigation.replace('LoanNomineeList');
            }
        } else if (item.pageCode == 'BRE_VIEW') {
            global.CLIENTTYPE = 'APPL';
            global.CURRENTPAGEID = item.pageId;
            props.navigation.replace('BREView');
        }

        // } else {

        //     if (global.DEBUG_MODE) console.log(JSON.stringify(isConditionMet))
        //     if (item.pageCode == 'CB_CHK_CB_RSPNS') {
        //         props.navigation.replace('CBResponseScreen');
        //     } else if (item.pageCode == 'CB_CHK_BRE_DCSN') {
        //         if (isConditionMet) {
        //             props.navigation.replace('CBStatus', { pageStatus: cbBreCheckStatus });
        //         }

        //     }
        // }

    }


    const getProcessSubStage = async (stageId, subStageOrder, moduleOrder, pageOrder, workFlowID) => {

        var substage = global.COMPLETEDSUBSTAGE;
        var stageId = 1;
        if (substage.length <= 0) {
            substage = 'PRF_SHRT'
        }

        if (substage == 'PRF_SHRT') {
            setButtonText(language[0][props.language].str_editprofileshort.toUpperCase())
        } else if (substage == 'CB_CHK') {
            setButtonText(language[0][props.language].str_triggerCBResponse.toUpperCase())
        } else if (substage == 'LN_DEMGRP') {
            setButtonText(language[0][props.language].str_editLoan.toUpperCase())
        } else if (substage == 'BRE') {
            setButtonText(language[0][props.language].str_viewbreresult.toUpperCase())
        }

        const filteredProcessSubStage = processSubStage.filter((data) => {
            return data.wfId === workFlowID && (data.stageId === stageId);
        }).map((data) => {
            const subDataIsCompleted = data.displayOrder <= subStageOrder;

            const extraJSON = { isSelected: data.subStageCode === substage, subDataIsCompleted };
            return { ...data, ...extraJSON };
        }).sort((a, b) => a.displayOrder - b.displayOrder);


        const filteredAndSelectedProcessSubStage = filteredProcessSubStage
            .filter(data => data.isSelected === true);

        if (global.DEBUG_MODE) console.log('filteredAndSelectedProcessSubStage::' + JSON.stringify(filteredAndSelectedProcessSubStage));

        setProcessSubStageData(filteredProcessSubStage);

        const filteredProcessModuleStage = processModule.filter((data) => {
            return data.wfId === workFlowID && data.process_sub_stage_id === filteredAndSelectedProcessSubStage[0].id;
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
        global.FILTEREDPROCESSMODULE = filteredProcessModuleStage;

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
                    {/* <TextComp textVal={language[0][props.language].str_applicationStatus + ': 98%'}
                        textStyle={{ color: Colors.dimText, fontFamily: 'PoppinsRegular' }} /> */}
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
                        var gradientColors = '';
                        if (item.subStageCode == 'CB_CHK' && cbCheckStatus == 'Rejected') {
                            gradientColors = ['#FFC1C1', '#FF6565', '#FF4242'];
                        } else {
                            gradientColors = item.subStageCode === global.COMPLETEDSUBSTAGE
                                ? ['#D2FF21', '#FAD420', '#FFCE20']
                                : item.subDataIsCompleted
                                    ? ['#8EF2CB', '#50C56F', '#3BB650']
                                    : ['#ECECEC', '#DBDBDB', '#ECECEC'];
                        }



                        return (
                            <TouchableOpacity activeOpacity={1} onPress={() => onClickMainList(item, item.id)}>
                                <View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <LinearGradient colors={gradientColors} style={{
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
            {/* <ScrollView showsVerticalScrollIndicator={false}
                contentContainerStyle={{ width: '100%', marginTop: 20, marginLeft: 10, marginBottom: 40 }}> */}
            <View style={{ flex: 1 }}>
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

                {
                    global.USERTYPEID === 1164 &&
                    (currentStage !== 'CB_CHK' && (cbCheckStatus !== 'Rejected' || cbCheckStatus !== 'Completed')) && (
                        <ButtonViewComp
                            textValue={buttonText}
                            textStyle={{ color: Colors.white, fontSize: 13, fontWeight: 500 }}
                            viewStyle={[Commonstyles.buttonView, { marginBottom: 10 }]}
                            innerStyle={Commonstyles.buttonViewInnerStyle}
                            handleClick={nextScreen}
                        />
                    )
                }
            </View>
            {/* </ScrollView> */}

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