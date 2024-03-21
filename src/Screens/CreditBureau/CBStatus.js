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
import MyStatusBar from '../../Components/MyStatusBar';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../Utils/Colors';
import TextComp from '../../Components/TextComp';
import LinearGradient from 'react-native-linear-gradient';
import { it } from 'react-native-paper-dates';
import HeadComp from '../../Components/HeadComp';
import ButtonViewComp from '../../Components/ButtonViewComp';
import apiInstance from '../../Utils/apiInstance';
import ErrorModal from '../../Components/ErrorModal';
import { useIsFocused } from '@react-navigation/native';
import Commonstyles from '../../Utils/Commonstyles';
import Common from '../../Utils/Common';
import Loading from '../../Components/Loading';
import ConsentModal from '../../Components/ConsentModal';

const CBStatus = (props, { navigation }) => {

    const [cbResponse, setCBResponse] = useState([]);
    const [refreshFlatlist, setRefreshFlatList] = useState(false);
    const isScreenVisible = useIsFocused();
    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [apiError, setApiError] = useState('');
    const [loading, setLoading] = useState(false);
    const [cbResponseStatus, setCbResponseStatus] = useState('');
    const [consentModalVisible, setConsentModalVisible] = useState(false);
    const [description, setDescription] = useState('');

    useEffect(() => {
        props.navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' }, tabBarVisible: false });
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);
        getcbData();
        const filterCbCheck = global.TRACKERSTATUSDATA.loanApplicationStatus[0].subStageLog.filter((data) => data.subStageCode === 'CB_CHK');
        const filterCbResponse = filterCbCheck[0].moduleLog.filter((data) => data.moduleCode === 'CB_BRE_DCSN')
        setCbResponseStatus(filterCbResponse[0].moduleStatus);

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
        props.navigation.replace('LoanApplicationMain', { fromScreen: 'CBStatus' })
    }

    const toggleBottomNavigationView = () => {
        //Toggling the visibility state of the bottom sheet
        setBottomSheetVisible(!bottomSheetVisible);
    };

    const updateHideAndShow = (item, index) => {
        let fiterPosition = cbResponse
        for (let i = 0; i < fiterPosition.length; i++) {
            if (i == index) {
                if (fiterPosition[i].isSelected) {
                    fiterPosition[i].isSelected = false
                } else {
                    fiterPosition[i].isSelected = true
                }
            }
        }
        //alert(JSON.stringify(fiterPosition))
        setCBResponse(fiterPosition)
        setRefreshFlatList(!refreshFlatlist)
    }

    const getcbData = () => {

        const baseURL = global.PORT1;
        setLoading(true);
        apiInstance(baseURL)
            .get(`/api/v2/getCb/${global.LOANAPPLICATIONID}`)
            .then(async response => {
                // Handle the response data
                if (global.DEBUG_MODE) console.log('CBResponseApiResponse::' + JSON.stringify(response.data),);
                setLoading(false);
                if (response.status == 200) {
                    const newData = response.data.map(item => {
                        const extraJson = { isSelected: false };
                        return { ...item, ...extraJson };
                    });
                    setCBResponse(newData)
                } else if (response.data.statusCode === 201) {
                    setApiError(response.data.message);
                    setErrorModalVisible(true);
                } else if (response.data.statusCode === 202) {
                    setApiError(response.data.message);
                    setErrorModalVisible(true);
                }

            })
            .catch(error => {
                // Handle the error
                if (global.DEBUG_MODE) console.log('UpdateStatusApiResponse' + JSON.stringify(error.response));
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

    const updateLoanStatus = () => {

        var module = ''; var page = '';

        module = 'CB_BRE_DCSN';
        page = 'CB_CHK_BRE_DCSN';


        const appDetails = {
            "loanApplicationId": global.LOANAPPLICATIONID,
            "loanWorkflowStage": "LN_APP_INITIATION",
            "subStageCode": "CB_CHK",
            "moduleCode": module,
            "pageCode": page,
            "status": "Completed"
        }
        const baseURL = '8901';
        setLoading(true);
        apiInstance(baseURL)
            .post(`/api/v2/loan-application-status/updateStatus`, appDetails)
            .then(async response => {
                // Handle the response data
                if (global.DEBUG_MODE) console.log('UpdateStatusApiResponse::' + JSON.stringify(response.data),);
                setLoading(false);

                if (response.status == 200) {
                    global.COMPLETEDSUBSTAGE = 'LN_DEMGRP';
                    global.COMPLETEDMODULE = 'CB_BRE_DCSN';
                    global.COMPLETEDPAGE = 'CB_CHK_BRE_DCSN';
                    props.navigation.replace('LoanApplicationMain', { fromScreen: 'CBStatus' })
                } else if (response.data.statusCode === 201) {
                    setApiError(response.data.message);
                    setErrorModalVisible(true);
                } else if (response.data.statusCode === 202) {
                    setApiError(response.data.message);
                    setErrorModalVisible(true);
                }

            })
            .catch(error => {
                // Handle the error
                if (global.DEBUG_MODE) console.log('UpdateStatusApiResponse' + JSON.stringify(error.response));
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

    const closeErrorModal = () => {
        setErrorModalVisible(false);
    };

    const listView = ({ item, index }) => {

        return (
            <View style={{ width: '100%', backgroundColor: 'white' }}>
                <View style={{ width: '100%', backgroundColor: 'white' }}>

                    <View style={{ width: '100%', flexDirection: 'row', marginLeft: 15, marginTop: 10 }}>
                        <View style={{ width: '85%', flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ color: Colors.black, fontSize: 14, fontWeight: '500', marginLeft: 5 }}>{item.clientType == 'APPL' ? 'Applicant' : item.clientType == 'CO-APPL' ? 'Co-Applicant' : 'Guarantor'}</Text>
                        </View>
                        <TouchableOpacity onPress={() => updateHideAndShow(item, index)}
                            style={{ width: '15%', flexDirection: 'row' }}>
                            <View >
                                {item.isSelected ?
                                    (<MaterialIcons name='keyboard-arrow-up' size={23} color={Colors.black} />) :
                                    (<MaterialIcons name='keyboard-arrow-down' size={23} color={Colors.black} />)
                                }
                            </View>
                        </TouchableOpacity>
                    </View>

                    {/* subview */}
                    {item.isSelected &&

                        <FlatList
                            data={item.cbResultClientWise}
                            renderItem={renderInnerItem}
                            keyExtractor={(item, index) => index.toString()}
                        />

                    }

                </View>
                <View style={{ width: '100%', height: 0.9, backgroundColor: Colors.line, marginTop: 13 }} />
            </View>

        )
    }

    const renderInnerItem = ({ item }) => (
        <View>

            {/* <View style={{ width: '100%', flexDirection: 'row', height: 55, justifyContent: 'center', alignItems: 'center' }}>
            <LinearGradient start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }} colors={['#FFF9E340', '#0294FF40', '#0294FF50']}
                style={{ width: '100%', flexDirection: 'row', marginTop: 13, height: 55, justifyContent: 'center', alignItems: 'center' }}>

                <View style={{ width: '70%' }}>
                    <Text style={{ color: Colors.dimblack, fontSize: 13, marginLeft: 20 }}>{language[0][props.language].str_cbbrerules}</Text>
                </View>
                <View style={{ width: '30%' }}>
                    <Text style={{ color: Colors.green, fontSize: 13, fontWeight: '400' }}>Pass</Text>
                </View>
            </LinearGradient>
        </View> */}

            <View style={{ width: '100%', flexDirection: 'row', marginTop: 11, height: 30, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ width: '70%' }}>
                    <Text style={{ color: Colors.dimblack, fontSize: 13, marginLeft: 20 }}>{item.label}</Text>
                </View>
                <View style={{ width: '30%' }}>
                    <Text style={{ color: item.result == 'Pass' ? Colors.green : item.result == 'Deviation' ? Colors.pendingBorder : Colors.red, fontSize: 13, fontWeight: '400' }}>{item.result}</Text>
                </View>
            </View>
        </View>
    );

    return (

        <View style={{ flex: 1, backgroundColor: Colors.white }}>
            {loading ? <Loading /> : null}
            <MyStatusBar backgroundColor={'white'} barStyle="dark-content" />
            <View style={{ width: '100%', height: 58, alignItems: 'center', backgroundColor: Colors.white }}>
                <View style={{ width: '93%', flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => onGoBack()} style={{ width: '10%', height: 56, justifyContent: 'center' }}>
                        <View >
                            <Entypo name='chevron-left' size={25} color={Colors.darkblack} />
                        </View>
                    </TouchableOpacity>
                    <View style={{ width: '80%', height: 56, justifyContent: 'center' }}>
                        <TextComp textVal={language[0][props.language].str_cbsd}
                            textStyle={{ color: Colors.darkblack, fontWeight: 400, fontSize: 18 }} />
                    </View>
                </View>
            </View>
            {/* <View style={{ width: '100%', marginLeft: 21 }}>
                <TextComp textVal={language[0][props.language].str_productId}
                    textStyle={{ color: Colors.dimText, fontWeight: 400, fontSize: 16 }} />
                <TextComp textVal={'PD01'}
                    textStyle={{ color: Colors.darkblack, fontWeight: 400, fontSize: 16, marginTop: 5 }} />
            </View>
            <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ width: '90%', height: .9, backgroundColor: Colors.line, marginTop: 5 }} />
            </View> */}

            <View style={{ width: '100%', justifyContent: 'center', marginBottom: 110 }}>
                <FlatList
                    extraData={refreshFlatlist}
                    data={cbResponse}
                    renderItem={listView}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
            {props.route.params.pageStatus === 'InProgress' &&
                <View style={styles.fab}>
                    <ButtonViewComp
                        textValue={language[0][props.language].str_next.toUpperCase()}
                        textStyle={{ color: Colors.white, fontSize: 13, fontWeight: 500 }}
                        viewStyle={Commonstyles.buttonView}
                        innerStyle={Commonstyles.buttonViewInnerStyle}
                        handleClick={updateLoanStatus}
                    />
                </View>
            }
        </View>

    );
};


const mapStateToProps = (state) => {
    const { language } = state.languageReducer;
    return {
        language: language
    }
}

const mapDispatchToProps = (dispatch) => ({
    languageAction: (item) => dispatch(languageAction(item)),
});
export default connect(mapStateToProps, mapDispatchToProps)(CBStatus);


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#f5f8fa',
        alignItems: 'center'
    },
    disableBg: {
        width: '88%', height: 50, backgroundColor: Colors.disableBg,
        borderRadius: 45, alignItems: 'center', justifyContent: 'center'
    },
    enableBg: {
        width: '88%', height: 50, backgroundColor: Colors.skyBlue,
        borderRadius: 45, alignItems: 'center', justifyContent: 'center'
    },
    pendingbackground: {
        width: 115, borderColor: Colors.pendingBorder, backgroundColor: Colors.pendingBg, alignItems: 'center', padding: 2, borderRadius: 15, borderWidth: 1
    },
    approvedbackground: {
        width: 115, borderColor: Colors.approvedBorder, backgroundColor: Colors.approvedBg, alignItems: 'center', padding: 3, borderRadius: 15, borderWidth: 1
    },
    bottomNavigationView: {
        backgroundColor: '#fff',
        width: '100%',
        height: 150,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    }, fab: {
        position: 'absolute',
        margin: 0,
        right: 0,
        bottom: 12,
        width: '100%',

    },

});