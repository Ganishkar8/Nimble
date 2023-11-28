import React, { useState, useRef, useEffect, createRef } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    StatusBar,
    Keyboard,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    Linking,
    BackHandler,
    ToastAndroid,
    KeyboardAvoidingView,
    Dimensions,
    ImageBackground,
    TextInput,
    Alert,
    Platform,
    useColorScheme
} from 'react-native';

import Feather from 'react-native-vector-icons/Feather';
import apiInstance from '../../Utils/apiInstance';
import jwtDecode from 'jwt-decode';
import Colors from '../../Utils/Colors';
import MyStatusBar from '../../Components/MyStatusBar';
import Loading from '../../Components/Loading';
import TextComp from '../../Components/TextComp';
import { connect } from 'react-redux';
import { languageAction } from '../../Utils/redux/actions/languageAction';
import { MobileCodeAction } from '../../Utils/redux/actions/MobileCodeAction';
import { language } from '../../Utils/LanguageString';
import Commonstyles from '../../Utils/Commonstyles';
import ImageComp from '../../Components/ImageComp';
import ActivationCodeModal from '../../Components/ActivationCodeModal';
import CenteredModal from '../../Components/CenteredModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Common from '../../Utils/Common';
import { useIsFocused } from '@react-navigation/native';
import ErrorModal from '../../Components/ErrorModal';
import tbl_SystemCodeDetails from '../../Database/Table/tbl_SystemCodeDetails';
import tbl_UserCodeDetails from '../../Database/Table/tbl_UserCodeDetails';
import tbl_leadStage from '../../Database/Table/tbl_leadStage';
import tbl_leadSubStage from '../../Database/Table/tbl_leadSubStage';
import tbl_leadModule from '../../Database/Table/tbl_leadModule';
import tbl_leadPage from '../../Database/Table/tbl_leadPage';
import tbl_leadSystemMandatoryField from '../../Database/Table/tbl_leadSystemMandatoryField';
import { useFocusEffect, useNavigation } from '@react-navigation/native';


