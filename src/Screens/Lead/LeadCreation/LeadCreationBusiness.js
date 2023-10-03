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
import apiInstance from '../../../Utils/apiInstance';
import jwtDecode from 'jwt-decode';
import Colors from '../../../Utils/Colors';
import MyStatusBar from '../../../Components/ MyStatusBar';
import Loading from '../../../Components/Loading';
import TextComp from '../../../Components/TextComp';
import { connect } from 'react-redux';
import { languageAction } from '../../../Utils/redux/actions/languageAction';
import { language } from '../../../Utils/LanguageString';
import Commonstyles from '../../../Utils/Commonstyles';
import ImageComp from '../../../Components/ImageComp';
import Entypo from 'react-native-vector-icons/Entypo';
import HeadComp from '../../../Components/HeadComp';
import { ProgressBar, MD3Colors } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import ProgressComp from '../../../Components/ProgressComp';
import tbl_SystemCodeDetails from '../../../Database/Table/tbl_SystemCodeDetails';
import tbl_SystemMandatoryFields from '../../../Database/Table/tbl_SystemMandatoryFields';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Modal from 'react-native-modal';
import apiInstancelocal from '../../../Utils/apiInstancelocal';
import PickerComp from '../../../Components/PickerComp';
import TextInputComp from '../../../Components/TextInputComp';
import Common from '../../../Utils/Common';
import tbl_lead_creation_business_details from '../../../Database/Table/tbl_lead_creation_business_details';

