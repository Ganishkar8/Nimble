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
import { languageAction } from '../../../Utils/redux/actions/languageAction';
import { language } from '../../../Utils/LanguageString';
import MyStatusBar from '../../../Components/MyStatusBar';
import Colors from '../../../Utils/Colors';
import Entypo from 'react-native-vector-icons/Entypo';
import Common from '../../../Utils/Common';
import ErrorModal from '../../../Components/ErrorModal';
import Loading from '../../../Components/Loading';
import apiInstance from '../../../Utils/apiInstance';
import tbl_loanApplication from '../../../Database/Table/tbl_loanApplication';
import tbl_client from '../../../Database/Table/tbl_client';
import tbl_clientaddressinfo from '../../../Database/Table/tbl_clientaddressinfo';
import { useIsFocused } from '@react-navigation/native';
import tbl_familydetails from '../../../Database/Table/tbl_familydetails';
import tbl_loanbusinessDetail from '../../../Database/Table/tbl_loanbusinessDetail';
import tbl_loanaddressinfo from '../../../Database/Table/tbl_loanaddressinfo';
import tbl_finexpdetails from '../../../Database/Table/tbl_finexpdetails';
import tbl_bankdetails from '../../../Database/Table/tbl_bankdetails';


const LoanApplicationTrackerDetails = (props, { navigation }) => {

    const [listData, setListData] = useState(props.route.params.leadData)
    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [apiError, setApiError] = useState('');
    const [loading, setLoading] = useState(false);
    const [bg, setBg] = useState('');
    const isScreenVisible = useIsFocused();
    const [processSubStageData, setProcessSubStageData] = useState();
    const [processSubStage, setProcessSubStage] = useState(props.mobilecodedetail.processSubStage);

    const [processModuleData, setProcessModuleData] = useState();
    const [processModule, setProcessModule] = useState(props.mobilecodedetail.processModule);

    const [processPageData, setprocessPageData] = useState();
    const [processPage, setprocessPage] = useState(props.mobilecodedetail.processPage);


    useEffect(() => {
        props.navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' }, tabBarVisible: false });
        if (global.LOANSTATUS == 'MANUAL KYC PENDING' || global.LOANSTATUS == 'INPROGRESS') {
            setBg('YELLOW')
        } else if (global.LOANSTATUS == 'MANUAL KYC APPROVED' || global.LOANSTATUS == 'APPROVED') {
            setBg('GREEN')
        } else if (global.LOANSTATUS == 'MANUAL KYC REJECTED' || global.LOANSTATUS == 'REJECTED') {
            setBg('RED')
        } else if (global.LOANSTATUS == 'DRAFT') {
            setBg('GREY')
        }
        return () => {
            props.navigation.getParent()?.setOptions({ tabBarStyle: undefined, tabBarVisible: undefined });

        }
    }, [props.navigation, isScreenVisible]);

    const getLoanAppIdDetails = () => {

        const baseURL = '8901'
        setLoading(true)
        let loanAppIDNew = listData.loanApplicationId

        apiInstance(baseURL).get(`/api/v2/profile-short/${loanAppIDNew}`)
            .then((response) => {
                // Handle the response data
                if (global.DEBUG_MODE) console.log("LoanAppDetails::" + JSON.stringify(response.data));
                global.LEADTRACKERDATA = response.data;
                insertData(response.data);
            })
            .catch((error) => {
                // Handle the error
                setLoading(false)
                if (global.DEBUG_MODE) console.log("LoanAppDetailsError::" + JSON.stringify(error.response.data));
                if (error.response.data != null) {
                    setApiError(error.response.data.message);
                    setErrorModalVisible(true)
                }
            });
    }

    const insertData = async (value) => {

        global.COMPLETEDSUBSTAGE = value.currentStatus.subStageCode;
        global.COMPLETEDMODULE = value.currentStatus.moduleCode;
        global.LOANAPPLICATIONID = value.id;
        global.TEMPAPPID = value.loanApplicationNumber;
        const filteredProcessSubStage = processSubStage.filter((data) => {
            return data.wfId === listData.wfId && (data.subStageCode === value.currentStatus.subStageCode);
        }).sort((a, b) => a.displayOrder - b.displayOrder)

        const filteredProcessModule = processModule.filter((data) => {
            return data.wfId === listData.wfId && (data.moduleCode === value.currentStatus.moduleCode);
        }).sort((a, b) => a.displayOrder - b.displayOrder)

        const filteredProcessPage = processPage.filter((data) => {
            return data.wfId === listData.wfId;
        }).sort((a, b) => a.displayOrder - b.displayOrder)

        const index = filteredProcessPage.findIndex(item => item.pageCode === value.currentStatus.pageCode);

        if (index > 0) {
            const previousPage = filteredProcessPage[index - 1];
            global.COMPLETEDPAGE = previousPage.pageCode;
            if (global.DEBUG_MODE) console.log(previousPage);
        } else {
            if (global.DEBUG_MODE) console.log("No previous entry found.");
        }

        setLoading(false);

        if (global.DEBUG_MODE) console.log('filteredProcessSubStage::' + JSON.stringify(filteredProcessSubStage));
        if (global.DEBUG_MODE) console.log('filteredProcessModule::' + JSON.stringify(filteredProcessModule));
        if (global.DEBUG_MODE) console.log('filteredProcessPage::' + JSON.stringify(filteredProcessPage));

        const deletePromises = [
            tbl_client.deleteAllClient(),
            tbl_loanApplication.deleteAllLoan(),
            tbl_clientaddressinfo.deleteAllAddress(),
            tbl_familydetails.deleteAllFamilyDetails(),
            tbl_loanbusinessDetail.deleteAllBusinessDetails(),
            tbl_loanaddressinfo.deleteAllLoanAddress(),
            tbl_finexpdetails.deleteAllFinExpDetails(),
            tbl_loanbusinessDetail.deleteAllBusinessDetails(),
            tbl_bankdetails.deleteAllBankDetails(),
        ];
        await Promise.all(deletePromises);
        var loanApplicationID = value.id;
        tbl_loanApplication.insertLoanApplication(loanApplicationID, 'APPL', value.loanApplicationNumber, value.tempNumber, value.branchId, value.leadId, value.customerCategory, value.customerSubcategory, value.customerType, value.loanType, value.loanPurpose,
            value.product, value.loanAmount, value.workflowId, '', value.consent, '', '', value.applicationAppliedBy, '', value.lmsApplicationNumber, value.isManualKyc, value.manualKycStatus, '', '', value.createdBy, 'value.createdDate', '', 'value.modifiedDate', '', '')

        await value.clientDetail.forEach(async (client) => {
            var dob = '';
            // if (client.dateOfBirth && client.dateOfBirth != undefined) {
            //     dob = Common.convertDateFormat(client.dateOfBirth);
            // }
            await tbl_client.insertClient(client.id, loanApplicationID, client.clientType, client.relationType, client.title, client.firstName, client.middleName, client.lastName, dob, client.age, client.fatherName, client.spouseName, client.caste, client.religion, client.motherTongue, client.educationQualification, client.gender, client.maritalStatus, client.mobileNumber, client.email, client.isKycManual,
                client.kycTypeId1, client.kycIdValue1, client.kycType1ExpiryDate, client.kycTypeId2, client.kycIdValue2, client.kycType2ExpiryDate, client.kycTypeId3, client.kycIdValue3, client.kycType3ExpiryDate, client.kycTypeId4, client.kycIdValue4, client.kycType4ExpiryDate, client.msme, client.isAadharNumberVerified, client.panVerified, client.udyamRegistrationNumber, client.udyamRegistrationNumberVerified, client.mobileNumberVerified, client.emailVerified, value.dedupeCheck, client.dedupePassed, client.dmsId, client.imageName, client.geoCode, 'true', '', '', '', '', '', '', '', value.lmsClientId, value.lmsCustomerTypeId);

            // If there are clientAddress details, iterate through them
            if (client.clientAddress && client.clientAddress.length > 0) {

                if (Common.DEBUG_MODE) console.log('Client Address Details:' + client.clientAddress);
                client.clientAddress.forEach((address) => {
                    if (address.addressType == 'P' || address.addressType == 'C') {
                        tbl_clientaddressinfo.insertClientAddress(loanApplicationID, address.id, client.id, client.clientType, address.addressType, address.addressLine1, address.addressLine2, address.landmark, address.pincode, address.city, address.district, address.state, address.country, address.mobileOrLandLineNumber, address.emailId, address.addressOwnership, address.ownerDetails, address.ownerName, address.geoClassification, address.yearsAtResidence, address.yearsInCurrentCityOrTown, 'true', '', '', '', '', '', '', client.aadharNumberVerified);
                    } else {
                        tbl_loanaddressinfo.insertLoanAddress(loanApplicationID, address.id, client.id, client.clientType, address.addressType, address.addressLine1, address.addressLine2, address.landmark, address.pincode, address.city, address.district, address.state, address.country, address.mobileOrLandLineNumber, address.emailId, address.addressOwnership, address.ownerDetails, address.ownerName, "true", "0")
                    }
                });
            }

            if (client.clientBankDetail && client.clientBankDetail.length > 0) {

                if (Common.DEBUG_MODE) console.log('Client Bank Details:' + client.clientBankDetail);
                client.clientBankDetail.forEach((bankdetail) => {
                    tbl_bankdetails.insertBankDetails(bankdetail.id, loanApplicationID, client.id, client.clientType, bankdetail.accountType, bankdetail.accountHolderNameAsPerBank, bankdetail.ifscCode, bankdetail.bankName, bankdetail.branchName, bankdetail.accountNumber, bankdetail.bankLinkedMobileNo, bankdetail.upiId, bankdetail.dmsId, bankdetail.accountToBeUsedFor, "")
                });
            }
            if (Common.DEBUG_MODE) console.log('Client Business Details:' + client.clientBusinessDetail);

            if (client.clientBusinessDetail != undefined) {
                const businessdetail = client.clientBusinessDetail
                //  client.clientBusinessDetail.forEach((businessdetail) => {
                tbl_loanbusinessDetail.insertBusinessDetail(loanApplicationID, businessdetail.id, client.id, client.clientType, businessdetail.customerSubcategory, businessdetail.enterpriseShopName, businessdetail.udyamRegistrationNumber, businessdetail.dateOfIncorporation, businessdetail.dateOfRegistration, businessdetail.dateOfBusinessCommencement, businessdetail.businessVintageYears, businessdetail.businessVintageMonths, businessdetail.industryType, businessdetail.industryLine, businessdetail.companyType, businessdetail.enterpriseType, businessdetail.businessLocationVillage, businessdetail.noOfEmployees, businessdetail.operatingDaysInAWeek, businessdetail.operatingTimesInADay, businessdetail.bookKeepingStatus, businessdetail.homeBasedBusiness, businessdetail.applicantCustomerTransactionMode, businessdetail.timeSpentAtTheBusinessInADay, businessdetail.npmRateOfBusiness, businessdetail.purchasesFrequency, businessdetail.typeOfPurchasingFacility, businessdetail.salesFrequency, businessdetail.clientBusinessImageGeocodeDetail[0].dmsId);

                // });

            }

            if (client.clientFinancialDetail != undefined) {

                if (Common.DEBUG_MODE) console.log('Client Financial Details:' + client.clientFinancialDetail);
                //client.clientFinancialDetail.forEach((findetail) => {
                const findetail = client.clientFinancialDetail;
                findetail.clientIncomeDetails.forEach((incomedetail) => {
                    tbl_finexpdetails.insertIncExpDetails(loanApplicationID, client.id, client.clientType, incomedetail.id, incomedetail.parentIncomeType, incomedetail.incomeType, incomedetail.incomeAmount);
                });

                findetail.clientExpenseDetails.forEach((expensedetail) => {
                    tbl_finexpdetails.insertIncExpDetails(loanApplicationID, client.id, client.clientType, expensedetail.id, expensedetail.parentExpenseType, expensedetail.expensesType, expensedetail.expenseAmount);
                });

                // });
            }

        });

        await value.familyDetail.forEach(async (client) => {
            var dob = '', exp1 = '', exp2 = '', exp3 = '', exp4 = '';
            if (Common.DEBUG_MODE) console.log('Loan Family Details:' + client);
            // if (client.dateOfBirth && client.dateOfBirth != undefined) {
            //     dob = Common.convertDateFormat(client.dateOfBirth);
            // }
            // if (client.kycType1ExpiryDate && client.kycType1ExpiryDate != undefined) {
            //     exp1 = Common.convertDateFormat(client.kycType1ExpiryDate);
            // }
            // if (client.kycType2ExpiryDate && client.kycType2ExpiryDate != undefined) {
            //     exp2 = Common.convertDateFormat(client.kycType2ExpiryDate);
            // }
            // if (client.kycType3ExpiryDate && client.kycType3ExpiryDate != undefined) {
            //     exp3 = Common.convertDateFormat(client.kycType3ExpiryDate);
            // }
            // if (client.kycType4ExpiryDate && client.kycType4ExpiryDate != undefined) {
            //     exp4 = Common.convertDateFormat(client.kycType4ExpiryDate);
            // }
            await tbl_familydetails.insertFamilyDetails(client.id, loanApplicationID, 'APPL', client.relationshipWithApplicant, 'MR', client.name, '', '', dob, client.age, 'MALE', client.mobileNumber, client.kycTypeId1, client.kycIdValue1, exp1, client.kycTypeId2, client.kycIdValue2, exp2, client.kycTypeId3, client.kycIdValue3, exp3, client.kycTypeId4, client.kycIdValue4, exp4, '0', client.relationshipWithCoApplicant, client.relationshipWithGuarantor);

        });


        setLoading(false);
        props.navigation.navigate('LoanApplicationMain', { fromScreen: 'ApplicationTrackerDetails' })
    }

    const closeErrorModal = () => {
        setErrorModalVisible(false);
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#fefefe' }}>
            <MyStatusBar backgroundColor={'white'} barStyle="dark-content" />
            <ErrorModal isVisible={errorModalVisible} onClose={closeErrorModal} textContent={apiError} textClose={language[0][props.language].str_ok} />

            {loading ? <Loading /> : null}
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
                    <Text style={{ fontSize: 18, color: '#000', fontFamily: 'Poppins-Medium', marginTop: 3 }}>{language[0][props.language].str_loanappdetails}</Text>
                </View>
            </View>
            <View style={{ height: 6, backgroundColor: Colors.skyblue }} />

            <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>
                <View style={{ width: '90%', borderWidth: 1, borderColor: Colors.borderbg, borderRadius: 5 }}>
                    <View style={{ width: '100%', flexDirection: 'row', marginTop: 13 }}>
                        <View style={{ width: '35%', flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ color: Colors.black, fontSize: 14, marginLeft: 26, fontFamily: 'Poppins-Medium' }}>{language[0][props.language].str_status}</Text>
                        </View>
                        <View style={{ width: '65%', flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                            <View style={bg == 'GREEN' ? styles.approvedbackground : bg == 'YELLOW' ? styles.pendingbackground : bg == 'GREY' ? styles.draftbackground : styles.rejectedbackground}>
                                <Text style={{ color: Colors.black, fontSize: 12, fontFamily: 'Poppins-Medium' }}>{listData.status}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ width: '100%', height: .9, backgroundColor: Colors.line, marginTop: 13 }} />
                    <View style={{ width: '100%', marginLeft: 15 }}>
                        <View style={{ width: '100%', flexDirection: 'row', marginTop: 13, }}>
                            <View style={{ width: '45%' }}>
                                <Text style={styles.headText}>{language[0][props.language].str_customername}</Text>
                            </View>
                            <View style={{ width: '55%' }}>
                                <Text style={styles.childText}>:  {listData.customerName}</Text>
                            </View>
                        </View>
                        <View style={{ width: '100%', flexDirection: 'row', marginTop: 11, }}>
                            <View style={{ width: '45%' }}>
                                <Text style={styles.headText}>{language[0][props.language].str_laonappid}</Text>
                            </View>
                            <View style={{ width: '55%' }}>
                                <Text style={styles.childText}>:  {listData.loanApplicationNumber}</Text>
                            </View>
                        </View>
                        <View style={{ width: '100%', flexDirection: 'row', marginTop: 11, }}>
                            <View style={{ width: '45%' }}>
                                <Text style={styles.headText}>{language[0][props.language].str_workflowstage}</Text>
                            </View>
                            <View style={{ width: '55%' }}>
                                <Text style={styles.childText}>:   {listData.workflowStage}</Text>
                            </View>
                        </View>
                        <View style={{ width: '100%', flexDirection: 'row', marginTop: 11, }}>
                            <View style={{ width: '45%' }}>
                                <Text style={styles.headText}>{language[0][props.language].str_creationdate}</Text>
                            </View>
                            <View style={{ width: '55%' }}>
                                <Text style={styles.childText}>:  {Common.formatDate(listData.creationDate)}</Text>
                            </View>
                        </View>
                        <View style={{ width: '100%', flexDirection: 'row', marginTop: 11, }}>
                            <View style={{ width: '45%' }}>
                                <Text style={styles.headText}>{language[0][props.language].str_completiondate}</Text>
                            </View>
                            <View style={{ width: '55%' }}>
                                <Text style={styles.childText}>:  {bg == 'GREEN' ? Common.formatDate(listData.completionDate) : bg == 'RED' ? Common.formatDate(listData.completionDate) : ''} </Text>
                            </View>
                        </View>
                        <View style={{ width: '100%', flexDirection: 'row', marginTop: 11, marginBottom: 5 }}>
                            <View style={{ width: '45%' }}>
                                <Text style={styles.headText}>{language[0][props.language].str_ageing}</Text>
                            </View>
                            <View style={{ width: '55%' }}>
                                <Text style={styles.childText}>:  {listData.ageing} days</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>

            <TouchableOpacity activeOpacity={0.5} style={{ width: '100%', marginTop: '8%', alignItems: 'center' }}
                onPress={() => getLoanAppIdDetails()}>
                <View style={{ flexDirection: 'row' }}>

                    <View style={{ width: '52%', justifyContent: 'center' }}>
                        <Text style={styles.textStyle}>{language[0][props.language].str_reviewLoanAppForm}</Text>
                    </View>

                    <View style={{ width: '30%' }}></View>
                    <Entypo name='chevron-right' size={23} color={Colors.darkblack} />

                </View>
                <View style={{ width: '90%', height: .9, backgroundColor: Colors.line, marginTop: 13 }} />
            </TouchableOpacity>


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
export default connect(mapStateToProps, mapDispatchToProps)(LoanApplicationTrackerDetails);

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