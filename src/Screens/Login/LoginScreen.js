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
    ToastAndroid,
    KeyboardAvoidingView,
    Dimensions,
    ImageBackground,
    TextInput,
    Alert,
    Platform,
} from 'react-native';

import Feather from 'react-native-vector-icons/Feather';
import apiInstance from '../../Utils/apiInstance';
import jwtDecode from 'jwt-decode';
import Colors from '../../Utils/Colors';
import MyStatusBar from '../../Components/ MyStatusBar';
import Loading from '../../Components/Loading';
import TextComp from '../../Components/TextComp';
import { connect } from 'react-redux';
import { languageAction } from '../../Utils/redux/actions/languageAction';
import { language } from '../../Utils/LanguageString';
import Commonstyles from '../../Utils/Commonstyles';
import ImageComp from '../../Components/ImageComp';
import ActivationCodeModal from '../../Components/ActivationCodeModal';
import CenteredModal from '../../Components/CenteredModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Common from '../../Utils/Common';


const LoginScreen = (props, { navigation }) => {

    const [userID, setUserID] = useState('');
    const [password, setPassword] = useState('');
    const [activationCode, setActivationCode] = useState('');
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const [loading, setLoading] = useState(false);
    const [Visible, setVisible] = useState(false);
    const [activationSuccess, setActivationSuccess] = useState(false);

    useEffect(() => {

    }, []);

    const nav = () => {
        if (userID.length < 3 || password.length < 3) {
            alert(language[0][props.language].str_errlogin)
            return;
        }


        Common.getNetworkConnection().then(value => {
            if (value.isConnected == true) {
                callLogin();
            } else {
                alert(language[0][props.language].str_errinternet)
            }

        })


    }

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
                    console.log("ResponseLoginApi::" + JSON.stringify(response.data));
                    const decodedToken = await jwtDecode(response.data.jwtToken);
                    console.log("LoginJWTDecode::" + JSON.stringify(decodedToken));
                    setLoading(false)
                    setUserID('')
                    setPassword('')
                    global.USERNAME = decodedToken.userName;
                    global.USERID = decodedToken.userId;
                    global.USERTYPEID = decodedToken.userTypeId;
                    global.RefreshToken = response.data.jwtRefreshToken;
                    //setVisible(true);
                    //AsyncStorage.setItem('IsLogin', 'true');

                    loginHandle();
                } else if (response.status == 500) {
                    alert('Login Failed');
                } else {
                    alert('Login Failed');
                }

            })
            .catch((error) => {
                // Handle the error
                setLoading(false)
                alert('Login Failed');
            });
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

                            <TextComp textVal={language[0][props.language].str_forgotpassword} textStyle={{ color: Colors.darkblue, fontSize: 14, fontWeight: 500 }} />


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
                                <TextComp textVal={language[0][props.language].str_login.toUpperCase()} textStyle={{ color: Colors.white, fontSize: 13, fontWeight: 500 }} />

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
                                    textAlign: 'center', fontSize: 7, fontWeight: '500'
                                }}>Business Loan</Text>
                            </View>
                        </View>

                        <View style={{ flex: 0.5, alignItems: 'flex-end' }}>
                            <Image style={{ width: 70, height: 50, resizeMode: 'contain', marginTop: 9 }}
                                source={require('../../Images/cslogo.png')} />
                        </View>

                    </View>

                    <View style={{ marginLeft: 18, marginRight: 18, marginBottom: 9 }}>
                        <Text style={{ color: '#8a8f9d', fontSize: 12 }}>{language[0][props.language].str_termsdesc}<Text style={{ color: '#0294ff' }}>{language[0][props.language].str_terms}</Text> {language[0][props.language].str_and} <Text style={{ color: '#0294ff' }}>{language[0][props.language].str_privacypolicy}</Text></Text>
                    </View>
                    <View>
                        <Text style={{ color: '#8a8f9d', fontSize: 13, }}>{language[0][props.language].str_version}:{global.APPVERSIONNO}</Text>
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
    return {
        language: language
    }
}

const mapDispatchToProps = (dispatch) => ({
    languageAction: (item) => dispatch(languageAction(item)),
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
