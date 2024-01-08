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
import { React, useState, useEffect } from 'react';
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

const PdMainScreen = (props, { navigation }) => {
    const [loading, setLoading] = useState(false);
    const [showAllData, setShowAllData] = useState(false);
    const isScreenVisible = useIsFocused();

    useEffect(() => {
        props.navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' }, tabBarVisible: false });
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);

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
        props.navigation.goBack();
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

            <View style={{ width: '100%', alignItems: 'center', marginTop: '3%' }}>
                <View style={{ width: '90%', marginTop: 3 }}>
                    <TextComp
                        textStyle={{
                            color: Colors.mediumgrey,
                            fontSize: 15,
                            fontFamily: 'Poppins-Medium'
                        }}
                        textVal={
                            'Personal Details Level 2'
                        }></TextComp>
                </View>
            </View>
            <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 15 }}>
                {/* app */}
                <View style={{
                    width: '90%', height: 100, borderColor: Colors.dimText, borderWidth: 1, borderRadius: 10,
                    alignItems: 'center', justifyContent: 'center'
                }}>
                    <View style={{ width: 50, height: 50, backgroundColor: Colors.dimPink, borderRadius: 25, justifyContent: 'center', alignItems: 'center' }}>
                        <ImageComp imageSrc={require('../../Images/applicantimage.png')} imageStylee={{ width: 30, height: 30, resizeMode: 'contain' }} />
                    </View>

                    <TextComp
                        textStyle={{
                            color: Colors.mediumgrey,
                            fontSize: 15,
                            fontFamily: 'Poppins-Medium'
                        }}
                        textVal={
                            language[0][props.language].str_app
                        }></TextComp>
                </View>

                {/* coapp */}
                <View style={{
                    width: '90%', height: 100, borderColor: Colors.dimText, borderWidth: 1, borderRadius: 10,
                    alignItems: 'center', justifyContent: 'center', marginTop: 10
                }}>
                    <View style={{ width: 50, height: 50, backgroundColor: Colors.dimblue, borderRadius: 25, justifyContent: 'center', alignItems: 'center' }}>
                        <ImageComp imageSrc={require('../../Images/applicantimage.png')} imageStylee={{ width: 30, height: 30, resizeMode: 'contain' }} />
                    </View>

                    <TextComp
                        textStyle={{
                            color: Colors.mediumgrey,
                            fontSize: 15,
                            fontFamily: 'Poppins-Medium'
                        }}
                        textVal={
                            language[0][props.language].str_capp
                        }></TextComp>
                </View>

                {/* guarator */}
                <View style={{
                    width: '90%', height: 100, borderColor: Colors.dimText, borderWidth: 1, borderRadius: 10,
                    alignItems: 'center', justifyContent: 'center', marginTop: 10
                }}>
                    <View style={{ width: 50, height: 50, backgroundColor: Colors.dimSkyBlue, borderRadius: 25, justifyContent: 'center', alignItems: 'center' }}>
                        <ImageComp imageSrc={require('../../Images/applicantimage.png')} imageStylee={{ width: 30, height: 30, resizeMode: 'contain' }} />
                    </View>

                    <TextComp
                        textStyle={{
                            color: Colors.mediumgrey,
                            fontSize: 15,
                            fontFamily: 'Poppins-Medium'
                        }}
                        textVal={
                            language[0][props.language].str_g
                        }></TextComp>
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                    <View style={{ width: '100%', alignItems: 'center', marginTop: '3%' }}>
                        <View
                            style={{
                                width: '90%',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginTop: 20,
                            }}>

                            <View style={{ width: '90%', marginLeft: 15 }}>
                                <Text style={{ color: Colors.dimmText, textAlign: 'left', fontFamily: 'PoppinsRegular' }}>
                                    {language[0][props.language].str_loandetails}
                                </Text>
                            </View>
                            <TouchableOpacity style={{ width: '10%' }}
                                activeOpacity={8} onPress={() => {
                                    if (showAllData) {
                                        setShowAllData(false)
                                    } else {
                                        setShowAllData(true)
                                    }
                                }}>
                                <View >
                                    {showAllData ?
                                        <AntDesign name='up' size={20} color={Colors.black} /> :
                                        <AntDesign name='down' size={20} color={Colors.black} />
                                    }

                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {showAllData ?
                        <View>
                            <View style={{ width: '100%', marginTop: 20, marginLeft: 23 }}>
                                <TextComp
                                    textStyle={{
                                        color: Colors.lightgrey,
                                        fontSize: 15,
                                        fontFamily: 'Poppins-Medium'
                                    }}
                                    textVal={language[0][props.language].str_customercatg}></TextComp>
                                <TextComp
                                    textStyle={{
                                        color: Colors.black,
                                        fontSize: 15,
                                        fontFamily: 'Poppins-Medium'
                                    }}
                                    textVal={
                                        'Buisness'
                                    } />
                            </View>


                            <View style={{ width: '100%', marginTop: 20, marginLeft: 23 }}>
                                <TextComp
                                    textStyle={{
                                        color: Colors.lightgrey,
                                        fontSize: 15,
                                        fontFamily: 'Poppins-Medium'
                                    }}
                                    textVal={language[0][props.language].str_customertype} />
                                <TextComp
                                    textStyle={{
                                        color: Colors.black,
                                        fontSize: 15,
                                        fontFamily: 'Poppins-Medium'
                                    }}
                                    textVal={
                                        'Buisness'
                                    } />
                            </View>

                            <View style={{ width: '100%', marginTop: 20, marginLeft: 23 }}>
                                <TextComp
                                    textStyle={{
                                        color: Colors.lightgrey,
                                        fontSize: 15,
                                        fontFamily: 'Poppins-Medium'
                                    }}
                                    textVal={language[0][props.language].str_loanamount}></TextComp>
                                <TextComp
                                    textStyle={{
                                        color: Colors.black,
                                        fontSize: 15,
                                        fontFamily: 'Poppins-Medium'
                                    }}
                                    textVal={
                                        'Buisness'
                                    } />
                            </View>

                            <View style={{ width: '100%', marginTop: 20, marginLeft: 23 }}>
                                <TextComp
                                    textStyle={{
                                        color: Colors.lightgrey,
                                        fontSize: 15,
                                        fontFamily: 'Poppins-Medium'
                                    }}
                                    textVal={language[0][props.language].str_loantype}></TextComp>
                                <TextComp
                                    textStyle={{
                                        color: Colors.black,
                                        fontSize: 15,
                                        fontFamily: 'Poppins-Medium'
                                    }}
                                    textVal={
                                        'Buisness'
                                    } />
                            </View>

                            <View style={{ width: '100%', marginTop: 20, marginLeft: 23 }}>
                                <TextComp
                                    textStyle={{
                                        color: Colors.lightgrey,
                                        fontSize: 15,
                                        fontFamily: 'Poppins-Medium'
                                    }}
                                    textVal={language[0][props.language].str_productId}></TextComp>
                                <TextComp
                                    textStyle={{
                                        color: Colors.black,
                                        fontSize: 15,
                                        fontFamily: 'Poppins-Medium'
                                    }}
                                    textVal={
                                        'Buisness'
                                    } />
                            </View>

                            <View style={{ width: '100%', marginTop: 20, marginLeft: 23 }}>
                                <TextComp
                                    textStyle={{
                                        color: Colors.lightgrey,
                                        fontSize: 15,
                                        fontFamily: 'Poppins-Medium'
                                    }}
                                    textVal={language[0][props.language].str_laonappid}></TextComp>
                                <TextComp
                                    textStyle={{
                                        color: Colors.black,
                                        fontSize: 15,
                                        fontFamily: 'Poppins-Medium'
                                    }}
                                    textVal={
                                        'Buisness'
                                    } />
                            </View>

                            <View style={{ width: '100%', marginTop: 20, marginLeft: 23 }}>
                                <TextComp
                                    textStyle={{
                                        color: Colors.lightgrey,
                                        fontSize: 15,
                                        fontFamily: 'Poppins-Medium'
                                    }}
                                    textVal={language[0][props.language].str_laonappdate}></TextComp>
                                <TextComp
                                    textStyle={{
                                        color: Colors.black,
                                        fontSize: 15,
                                        fontFamily: 'Poppins-Medium'
                                    }}
                                    textVal={
                                        'Buisness'
                                    } />
                            </View>

                            <View style={{ width: '100%', marginTop: 20, marginLeft: 23 }}>
                                <TextComp
                                    textStyle={{
                                        color: Colors.lightgrey,
                                        fontSize: 15,
                                        fontFamily: 'Poppins-Medium'
                                    }}
                                    textVal={language[0][props.language].str_loanpurposecategory}></TextComp>
                                <TextComp
                                    textStyle={{
                                        color: Colors.black,
                                        fontSize: 15,
                                        fontFamily: 'Poppins-Medium'
                                    }}
                                    textVal={
                                        'Buisness'
                                    } />
                            </View>

                            <View style={{ width: '100%', marginTop: 20, marginLeft: 23 }}>
                                <TextComp
                                    textStyle={{
                                        color: Colors.lightgrey,
                                        fontSize: 15,
                                        fontFamily: 'Poppins-Medium'
                                    }}
                                    textVal={language[0][props.language].str_workflowstageId}></TextComp>
                                <TextComp
                                    textStyle={{
                                        color: Colors.black,
                                        fontSize: 15,
                                        fontFamily: 'Poppins-Medium'
                                    }}
                                    textVal={
                                        'Buisness'
                                    } />
                            </View>
                        </View>
                        : null}

                </View>
            </ScrollView>
            <View style={{ width: '100%', alignItems: 'center', marginTop: '3%', justifyContent: 'center', marginBottom: 5 }}>
                <View style={{ width: '90%', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{
                        width: '45%', height: 45, backgroundColor: Colors.darkblue,
                        alignItems: 'center', borderRadius: 25, justifyContent: 'center'
                    }}>
                        <TextComp
                            textStyle={{
                                color: Colors.white,
                                fontSize: 15,
                                fontFamily: 'Poppins-Medium'
                            }}
                            textVal={language[0][props.language].str_approve}></TextComp>
                    </View>
                    <View style={{
                        width: '45%', height: 45, backgroundColor: Colors.darkblue,
                        alignItems: 'center', borderRadius: 25, justifyContent: 'center'
                    }}>
                        <TextComp
                            textStyle={{
                                color: Colors.white,
                                fontSize: 15,
                                fontFamily: 'Poppins-Medium'
                            }}
                            textVal={language[0][props.language].str_reject}></TextComp>
                    </View>
                </View>
            </View>


        </SafeAreaView >
    );
};

const mapStateToProps = state => {
    const { language } = state.languageReducer;
    const { profileDetails } = state.profileReducer;
    const { mobileCodeDetails } = state.mobilecodeReducer;
    return {
        language: language,
        profiledetail: profileDetails,
        mobilecodedetail: mobileCodeDetails
    }
};

const mapDispatchToProps = dispatch => ({
    languageAction: item => dispatch(languageAction(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PdMainScreen);
