import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ImageBackground,
    View,
    Platform,
    TouchableOpacity,
    Alert,
    Image,
    StatusBar,
    Text,
    ScrollView,
    BackHandler,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../../Utils/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MyStatusBar from '../../Components/MyStatusBar';
import Loading from '../../Components/Loading';
import { Dimensions } from 'react-native';
import apiInstance from '../../Utils/apiInstance';
import { connect } from 'react-redux';
import { languageAction } from '../../Utils/redux/actions/languageAction';
import { profileAction } from '../../Utils/redux/actions/ProfileAction';
import { useIsFocused } from '@react-navigation/native';
import ErrorModal from '../../Components/ErrorModal';
import Common from '../../Utils/Common';
import { language } from '../../Utils/LanguageString';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = (props, { navigation }) => {

    const [loading, setLoading] = useState(false);
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;
    const [userName, setUserName] = useState('');
    const isScreenVisible = useIsFocused();
    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [apiError, setApiError] = useState('');

    useEffect(() => {

        Common.getNetworkConnection().then(value => {
            if (value.isConnected == true) {
                getProfileDetails();
            } else {
                setApiError(language[0][props.language].str_errinternet);
                setErrorModalVisible(true)
                //alert(language[0][props.language].str_errinternet)
            }

        })
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);

        // Remove the event listener when the component unmounts
        return () => {
            backHandler.remove();
        };
    }, []);

    const handleBackButton = () => {
        BackHandler.exitApp()
        return true; // Prevent default back button behavior
    };

    const closeErrorModal = () => {
        setErrorModalVisible(false);
    };



    const getProfileDetails = () => {

        const baseURL = '8901'
        setLoading(true)
        apiInstance(baseURL).post(`api/v1/user-personal-details/userID/${global.USERID}`)
            .then(async (response) => {
                // Handle the response data
                if (global.DEBUG_MODE) console.log("ResponseHomeScreenApi::" + JSON.stringify(response.data));
                setLoading(false)
                global.USERNAME = response.data.userPersonalDetailsDto.userName;
                setUserName(response.data.userPersonalDetailsDto.userName);
                props.profileAction(response.data)

            })
            .catch((error) => {
                // Handle the error
                if (global.DEBUG_MODE) console.log("ResponseHomeScreenApi::" + JSON.stringify(error.response))
                setLoading(false)
                if (error.response.data != null) {
                    setApiError(error.response.data.message);
                    setErrorModalVisible(true)
                }
            });

    }

    return (

        <View style={{ flex: 1 }}>
            <MyStatusBar backgroundColor={'white'} barStyle="dark-content" />

            <ErrorModal isVisible={errorModalVisible} onClose={closeErrorModal} textContent={apiError} textClose={language[0][props.language].str_ok} />

            {loading ? <Loading /> : null}
            <ImageBackground style={{ flex: 1 }} source={require('../../Images/home_bg.png')}>

                <View style={{ flex: 1 }}>
                    <ScrollView style={styles.scrollView}
                        contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" >
                        <View style={{ flex: 1 }}>

                            <View style={{
                                width: '100%', marginLeft: '3.4%', marginTop: '6.6%',
                                flexDirection: 'row', alignItems: 'center', paddingHorizontal: 5
                            }}>

                                <Text style={{ textAlign: 'left', flex: 0.9, fontSize: 20, color: '#4e4e4e', fontFamily: 'PoppinsRegular' }}>Hi! {userName}</Text>

                                {/* <Image source={require('../../Images/notification_bellicon.png')}
                                    style={styles.tinyLogo} /> */}

                            </View>

                            <Text
                                style={{
                                    width: '100%',
                                    marginLeft: '3.4%',
                                    fontSize: 14,
                                    color: '#4e4e4e',
                                    marginTop: 5,
                                    paddingHorizontal: 5,
                                    fontFamily: 'PoppinsRegular'
                                }}>
                                User ID :{global.USERID}
                            </Text>
                            <View
                                style={{
                                    width: '100%',
                                    marginTop: '4%',
                                    flexDirection: 'column',
                                    marginLeft: '3.4%',
                                }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text
                                        style={{ fontSize: 16, color: '#4e4e4e', marginTop: '5%', fontFamily: 'Poppins-Medium' }}>
                                        Quick Items
                                    </Text>

                                    {/* <View style={{ height: '75%', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>

        <View style={{ flexDirection: 'column' }}>
            <View style={styles.circularView}>
            <Image source={require('../Images/money.png')}
            style={{width:20,height:20}} />
            </View>
            <Text style={{ fontSize: 12, color: '#4e4e4e', marginTop:8, textAlign: 'center', }}>Products</Text>
        </View>

        <View style={{ flexDirection: 'column', flex: 0.25 }}>
            <View style={styles.circularView1}>
            <Image source={require('../Images/calculator.png')}
            style={{width:20,height:20}} />
            </View>
            <Text style={{ fontSize: 12, color: '#4e4e4e', marginTop:8, textAlign: 'center' }}>Calculator</Text>
        </View>

        <TouchableOpacity onPress={()=>navigation.navigate('LoanApplicationTracker')} activeOpacity ={10} style={{ flexDirection: 'column', flex: 0.25 }}>
        <View>
            <View style={styles.circularView2}>
            <Image source={require('../Images/lead_list.png')}
            style={{width:20,height:23}} />
            </View>
            <Text style={{ fontSize: 12, color: '#4e4e4e', marginTop:8, textAlign: 'center' }}>Application</Text>
        </View>
        </TouchableOpacity>

        <View style={{ flexDirection: 'column', alignItems: 'center', flex: 0.25 }}>
            <View style={styles.circularView3}>
            <Image source={require('../Images/iconly_broken_profile.png')}
            style={{width:22,height:26}} />
            </View>
            <Text style={{ fontSize: 12, color: '#4e4e4e', marginTop:8 }}>Lead</Text>
        </View>

    </View> */}
                                </View>

                                <View style={{ width: '93%', height: 170, justifyContent: 'space-between', flexDirection: 'row', marginTop: '4%' }}>


                                    <TouchableOpacity onPress={() => props.navigation.navigate('LeadManagement', { fromScreen: 'HomeScreen' })} activeOpacity={0.5} style={{ width: '48%', height: '100%', backgroundColor: '#ffffff99', borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
                                        <View>

                                            <View style={{ flexDirection: 'column' }}>
                                                <View style={styles.circularView1}>
                                                    <Image source={require('../../Images/profile.png')}
                                                        style={{ width: 20, height: 25 }} />
                                                </View>
                                                <Text style={styles.textstyle1}>Lead{'\n'}Tracker</Text>
                                            </View>

                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => props.navigation.navigate('LoanApplicationTracker', { fromScreen: 'HomeScreen' })} activeOpacity={0.5} style={{ width: '48%', height: '100%', backgroundColor: '#ffffff99', borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
                                        <View >
                                            <View style={{ flexDirection: 'column' }}>
                                                <View style={styles.circularView1}>
                                                    <Image source={require('../../Images/lead_list.png')}
                                                        style={{ width: 22.5, height: 25 }} />
                                                </View>
                                                <Text style={styles.textstyle1}>Application{'\n'}Tracker</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </View>

                                {global.USERTYPEID == '1164' &&

                                    <TouchableOpacity onPress={() => {
                                        global.LEADTYPE = 'NEW';
                                        global.leadID = '';
                                        global.leadNumber = '';
                                        props.navigation.navigate('LeadCreationBasic', { leadData: [] })
                                    }} activeOpacity={0.5} style={{ width: '93%', height: 150, backgroundColor: '#ffffff99', marginTop: '3.5%', borderRadius: 10 }}>
                                        <View >

                                            <View style={{ flexDirection: 'column' }}>
                                                <View style={[styles.circularView1, { marginTop: '4%', marginLeft: '4%' }]}>
                                                    <Image source={require('../../Images/profile.png')}
                                                        style={{ width: 20, height: 25 }} />
                                                </View>

                                                <View style={{ width: '100%', height: '23%', flexDirection: 'row', marginTop: 23 }}>

                                                    <View style={{ width: '75%', justifyContent: 'flex-end' }}>
                                                        <Text style={[styles.textstyle, { marginLeft: '8%' }]}>New Lead Initiation</Text>

                                                    </View>

                                                    <View style={{ width: '25%' }}>

                                                        <TouchableOpacity onPress={() => {
                                                            global.LEADTYPE = 'NEW';
                                                            global.leadID = '';
                                                            global.leadNumber = '';
                                                            props.navigation.navigate('LeadCreationBasic', { leadData: [] })
                                                        }} activeOpacity={0.5} style={{ width: '70%', height: '100%', backgroundColor: '#0294ff', borderRadius: 25, alignItems: 'center', justifyContent: 'center' }}>
                                                            <View >
                                                                <Image source={require('../../Images/forward_icon.png')}
                                                                    style={{ width: 15, height: 9 }} />
                                                            </View>
                                                        </TouchableOpacity>
                                                    </View>


                                                </View>

                                            </View>

                                        </View>
                                    </TouchableOpacity>
                                }


                                {global.USERTYPEID == '1164' &&
                                    <TouchableOpacity onPress={() => {
                                        props.navigation.navigate('ConsentScreen');
                                        global.isDedupeDone = '0';
                                        global.isMobileVerified = '0';
                                        global.CLIENTID = '';
                                        global.isAadharVerified = '';
                                        global.LOANAPPLICATIONID = '';
                                        global.COMPLETEDMODULE = '';
                                        global.COMPLETEDPAGE = '';
                                    }} activeOpacity={0.5} style={{ width: '93%', height: 150, backgroundColor: '#ffffff99', marginTop: '3.5%', borderRadius: 10 }}>
                                        <View >

                                            <View style={{ flexDirection: 'column' }}>
                                                <View style={[styles.circularView1, { marginTop: '4%', marginLeft: '4%' }]}>
                                                    <Image source={require('../../Images/lead_list.png')}
                                                        style={{ width: 22.5, height: 25 }} />
                                                </View>

                                                <View style={{ width: '100%', height: '23%', flexDirection: 'row', marginTop: 23 }}>

                                                    <View style={{ width: '75%', justifyContent: 'flex-end' }}>
                                                        <Text style={[styles.textstyle, { marginLeft: '8%' }]}>New Application Initiation</Text>

                                                    </View>

                                                    <View style={{ width: '25%' }}>
                                                        <TouchableOpacity onPress={() => {
                                                            props.navigation.navigate('ConsentScreen');
                                                            global.isDedupeDone = '0';
                                                            global.isMobileVerified = '0';
                                                            global.CLIENTID = '';
                                                            global.isAadharVerified = '';
                                                            global.LOANAPPLICATIONID = '';
                                                            global.COMPLETEDMODULE = '';
                                                            global.COMPLETEDPAGE = '';
                                                        }} activeOpacity={0.5} style={{ width: '70%', height: '100%', backgroundColor: '#0294ff', borderRadius: 25, alignItems: 'center', justifyContent: 'center' }}>
                                                            <View >
                                                                <Image source={require('../../Images/forward_icon.png')}
                                                                    style={{ width: 15, height: 9 }} />
                                                            </View>
                                                        </TouchableOpacity>
                                                    </View>

                                                </View>

                                            </View>

                                        </View>
                                    </TouchableOpacity>

                                }


                            </View>

                            {/* <View style={{ width: '95%', height: '28%', borderRadius: 10, marginTop: '6%', backgroundColor: '#ffffff', flexDirection: 'column' }}>

<LinearGradient
    colors={['#d1ecff', '#ffffff']}
    // For a vertical gradient (as in your example), set x: 0 and x: 1
    style={{ flex: 1, borderRadius: 10 }}>

    <View style={{ marginLeft: '7%', flexDirection: 'column' }}>

        <Text style={{ fontSize: 15, color: '#343434', marginTop: '8%' }}>New</Text>

        <Text style={{ fontSize: 15, color: '#343434', marginTop: '3%', fontWeight: 'bold', }}>MSME  Loan</Text>

        <Text style={{ fontSize: 12, color: '#979797', marginTop: '3%' }}>New Application Initiation</Text>


    </View>


    <View style={{ width: '40%', height: '20%',marginLeft:'7%',marginTop:'7%',alignItems:'center',justifyContent:'center',flexDirection:'row', backgroundColor: Colors.darkblue,borderRadius:20 }}>
    
    <Text style={{flex:0.8, fontSize: 14, color: '#ffffff',marginLeft:'7%' }}>Get Started</Text>

    <AntDesign
        name={'arrowright'}
        size={18}
        color={'#ffffff'}
    //style={[styles.buttonIcon, { color: Colors.textBlue }]}
    />

    </View>

</LinearGradient>




</View> */}
                        </View>
                    </ScrollView>
                </View>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    parentView: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        flexDirection: 'column',
    },
    imageStyle: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageStyle1: {
        width: 230,
        height: 100,
        resizeMode: 'contain',
    },
    imageStyleLogo: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
    },
    tinyLogo: {
        width: 17,
        height: 21,
        justifyContent: 'center',
    },
    circularView: {
        width: 60,
        height: 60,
        borderRadius: 50,
        backgroundColor: '#e3dbd4',
        justifyContent: 'center',
        alignItems: 'center',
    },
    circularView1: {
        width: 60,
        height: 60,
        borderRadius: 50,
        backgroundColor: '#AAF2D4',
        justifyContent: 'center',
        alignItems: 'center',
    },
    circularView2: {
        width: 60,
        height: 60,
        borderRadius: 50,
        backgroundColor: '#d7f0db',
        justifyContent: 'center',
        alignItems: 'center',
    },
    circularView3: {
        width: 60,
        height: 60,
        borderRadius: 50,
        backgroundColor: '#cceaff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollView: {
        flex: 1,
        alignSelf: 'center',
    },
    contentContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 50,
        flexGrow: 1,
    },
    textstyle: {
        fontSize: 12, color: '#707070', marginLeft: '4%', fontFamily: 'PoppinsRegular',
    },
    textstyle1: {
        fontSize: 12, color: '#707070', marginTop: 8, textAlign: 'center', fontFamily: 'PoppinsRegular',
    }
});

const mapStateToProps = (state) => {
    const { language } = state.languageReducer;
    const { profiledetail } = state.profileReducer;
    const { mobilecodedetail } = state.mobilecodeReducer;
    return {
        language: language,
        profiledetail: profiledetail,
        mobilecodedetail: mobilecodedetail
    }
}

const mapDispatchToProps = (dispatch) => ({
    languageAction: (item) => dispatch(languageAction(item)),
    profileAction: (item) => dispatch(profileAction(item)),
});


export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

