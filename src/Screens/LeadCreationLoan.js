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
import Colors from '../Utils/Colors';
import MyStatusBar from './ MyStatusBar';
import Loading from './Loading';
import TextComp from '../Components/TextComp';
import { connect } from 'react-redux';
import { languageAction } from '../Utils/redux/actions/languageAction';
import { language } from '../Utils/LanguageString';
import Commonstyles from '../Utils/Commonstyles';
import ImageComp from '../Components/ImageComp';
import Entypo from 'react-native-vector-icons/Entypo';
import HeadComp from '../Components/HeadComp';
import { ProgressBar, MD3Colors } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import ProgressComp from '../Components/ProgressComp';

const LeadCreationLoan = (props, { navigation }) => {

    const [checked, setChecked] = React.useState('first');
    const [loanTypeLabel, setLoanTypeLabel] = useState('Native');
    const [loanTypeIndex, setLoanTypeIndex] = useState('2');
    const [loanPurposeLabel, setLoanPurposeLabel] = useState('Native');
    const [loanPurposeIndex, setLoanPurposeIndex] = useState('2');
    const [leadTypeLabel, setLeadTypeLabel] = useState('Native');
    const [leadTypeIndex, setLeadTypeIndex] = useState('2');
    const [loanAmount, setLoanAmount] = useState('');


    useEffect(() => {

    }, []);


    return (
        // enclose all components in this View tag
        <SafeAreaView style={[styles.parentView, { backgroundColor: Colors.lightwhite }]}>

            <MyStatusBar backgroundColor={'white'} barStyle="dark-content" />

            <ScrollView style={styles.scrollView}
                contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">

                <View style={{ flex: 1 }}>

                    <View style={{
                        width: '100%', height: 56, alignItems: 'center', justifyContent: 'center',

                    }}>
                        <HeadComp textval={language[0][props.language].str_leadcreation} props={props} />
                    </View>

                    <View style={{ width: '100%', alignItems: 'center', marginTop: '3%' }}>

                        <View style={{ width: '90%', marginTop: 3, }}>

                            <TextComp textStyle={{ color: Colors.mediumgrey, fontSize: 15, fontWeight: '500' }} textVal={language[0][props.language].str_loandetails}></TextComp>

                            <ProgressComp progressvalue={0.75} textvalue="3 of 4" />

                        </View>


                    </View>



                    <View style={{ width: '100%', alignItems: 'center', marginTop: '4%' }}>
                        <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, }}>
                            <TextComp textVal={language[0][props.language].str_loantype} textStyle={Commonstyles.inputtextStyle} Visible={true} />

                        </View>
                        <View style={{
                            width: '95%',
                        }}>

                            <Picker
                                selectedValue={loanTypeLabel}
                                style={styles.picker}
                                onValueChange={(itemValue, itemIndex) => {
                                    setLoanTypeLabel(itemValue);
                                    setLoanTypeIndex(itemIndex);
                                }}>
                                <Picker.Item label="Hello" value="Hello" />
                                <Picker.Item label="React" value="React" />
                                <Picker.Item label="Native" value="Native" />
                                <Picker.Item label="How" value="How" />
                                <Picker.Item label="are" value="are" />
                                <Picker.Item label="you" value="you" />
                            </Picker>

                        </View>
                        <View style={{
                            width: '90%', marginTop: 6, flexDirection: 'row',
                            borderBottomWidth: 1, borderBottomColor: '#e2e2e2', position: 'absolute', bottom: 3
                        }}></View>
                    </View>


                    <View style={{ width: '100%', alignItems: 'center', marginTop: '4%' }}>
                        <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, }}>
                            <TextComp textVal={language[0][props.language].str_loanpurpose} textStyle={Commonstyles.inputtextStyle} Visible={true} />

                        </View>
                        <View style={{
                            width: '95%',
                        }}>

                            <Picker
                                selectedValue={loanPurposeLabel}
                                style={styles.picker}
                                onValueChange={(itemValue, itemIndex) => {
                                    setLoanPurposeLabel(itemValue);
                                    setLoanPurposeIndex(itemIndex);
                                }}>
                                <Picker.Item label="Hello" value="Hello" />
                                <Picker.Item label="React" value="React" />
                                <Picker.Item label="Native" value="Native" />
                                <Picker.Item label="How" value="How" />
                                <Picker.Item label="are" value="are" />
                                <Picker.Item label="you" value="you" />
                            </Picker>

                        </View>
                        <View style={{
                            width: '90%', marginTop: 6, flexDirection: 'row',
                            borderBottomWidth: 1, borderBottomColor: '#e2e2e2', position: 'absolute', bottom: 3
                        }}></View>
                    </View>


                    <View style={{ width: '100%', marginTop: 19, paddingHorizontal: 0, alignItems: 'center', justifyContent: 'center' }}>

                        <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, }}>
                            <TextComp textVal={language[0][props.language].str_loanamountmultiple} textStyle={Commonstyles.inputtextStyle} Visible={true} />
                        </View>

                        <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, borderBottomWidth: 1, borderBottomColor: '#e2e2e2' }}>

                            <TextInput
                                value={loanAmount}
                                onChangeText={txt => setLoanAmount(txt)}
                                placeholder={''}
                                placeholderTextColor={Colors.lightgrey}
                                secureTextEntry={false}
                                autoCapitalize="none"
                                style={Commonstyles.textinputtextStyle}
                            />

                        </View>

                    </View>


                    <View style={{ width: '100%', alignItems: 'center', marginTop: '4%' }}>
                        <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, }}>
                            <TextComp textVal={language[0][props.language].str_leadtype} textStyle={Commonstyles.inputtextStyle} Visible={true} />

                        </View>
                        <View style={{
                            width: '95%',
                        }}>

                            <Picker
                                selectedValue={leadTypeLabel}
                                style={styles.picker}
                                onValueChange={(itemValue, itemIndex) => {
                                    setLeadTypeLabel(itemValue);
                                    setLeadTypeIndex(itemIndex);
                                }}>
                                <Picker.Item label="Hello" value="Hello" />
                                <Picker.Item label="React" value="React" />
                                <Picker.Item label="Native" value="Native" />
                                <Picker.Item label="How" value="How" />
                                <Picker.Item label="are" value="are" />
                                <Picker.Item label="you" value="you" />
                            </Picker>

                        </View>
                        <View style={{
                            width: '90%', marginTop: 6, flexDirection: 'row',
                            borderBottomWidth: 1, borderBottomColor: '#e2e2e2', position: 'absolute', bottom: 3
                        }}></View>
                    </View>




                </View>


                <View
                    style={{
                        width: '100%',
                        height: 50,
                        marginTop: 25,
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                    }}>
                    <TouchableOpacity onPress={() => {  props.navigation.navigate('LeadCreationCustomerPhoto') }} activeOpacity={10} style={{
                        width: '88%', height: 50, backgroundColor: '#0294ff',
                        borderRadius: 45, alignItems: 'center', justifyContent: 'center'
                    }}>
                        <View >

                            <TextComp textVal={language[0][props.language].str_next} textStyle={{ color: Colors.white, fontSize: 13, fontWeight: 500 }} />

                        </View>
                    </TouchableOpacity>
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
        backgroundColor: '#dbdbdb', // Change the color as needed
        height: 1,
        width: '90%',
        marginTop: '5%'           // Adjust the height as needed
    },
    picker: {
        height: 50,
        width: '100%',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        textAlign: 'center'
    },
});


const mapStateToProps = (state) => {
    const { language } = state.languageReducer;
    return {
        language: language
    }
}

const mapDispatchToProps = (dispatch) => ({
    languageAction: (item) => dispatch(languageAction(item)),
});


export default connect(mapStateToProps, mapDispatchToProps)(LeadCreationLoan);