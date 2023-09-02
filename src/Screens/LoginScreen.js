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
import apiInstance from '../Utils/apiInstance';
import jwtDecode from 'jwt-decode';

const LoginScreen = ({ navigation }) => {

    const [userID, setUserID] = useState('');
    const [password, setPassword] = useState('');
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

    }, []);

    const nav = () => {
        if(userID.length < 3 || password.length<3){
            alert('please enter valid details')
            return;
        }
        const appDetails = {
            "username": userID,
            "password": password
        }
        const baseURL = '8081'
        apiInstance(baseURL).post('/api/auth/login', appDetails)
            .then((response) => {
                // Handle the response data
                console.log("ResponseLoginApi::" + JSON.stringify(response.data));
                const decodedToken = jwtDecode(response.data.jwtToken);
                console.log("LoginJWTDecode::" + JSON.stringify(decodedToken));
            })
            .catch((error) => {
                // Handle the error
                console.error("ErrorLoginApi::" + error);
            });
    }


    const updateSecureTextEntry = () => {
        if (!secureTextEntry) {
            setSecureTextEntry(true);
        } else {
            setSecureTextEntry(false);
        }
    };

    const loginHandle1 = () => {
        navigation.navigate('CusRegister');
    };

    return (

        <View style={{ flex: 1, backgroundColor: '#fefefe' }}>
            <StatusBar backgroundColor={'#000'} barStyle="light-content" />
            <ScrollView showsVerticalScrollIndicator={false} >
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>

                    <View style={{ width: '100%', flexDirection: 'row', }}>
                        <View style={{ width: '100%', }}>
                            <Image source={require('../Images/loginbg.png')}
                                style={{ width: 140, height: 140, resizeMode: 'contain' }} />
                        </View>
                        <View style={{ width: '55%', }}>

                        </View>

                    </View>
                    <View style={{ width: '100%', marginTop: 30, paddingHorizontal: 16, }}>
                        <Text
                            style={{
                                color: '#000',
                                fontSize: 22,
                                fontWeight: '500',
                            }}>
                            Login
                        </Text>

                        <Text
                            style={{
                                color: '#8a8f9d',
                                fontSize: 14,
                                fontWeight: '400',
                                marginTop: 7
                            }}>
                            Please enter your User ID and Password
                        </Text>
                    </View>


                    <View style={{
                        width: '100%', marginTop: 19, paddingHorizontal: 0,
                        alignItems: 'center', justifyContent: 'center'
                    }}>

                        <View style={{
                            width: '90%', marginTop: 3,
                            paddingHorizontal: 0,
                        }}>
                            <Text
                                style={{
                                    color: '#707070',
                                    fontSize: 14,
                                    paddingHorizontal: 0,
                                    fontWeight: '400',
                                }}>
                                USER ID
                            </Text>
                        </View>

                        <View style={{
                            width: '90%', marginTop: 3,
                            paddingHorizontal: 0, borderBottomWidth: 1, borderBottomColor: '#e2e2e2'
                        }}>

                            <TextInput
                                value={userID}
                                onChangeText={txt => setUserID(txt)}
                                placeholder={'User ID'}
                                placeholderTextColor="#bbbdc1"
                                secureTextEntry={false}
                                autoCapitalize="none"
                                style={{
                                    width: '90%',
                                    height: 43,
                                    fontSize: 15,
                                    fontWeight: '400',

                                }}
                            />

                        </View>

                    </View>


                    <View style={{
                        width: '100%', marginTop: 15, paddingHorizontal: 0,
                        alignItems: 'center', justifyContent: 'center',
                    }}>

                        <View style={{ width: '90%', marginTop: 0, }}>
                            <Text
                                style={{
                                    color: '#707070',
                                    fontSize: 14,
                                    paddingHorizontal: 0,
                                    fontWeight: '400',
                                }}>
                                PASSWORD
                            </Text>

                        </View>

                        <View style={{
                            width: '90%', marginTop: 6, flexDirection: 'row',
                            borderBottomWidth: 1, borderBottomColor: '#e2e2e2'
                        }}>

                            <TextInput
                                value={password}
                                onChangeText={password => setPassword(password)}
                                placeholder={'Password'}
                                placeholderTextColor="#bbbdc1"
                                secureTextEntry={secureTextEntry ? true : false}
                                style={{
                                    width: '90%',
                                    fontSize: 15,
                                    fontWeight: '400',
                                    height: 43,
                                }}
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

                    </View>

                    <View
                        style={{
                            width: '100%',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: 20,
                        }}>

                        <View
                            style={{
                                width: '90%',
                                height: 40,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'flex-end',
                            }}>
                            <Text
                                style={{
                                    color: '#0294ff',
                                    fontSize: 14,
                                    marginRight: 0,
                                    fontWeight: '400'
                                }}>
                                Forgot Password ?
                            </Text>
                        </View>
                    </View>

                    <View
                        style={{
                            width: '100%',
                            height: 50,
                            marginTop: 10,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <TouchableOpacity onPress={nav} activeOpacity ={10} style={{
                            width: '88%', height: 43, backgroundColor: '#0294ff',
                            borderRadius: 45, alignItems: 'center', justifyContent: 'center'
                        }}>
                            <View >
                                <Text style={{ color: '#fff', fontSize: 13, fontWeight: '500' }}>LOGIN</Text>
                            </View>
                        </TouchableOpacity>
                    </View>


                    <View style={{ width: '92%', flexDirection: 'row', justifyContent: 'space-between', marginTop: 8, marginTop: 20 }}>
                        <View>
                            <Image style={{ width: 60, height: 40, resizeMode: 'contain' }} source={require('../Images/nimble.png')} />
                            <View>
                                <Text style={{ color: '#707070', fontSize: 13, fontWeight: '500', marginTop: 5 }}>Business Loan</Text>
                            </View>
                        </View>

                        <View>
                            <Image style={{ width: 60, height: 40, resizeMode: 'contain', marginTop: 9 }} source={require('../Images/cslogo.png')} />
                        </View>

                    </View>
                </View>
            </ScrollView>
            <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', marginTop: 5, position: 'absolute', bottom: -630, top: 0 }}>
                <View style={{ margin: 18 }}>
                    <Text style={{ color: '#8a8f9d', fontSize: 12 }}>By continuing you agree to our <Text style={{ color: '#0294ff' }}>Terms</Text> and <Text style={{ color: '#0294ff' }}>Privacy policy</Text></Text>
                </View>
                <View>
                    <Text style={{ color: '#707070', fontSize: 13, fontWeight: '500' }}>Version:1.0.0</Text>
                </View>
            </View>
        </View>
    );
};

export default LoginScreen;

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
});
