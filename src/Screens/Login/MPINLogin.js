import React, { useState, useEffect, useRef } from 'react';
import {
    Animated,
    StyleSheet,
    View,
    ScrollView,
    Dimensions,
    Text,
    Keyboard,
    Alert,
    BackHandler,
    Modal,
    TouchableOpacity
} from 'react-native';
import apiInstance from '../../Utils/apiInstance';
import jwtDecode from 'jwt-decode';
import Colors from '../../Utils/Colors';
import MyStatusBar from '../../Components/MyStatusBar';
import Loading from '../../Components/Loading';
import TextComp from '../../Components/TextComp';
import { connect } from 'react-redux';
import { languageAction } from '../../Utils/redux/actions/languageAction';
import { language } from '../../Utils/LanguageString';
import Commonstyles from '../../Utils/Commonstyles';
import ImageComp from '../../Components/ImageComp';
import ButtonViewComp from '../../Components/ButtonViewComp';
import { getDeviceID, getDeviceName, } from '../../Utils/Common';
import Common from '../../Utils/Common';
import Bank_Detail_Table from '../../Database/Table/Bank_Detail_Table';
import axios from 'axios';
import parser from 'react-native-xml2js';
import { useIsFocused } from '@react-navigation/native';
import CenteredModal from '../../Components/CenteredModal';

import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';
const { Value, Text: AnimatedText } = Animated;

const CELL_COUNT = 4;
const CELL_SIZE = 46;
const CELL_BORDER_RADIUS = 8;
const DEFAULT_CELL_BG_COLOR = '#F4F5F7';
const NOT_EMPTY_CELL_BG_COLOR = Colors.darkblue;
const ACTIVE_CELL_BG_COLOR = '#f7fafe';
const animationsColor = [...new Array(CELL_COUNT)].map(() => new Value(0));
const animationsScale = [...new Array(CELL_COUNT)].map(() => new Value(1));
const animateCell = ({ hasValue, index, isFocused }) => {
    Animated.parallel([
        Animated.timing(animationsColor[index], {
            useNativeDriver: false,
            toValue: isFocused ? 1 : 0,
            duration: 250,
        }),
        Animated.spring(animationsScale[index], {
            useNativeDriver: false,
            toValue: hasValue ? 0 : 1,
            duration: hasValue ? 300 : 250,
        }),
    ]).start();
};