const LeadCreationBusiness = (props, { navigation }) => {
    const [leadType, setLeadType] = useState(global.LEADTYPE);
    const [errMsg, setErrMsg] = useState('');
    const [loading, setLoading] = useState(false);
    const [checked, setChecked] = React.useState('first');
    const [industryTypeLabel, setIndustryTypeLabel] = useState('');
    const [industryTypeIndex, setIndustryTypeIndex] = useState('');
    const [industryTypeCaption, setIndustryTypeCaption] = useState('INDUSTRY TYPE');
    const [industryTypeMan, setIndustryTypeMan] = useState(false);
    const [industryTypeVisible, setIndustryTypeVisible] = useState(true);
    const [industryTypeDisable, setIndustryTypeDisable] = useState(false);
    const [businessName, setBusinessName] = useState('');
    const [businessNameCaption, setBusinessNameCaption] = useState('BUSINESS NAME');
    const [businessNameMan, setBusinessNameMan] = useState(false);
    const [businessNameVisible, setBusinessNameVisible] = useState(true);
    const [businessNameDisable, setBusinessNameDisable] = useState(false);
    const [incomeTurnOver, setIncomeTurnOver] = useState('');
    const [incomeTurnOverCaption, setIncomeTurnOverCaption] = useState('INCOME/BUSINESS TURNOVER(MONTHLY)');
    const [incomeTurnOverMan, setIncomeTurnOverMan] = useState(false);
    const [incomeTurnOverVisible, setIncomeTurnOverVisible] = useState(true);
    const [incomeTurnOverDisable, setIncomeTurnOverDisable] = useState(false);
    const [year, setYear] = useState('');
    const [yearCaption, setYearCaption] = useState('YEAR');
    const [yearMan, setYearMan] = useState(false);
    const [yearVisible, setYearVisible] = useState(true);
    const [yearDisable, setYearDisable] = useState(false);
    const [months, setMonths] = useState('');
    const [monthsCaption, setMonthsCaption] = useState('MONTHS');
    const [monthsMan, setMonthsMan] = useState(false);
    const [monthsVisible, setMonthsVisible] = useState(true);
    const [monthsDisable, setMonthsDisable] = useState(false);
    const [industryTypeData, setIndustryTypeData] = useState([]);
    const [bottomErrorSheetVisible, setBottomErrorSheetVisible] = useState(false);
    const showBottomSheet = () => setBottomErrorSheetVisible(true);
    const hideBottomSheet = () => setBottomErrorSheetVisible(false);

    const businessNameRef = useRef(null);
    const incomeTurnOverRef = useRef(null);
    const yearRef = useRef(null);
    const monthsRef = useRef(null);

    useEffect(() => {

        makeSystemMandatoryFields();
        // pickerData();
        //callPickerApi();
        getData();

    }, []);


    const pickerData = async () => {
        tbl_SystemCodeDetails.getSystemCodeDetailsBasedOnID('IndustryType').then(value => {
            if (value !== undefined && value.length > 0) {
                console.log(value)

                for (var i = 0; i < value.length; i++) {
                    if (value[i].IsDefault === '1') {
                        setIndustryTypeLabel(value[i].SubCodeID);
                        setIndustryTypeIndex(i + 1);
                    }
                }

                setIndustryTypeData(value)

            }
        })
    }

    const makeSystemMandatoryFields = () => {

        tbl_SystemMandatoryFields.getSystemMandatoryFieldsBasedOnFieldUIID('sp_industrytype').then(value => {
            if (value !== undefined && value.length > 0) {
                console.log(value[0])
                setIndustryTypeCaption(value[0].FieldName)
                if (value[0].IsMandatory == "1") {
                    setIndustryTypeMan(true);
                }
                if (value[0].IsHide == "1") {
                    setIndustryTypeVisible(false);
                }
                if (value[0].IsDisable == "1") {
                    setIndustryTypeDisable(true);
                }
                if (value[0].IsCaptionChange == "1") {
                    setIndustryTypeCaption(value[0].FieldCaptionChange)
                }
            }
        })

        //firstName
        tbl_SystemMandatoryFields.getSystemMandatoryFieldsBasedOnFieldUIID('et_businessname').then(value => {
            if (value !== undefined && value.length > 0) {
                console.log(value[0])
                setBusinessNameCaption(value[0].FieldName)
                if (value[0].IsMandatory == "1") {
                    setBusinessNameMan(true);
                }
                if (value[0].IsHide == "1") {
                    setBusinessNameVisible(false);
                }
                if (value[0].IsDisable == "1") {
                    setBusinessNameDisable(true);
                }
                if (value[0].IsCaptionChange == "1") {
                    setBusinessNameCaption(value[0].FieldCaptionChange)
                }
            }
        })

        tbl_SystemMandatoryFields.getSystemMandatoryFieldsBasedOnFieldUIID('et_incometurnover').then(value => {


            if (value !== undefined && value.length > 0) {
                console.log(value)
                setIncomeTurnOverCaption(value[0].FieldName)
                if (value[0].IsMandatory == "1") {
                    setIncomeTurnOverMan(true);
                }
                if (value[0].IsHide == "1") {
                    setIncomeTurnOverVisible(false);
                }
                if (value[0].IsDisable == "1") {
                    setIncomeTurnOverDisable(true);
                }
                if (value[0].IsCaptionChange == "1") {
                    setIncomeTurnOverCaption(value[0].FieldCaptionChange)
                }
            }
        })

        tbl_SystemMandatoryFields.getSystemMandatoryFieldsBasedOnFieldUIID('et_year').then(value => {
            if (value !== undefined && value.length > 0) {
                console.log(value)
                setYearCaption(value[0].FieldName)
                if (value[0].IsMandatory == "1") {
                    setYearMan(true);
                }
                if (value[0].IsHide == "1") {
                    setYearVisible(false);
                }
                if (value[0].IsDisable == "1") {
                    setYearDisable(true);
                }
                if (value[0].IsCaptionChange == "1") {
                    setYearCaption(value[0].FieldCaptionChange)
                }
            }
        })

        tbl_SystemMandatoryFields.getSystemMandatoryFieldsBasedOnFieldUIID('et_months').then(value => {
            if (value !== undefined && value.length > 0) {
                console.log(value)
                setMonthsCaption(value[0].FieldName)
                if (value[0].IsMandatory == "1") {
                    setMonthsMan(true);
                }
                if (value[0].IsHide == "1") {
                    setMonthsVisible(false);
                }
                if (value[0].IsDisable == "1") {
                    setMonthsDisable(true);
                }
                if (value[0].IsCaptionChange == "1") {
                    setMonthsCaption(value[0].FieldCaptionChange)
                }
            }
        })

    }


    const updateLeadDetails = () => {

        if (global.LEADTYPE == 'COMP') {
            props.navigation.navigate('LeadCreationLoan', { leadData: props.route.params.leadData })
        } else if (validate()) {
            showBottomSheet();
        }
        else {

            Common.getNetworkConnection().then(value => {
                if (value.isConnected == true) {
                    callLeadApi();
                } else {
                    insertLead(global.leadID, true)
                }
            })




        }


    }

    const callLeadApi = () => {
        insertLead(global.leadID, false)
        const appDetails = {
            "leadCreationBusinessDetails": {
                "createdBy": global.USERID,
                "createdOn": '',
                "businessName": businessName,
                "industryType": industryTypeLabel,
                "incomeBusinessTurnover": incomeTurnOver,
                "businessVintageYear": year,
                "businessVintageMonth": months
            }
        }
        const baseURL = '8901'
        setLoading(true)
        apiInstancelocal(baseURL).put(`/api/v1/lead-creation-initiation/${global.leadID}`, appDetails)
            .then(async (response) => {
                // Handle the response data
                console.log("LeadCreationBusinessApiResponse::" + JSON.stringify(response.data));
                setLoading(false)
                props.navigation.navigate('LeadCreationLoan', { leadData: [] })

            })
            .catch((error) => {
                // Handle the error
                console.log("Error" + JSON.stringify(error.response))
                setLoading(false)
                alert(error);
            });
    }

    const getData = () => {

        if (leadType == 'DRAFT') {
            setLoading(true);
            tbl_lead_creation_business_details.getLeadCreationBusinessDetailsBasedOnLeadID(global.leadID).then(value => {
                if (value !== undefined && value.length > 0) {
                    setIndustryTypeLabel(parseInt(value[0].industry_type_id));
                    setBusinessName(value[0].business_name);
                    setIncomeTurnOver(value[0].income_business_turnover);
                    setYear(value[0].business_vintage_year);
                    setMonths(value[0].business_vintage_month);
                    callPickerApi();
                } else {
                    callPickerApi();
                }
            })
        } else if (leadType == 'NEW') {
            callPickerApi();
        } else if (leadType == 'COMP') {
            const data = props.route.params.leadData;
            setIndustryTypeLabel(parseInt(data.leadCreationBusinessDetails.industryTypeId));
            setBusinessName(data.leadCreationBusinessDetails.businessName);
            setIncomeTurnOver(data.leadCreationBusinessDetails.incomeBusinessTurnover.toString());
            setYear(data.leadCreationBusinessDetails.businessVintageYear.toString());
            setMonths(data.leadCreationBusinessDetails.businessVintageMonth.toString());
            setIndustryTypeDisable(true)
            setBusinessNameDisable(true)
            setIncomeTurnOverDisable(true);
            setYearDisable(true)
            setMonthsDisable(true)
            callPickerApi();
        }

    }

    const insertLead = async (leadID, nav) => {
        await tbl_lead_creation_business_details.insertLeadCreationBusinessDetails(leadID, industryTypeLabel, businessName, year, months, incomeTurnOver, global.USERID);

        tbl_lead_creation_business_details.getLeadCreationBusinessDetailsBasedOnLeadID(leadID).then(value => {
            console.log("LeadBusinessDetails::::" + JSON.stringify(value))
        })
        if (nav == true) {
            props.navigation.navigate('LeadCreationLoan', { leadData: [] })
        }

    }

    const validate = () => {
        var flag = false; var i = 1;
        var errorMessage = '';

        if (industryTypeMan && industryTypeVisible) {
            if (industryTypeLabel === 'Select') {
                errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsselect + industryTypeCaption + '\n';
                i++;
                flag = true;
            }
        }

        if (businessNameMan && businessNameVisible) {
            if (businessName.length <= 0) {
                errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsenter + businessNameCaption + '\n';
                i++;
                flag = true;
            }
        }
        if (incomeTurnOverMan && incomeTurnOverVisible) {
            if (incomeTurnOver.length <= 0) {
                errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsenter + incomeTurnOverCaption + '\n';
                i++;
                flag = true;
            }
        }
        if (yearMan && yearVisible) {
            if (year.length <= 0) {
                errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsenter + yearCaption + '\n';
                i++;
                flag = true;
            }
        }

        if (monthsMan && monthsVisible) {
            if (months.length <= 0) {
                errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsenter + monthsCaption + '\n';
                i++;
                flag = true;
            }
        }
        setErrMsg(errorMessage);
        return flag;
    }

    const callPickerApi = () => {

        const baseURL = '8082'
        setLoading(true)

        apiInstancelocal(baseURL).get('/api/v1/generic-master/type?size=100&type=CREDIT_SCORE_INDUSTRY_TYPE_SUB_CATEGORY')
            .then(async (response) => {

                setLoading(false);
                //alert(JSON.stringify(response.data.content))
                setIndustryTypeData(response.data.content)
            })
            .catch((error) => {
                if (global.DEBUG_MODE) console.log("Error" + JSON.stringify(error.response))
                setLoading(false)
                alert(error);
            });


    }

    const handlePickerClick = (componentName, label, index) => {

        if (componentName === 'industryPicker') {
            setIndustryTypeLabel(label);
            setIndustryTypeIndex(index);
        }

    }

    const handleClick = (componentName, textValue) => {

        if (componentName === 'businessName') {
            setBusinessName(textValue)
        } else if (componentName === 'incomeTurnOver') {
            setIncomeTurnOver(textValue)
        } else if (componentName === 'year') {
            if (textValue.length > 0) {
                if (Common.numberRegex.test(textValue))
                    setYear(textValue)
            } else {
                setYear(textValue)
            }
        } else if (componentName === 'month') {
            if (textValue.length > 0) {
                if (Common.numberRegex.test(textValue))
                    setMonths(textValue)
            } else {
                setMonths(textValue)
            }
        }

    }

    const handleReference = (componentName) => {

        if (componentName === 'businessName') {
            incomeTurnOver.current.focus();
        } else if (componentName === 'incomeTurnOver') {
            yearRef.current.focus();
        } else if (componentName === 'year') {
            monthsRef.current.focus();
        }

    };


    return (
        // enclose all components in this View tag
        <SafeAreaView style={[styles.parentView, { backgroundColor: Colors.lightwhite }]}>

            <MyStatusBar backgroundColor={'white'} barStyle="dark-content" />

            <ScrollView style={styles.scrollView}
                contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
                {loading ? <Loading /> : null}
                <View style={{ flex: 1 }}>

                    <Modal
                        isVisible={bottomErrorSheetVisible}
                        onBackdropPress={hideBottomSheet}
                        style={styles.modal}
                    >
                        <View style={styles.modalContent}>
                            <View style={{ alignItems: 'center' }}>

                                <View style={{ width: '100%', flexDirection: 'row', }}>

                                    <TextComp textVal={language[0][props.language].str_error} textStyle={{ fontSize: 14, color: Colors.black, fontWeight: 600 }} Visible={false} />

                                    <MaterialIcons name='error' size={20} color={Colors.red} />

                                </View>

                                <View style={{ width: '100%', marginTop: 15 }}>
                                    <TextComp textVal={errMsg} textStyle={{ fontSize: 14, color: Colors.black, lineHeight: 20 }} Visible={false} />
                                </View>




                                <View style={{ width: '100%', justifyContent: 'flex-end', alignItems: 'flex-end', flexDirection: 'row' }}>




                                    <View
                                        style={{
                                            width: '25%',
                                            height: 40,
                                            justifyContent: 'flex-end',
                                            alignItems: 'center',
                                        }}>
                                        <TouchableOpacity onPress={() => { hideBottomSheet() }} activeOpacity={0.5} style={{
                                            width: '88%', height: 40, backgroundColor: '#0294ff',
                                            borderRadius: 35, alignItems: 'center', justifyContent: 'center'
                                        }}>
                                            <View >

                                                <TextComp textVal={language[0][props.language].str_ok} textStyle={{ color: Colors.white, fontSize: 15, fontWeight: 600 }} />

                                            </View>
                                        </TouchableOpacity>
                                    </View>

                                </View>

                            </View>


                        </View>
                    </Modal>


                    <View style={{
                        width: '100%', height: 56, alignItems: 'center', justifyContent: 'center',

                    }}>
                        <HeadComp textval={language[0][props.language].str_leadcreation} props={props} />
                    </View>

                    <View style={{ width: '100%', alignItems: 'center', marginTop: '3%' }}>

                        <View style={{ width: '90%', marginTop: 3, }}>

                            <TextComp textStyle={{ color: Colors.mediumgrey, fontSize: 15, fontWeight: '500' }} textVal={language[0][props.language].str_businessdetails}></TextComp>

                            <ProgressComp progressvalue={0.5} textvalue="2 of 4" />

                        </View>


                    </View>


                    {businessNameVisible && <View style={{ width: '100%', marginTop: 19, paddingHorizontal: 0, alignItems: 'center', justifyContent: 'center' }}>

                        <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, }}>
                            <TextComp textVal={businessNameCaption} textStyle={Commonstyles.inputtextStyle} Visible={businessNameMan} />
                        </View>

                        <TextInputComp textValue={businessName} textStyle={Commonstyles.textinputtextStyle} type='email-address' Disable={businessNameDisable} ComponentName='businessName' reference={businessNameRef} returnKey="next" handleClick={handleClick} handleReference={handleReference} />

                    </View>}

                    {industryTypeVisible && <View style={{ width: '100%', alignItems: 'center', marginTop: '4%' }}>
                        <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, }}>

                            <TextComp textVal={industryTypeCaption} textStyle={Commonstyles.inputtextStyle} Visible={industryTypeMan} />

                        </View>

                        <PickerComp textLabel={industryTypeLabel} pickerStyle={Commonstyles.picker} Disable={industryTypeDisable} pickerdata={industryTypeData} componentName='industryPicker' handlePickerClick={handlePickerClick} />


                    </View>}

                    {incomeTurnOverVisible && <View style={{ width: '100%', marginTop: 19, paddingHorizontal: 0, alignItems: 'center', justifyContent: 'center' }}>

                        <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, }}>
                            <TextComp textVal={incomeTurnOverCaption} textStyle={Commonstyles.inputtextStyle} Visible={incomeTurnOverMan} />
                        </View>

                        <TextInputComp textValue={incomeTurnOver} textStyle={Commonstyles.textinputtextStyle} type='numeric' Disable={incomeTurnOverDisable} ComponentName='incomeTurnOver' reference={incomeTurnOverRef} returnKey="next" handleClick={handleClick} handleReference={handleReference} />

                    </View>}

                    <View style={{ width: '100%', marginTop: 19, paddingHorizontal: 0, alignItems: 'center', justifyContent: 'center' }}>

                        <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, }}>
                            <TextComp textVal={language[0][props.language].str_businessvintage} textStyle={Commonstyles.inputtextStyle} Visible={true} />
                        </View>

                        <View style={{ width: '90%', flexDirection: 'row', justifyContent: 'space-between' }}>

                            {yearVisible && <View style={{ width: '48%' }}>
                                <View style={{ width: '100%', marginTop: 19, paddingHorizontal: 0, alignItems: 'center', justifyContent: 'center' }}>

                                    <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, }}>
                                        <TextComp textVal={yearCaption} textStyle={Commonstyles.inputtextStyle} Visible={yearMan} />
                                    </View>

                                    <TextInputComp textValue={year} textStyle={Commonstyles.textinputtextStyle} type='numeric' Disable={yearDisable} ComponentName='year' reference={yearRef} returnKey="next" handleClick={handleClick} handleReference={handleReference} />

                                </View>
                            </View>}


                            {monthsVisible && <View style={{ width: '48%' }}>
                                <View style={{ width: '100%', marginTop: 19, paddingHorizontal: 0, alignItems: 'center', justifyContent: 'center' }}>

                                    <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, }}>
                                        <TextComp textVal={monthsCaption} textStyle={Commonstyles.inputtextStyle} Visible={monthsMan} />
                                    </View>

                                    <TextInputComp textValue={months} textStyle={Commonstyles.textinputtextStyle} type='numeric' Disable={monthsDisable} ComponentName='month' reference={monthsRef} returnKey="done" handleClick={handleClick} handleReference={handleReference} />

                                </View>
                            </View>}

                        </View>

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
                    <TouchableOpacity onPress={() => { updateLeadDetails() }} activeOpacity={10} style={{
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
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 16,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
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


export default connect(mapStateToProps, mapDispatchToProps)(LeadCreationBusiness);
