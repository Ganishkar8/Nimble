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

            if (Common.DEBUG_MODE) console.log('Screen Available');

            const filteredData = props.pdSubStage[0].personalDiscussionSubStageLogs
                .filter(data => data.subStageCode === 'PD_APPL')
            setPdDetails(filteredData[0].personalDiscussionModuleLogs)
            setRefreshFlatList(!refreshFlatlist)


            return () => {
                if (Common.DEBUG_MODE) console.log('Screen is blurred');
            };
        }, [])
    );

    const getClientData = () => {

        const baseURL = '8901'
        setLoading(true)

        apiInstance(baseURL).post(`api/v1/pd/PDMaster/findByPdSubcode/PD_1`) //${global.SUBSTAGE}
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
        if (item.moduleCode == 'TR_DTLS_APPL') {
            bg = Colors.dimTravel;
            imagePath = require('../../Images/travel.png');
        } else if (item.moduleCode == 'QU_RFR_CHCK_APPL') {
            bg = Colors.dimblue;
            imagePath = require('../../Images/order.png');
        } else if (item.moduleCode == 'NON_GST_CST_APPL') {
            bg = Colors.dimSkyBlue;
            imagePath = require('../../Images/bill.png');
        } else if (item.moduleCode == 'PH_DOC_VRF_APPL') {
            bg = Colors.dimPhysical;
            imagePath = require('../../Images/document.png');
        } else if (item.moduleCode == 'DOC_UPL_APPL') {
            bg = Colors.dimDocument;
            imagePath = require('../../Images/upload.png');
        } else if (item.moduleCode == 'FN_DTLS_VRF_APPL') {
            bg = Colors.dimFinancial;
            imagePath = require('../../Images/financial.png');
        } else if (item.moduleCode == 'HS_VT_APPL') {
            bg = Colors.dimHouse;
            imagePath = require('../../Images/home.png');
        } else if (item.moduleCode == 'BSN_VT_APPL') {
            bg = Colors.dimBusiness;
            imagePath = require('../../Images/bill.png');
        } else if (item.moduleCode == 'PD_FD_BK_APPL') {
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
                    if (item.moduleCode == 'TR_DTLS_APPL') {
                        //alert(JSON.stringify(item))
                        props.navigation.replace('PdTravelDetails')
                    } else if (item.moduleCode == 'QU_RFR_CHCK_APPL') {
                        props.navigation.navigate('PdQuestionSubStage')
                    } else if (item.moduleCode == 'NON_GST_CST_APPL') {

                    } else if (item.moduleCode == 'PH_DOC_VRF_APPL') {

                    } else if (item.moduleCode == 'DOC_UPL_APPL') {

                    } else if (item.moduleCode == 'FN_DTLS_VRF_APPL') {
                        props.navigation.navigate('PDFinancialVerification')
                    } else if (item.moduleCode == 'HS_VT_APPL') {

                    } else if (item.moduleCode == 'BSN_VT_APPL') {

                    } else if (item.moduleCode == 'PD_FD_BK_APPL') {

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