const MPINLogin = (props, { navigation }) => {

    const [loading, setLoading] = useState(false);
    const [mpin, setMPIN] = useState('');
    const { confirmCode, timer } = props;
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });


    const renderCell = ({ index, symbol, isFocused }) => {
        const hasValue = Boolean(symbol);
        const animatedCellStyle = {
            backgroundColor: hasValue
                ? animationsScale[index].interpolate({
                    inputRange: [0, 1],
                    outputRange: [NOT_EMPTY_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
                })
                : animationsColor[index].interpolate({
                    inputRange: [0, 1],
                    outputRange: [DEFAULT_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
                }),
            borderRadius: animationsScale[index].interpolate({
                inputRange: [0, 1],
                outputRange: [CELL_SIZE, CELL_BORDER_RADIUS],
            }),
            transform: [
                {
                    scale: animationsScale[index].interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.2, 1],
                    }),
                },
            ],
        };

        // Run animation on next event loop tik
        // Because we need first return new style prop and then animate this value
        setTimeout(() => {
            animateCell({ hasValue, index, isFocused });
        }, 0);

        return (
            <AnimatedText
                key={index}
                style={[styles.cell]}
                onLayout={getCellOnLayoutHandler(index)}>
                {symbol || (isFocused ? <Cursor /> : null)}
            </AnimatedText>
        );
    };

    const renderCellCode = ({ index, symbol, isFocused }) => {
        let textChild = null;

        if (symbol) {
            textChild = true ? '•' : symbol;
        } else if (isFocused) {
            textChild = <Cursor />;
        }

        return (
            <Text
                key={index}
                style={[styles.cell, isFocused && styles.focusCell]}
                onLayout={getCellOnLayoutHandler(index)}>
                {textChild}
            </Text>
        );
    };

    const isFocused = useIsFocused();

    useEffect(() => {

        if (isFocused) {
            // BackHandler.addEventListener('hardwareBackPress', handleBackButton);
        }

        return () => {
            //BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
        };
    }, [isFocused]);

    const handleBackButton = () => {
        // Close the app
        BackHandler.exitApp();
        return true;
    };



    const handleClick = () => {
        props.navigation.navigate('LoginScreen');
    };

    return (

        <View style={{ flex: 1, backgroundColor: Colors.lightwhite }}>
            <MyStatusBar backgroundColor={'white'} barStyle="dark-content" />

            <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" >
                {loading ? <Loading /> : null}
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>

                    <View style={{ width: '100%', flexDirection: 'row', }}>

                        <View style={{ width: '100%', }}>
                            <ImageComp imageSrc={require('../../Images/loginbg.png')} imageStylee={{ width: 160, height: 160, resizeMode: 'contain' }} />
                        </View>

                        <View style={{ width: '55%', }}>

                        </View>

                    </View>

                    <View style={{ width: '100%', marginTop: 30, paddingHorizontal: 16, alignItems: 'center' }}>

                        <Text style={{ textAlign: 'left', flex: 0.9, fontSize: 20, color: '#4e4e4e' }}>Hi! {global.USERNAME}</Text>

                        <TextComp textVal={language[0][props.language].str_entermpin} textStyle={{ color: Colors.lightgrey, fontSize: 12, marginTop: 25 }} />
                    </View>


                    <CodeField
                        {...props}
                        value={mpin}
                        autoFocus={true}
                        onChangeText={(txt) => {
                            if (txt.length > 0) {
                                if (Common.integerPattern.test(txt))
                                    setMPIN(txt)
                            } else {
                                setMPIN(txt)
                            }
                            if (txt.length >= 4) {
                                props.navigation.navigate('BottomNavigation');
                                setMPIN('')
                            }
                        }}
                        cellCount={4}
                        rootStyle={styles.codeFieldRoot}
                        keyboardType="number-pad"
                        textContentType="oneTimeCode"
                        onSubmitEditing={Keyboard.dismiss}
                        renderCell={renderCellCode}
                    />


                    <ButtonViewComp textValue={language[0][props.language].str_loginviauserid} textStyle={{ color: Colors.darkblue, fontSize: 13, fontWeight: 500 }} viewStyle={[Commonstyles.buttonView, { marginTop: 60, marginBottom: 20 }]} innerStyle={Commonstyles.buttonViewBorderStyle} handleClick={handleClick} />


                </View>


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


export default connect(mapStateToProps, mapDispatchToProps)(MPINLogin);

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
    }, codeFieldRoot: {
        height: CELL_SIZE,
        marginTop: 30,
        paddingHorizontal: 10,
        justifyContent: 'center',
    },
    cell: {
        marginHorizontal: 6,
        height: CELL_SIZE,
        width: CELL_SIZE,
        lineHeight: CELL_SIZE - 5,
        ...Platform.select({ web: { lineHeight: 65 } }),
        fontSize: 17,
        textAlign: 'center',
        borderRadius: CELL_BORDER_RADIUS,
        color: Colors.black,
        backgroundColor: '#F4F5F7',

        // IOS
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        // Android
        elevation: 3,
    },

    // =======================

    root: {
        minHeight: 0,
        padding: 20,
    },
    title: {
        paddingTop: 40,
        color: '#000',
        fontSize: 25,
        fontWeight: '700',
        textAlign: 'center',
        paddingBottom: 40,
    },
    icon: {
        width: 217 / 2.4,
        height: 158 / 2.4,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    subTitle: {
        paddingTop: 30,
        color: '#000',
        textAlign: 'center',
    },
    nextButton: {
        marginTop: 30,
        borderRadius: 55,
        height: 55,
        backgroundColor: '#3557b7',
        justifyContent: 'center',
        minWidth: 10,
        marginBottom: 0,
    },
    nextButton1: {
        marginTop: 30,
        borderRadius: 55,
        height: 55,
        backgroundColor: '#808B96',
        justifyContent: 'center',
        minWidth: 10,
        marginBottom: 0,
    },
    nextButtonText: {
        textAlign: 'center',
        fontSize: 18,
        color: '#fff',
        fontWeight: '700',
    }
});
