import React, { useState, useRef, useEffect } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    Image,
    Text,
    FlatList,
    CheckBox,
    BackHandler, PermissionsAndroid
} from 'react-native';
import apiInstance from '../../../Utils/apiInstance';
import apiInstancelocal from '../../../Utils/apiInstancelocal';
import Colors from '../../../Utils/Colors';
import MyStatusBar from '../../../Components/MyStatusBar';
import Loading from '../../../Components/Loading';
import TextComp from '../../../Components/TextComp';
import { connect } from 'react-redux';
import { languageAction } from '../../../Utils/redux/actions/languageAction';
import { dedupeAction } from '../../../Utils/redux/actions/ProfileAction';
import { language } from '../../../Utils/LanguageString';
import Commonstyles from '../../../Utils/Commonstyles';
import HeadComp from '../../../Components/HeadComp';
import ProgressComp from '../../../Components/ProgressComp';
import tbl_SystemMandatoryFields from '../../../Database/Table/tbl_SystemMandatoryFields';
import Modal from 'react-native-modal';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Common from '../../../Utils/Common';
import tbl_SystemCodeDetails from '../../../Database/Table/tbl_SystemCodeDetails';
import TextInputComp from '../../../Components/TextInputComp';
import PickerComp from '../../../Components/PickerComp';
import ButtonViewComp from '../../../Components/ButtonViewComp';
import ErrorMessageModal from '../../../Components/ErrorMessageModal';
import { Directions } from 'react-native-gesture-handler';
import ChildHeadComp from '../../../Components/ChildHeadComp';
import CheckBoxComp from '../../../Components/CheckBoxComp';
import DateTimePicker from '@react-native-community/datetimepicker';
import DateComp from '../../../Components/Filter/DateComp';
import DateInputComp from '../../../Components/DateInputComp';
import ErrorModal from '../../../Components/ErrorModal';
import DedupeModal from '../../../Components/DedupeModal';
import { useIsFocused } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
const data = [
    {
        "year": 2023,
        "id": 73,
        "installmentNo": 1,
        "installmentDate": "2024-01-15",
        "loanBalance": 10088.35,
        "principalBalance": 9602.35,
        "installmentAmount": 440.0,
        "principalAmount": 397.65,
        "interestAmount": 440.0,
        "others": null,
        "isActive": null,
        "createdBy": null,
        "createdDate": null,
        "modifiedBy": null,
        "modifiedDate": null
    },
    {
        "year": 2023,
        "id": 74,
        "installmentNo": 2,
        "installmentDate": "2024-02-15",
        "loanBalance": 9648.35,
        "principalBalance": 9202.36,
        "installmentAmount": 440.0,
        "principalAmount": 399.99,
        "interestAmount": 440.0,
        "others": "0.0",
        "isActive": null,
        "createdBy": null,
        "createdDate": null,
        "modifiedBy": null,
        "modifiedDate": null
    },
    {
        "year": 2023,
        "id": 75,
        "installmentNo": 3,
        "installmentDate": "2024-03-15",
        "loanBalance": 9208.35,
        "principalBalance": 8800.7,
        "installmentAmount": 440.0,
        "principalAmount": 401.66,
        "interestAmount": 440.0,
        "others": "0.0",
        "isActive": null,
        "createdBy": null,
        "createdDate": null,
        "modifiedBy": null,
        "modifiedDate": null
    },
    {
        "year": 2023,
        "id": 76,
        "installmentNo": 4,
        "installmentDate": "2024-04-15",
        "loanBalance": 8768.35,
        "principalBalance": 8397.37,
        "installmentAmount": 440.0,
        "principalAmount": 403.33,
        "interestAmount": 440.0,
        "others": "0.0",
        "isActive": null,
        "createdBy": null,
        "createdDate": null,
        "modifiedBy": null,
        "modifiedDate": null
    },
    {
        "year": 2022,
        "id": 77,
        "installmentNo": 5,
        "installmentDate": "2024-05-15",
        "loanBalance": 8328.35,
        "principalBalance": 7992.36,
        "installmentAmount": 440.0,
        "principalAmount": 405.01,
        "interestAmount": 440.0,
        "others": "0.0",
        "isActive": null,
        "createdBy": null,
        "createdDate": null,
        "modifiedBy": null,
        "modifiedDate": null
    },
    {
        "year": 2022,
        "id": 78,
        "installmentNo": 6,
        "installmentDate": "2024-06-15",
        "loanBalance": 7888.35,
        "principalBalance": 7585.66,
        "installmentAmount": 440.0,
        "principalAmount": 406.7,
        "interestAmount": 440.0,
        "others": "0.0",
        "isActive": null,
        "createdBy": null,
        "createdDate": null,
        "modifiedBy": null,
        "modifiedDate": null
    },
    {
        "year": 2022,
        "id": 79,
        "installmentNo": 7,
        "installmentDate": "2024-07-15",
        "loanBalance": 7448.35,
        "principalBalance": 7177.27,
        "installmentAmount": 440.0,
        "principalAmount": 408.39,
        "interestAmount": 440.0,
        "others": "0.0",
        "isActive": null,
        "createdBy": null,
        "createdDate": null,
        "modifiedBy": null,
        "modifiedDate": null
    },
    {
        "year": 2022,
        "id": 80,
        "installmentNo": 8,
        "installmentDate": "2024-08-15",
        "loanBalance": 7008.35,
        "principalBalance": 6767.18,
        "installmentAmount": 440.0,
        "principalAmount": 410.09,
        "interestAmount": 440.0,
        "others": "0.0",
        "isActive": null,
        "createdBy": null,
        "createdDate": null,
        "modifiedBy": null,
        "modifiedDate": null
    },
    {
        "year": 2022,
        "id": 81,
        "installmentNo": 9,
        "installmentDate": "2024-09-15",
        "loanBalance": 6568.35,
        "principalBalance": 6355.38,
        "installmentAmount": 440.0,
        "principalAmount": 411.8,
        "interestAmount": 440.0,
        "others": "0.0",
        "isActive": null,
        "createdBy": null,
        "createdDate": null,
        "modifiedBy": null,
        "modifiedDate": null
    },
    {
        "year": 2021,
        "id": 82,
        "installmentNo": 10,
        "installmentDate": "2024-10-15",
        "loanBalance": 6128.35,
        "principalBalance": 5941.86,
        "installmentAmount": 440.0,
        "principalAmount": 413.52,
        "interestAmount": 440.0,
        "others": "0.0",
        "isActive": null,
        "createdBy": null,
        "createdDate": null,
        "modifiedBy": null,
        "modifiedDate": null
    },
    {
        "year": 2021,
        "id": 83,
        "installmentNo": 11,
        "installmentDate": "2024-11-15",
        "loanBalance": 5688.35,
        "principalBalance": 5526.62,
        "installmentAmount": 440.0,
        "principalAmount": 415.24,
        "interestAmount": 440.0,
        "others": "0.0",
        "isActive": null,
        "createdBy": null,
        "createdDate": null,
        "modifiedBy": null,
        "modifiedDate": null
    },
    {
        "year": 2021,
        "id": 84,
        "installmentNo": 12,
        "installmentDate": "2024-12-15",
        "loanBalance": 5248.35,
        "principalBalance": 5109.65,
        "installmentAmount": 440.0,
        "principalAmount": 416.97,
        "interestAmount": 440.0,
        "others": "0.0",
        "isActive": null,
        "createdBy": null,
        "createdDate": null,
        "modifiedBy": null,
        "modifiedDate": null
    },
    {
        "year": 2021,
        "id": 85,
        "installmentNo": 13,
        "installmentDate": "2025-01-15",
        "loanBalance": 4808.35,
        "principalBalance": 4690.94,
        "installmentAmount": 440.0,
        "principalAmount": 418.71,
        "interestAmount": 440.0,
        "others": "0.0",
        "isActive": null,
        "createdBy": null,
        "createdDate": null,
        "modifiedBy": null,
        "modifiedDate": null
    },
    {
        "year": 2021,
        "id": 86,
        "installmentNo": 14,
        "installmentDate": "2025-02-15",
        "loanBalance": 4368.35,
        "principalBalance": 4270.49,
        "installmentAmount": 440.0,
        "principalAmount": 420.45,
        "interestAmount": 440.0,
        "others": "0.0",
        "isActive": null,
        "createdBy": null,
        "createdDate": null,
        "modifiedBy": null,
        "modifiedDate": null
    },
    {
        "year": 2021,
        "id": 87,
        "installmentNo": 15,
        "installmentDate": "2025-03-15",
        "loanBalance": 3928.35,
        "principalBalance": 3848.28,
        "installmentAmount": 440.0,
        "principalAmount": 422.21,
        "interestAmount": 440.0,
        "others": "0.0",
        "isActive": null,
        "createdBy": null,
        "createdDate": null,
        "modifiedBy": null,
        "modifiedDate": null
    },
    {
        "year": 2021,
        "id": 88,
        "installmentNo": 16,
        "installmentDate": "2025-04-15",
        "loanBalance": 3488.35,
        "principalBalance": 3424.31,
        "installmentAmount": 440.0,
        "principalAmount": 423.97,
        "interestAmount": 440.0,
        "others": "0.0",
        "isActive": null,
        "createdBy": null,
        "createdDate": null,
        "modifiedBy": null,
        "modifiedDate": null
    },
    {
        "year": 2021,
        "id": 89,
        "installmentNo": 17,
        "installmentDate": "2025-05-15",
        "loanBalance": 3048.35,
        "principalBalance": 2998.58,
        "installmentAmount": 440.0,
        "principalAmount": 425.73,
        "interestAmount": 440.0,
        "others": "0.0",
        "isActive": null,
        "createdBy": null,
        "createdDate": null,
        "modifiedBy": null,
        "modifiedDate": null
    },
    {
        "year": 2021,
        "id": 90,
        "installmentNo": 18,
        "installmentDate": "2025-06-15",
        "loanBalance": 2608.35,
        "principalBalance": 2571.07,
        "installmentAmount": 440.0,
        "principalAmount": 427.51,
        "interestAmount": 440.0,
        "others": "0.0",
        "isActive": null,
        "createdBy": null,
        "createdDate": null,
        "modifiedBy": null,
        "modifiedDate": null
    },

]

