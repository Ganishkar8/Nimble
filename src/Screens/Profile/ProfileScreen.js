import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ImageBackground,
    View,
    Platform,
    Alert,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    BackHandler
} from 'react-native';
import Colors from '../../Utils/Colors';
import Commonstyles from '../../Utils/Commonstyles';
import Entypo from 'react-native-vector-icons/Entypo';
import Loading from '../../Components/Loading';
import apiInstance from '../../Utils/apiInstance';
import apiInstancelocal from '../../Utils/apiInstancelocal';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = ({ navigation }) => {

    const [loading, setLoading] = useState(false);
    const [personalInfo, setpersonalInfo] = useState(false);
    const isScreenVisible = useIsFocused();

    useEffect(() => {

        BackHandler.addEventListener('hardwareBackPress', handleBackButton);

        // Remove the event listener when the component unmounts
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
        };

    }, []);

    const handleBackButton = () => {
        BackHandler.exitApp()
        return true; // Prevent default back button behavior
    };

    const onGoBack = () => {
        props.navigation.goBack();
    }

    return (
        // enclose all components in this View tag
        <SafeAreaView style={[styles.parentView, { backgroundColor: Colors.lightwhite }]}>

            <ScrollView style={styles.scrollView}
                contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
                {loading ? <Loading /> : null}
                <View style={{ flex: 1 }}>

                    <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>

                        <View style={{ width: '92%', flexDirection: 'row', marginTop: '12%' }}>
                            <View style={{ width: '25%' }}>
                                <View style={[Commonstyles.circularView, { backgroundColor: Colors.lightblue }]}>
                                    <Image source={require('../../Images/profile_user.png')}
                                        style={{ width: 35, height: 35 }} />
                                </View>
                            </View>



                            <View style={{ width: '75%', justifyContent: 'center', alignSelf: 'center' }}>
                                <Text style={{ textAlign: 'left', fontSize: 20, color: Colors.darkblack, fontFamily: 'PoppinsRegular' }}>{global.USERNAME}</Text>
                                <Text style={{ fontSize: 14, color: Colors.lightgrey, marginTop: 5, fontFamily: 'PoppinsRegular' }}>User ID :{global.USERID}</Text>
                            </View>

                        </View>


                        <TouchableOpacity onPress={() => navigation.navigate('PersonalDetailsScreen', { Info: personalInfo })} activeOpacity={0.5} style={{ width: '92%', marginTop: '15%', alignItems: 'center' }}>
                            <View style={{ flexDirection: 'row' }}>

                                <View style={{ width: '15%' }}>
                                    <Image source={require('../../Images/about.png')}
                                        style={{ width: 21.5, height: 25 }} />
                                </View>

                                <View style={{ width: '67%', justifyContent: 'center' }}>
                                    <Text style={styles.textStyle}>Personal Details</Text>
                                </View>

                                <View style={{ width: '10%' }}></View>
                                <Entypo name='chevron-right' size={23} color={Colors.darkblack} />

                            </View>
                        </TouchableOpacity>

                        {global.USERTYPEID == '1164' && <View style={styles.line}></View>}

                        {global.USERTYPEID == '1164' && <TouchableOpacity onPress={() => navigation.navigate('ProfessionalDetailsScreen')} activeOpacity={0.5} style={{ width: '92%', marginTop: '8%', alignItems: 'center' }}>
                            <View style={{ flexDirection: 'row' }}>

                                <View style={{ width: '15%' }}>
                                    <Image source={require('../../Images/professional.png')}
                                        style={{ width: 25, height: 25 }} />
                                </View>

                                <View style={{ width: '67%', justifyContent: 'center' }}>
                                    <Text style={styles.textStyle}>Professional Details</Text>
                                </View>

                                <View style={{ width: '10%' }}></View>
                                <Entypo name='chevron-right' size={23} color={Colors.darkblack} />

                            </View>
                        </TouchableOpacity>}

                        <View style={styles.line}></View>

                        <TouchableOpacity onPress={() => navigation.navigate('LanguageSettingsScreen')} activeOpacity={0.5} style={{ width: '92%', marginTop: '8%', alignItems: 'center' }}>
                            <View style={{ flexDirection: 'row' }}>

                                <View style={{ width: '15%' }}>
                                    <Image source={require('../../Images/language.png')}
                                        style={{ width: 23, height: 25 }} />
                                </View>

                                <View style={{ width: '67%', justifyContent: 'center' }}>
                                    <Text style={styles.textStyle}>Language Settings</Text>
                                </View>

                                <View style={{ width: '10%' }}></View>
                                <Entypo name='chevron-right' size={23} color={Colors.darkblack} />

                            </View>
                        </TouchableOpacity>

                        <View style={styles.line}></View>


                    </View>


                </View>

                <View style={{ width: '100%', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <View style={{ width: '92%' }}>
                        <TouchableOpacity activeOpacity={0.5} onPress={() => { navigation.replace('LoginScreen'); AsyncStorage.setItem('IsLogin', 'false'); }}>
                            <Text style={{ fontSize: 16, color: Colors.darkblue, marginTop: 5, fontFamily: 'PoppinsRegular' }}>Logout</Text>
                        </TouchableOpacity>
                        <Text style={{ fontSize: 12, color: Colors.lightgrey, marginTop: 5, fontFamily: 'Poppins-Medium' }}>Version {global.APPVERSIONNO}</Text>
                    </View>
                </View>

            </ScrollView>

        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    parentView: {
        flex: 1,

    },
    scrollView: {
        flex: 1,

    },
    contentContainer: {

        paddingBottom: 50,
        flexGrow: 1
    }, line: {
        backgroundColor: '#f1f1f1', // Change the color as needed
        height: 1,
        width: '93%',
        marginTop: '5%'           // Adjust the height as needed
    },
    textStyle: {
        fontSize: 16, color: Colors.mediumgrey, marginTop: 5, fontFamily: 'PoppinsRegular'
    }

});


export default ProfileScreen;