const LoginScreen = (props, { navigation }) => {

    const [userID, setUserID] = useState('');
    const [password, setPassword] = useState('');
    const [activationCode, setActivationCode] = useState('');
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const [loading, setLoading] = useState(false);
    const [Visible, setVisible] = useState(false);
    const [activationSuccess, setActivationSuccess] = useState(false);
    const isFocused = useIsFocused();
    const colorScheme = useColorScheme();
    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [apiError, setApiError] = useState('');

    useEffect(() => {
        if (isFocused) {
            BackHandler.addEventListener('hardwareBackPress', handleBackButton);
        }
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
        };
    }, [isFocused]);

    const handleBackButton = () => {
        // Close the app
        BackHandler.exitApp();
        return true;
    };

    const nav = () => {
        if (userID.length < 3 || password.length < 3) {
            //alert(language[0][props.language].str_errlogin)
            setApiError(language[0][props.language].str_errlogin);
            setErrorModalVisible(true)
            return;
        }


        Common.getNetworkConnection().then(value => {
            if (value.isConnected == true) {
                callLogin();
            } else {
                setApiError(language[0][props.language].str_errinternet);
                setErrorModalVisible(true)
                //alert(language[0][props.language].str_errinternet)
            }

        })


    }

    const closeErrorModal = () => {
        setErrorModalVisible(false);
    };

    const handleLinkPress = () => {
        const url = 'https://www.freecodecamp.org/news/how-to-write-helpful-error-messages-to-improve-your-apps-ux/'; // Replace with the URL you want to open
        Linking.openURL(url);
    };

    const callLogin = () => {
        const appDetails = {
            "username": userID,
            "password": password,
        }
        const baseURL = '8908'
        setLoading(true)
        apiInstance(baseURL).post('/api/auth/login', appDetails)
            .then(async (response) => {
                // Handle the response data
                if (response.status == 200) {
                    if (global.DEBUG_MODE) console.log("ResponseLoginApi::" + JSON.stringify(response.data));
                    const decodedToken = await jwtDecode(response.data.jwtToken);
                    if (global.DEBUG_MODE) console.log("LoginJWTDecode::" + JSON.stringify(decodedToken));
                    setLoading(false)
                    setUserID('')
                    setPassword('')
                    global.USERNAME = decodedToken.userName;
                    global.USERID = decodedToken.userId;
                    global.USERTYPEID = decodedToken.userTypeId;
                    global.RefreshToken = response.data.jwtRefreshToken;
                    //setVisible(true);
                    //AsyncStorage.setItem('IsLogin', 'true');
                    callMobileCodeDetail();
                    //loginHandle();

                }

            })
            .catch((error) => {
                // Handle the error
                setLoading(false)
                if (global.DEBUG_MODE) console.log("ResponseLoginApi::" + JSON.stringify(error.response.data));
                if (error.response.data != null) {
                    setApiError(error.response.data.message);
                    setErrorModalVisible(true)
                }
            });
    }


    const callMobileCodeDetail = async () => {
        const baseURL = '8105'
        setLoading(true)
        apiInstance(baseURL).get('/api/v2/lms-master/masterDetails')
            .then(async (response) => {
                // Handle the response data
                if (response.status == 200) {
                    //if (global.DEBUG_MODE) console.log("MobileCodeApi::" + JSON.stringify(response.data));

                    props.MobileCodeAction(response.data)
                    loginHandle();
                    // insertData(response)
                    //     .then(() => {
                    //         setLoading(false)
                    //     })
                    //     .catch((error) => {
                    //         console.error('Error inserting data:', error);
                    //     });
                }

            })
            .catch((error) => {
                // Handle the error
                setLoading(false)
                if (global.DEBUG_MODE) console.log("MobileCodeApi::" + JSON.stringify(error.response.data));
                if (error.response.data != null) {
                    setApiError(error.response.data.message);
                    setErrorModalVisible(true)
                }
            });
    }


    const insertData = async (response) => {


        const deletePromises = [
            tbl_leadStage.deleteAllLeadStage(),
            tbl_leadSubStage.deleteAllLeadSubStage(),
            tbl_leadModule.deleteAllLeadModule,
            tbl_leadPage.deleteAllLeadPage(),
            tbl_leadSystemMandatoryField.deleteAllleadSystemMandatoryField,
            tbl_SystemCodeDetails.deleteAllSystemCodeDetails,
            tbl_UserCodeDetails.deleteAllUserCodeDetails
        ];

        await Promise.all(deletePromises);



        const insertPromises = [];
        const leadStage = response.data.leadStageDto;

        const insertLeadStagePromises = leadStage.map((data) =>
            tbl_leadPage.insertLeadPage(data.id, data.stageCode, data.stageName, data.stageOrder, data.stageDescription, data.createdBy, data.createdDate, data.modifiedBy, data.modifiedDate)
        );

        // for (var i = 0; i < leadStage.length; i++) {
        //     const insertPromise = tbl_leadPage.insertLeadPage(leadStage[i].id, leadStage[i].stageCode, leadStage[i].stageName, leadStage[i].stageOrder, leadStage[i].stageDescription, leadStage[i].createdBy, leadStage[i].createdDate, leadStage[i].modifiedBy, leadStage[i].modifiedDate);
        //     insertPromises.push(insertPromise);
        // }


        const leadSubStage = response.data.leadSubStageDto;

        const insertLeadSubStagePromises = leadSubStage.map((data) =>
            tbl_leadSubStage.insertLeadSubStage(data.id, data.stageId, data.subStageCode, data.subStageName, data.subStageDescription, data.displayOrder, data.createdBy, data.createdDate, data.modifiedBy, data.modifiedDate)
        );

        // for (var i = 0; i < leadSubStage.length; i++) {
        //     const insertPromise = tbl_leadSubStage.insertLeadSubStage(leadSubStage[i].id, leadSubStage[i].stageId, leadSubStage[i].subStageCode, leadSubStage[i].subStageName, leadSubStage[i].subStageDescription, leadSubStage[i].displayOrder, leadSubStage[i].createdBy, leadSubStage[i].createdDate, leadSubStage[i].modifiedBy, leadSubStage[i].modifiedDate);
        //     insertPromises.push(insertPromise);
        // }

        const leadModule = response.data.leadModuleDto;

        const insertLeadModulePromises = leadModule.map((data) =>
            tbl_leadModule.insertLeadModule(data.id, data.subStageId, data.moduleName, data.moduleCode, data.moduleDescription, data.displayOrder, data.createdBy, data.createdDate, data.modifiedBy, data.modifiedDate, data.active, data.hide, data.disable)
        );

        // for (var i = 0; i < leadModule.length; i++) {
        //     const insertPromise = tbl_leadModule.insertLeadModule(leadModule[i].id, leadModule[i].subStageId, leadModule[i].moduleName, leadModule[i].moduleCode, leadModule[i].moduleDescription, leadModule[i].displayOrder, leadModule[i].createdBy, leadModule[i].createdDate, leadModule[i].modifiedBy, leadModule[i].modifiedDate, leadModule[i].active, leadModule[i].hide, leadModule[i].disable);
        //     insertPromises.push(insertPromise);
        // }

        const leadPage = response.data.leadPageDto;

        const insertLeadPagePromises = leadPage.map((data) =>
            tbl_leadPage.insertLeadPage(data.id, data.moduleId, data.pageName, data.pageCode, data.pageDescription, data.displayOrder, data.moduleTypeId, data.createdBy, data.createdDate, data.modifiedBy, data.modifiedDate, data.active, data.hide, data.disable)
        );

        // for (var i = 0; i < leadPage.length; i++) {
        //     const insertPromise = tbl_leadPage.insertLeadPage(leadPage[i].id, leadPage[i].moduleId, leadPage[i].pageName, leadPage[i].pageCode, leadPage[i].pageDescription, leadPage[i].displayOrder, leadPage[i].moduleTypeId, leadPage[i].createdBy, leadPage[i].createdDate, leadPage[i].modifiedBy, leadPage[i].modifiedDate, leadPage[i].active, leadPage[i].hide, leadPage[i].disable);
        //     insertPromises.push(insertPromise);
        // }

        const leadSystemMandatoryField = response.data.leadSystemMandatoryFieldDto;

        const insertLeadSystemMandatoryFieldPromises = leadSystemMandatoryField.map((data) =>
            tbl_leadSystemMandatoryField.insertLeadSystemMandatoryField(data.id, data.pageId, data.fieldName, data.fieldUiid, data.fieldTabId, data.fieldDescription, data.fieldCaptionChange, data.moduleTypeId, data.displayOrder, data.minLength, data.maxLength, data.createdBy, data.createdDate, data.modifiedBy, data.modifiedDate, data.hide, data.disable, data.captionChange)
        );

        // for (var i = 0; i < leadSystemMandatoryField.length; i++) {
        //     const insertPromise = tbl_leadSystemMandatoryField.insertLeadSystemMandatoryField(leadSystemMandatoryField[i].id, leadSystemMandatoryField[i].pageId, leadSystemMandatoryField[i].fieldName, leadSystemMandatoryField[i].fieldUiid, leadSystemMandatoryField[i].fieldTabId, leadSystemMandatoryField[i].fieldDescription, leadSystemMandatoryField[i].fieldCaptionChange, leadSystemMandatoryField[i].moduleTypeId, leadSystemMandatoryField[i].displayOrder, leadSystemMandatoryField[i].minLength, leadSystemMandatoryField[i].maxLength, leadSystemMandatoryField[i].createdBy, leadSystemMandatoryField[i].createdDate, leadSystemMandatoryField[i].modifiedBy, leadSystemMandatoryField[i].modifiedDate, leadSystemMandatoryField[i].hide, leadSystemMandatoryField[i].disable, leadSystemMandatoryField[i].captionChange);
        //     insertPromises.push(insertPromise);
        // }


        const leadSystemCode = response.data.leadSystemCodeDto;


        const insertLeadSystemCodePromises = leadSystemCode.map((data) =>
            tbl_SystemCodeDetails.insertSystemCodeDetails(data.id, data.masterId, data.subCodeId, data.label, data.source, data.displayOrder, data.isDefault, data.isActive, data.parentId, data.createdBy, data.createdDate, data.modifiedBy, data.modifiedDate, data.active)
        );

        // for (var i = 0; i < leadSystemCode.length; i++) {
        //     const insertPromise = tbl_SystemCodeDetails.insertSystemCodeDetails(leadSystemCode[i].id, leadSystemCode[i].masterId, leadSystemCode[i].subCodeId, leadSystemCode[i].label, leadSystemCode[i].source, leadSystemCode[i].displayOrder, leadSystemCode[i].isDefault, leadSystemCode[i].isActive, leadSystemCode[i].parentId, leadSystemCode[i].createdBy, leadSystemCode[i].createdDate, leadSystemCode[i].modifiedBy, leadSystemCode[i].modifiedDate, leadSystemCode[i].active);
        //     insertPromises.push(insertPromise);
        // }

        const leadUserCode = response.data.leadUserCodeDto;

        const insertLeadUserCodePromises = leadUserCode.map((data) => {
            // alert('hi');
            tbl_UserCodeDetails.insertUserCodeDetails(data.id, data.masterId, data.subCodeId, data.label, data.source, data.platformRestriction, data.display_order, data.is_default, data.is_active, data.parent_id, data.createdBy, data.createdDate, data.modifiedBy, data.modifiedDate, data._active)
        });

        // for (var i = 0; i < leadUserCode.length; i++) {
        //     const insertPromise = tbl_UserCodeDetails.insertUserCodeDetails(leadUserCode[i].id, leadUserCode[i].masterId, leadUserCode[i].subCodeId, leadUserCode[i].label, leadUserCode[i].source, leadUserCode[i].platformRestriction, leadUserCode[i].display_order, leadUserCode[i].is_default, leadUserCode[i].is_active, leadUserCode[i].parent_id, leadUserCode[i].createdBy, leadUserCode[i].createdDate, leadUserCode[i].modifiedBy, leadUserCode[i].modifiedDate, leadUserCode[i]._active);
        //     insertPromises.push(insertPromise);
        // }

        // insertPromises.push(
        //     insertLeadStagePromises,
        //     insertLeadSubStagePromises,
        //     insertLeadModulePromises,
        //     insertLeadPagePromises,
        //     insertLeadSystemMandatoryFieldPromises,
        //     insertLeadSystemCodePromises,
        //     insertLeadUserCodePromises,
        // );

        insertPromises.push(...insertLeadStagePromises);
        insertPromises.push(...insertLeadSubStagePromises);
        insertPromises.push(...insertLeadModulePromises);
        insertPromises.push(...insertLeadPagePromises);
        insertPromises.push(...insertLeadSystemMandatoryFieldPromises);
        insertPromises.push(...insertLeadSystemCodePromises);
        insertPromises.push(...insertLeadUserCodePromises);

        await Promise.all(insertPromises);

    }

    const updateSecureTextEntry = () => {
        if (!secureTextEntry) {
            setSecureTextEntry(true);
        } else {
            setSecureTextEntry(false);
        }
    };

    const loginHandle = () => {
        setActivationSuccess(false);
        props.navigation.replace('BottomNavigation');
    };

    const handleClick = (name, text) => {
        //alert(institutionID)
        setActivationCode(text)
    };

    const onClose = (name) => {
        if (name == 'Proceed') {
            setVisible(false);
            setActivationSuccess(true);
        } else {
            setVisible(false);
        }

    };

    return (

        <View style={{ flex: 1, backgroundColor: Colors.lightwhite }}>
            <MyStatusBar backgroundColor={'white'} barStyle="dark-content" />

            <ErrorModal isVisible={errorModalVisible} onClose={closeErrorModal} textContent={apiError} textClose={language[0][props.language].str_ok} />

            <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" >
                {loading ? <Loading /> : null}
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>

                    <View style={{ width: '100%', flexDirection: 'row', }}>

                        <View style={{ width: '100%', }}>
                            <ImageComp imageSrc={require('../../Images/loginbg.png')} imageStylee={{ width: 160, height: 160 }} />
                        </View>

                        <View style={{ width: '55%', }}>

                        </View>

                    </View>

                    <View style={{ width: '100%', marginTop: 30, alignItems: 'center' }}>

                        <TextComp textVal={language[0][props.language].str_login} textStyle={[Commonstyles.boldtextStyle, { fontSize: 22, width: '90%' }]} />
                        {/* <TextComp textVal={language[0][props.language].str_logindesc} textStyle={{ color: Colors.lightgrey, fontSize: 14, marginTop: 7 }} /> */}

                    </View>


                    <View style={{ width: '100%', marginTop: 24, paddingHorizontal: 0, alignItems: 'center', justifyContent: 'center' }}>

                        <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, }}>
                            <TextComp textVal={language[0][props.language].str_userid.toUpperCase()} textStyle={Commonstyles.inputtextStyle} />
                        </View>

                        <View style={{ width: '92%', marginTop: 3, }}>

                            <TextInput
                                value={userID}
                                onChangeText={txt => setUserID(txt)}
                                placeholder={language[0][props.language].str_useridholder}
                                placeholderTextColor={Colors.lightgrey}
                                secureTextEntry={false}
                                autoCapitalize="none"
                                contextMenuHidden={true}
                                style={Commonstyles.textinputtextStyle}
                            />

                        </View>

                        <View style={{ width: '90%', paddingHorizontal: 0, borderBottomWidth: 1, borderBottomColor: '#e2e2e2' }} />


                    </View>


                    <View style={{
                        width: '100%', marginTop: 16, paddingHorizontal: 0,
                        alignItems: 'center', justifyContent: 'center',
                    }}>

                        <View style={{ width: '90%', marginTop: 0, }}>
                            <TextComp textVal={language[0][props.language].str_password} textStyle={Commonstyles.inputtextStyle} />
                        </View>

                        <View style={{
                            width: '92%', marginTop: 6, flexDirection: 'row',
                        }}>

                            <TextInput
                                value={password}
                                onChangeText={password => setPassword(password)}
                                placeholder={language[0][props.language].str_passwordholder}
                                placeholderTextColor={Colors.lightgrey}
                                secureTextEntry={secureTextEntry ? true : false}
                                style={Commonstyles.textinputtextStyle}
                                contextMenuHidden={true}
                            />


                            <View style={{ width: '10%', height: 48, justifyContent: 'center' }}>
                                <TouchableOpacity onPress={updateSecureTextEntry}>
                                    {secureTextEntry ? (
                                        <View
                                            style={{
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}>
                                            <Feather name='eye-off' color={'#a1a5b7'} size={20} />
                                        </View>
                                    ) : (
                                        <View
                                            style={{
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}>
                                            <Feather name='eye' color={'#a1a5b7'} size={20} />
                                        </View>
                                    )}
                                </TouchableOpacity>
                            </View>

                        </View>

                        <View style={{ width: '90%', paddingHorizontal: 0, borderBottomWidth: 1, borderBottomColor: '#e2e2e2' }} />


                    </View>

                    <View
                        style={{
                            width: '100%',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: 16
                        }}>

                        <View
                            style={{
                                width: '90%',
                                height: 40,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'flex-end',
                            }}>

                            <TextComp textVal={language[0][props.language].str_forgotpassword} textStyle={{ color: Colors.darkblue, fontSize: 14, fontFamily: 'Poppins-Medium', }} />


                        </View>
                    </View>

                    <View
                        style={{
                            width: '100%',
                            height: 50,
                            marginTop: 24,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <TouchableOpacity onPress={nav} activeOpacity={10} style={{
                            width: '88%', height: 50, backgroundColor: '#0294ff',
                            borderRadius: 45, alignItems: 'center', justifyContent: 'center'
                        }}>
                            <View >
                                <TextComp textVal={language[0][props.language].str_login.toUpperCase()} textStyle={Commonstyles.buttonTextStyle} />

                            </View>
                        </TouchableOpacity>
                    </View>


                </View>


                <View style={{ justifyContent: 'flex-end', alignItems: 'center', marginBottom: 25 }}>
                    <View style={{
                        width: '92%', flexDirection: 'row', alignItems: 'center',
                        justifyContent: 'space-between', paddingVertical: 20
                    }}>
                        <View style={{ alignItems: 'flex-start', flex: 0.5 }}>
                            <Image style={{ width: 70, height: 28, resizeMode: 'contain' }}
                                source={require('../../Images/nimble.png')} />
                            <View style={{ alignItems: 'center' }}>
                                <Text style={{
                                    marginLeft: 20, color: '#4e4e4e',
                                    textAlign: 'center', fontSize: 7, fontFamily: 'PoppinsRegular',
                                }}>Business Loan</Text>
                            </View>
                        </View>

                        <View style={{ flex: 0.5, alignItems: 'flex-end' }}>
                            <Image style={{ width: 70, height: 50, resizeMode: 'contain', marginTop: 9 }}
                                source={require('../../Images/cslogo.png')} />
                        </View>

                    </View>

                    <View style={{ marginLeft: 18, marginRight: 18, marginBottom: 9 }}>
                        <Text style={{ color: '#8a8f9d', fontSize: 12, fontFamily: 'PoppinsRegular', }}>{language[0][props.language].str_termsdesc}<Text onPress={handleLinkPress} style={{ color: '#0294ff' }}>{language[0][props.language].str_terms}</Text> {language[0][props.language].str_and} <Text onPress={handleLinkPress} style={{ color: '#0294ff' }}>{language[0][props.language].str_privacypolicy}</Text></Text>
                    </View>
                    <View>
                        <Text style={{ color: '#8a8f9d', fontSize: 13, fontFamily: 'PoppinsRegular', }}>{language[0][props.language].str_version}:{global.APPVERSIONNO}</Text>
                    </View>
                </View>


                <ActivationCodeModal isVisible={Visible} onClose={onClose} textValue={language[0][props.language].str_plsenteractv} textValue1={language[0][props.language].str_actvcode}
                    textinputValue={activationCode} handleClick={handleClick} textCancel={language[0][props.language].str_cancel} textProceed={language[0][props.language].str_proceed} />

                <CenteredModal isVisible={activationSuccess} onClose={loginHandle} textContent={language[0][props.language].str_actvsuccess} textClose={language[0][props.language].str_ok} />

            </ScrollView>




        </View>
    );
};


const mapStateToProps = (state) => {
    const { language } = state.languageReducer;
    const { mobileCodeDetails } = state.mobilecodeReducer;
    return {
        language: language,
        mobilecodedetail: mobileCodeDetails
    }
}

const mapDispatchToProps = (dispatch) => ({
    languageAction: (item) => dispatch(languageAction(item)),
    MobileCodeAction: (item) => dispatch(MobileCodeAction(item)),
});


export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    },
    bottomView: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 8,
    },

    welcome: {
        margin: 16,
        fontSize: 20,
        textAlign: 'center',
    },

    bottomView: {
        width: '100%', alignItems: 'center', justifyContent: 'flex-end',
        marginTop: 5, position: 'absolute', bottom: 0, marginBottom: 25
    },
});