const RepaymentSchedule = (props, { navigation }) => {

    const [cbResponse, setCBResponse] = useState(data);
    const [refreshFlatlist, setRefreshFlatList] = useState(false);
    const isScreenVisible = useIsFocused();
    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [apiError, setApiError] = useState('');
    const [loading, setLoading] = useState(false);
    const [repayScheduleData, setRepayScheduleData] = useState();

    useEffect(() => {
        props.navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' }, tabBarVisible: false });
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);
        const organizedData = props.route.params.scheduledata.reduce((acc, installment) => {
            const year = installment.year.toString();

            // Check if the year is already present in the accumulator
            const existingYear = acc.find(item => item.year === year);

            if (existingYear) {
                // If the year exists, push the installment to its data array
                existingYear.data.push(installment);
            } else {
                // If the year does not exist, create a new entry with the year and data array
                acc.push({
                    year,
                    data: [installment],
                    isSelected: false
                });
            }

            return acc;
        }, []);
        setRepayScheduleData(organizedData);
        console.log(JSON.stringify(organizedData))
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

    const loanData = [
        // Your loan data here
    ];








    const toggleBottomNavigationView = () => {
        //Toggling the visibility state of the bottom sheet
        setBottomSheetVisible(!bottomSheetVisible);
    };

    const updateHideAndShow = (item, index) => {
        let fiterPosition = repayScheduleData
        for (let i = 0; i < fiterPosition.length; i++) {
            if (i == index) {
                if (fiterPosition[i].isSelected) {
                    fiterPosition[i].isSelected = false
                } else {
                    fiterPosition[i].isSelected = true
                }
            }
        }
        //alert(JSON.stringify(fiterPosition))
        setCBResponse(fiterPosition)
        setRefreshFlatList(!refreshFlatlist)
    }

    const updateLoanStatus = () => {

        var module = ''; var page = '';

        module = 'CB_BRE_DCSN';
        page = 'CB_CHK_BRE_DCSN';


        const appDetails = {
            "loanApplicationId": global.LOANAPPLICATIONID,
            "loanWorkflowStage": "LN_APP_INITIATION",
            "subStageCode": "CB_CHK",
            "moduleCode": module,
            "pageCode": page,
            "status": "Completed"
        }
        const baseURL = '8901';
        setLoading(true);
        apiInstance(baseURL)
            .post(`/api/v2/loan-application-status/updateStatus`, appDetails)
            .then(async response => {
                // Handle the response data
                if (global.DEBUG_MODE) console.log('UpdateStatusApiResponse::' + JSON.stringify(response.data),);
                setLoading(false);
                global.COMPLETEDSUBSTAGE = 'LN_DEMGRP';
                global.COMPLETEDMODULE = 'CB_BRE_DCSN';
                global.COMPLETEDPAGE = 'CB_CHK_BRE_DCSN';

                props.navigation.replace('LoanApplicationMain', { fromScreen: 'CBStatus' })

            })
            .catch(error => {
                // Handle the error
                if (global.DEBUG_MODE) console.log('UpdateStatusApiResponse' + JSON.stringify(error.response));
                setLoading(false);
                if (error.response.data != null) {
                    setApiError(error.response.data.message);
                    setErrorModalVisible(true)
                }
            });

    };

    const closeErrorModal = () => {
        setErrorModalVisible(false);
    };

    const listView = ({ item, index }) => {

        return (
            <View style={{ width: '100%', backgroundColor: 'white' }}>
                <View style={{ width: '100%', backgroundColor: 'white' }}>

                    <View style={{ width: '100%', flexDirection: 'row', marginLeft: 15, marginTop: 10 }}>
                        <View style={{ width: '85%', flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ color: Colors.black, fontSize: 14, fontFamily: 'Poppins-Medium', marginLeft: 5 }}>{item.year}</Text>
                        </View>
                        <TouchableOpacity onPress={() => updateHideAndShow(item, index)}
                            style={{ width: '15%', flexDirection: 'row' }}>
                            <View >
                                {item.isSelected ?
                                    (<MaterialIcons name='keyboard-arrow-up' size={23} color={Colors.black} />) :
                                    (<MaterialIcons name='keyboard-arrow-down' size={23} color={Colors.black} />)
                                }
                            </View>
                        </TouchableOpacity>
                    </View>

                    {/* subview */}
                    {item.isSelected &&
                        (
                            <View>
                                <View style={{ width: '100%', backgroundColor: '#EDF7FF', minHeight: 40, justifyContent: 'center' }}>
                                    <View style={{ width: '85%', alignSelf: 'center', flexDirection: 'row' }}>

                                        <View style={{ width: '25%' }}>
                                            <Text style={{ color: Colors.mediumgrey, fontSize: 12.5, fontFamily: 'Poppins-Medium' }}>Month</Text>
                                        </View>

                                        <View style={{ width: '25%' }}>
                                            <Text style={{ color: Colors.mediumgrey, fontSize: 12.5, fontFamily: 'Poppins-Medium' }}>EMI</Text>
                                        </View>

                                        <View style={{ width: '25%' }}>
                                            <Text style={{ color: Colors.mediumgrey, fontSize: 12.5, fontFamily: 'Poppins-Medium' }}>Principle</Text>
                                        </View>

                                        <View style={{ width: '25%' }}>
                                            <Text style={{ color: Colors.mediumgrey, fontSize: 12.5, fontFamily: 'Poppins-Medium' }}>Interest</Text>
                                        </View>

                                    </View>
                                </View>

                                <FlatList
                                    data={item.data}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={({ item, index }) => {
                                        return (
                                            <View style={{ width: '100%', backgroundColor: '#EDF7FF', minHeight: 40, justifyContent: 'center', marginTop: 5 }}>
                                                <View style={{ width: '85%', alignSelf: 'center', flexDirection: 'row' }}>

                                                    <View style={{ width: '25%' }}>
                                                        <Text style={{ color: Colors.mediumgrey, fontSize: 12.5, fontFamily: 'Poppins-Medium' }}>{item.month}</Text>
                                                    </View>

                                                    <View style={{ width: '25%' }}>
                                                        <Text style={{ color: Colors.mediumgrey, fontSize: 12.5, fontFamily: 'Poppins-Medium' }}>{item.installmentAmount}</Text>
                                                    </View>

                                                    <View style={{ width: '25%' }}>
                                                        <Text style={{ color: Colors.mediumgrey, fontSize: 12.5, fontFamily: 'Poppins-Medium' }}>{item.principalAmount}</Text>
                                                    </View>

                                                    <View style={{ width: '25%' }}>
                                                        <Text style={{ color: Colors.mediumgrey, fontSize: 12.5, fontFamily: 'Poppins-Medium' }}>{item.interestAmount}</Text>
                                                    </View>

                                                </View>
                                            </View>
                                        )
                                    }}
                                />

                            </View>
                        )}

                </View>
                <View style={{ width: '100%', height: 0.9, backgroundColor: Colors.line, marginTop: 13 }} />
            </View>

        )
    }


    return (

        <View style={{ flex: 1, backgroundColor: Colors.white }}>
            <MyStatusBar backgroundColor={'white'} barStyle="dark-content" />
            <View
                style={{
                    width: '100%',
                    height: 56,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                <HeadComp
                    textval={language[0][props.language].str_repayschedule}
                    props={props}
                    onGoBack={onGoBack}
                />
            </View>
            <View style={{ width: '100%', marginLeft: 21, marginTop: 18 }}>

                <TextComp textVal={language[0][props.language].str_repayscheduledtls}
                    textStyle={{ color: Colors.darkblack, fontFamily: 'Poppins-Medium', fontSize: 13, marginTop: 5 }} />
            </View>
            <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', marginTop: 5 }}>
                <View style={{ width: '100%', height: .9, backgroundColor: Colors.line, marginTop: 5 }} />
            </View>

            <View style={{ width: '100%', justifyContent: 'center', marginBottom: 110 }}>
                <FlatList
                    extraData={refreshFlatlist}
                    data={repayScheduleData}
                    renderItem={listView}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>

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
export default connect(mapStateToProps, mapDispatchToProps)(RepaymentSchedule);


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#f5f8fa',
        alignItems: 'center'
    },
    disableBg: {
        width: '88%', height: 50, backgroundColor: Colors.disableBg,
        borderRadius: 45, alignItems: 'center', justifyContent: 'center'
    },
    enableBg: {
        width: '88%', height: 50, backgroundColor: Colors.skyBlue,
        borderRadius: 45, alignItems: 'center', justifyContent: 'center'
    },
    pendingbackground: {
        width: 115, borderColor: Colors.pendingBorder, backgroundColor: Colors.pendingBg, alignItems: 'center', padding: 2, borderRadius: 15, borderWidth: 1
    },
    approvedbackground: {
        width: 115, borderColor: Colors.approvedBorder, backgroundColor: Colors.approvedBg, alignItems: 'center', padding: 3, borderRadius: 15, borderWidth: 1
    },
    bottomNavigationView: {
        backgroundColor: '#fff',
        width: '100%',
        height: 150,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    }, fab: {
        position: 'absolute',
        margin: 0,
        right: 0,
        bottom: 12,
        width: '100%',

    },

});