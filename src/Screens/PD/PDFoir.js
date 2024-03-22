import React, { useEffect, useState } from 'react';
import {
    View,
    StatusBar,
    Text,
    Image,
    FlatList,
    StyleSheet,
    TextInput,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
} from 'react-native';
import { connect } from 'react-redux';
import { languageAction } from '../../Utils/redux/actions/languageAction';
import { language } from '../../Utils/LanguageString';
import MyStatusBar from '../../Components/MyStatusBar';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Colors from '../../Utils/Colors';
import Entypo from 'react-native-vector-icons/Entypo';
import Common from '../../Utils/Common';
import ErrorModal from '../../Components/ErrorModal';
import Loading from '../../Components/Loading';
import apiInstance from '../../Utils/apiInstance';
import { useIsFocused } from '@react-navigation/native';
import Commonstyles from '../../Utils/Commonstyles';
import TextComp from '../../Components/TextComp';


const PDFoir = (props, { navigation }) => {

    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [apiError, setApiError] = useState('');
    const [loading, setLoading] = useState(false);
    const isScreenVisible = useIsFocused();

    const [netIncome, setNetIncome] = useState('');
    const [balanceFund, setBalanceFund] = useState('');
    const [emiAmount, setEmiAmount] = useState('');
    const [excessFund, setExcessFund] = useState('');
    const [foir, setFoir] = useState('');
    const [netProfitMargin, setNetProfitMargin] = useState('');

    useEffect(() => {
        props.navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' }, tabBarVisible: false });

        if (props.route.params.clientId) {
            callIndividualFOIR();
        } else {
            callCombinedFOIR();
        }

        return () => {
            props.navigation.getParent()?.setOptions({ tabBarStyle: undefined, tabBarVisible: undefined });

        }
    }, [props.navigation, isScreenVisible]);



    const closeErrorModal = () => {
        setErrorModalVisible(false);
    };

    const callIndividualFOIR = () => {

        let dataLevel = '';

        if (global.PDSTAGE == 'PD_2') {
            dataLevel = 'PD_1';
        } else if (global.PDSTAGE == 'PD_3') {
            dataLevel = 'PD_2';
        }

        const appDetails = {

            "la_no": global.LOANAPPLICATIONID,
            "current_client": props.route.params.clientId,
            //"stage_lv": "PD",
            //"data_level": dataLevel,
            "current_level": global.PDSTAGE
        };
        const baseURL = global.PORT1;
        setLoading(true);
        apiInstance(baseURL)
            .post(`/api/v2/PD/Update/FoirCalculation`, appDetails)
            .then(async response => {
                // Handle the response data
                if (global.DEBUG_MODE)
                    console.log(
                        'FOIRCalculationApiResponse::' + JSON.stringify(response.data),
                    );
                setLoading(false);
                if (response.status == 200) {
                    setNetIncome(response?.data?.netIncome?.toString() ?? '')
                    setBalanceFund(response?.data?.balanceFund?.toString() ?? '')
                    setEmiAmount(response?.data?.emiAmount?.toString() ?? '')
                    setExcessFund(response?.data?.excessFund?.toString() ?? '')
                    setFoir(response?.data?.foirValue?.toString() ?? '')
                    setNetProfitMargin(response?.data?.netProfitMargin?.toString() ?? '' + '%')
                }
                else if (response.data.statusCode === 201) {
                    setApiError(response.data.message);
                    setErrorModalVisible(true);
                } else if (response.data.statusCode === 202) {
                    setApiError(response.data.message);
                    setErrorModalVisible(true);
                }
            })
            .catch(error => {
                // Handle the error
                if (global.DEBUG_MODE)
                    console.log(
                        'UpdateStatusApiResponse' + JSON.stringify(error.response),
                    );
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

    const callCombinedFOIR = () => {

        let dataLevel = '';

        if (global.PDSTAGE == 'PD_2') {
            dataLevel = 'PD_1';
        } else if (global.PDSTAGE == 'PD_3') {
            dataLevel = 'PD_2';
        }

        const appDetails = {

            "la_no": global.LOANAPPLICATIONID,
            // "stage_lv": "PD",
            // "data_level": dataLevel,
            "current_level": global.PDSTAGE
        };
        const baseURL = global.PORT1;
        setLoading(true);
        apiInstance(baseURL)
            .post(`/api/v2/PD/Update/combined`, appDetails)
            .then(async response => {
                // Handle the response data
                if (global.DEBUG_MODE)
                    console.log(
                        'FOIRCalculationApiResponse::' + JSON.stringify(response.data),
                    );
                setLoading(false);
                if (response.status == 200) {
                    setNetIncome(response?.data?.netIncome?.toString() ?? '')
                    setBalanceFund(response?.data?.balanceFund?.toString() ?? '')
                    setEmiAmount(response?.data?.emiAmount?.toString() ?? '')
                    setExcessFund(response?.data?.excessFund?.toString() ?? '')
                    setFoir(response?.data?.foirValue?.toString() ?? '')
                    setNetProfitMargin(response?.data?.netProfitMargin?.toString() ?? '' + '%')
                }
                else if (response.data.statusCode === 201) {
                    setApiError(response.data.message);
                    setErrorModalVisible(true);
                } else if (response.data.statusCode === 202) {
                    setApiError(response.data.message);
                    setErrorModalVisible(true);
                }
            })
            .catch(error => {
                // Handle the error
                if (global.DEBUG_MODE)
                    console.log(
                        'UpdateStatusApiResponse' + JSON.stringify(error.response),
                    );
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

    return (
        <View style={{ flex: 1, backgroundColor: '#fefefe' }}>
            <MyStatusBar backgroundColor={'white'} barStyle="dark-content" />
            <ErrorModal isVisible={errorModalVisible} onClose={closeErrorModal} textContent={apiError} textClose={language[0][props.language].str_ok} />

            {loading ? <Loading /> : null}
            <ScrollView style={styles.scrollView}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled">
                <View style={{ flex: 1 }}>

                    <View style={{
                        width: '100%', height: 56,
                        flexDirection: 'row', marginTop: 5
                    }}>
                        <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ height: 56, justifyContent: 'center', marginLeft: 5 }}>
                            <View>
                                <Entypo name='chevron-left' size={25} color='#4e4e4e' />
                            </View>
                        </TouchableOpacity>
                        <View style={{ width: '90%', height: 56, justifyContent: 'center', marginLeft: 5 }}>
                            <Text style={{ fontSize: 18, color: '#000', fontFamily: 'Poppins-Medium', marginTop: 3 }}>{props.route.params.header}</Text>
                        </View>
                    </View>

                    <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>
                        <View>
                            <View style={{ width: '100%', marginTop: '3%', alignItems: 'center' }}>
                                <View style={{ width: '90%', marginTop: 10 }}>
                                    <TextComp
                                        textStyle={{
                                            color: Colors.black,
                                            fontSize: 14,
                                            fontFamily: 'Poppins-SemiBold'
                                        }}
                                        textVal={language[0][props.language].str_netincome.toUpperCase()}></TextComp>

                                    <Text style={{ fontSize: 14, fontFamily: 'Poppins-Medium', marginTop: 5, color: Colors.black }}>
                                        <FontAwesome
                                            name="rupee"
                                            size={10.9}
                                            color="#343434"></FontAwesome> {netIncome}
                                    </Text>

                                </View>
                            </View>

                            <View style={{ width: '100%', marginTop: '3%', alignItems: 'center' }}>
                                <View style={{ width: '90%', marginTop: 10 }}>
                                    <TextComp
                                        textStyle={{
                                            color: Colors.black,
                                            fontSize: 14,
                                            fontFamily: 'Poppins-SemiBold'
                                        }}
                                        textVal={language[0][props.language].str_balancefund.toUpperCase()}></TextComp>

                                    <Text style={{ fontSize: 14, fontFamily: 'Poppins-Medium', marginTop: 5, color: Colors.black }}>
                                        <FontAwesome
                                            name="rupee"
                                            size={10.9}
                                            color="#343434"></FontAwesome> {balanceFund}
                                    </Text>

                                </View>
                            </View>

                            <View style={{ width: '100%', marginTop: '3%', alignItems: 'center' }}>
                                <View style={{ width: '90%', marginTop: 10 }}>
                                    <TextComp
                                        textStyle={{
                                            color: Colors.black,
                                            fontSize: 14,
                                            fontFamily: 'Poppins-SemiBold'
                                        }}
                                        textVal={language[0][props.language].str_emiamount.toUpperCase()}></TextComp>

                                    <Text style={{ fontSize: 14, fontFamily: 'Poppins-Medium', marginTop: 5, color: Colors.black }}>
                                        <FontAwesome
                                            name="rupee"
                                            size={10.9}
                                            color="#343434"></FontAwesome> {emiAmount}
                                    </Text>

                                </View>
                            </View>

                            <View style={{ width: '100%', marginTop: '3%', alignItems: 'center' }}>
                                <View style={{ width: '90%', marginTop: 10 }}>
                                    <TextComp
                                        textStyle={{
                                            color: Colors.black,
                                            fontSize: 14,
                                            fontFamily: 'Poppins-SemiBold'
                                        }}
                                        textVal={language[0][props.language].str_excessfund.toUpperCase()}></TextComp>

                                    <Text style={{ fontSize: 14, fontFamily: 'Poppins-Medium', marginTop: 5, color: Colors.black }}>
                                        <FontAwesome
                                            name="rupee"
                                            size={10.9}
                                            color="#343434"></FontAwesome> {excessFund}
                                    </Text>

                                </View>
                            </View>


                            <View style={{ width: '100%', marginTop: '3%', alignItems: 'center' }}>
                                <View style={{ width: '90%', marginTop: 10 }}>
                                    <TextComp
                                        textStyle={{
                                            color: Colors.black,
                                            fontSize: 14,
                                            fontFamily: 'Poppins-SemiBold'
                                        }}
                                        textVal={language[0][props.language].str_foir.toUpperCase()}></TextComp>

                                    <Text style={{ fontSize: 14, fontFamily: 'Poppins-Medium', marginTop: 5, color: Colors.black }}>
                                        <FontAwesome
                                            name="rupee"
                                            size={10.9}
                                            color="#343434"></FontAwesome> {foir}
                                    </Text>

                                </View>
                            </View>


                            <View style={{ width: '100%', marginTop: '3%', alignItems: 'center' }}>
                                <View style={{ width: '90%', marginTop: 10 }}>
                                    <TextComp
                                        textStyle={{
                                            color: Colors.black,
                                            fontSize: 14,
                                            fontFamily: 'Poppins-SemiBold'
                                        }}
                                        textVal={language[0][props.language].str_netProfitMargin.toUpperCase()}></TextComp>

                                    <Text style={{ fontSize: 14, fontFamily: 'Poppins-Medium', marginTop: 5, color: Colors.black }}>
                                        {netProfitMargin}
                                    </Text>

                                </View>
                            </View>



                        </View>
                    </View>

                </View>
            </ScrollView>

        </View>
    );
};

const mapStateToProps = (state) => {
    const { language } = state.languageReducer;
    const { profileDetails } = state.profileReducer;
    const { mobileCodeDetails } = state.mobilecodeReducer;
    return {
        language: language,
        profiledetail: profileDetails,
        mobilecodedetail: mobileCodeDetails
    }
}

const mapDispatchToProps = (dispatch) => ({
    languageAction: (item) => dispatch(languageAction(item)),
});
export default connect(mapStateToProps, mapDispatchToProps)(PDFoir);

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#f5f8fa',
        alignItems: 'center'
    },
    parentView: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    contentContainer: {
        paddingBottom: 50,
        flexGrow: 1
    },
    headerView: {
        width: '100%',
        paddingVertical: 15,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    viewStyle: {
        alignItems: 'center',
        paddingHorizontal: 20, marginLeft: 9, marginRight: 4,
        borderColor: '#e3e3e3',
        marginBottom: 4,
        marginStart: 12,
        paddingVertical: 7,
        borderWidth: 1,
        borderRadius: 8,
    },
    bottomNavigationView: {
        backgroundColor: '#fff',
        width: '100%',
        height: 400,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },

    textColor: {
        color: '#000',
        fontSize: 14,
        fontWeight: '400'
    },
    viewStyleFilter: {
        alignItems: 'center', justifyContent: 'center',
    },
    viewStyleStatusData: {
        alignItems: 'center'
    },
    picker: {
        height: 50,
        width: '85%',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        textAlign: 'center'
    },
    pendingbackground: {
        width: 90, borderColor: Colors.pendingBorder, backgroundColor: Colors.pendingBg, alignItems: 'center', padding: 3, borderRadius: 15, borderWidth: 1, marginRight: 10
    },
    approvedbackground: {
        width: 90, borderColor: Colors.approvedBorder, backgroundColor: Colors.approvedBg, alignItems: 'center', padding: 3, borderRadius: 15, borderWidth: 1, marginRight: 10
    },
    rejectedbackground: {
        width: 90, borderColor: Colors.rejectedBorder, backgroundColor: Colors.rejectedBg, alignItems: 'center', padding: 3, borderRadius: 15, borderWidth: 1, marginRight: 10
    },
    draftbackground: {
        width: 90, borderColor: Colors.lightgrey, backgroundColor: '#f2f2f2', alignItems: 'center', padding: 3, borderRadius: 15, borderWidth: 1, marginRight: 10
    },
    line: {
        backgroundColor: '#f1f1f1', // Change the color as needed
        height: 1,
        width: '90%', marginLeft: '5%',
        marginTop: '5%', alignItems: 'center'         // Adjust the height as needed
    },
    disableBg: {
        width: '88%', height: 50, backgroundColor: Colors.disableBg,
        borderRadius: 45, alignItems: 'center', justifyContent: 'center'
    },
    enableBg: {
        width: '88%', height: 50, backgroundColor: Colors.enableBg,
        borderRadius: 45, alignItems: 'center', justifyContent: 'center'
    }, fab: {
        position: 'absolute',
        margin: 0,
        right: 0,
        bottom: 12,
        width: '100%',

    },
    headText: {
        color: Colors.dimText, fontSize: 12, marginLeft: 10, fontFamily: 'PoppinsRegular'
    },
    childText: {
        color: Colors.black, fontSize: 12, marginLeft: 10, fontFamily: 'Poppins-Medium'
    },
    textStyle: {
        fontSize: 16, color: Colors.mediumgrey, marginTop: 5, fontFamily: 'PoppinsRegular'
    }

});