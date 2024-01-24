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
import Colors from '../../Utils/Colors';
import Commonstyles from '../../Utils/Commonstyles';
import IconButtonViewComp from '../../Components/IconButtonViewComp';
import { useIsFocused } from '@react-navigation/native';
import TextComp from '../../Components/TextComp';
import ImageComp from '../../Components/ImageComp';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import apiInstance from '../../Utils/apiInstance';
import { updatePDSubStage, updatePDModule, updatePDSubModule, updatePDPage } from '../../Utils/redux/actions/PDAction';
import Common from '../../Utils/Common';

const PDItems = (props, { navigation }) => {
    const [loading, setLoading] = useState(false);
    const [pdDetails, setPdDetails] = useState([]);
    const [refreshFlatlist, setRefreshFlatList] = useState(false);
    const isScreenVisible = useIsFocused();
    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [apiError, setApiError] = useState('');


    useEffect(() => {
        props.navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' }, tabBarVisible: false });
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);

        //props.updatePDSubStage('PD_APPL');
        //props.updatePDModule('PD_APPL', 'TR_DTLS_APPL');
        //props.updatePDSubModule('PD_APPL', 'TR_DTLS_APPL', 'TR_DTLS_APPL');
        //props.updatePDPage('PD_APPL', 'TR_DTLS_APPL', 'TR_DTLS_APPL', 'PG_TR_DTLS_APPL');
        //alert(JSON.stringify(props.pdSubStage))
        return () => {
            props.navigation.getParent()?.setOptions({ tabBarStyle: undefined, tabBarVisible: undefined });
            backHandler.remove();
        }
    }, [props.navigation, isScreenVisible]);


    useFocusEffect(
        React.useCallback(() => {

            if (global.DEBUG_MODE) console.log('Screen Available');

            const filteredData = props.pdSubStage[0].personalDiscussionSubStageLogs
                .filter(data => data.subStageCode === global.PDSUBSTAGE)


            if (global.PDTRACKERDATA) {
                if (!global.PDTRACKERDATA.nonGst) {
                    const updatedData = filteredData[0].personalDiscussionModuleLogs.filter((module) => module.moduleCode !== 'NON_GST_CST_APPL');
                    setPdDetails(updatedData)
                } else {
                    setPdDetails(filteredData[0].personalDiscussionModuleLogs)
                }
            }

            setRefreshFlatList(!refreshFlatlist)


            return () => {
                if (global.DEBUG_MODE) console.log('Screen is blurred');
            };
        }, [])
    );

    const getClientData = () => {

        const baseURL = '8901'
        setLoading(true)

        apiInstance(baseURL).post(`api/v1/pd/PDMaster/findByPdSubcode/${global.PDSTAGE}`) //${global.PDSTAGE}
            .then((response) => {
                // Handle the response data

                if (global.DEBUG_MODE) console.log("ResponseDataApi::" + JSON.stringify(response.data));
                setLoading(false)
                const filteredData = response.data[0].pdSubstages
                    .filter(data => data.clientType === props.route.params.clientType)
                    .sort((a, b) => a.displayOrder - b.displayOrder);
                global.PDSTAGES = response.data;
                setPdDetails(filteredData[0].pdModules)

            })
            .catch((error) => {
                // Handle the error
                setLoading(false)
                if (global.DEBUG_MODE) console.log("ResponseDataApiError::" + JSON.stringify(error.response.data));
                if (error.response.data != null) {
                    setApiError(error.response.data.message);
                    setErrorModalVisible(true)
                }
            });
    }

    const handleBackButton = () => {
        onGoBack();
        return true; // Prevent default back button behavior
    };

    const onGoBack = () => {
        props.navigation.goBack();
    }

    const FlatView = ({ item }) => {


        var bg = ''; imagePath = '';
        if (item.moduleCode == 'TR_DTLS_APPL' || item.moduleCode == 'TR_DTLS_CO_APPL' || item.moduleCode == 'TR_DTLS_GRNTR') {
            bg = Colors.dimTravel;
            imagePath = require('../../Images/travel.png');
        } else if (item.moduleCode == 'QU_RFR_CHCK_APPL' || item.moduleCode == 'QU_RFR_CHCK_CO_APPL' || item.moduleCode == 'QU_RFR_CHCK_GRNTR') {
            bg = Colors.dimblue;
            imagePath = require('../../Images/order.png');
        } else if (item.moduleCode == 'NON_GST_CST_APPL') {
            bg = Colors.dimSkyBlue;
            imagePath = require('../../Images/bill.png');
        } else if (item.moduleCode == 'PH_DOC_VRF_APPL' || item.moduleCode == 'PH_DOC_VRF_CO_APPL' || item.moduleCode == 'PH_DOC_VRF_GRNTR') {
            bg = Colors.dimPhysical;
            imagePath = require('../../Images/document.png');
        } else if (item.moduleCode == 'DOC_UPL_APPL' || item.moduleCode == 'DOC_UPL_CO_APPL' || item.moduleCode == 'DOC_UPL_GRNTR') {
            bg = Colors.dimDocument;
            imagePath = require('../../Images/upload.png');
        } else if (item.moduleCode == 'FN_DTLS_VRF_APPL' || item.moduleCode == 'FN_DTLS_VRF_CO_APPL' || item.moduleCode == 'FN_DTLS_VRF_GRNTR') {
            bg = Colors.dimFinancial;
            imagePath = require('../../Images/financial.png');
        } else if (item.moduleCode == 'HS_VT_APPL' || item.moduleCode == 'HS_VT_CO_APPLHo' || item.moduleCode == 'HS_VT_GRNTRHo') {
            bg = Colors.dimHouse;
            imagePath = require('../../Images/home.png');
        } else if (item.moduleCode == 'BSN_VT_APPL' || item.moduleCode == 'BSN_VT_CO_APPLB' || item.moduleCode == 'BSN_VT_GRNTRB') {
            bg = Colors.dimBusiness;
            imagePath = require('../../Images/bill.png');
        } else if (item.moduleCode == 'PD_FD_BK_APPL' || item.moduleCode == 'PD_FD_BK_CO_APPL' || item.moduleCode == 'PD_FD_BK_GRNTR') {
            bg = Colors.dimPersonal;
            imagePath = require('../../Images/feedback.png');
        }
        else {
            imagePath = require('../../Images/applicantimage.png');
        }

        return (
            <View style={{ width: '50%', alignItems: 'center' }}>



                <TouchableOpacity style={{
                    width: '90%', height: 140, marginTop: 15, borderColor: '#BBBBBB4D', borderWidth: 1, borderRadius: 10,
                    alignItems: 'center', justifyContent: 'center'
                }} activeOpacity={0.8} onPress={() => {

                    var pageId = item.personalDiscussionSubModuleLogs[0].personalDiscussionPageLogs[0].id;
                    var pageCode = item.personalDiscussionSubModuleLogs[0].personalDiscussionPageLogs[0].pageCode;
                    var pageDesc = item.personalDiscussionSubModuleLogs[0].personalDiscussionPageLogs[0].pageDescription;
                    var pageMan = item.personalDiscussionSubModuleLogs[0].personalDiscussionPageLogs[0].isMandatory;
                    global.PDMODULE = item.moduleCode;
                    global.PDSUBMODULE = item.personalDiscussionSubModuleLogs[0].subModuleCode;

                    if (item.moduleCode == 'TR_DTLS_APPL' || item.moduleCode == 'TR_DTLS_CO_APPL' || item.moduleCode == 'TR_DTLS_GRNTR') {
                        props.navigation.replace('PdTravelDetails', { 'pageId': pageId, 'pageCode': pageCode, 'pageDesc': pageDesc, 'pageMandatory': pageMan })
                    } else if (item.moduleCode == 'QU_RFR_CHCK_APPL' || item.moduleCode == 'QU_RFR_CHCK_CO_APPL' || item.moduleCode == 'QU_RFR_CHCK_GRNTR') {
                        props.navigation.navigate('PdQuestionSubStage');
                    } else if (item.moduleCode == 'NON_GST_CST_APPL') {
                        props.navigation.replace('PDNonGSTDetail', { 'pageId': pageId, 'pageCode': pageCode, 'pageDesc': pageDesc, 'pageMandatory': pageMan })
                    } else if (item.moduleCode == 'PH_DOC_VRF_APPL' || item.moduleCode == 'PH_DOC_VRF_CO_APPL' || item.moduleCode == 'PH_DOC_VRF_GRNTR') {
                        props.navigation.replace('PDDocumentVerification', { 'pageId': pageId, 'pageCode': pageCode, 'pageDesc': pageDesc, 'pageMandatory': pageMan })
                    } else if (item.moduleCode == 'DOC_UPL_APPL' || item.moduleCode == 'DOC_UPL_CO_APPL' || item.moduleCode == 'DOC_UPL_GRNTR') {
                        props.navigation.replace('PDDocumentUpload', { 'pageId': pageId, 'pageCode': pageCode, 'pageDesc': pageDesc, 'pageMandatory': pageMan })
                    } else if (item.moduleCode == 'FN_DTLS_VRF_APPL' || item.moduleCode == 'FN_DTLS_VRF_CO_APPL' || item.moduleCode == 'FN_DTLS_VRF_GRNTR') {
                        props.navigation.replace('PDFinancialDetails', { 'pageId': pageId, 'pageCode': pageCode, 'pageDesc': pageDesc, 'pageMandatory': pageMan })
                    } else if (item.moduleCode == 'HS_VT_APPL' || item.moduleCode == 'HS_VT_CO_APPLHo' || item.moduleCode == 'HS_VT_GRNTRHo') {
                        props.navigation.replace('HouseDocumentUpload', { 'pageId': pageId, 'pageCode': pageCode, 'pageDesc': pageDesc, 'pageMandatory': pageMan })
                    } else if (item.moduleCode == 'BSN_VT_APPL' || item.moduleCode == 'BSN_VT_CO_APPLB' || item.moduleCode == 'BSN_VT_GRNTRB') {
                        props.navigation.replace('BusinessDocumentUpload', { 'pageId': pageId, 'pageCode': pageCode, 'pageDesc': pageDesc, 'pageMandatory': pageMan })
                    } else if (item.moduleCode == 'PD_FD_BK_APPL' || item.moduleCode == 'PD_FD_BK_CO_APPL' || item.moduleCode == 'PD_FD_BK_GRNTR') {
                        props.navigation.replace('PDFeedback', { 'pageId': pageId, 'pageCode': pageCode, 'pageDesc': pageDesc, 'pageMandatory': pageMan })
                    }
                }}>
                    <View style={{
                        width: '100%', alignItems: 'center', justifyContent: 'center'
                    }}>
                        {item.moduleStatus === 'Completed' &&
                            <View style={{ position: 'absolute', top: -15, bottom: 0, right: 10, alignSelf: 'flex-end' }}>
                                <AntDesign name="checkcircle" size={18} color={Colors.green} />
                            </View>
                        }
                        <View style={{ width: 50, height: 50, backgroundColor: bg, borderRadius: 25, justifyContent: 'center', alignItems: 'center' }}>
                            <ImageComp imageSrc={imagePath} imageStylee={{ width: 30, height: 30, resizeMode: 'contain' }} />
                        </View>

                        <TextComp
                            textStyle={{
                                color: Colors.mediumgrey,
                                fontSize: 12,
                                marginTop: 5,
                                textAlign: 'center',
                                fontFamily: 'Poppins-Medium'
                            }}
                            textVal={
                                item.moduleDescription
                            } />
                    </View>
                </TouchableOpacity>
            </View>
        )

    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
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
                    textval={language[0][props.language].str_pd}
                    props={props}
                    onGoBack={onGoBack}
                />
            </View>

            <View style={{ width: '100%', marginTop: 15, marginBottom: 70 }}>
                <FlatList
                    data={pdDetails}
                    renderItem={FlatView}
                    extraData={refreshFlatlist}
                    keyExtractor={item => item.id}
                    numColumns={2}
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

export default connect(mapStateToProps, mapDispatchToProps)(PDItems);
