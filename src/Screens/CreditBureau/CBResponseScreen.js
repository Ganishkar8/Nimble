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
import ErrorModal from '../../Components/ErrorModal';
import MyStatusBar from '../../Components/MyStatusBar';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Foundation from 'react-native-vector-icons/Foundation';
import Colors from '../../Utils/Colors';
import TextComp from '../../Components/TextComp';
import { BottomSheet } from 'react-native-btr';
import { useIsFocused } from '@react-navigation/native';
import HeadComp from '../../Components/HeadComp';
import ButtonViewComp from '../../Components/ButtonViewComp';
import apiInstance from '../../Utils/apiInstance';
import Commonstyles from '../../Utils/Commonstyles';
import Common from '../../Utils/Common';
import Loading from '../../Components/Loading';

const CBResponseScreen = (props, { navigation }) => {

    const [cbResponse, setCBResponse] = useState([]);
    const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
    const isScreenVisible = useIsFocused();
    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [apiError, setApiError] = useState('');
    const [htmlContent, setHtmlContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [cbResponseStatus, setCbResponseStatus] = useState('');


    useEffect(() => {
        props.navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' }, tabBarVisible: false });
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);
        const filterCbCheck = global.LEADTRACKERDATA.loanApplicationStatusDtos[0].subStageLog.filter((data) => data.subStageCode === 'CB_CHK');
        const filterCbResponse = filterCbCheck[0].moduleLog.filter((data) => data.moduleCode === 'CB_RSPNS')
        setCbResponseStatus(filterCbResponse[0].moduleStatus);

        getcbData();
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
        props.navigation.replace('LoanApplicationMain', { fromScreen: 'CBResponse' })
    }

    const toggleBottomNavigationView = () => {
        //Toggling the visibility state of the bottom sheet
        setBottomSheetVisible(!bottomSheetVisible);
    };

    const showPreView = (content) => {
        setHtmlContent(content);
        setBottomSheetVisible(!bottomSheetVisible);
    }

    const getcbData = () => {

        const baseURL = global.PORT1;;
        setLoading(true);
        apiInstance(baseURL)
            .get(`/api/v2/getCb/${global.LOANAPPLICATIONID}`)
            .then(async response => {
                // Handle the response data
                if (global.DEBUG_MODE) console.log('CBResponseApiResponse::' + JSON.stringify(response.data),);
                setLoading(false);
                if (response.status == 200) {
                    if (response.data.length <= 0) {
                        getcbCheckData();
                    } else {
                        //updateLoanStatus();
                        setCBResponse(response.data)
                    }
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

    const getcbCheckData = () => {

        const baseURL = global.PORT1;;
        setLoading(true);
        apiInstance(baseURL)
            .get(`/api/v2/cb-check/${global.LOANAPPLICATIONID}`)
            .then(async response => {
                // Handle the response data
                if (global.DEBUG_MODE) console.log('CBCheckApiResponse::' + JSON.stringify(response.data),);
                setLoading(false);
                if (response.status == 200) {
                    if (response.data.length <= 0) {
                        getcbData();
                    } else {
                        setCBResponse(response.data)
                        //updateLoanStatus();
                    }
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
                if (global.DEBUG_MODE) console.log('CBCheckApiResponse' + JSON.stringify(error.response));
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

        module = 'CB_RSPNS';
        page = 'CB_CHK_CB_RSPNS';


        const appDetails = {
            "loanApplicationId": global.LOANAPPLICATIONID,
            "loanWorkflowStage": "LN_APP_INITIATION",
            "subStageCode": "CB_CHK",
            "moduleCode": module,
            "pageCode": page,
            "status": "Completed"
        }
        const baseURL = global.PORT1;
        setLoading(true);
        apiInstance(baseURL)
            .post(`/api/v2/loan-application-status/updateStatus`, appDetails)
            .then(async response => {
                // Handle the response data
                if (global.DEBUG_MODE) console.log('UpdateStatusApiResponse::' + JSON.stringify(response.data),);
                setLoading(false);
                if (response.status == 200) {
                    global.COMPLETEDMODULE = 'CB_RSPNS';
                    global.COMPLETEDPAGE = 'CB_CHK_CB_RSPNS';
                    //props.navigation.replace('CBStatus')
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



    const listView = ({ item }) => {

        const date = new Date(item.requestTime);

        const formattedDate = `${date.getDate()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()},${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')} ${date.getHours() >= 12 ? 'PM' : 'AM'}`;


        return (
            <View>
                <View style={{
                    width: '92%', margin: 15, backgroundColor: 'white',
                    elevation: 4, borderRadius: 8, paddingHorizontal: 0,
                    shadowColor: 'black',
                    shadowOpacity: 0.2,
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    }, alignItems: 'center'
                }}>

                    <View style={{ width: '100%', flexDirection: 'row', marginTop: 13 }}>
                        <View style={{ width: '89%', flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ color: Colors.black, fontSize: 14, fontWeight: '100', marginLeft: 20 }}>{item.clientType == 'APPL' ? 'Applicant' : item.clientType == 'CO-APPL' ? 'Co-Applicant' : 'Guarantor'}</Text>
                        </View>
                        <TouchableOpacity onPress={() => { showPreView(item.cbResponseHtml) }}
                            style={{ width: '15%', flexDirection: 'row' }}>
                            <View >
                                <Entypo name='dots-three-vertical' size={20} color={Colors.skyBlue} />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: '100%', height: .9, backgroundColor: Colors.line, marginTop: 13 }} />

                    <View style={{ width: '100%', flexDirection: 'row', marginTop: 13, }}>
                        <View style={{ width: '50%' }}>
                            <Text style={{ color: Colors.dimText, fontSize: 13, fontWeight: '400', marginLeft: 20 }}>{language[0][props.language].str_accholdername}</Text>
                        </View>
                        <View style={{ width: '50%' }}>
                            <Text style={{ color: Colors.black, fontSize: 13, fontWeight: '400' }}>:  {item.clientName}</Text>
                        </View>
                    </View>
                    <View style={{ width: '100%', flexDirection: 'row', marginTop: 11, }}>
                        <View style={{ width: '50%' }}>
                            <Text style={{ color: Colors.dimText, fontSize: 13, fontWeight: '400', marginLeft: 20 }}>{language[0][props.language].str_cb}</Text>
                        </View>
                        <View style={{ width: '50%' }}>
                            <Text style={{ color: Colors.black, fontSize: 13, fontWeight: '400' }}>:  {item.cbVendor}</Text>
                        </View>
                    </View>
                    <View style={{ width: '100%', flexDirection: 'row', marginTop: 11, }}>
                        <View style={{ width: '50%' }}>
                            <Text style={{ color: Colors.dimText, fontSize: 13, fontWeight: '400', marginLeft: 20 }}>{language[0][props.language].str_dt}</Text>
                        </View>
                        <View style={{ width: '50%' }}>
                            <Text style={{ color: Colors.black, fontSize: 13, fontWeight: '400' }}>:  {formattedDate}</Text>
                        </View>
                    </View>
                    <View style={{ width: '100%', flexDirection: 'row', marginTop: 11, }}>
                        <View style={{ width: '50%' }}>
                            <Text style={{ color: Colors.dimText, fontSize: 13, fontWeight: '400', marginLeft: 20 }}>{language[0][props.language].str_cbs}</Text>
                        </View>
                        <View style={{ width: '50%' }}>
                            <Text style={{ color: Colors.black, fontSize: 13, fontWeight: '400' }}>:  {item.cbScore}</Text>
                        </View>
                    </View>
                    <View style={{ width: '100%', flexDirection: 'row', marginTop: 11, }}>
                        <View style={{ width: '50%' }}>
                            <Text style={{ color: Colors.dimText, fontSize: 13, fontWeight: '400', marginLeft: 20 }}>{language[0][props.language].str_cbsd}</Text>
                        </View>
                        <View style={{ width: '50%' }}>
                            <View style={item.cdBreDecision == 'Pass' ? styles.approvedbackground : item.cdBreDecision == 'Deviation' ? styles.pendingbackground : styles.rejectedbackground}>
                                <Text style={{ color: Colors.black, fontSize: 14, fontWeight: '100' }}>{item.cdBreDecision}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{ width: '100%', height: 5, backgroundColor: item.cdBreDecision == 'Pass' ? Colors.approvedBorder : item.cdBreDecision == 'Deviation' ? Colors.pendingBorder : Colors.rejectedBorder, marginTop: 13, borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }} />


                </View>
            </View>

        )
    }

    return (

        <View style={{ flex: 1, backgroundColor: '#F3F6F8' }}>
            {loading ? <Loading /> : null}
            <MyStatusBar backgroundColor={'white'} barStyle="dark-content" />
            <ErrorModal isVisible={errorModalVisible} onClose={closeErrorModal} textContent={apiError} textClose={language[0][props.language].str_ok} />
            <View style={{ width: '96%', height: 50, alignItems: 'center', flexDirection: 'row' }}>
                <View style={{ width: '92%' }}>
                    <HeadComp textval={language[0][props.language].str_cbresponseheader} props={props} onGoBack={onGoBack} />
                </View>
                <TouchableOpacity onPress={getcbData} style={{ width: '8%' }} activeOpacity={0.8}>
                    <View >
                        <Ionicons name='refresh-outline' size={25} color={Colors.red} />
                    </View>
                </TouchableOpacity>
            </View>

            <View style={{ width: '100%', justifyContent: 'center', marginBottom: 110 }}>
                <FlatList
                    data={cbResponse}
                    renderItem={listView}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
            <BottomSheet
                visible={bottomSheetVisible}
                //setting the visibility state of the bottom shee
                onBackButtonPress={toggleBottomNavigationView}
                //Toggling the visibility state
                onBackdropPress={toggleBottomNavigationView}
            //Toggling the visibility state
            >
                {/*Bottom Sheet inner View*/}
                <View style={styles.bottomNavigationView}>
                    <View style={{ width: '100%', alignItems: 'center', marginTop: 9 }}>
                        <View style={{ height: 2, width: 70, backgroundColor: Colors.dimText, borderRadius: 20 }} />
                    </View>
                    <View
                        style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text
                            style={{
                                padding: 6,
                                fontSize: 16,
                                color: Colors.black,
                                fontWeight: 400,
                                marginLeft: 10
                            }}>
                            {'Applicant : ' + language[0][props.language].str_Cbreport}
                        </Text>
                    </View>
                    <View style={{ height: 1, width: '100%', backgroundColor: Colors.line }} />

                    <TouchableOpacity onPress={() => { props.navigation.navigate('CBPreview', { htmlcontent: htmlContent }) }}>
                        <View style={{ width: '100%', flexDirection: 'row', marginTop: 10 }}>
                            <View style={{ padding: 15 }}>
                                <FontAwesome name='arrows' size={20} color={Colors.skyBlue} />
                            </View>
                            <View style={{ marginTop: 14 }}>
                                <TextComp textVal={language[0][props.language].str_preview}
                                    textStyle={{ color: Colors.darkblack, fontWeight: 400, fontSize: 16 }} />
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </BottomSheet>
            {/* <View style={styles.fab}>

                {cbResponseStatus == 'Inprogress' &&
                    <ButtonViewComp
                        textValue={language[0][props.language].str_next.toUpperCase()}
                        textStyle={{ color: Colors.white, fontSize: 13, fontWeight: 500 }}
                        viewStyle={Commonstyles.buttonView}
                        innerStyle={Commonstyles.buttonViewInnerStyle}
                        handleClick={updateLoanStatus}
                    />
                }

            </View> */}
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
export default connect(mapStateToProps, mapDispatchToProps)(CBResponseScreen);


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#f5f8fa',
        alignItems: 'center'
    },
    fab: {
        position: 'absolute',
        margin: 0,
        right: 0,
        bottom: 12,
        width: '100%',

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
    rejectedbackground: {
        width: 90, borderColor: Colors.rejectedBorder, backgroundColor: Colors.rejectedBg, alignItems: 'center', padding: 3, borderRadius: 15, borderWidth: 1, marginRight: 10
    },
    bottomNavigationView: {
        backgroundColor: '#fff',
        width: '100%',
        height: 150,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },

});