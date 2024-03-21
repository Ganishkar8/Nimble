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
    ToastAndroid
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
import { addLoanInitiationDetails, deleteLoanInitiationDetails } from '../../../Utils/redux/actions/loanInitiationAction';
import ButtonViewComp from '../../../Components/ButtonViewComp';
import Commonstyles from '../../../Utils/Commonstyles';
import TextInputComp from '../../../Components/TextInputComp';
import ModalContainer from '../../../Components/ModalContainer';
import TextComp from '../../../Components/TextComp';

const LoanApplicationTrackerDetails = (props, { navigation }) => {

    const [listData, setListData] = useState(props.route.params.leadData)
    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [rejectModalVisible, setRejectModalVisible] = useState(false);
    const [apiError, setApiError] = useState('');
    const [remarks, setRemarks] = useState('');
    const [loading, setLoading] = useState(false);
    const [bg, setBg] = useState('');
    const isScreenVisible = useIsFocused();
    const [processSubStageData, setProcessSubStageData] = useState();
    const [processSubStage, setProcessSubStage] = useState(props.mobilecodedetail.processSubStage);

    const [processModuleData, setProcessModuleData] = useState();
    const [processModule, setProcessModule] = useState(props.mobilecodedetail.processModule);

    const [processPageData, setprocessPageData] = useState();
    const [processPage, setprocessPage] = useState(props.mobilecodedetail.processPage);

    const showRejectModal = label => {
        setRejectModalVisible(true);
    };
    const hideRejectModal = () => setRejectModalVisible(false);


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

        const baseURL = global.PORT1
        setLoading(true)
        let loanAppIDNew = listData.loanApplicationId

        apiInstance(baseURL).get(`/api/v2/profile-short/${loanAppIDNew}`)
            .then((response) => {
                // Handle the response data
                if (response.status == 200) {
                    if (global.DEBUG_MODE) console.log("LoanAppDetails::" + JSON.stringify(response.data));
                    global.LEADTRACKERDATA = response.data;
                    const updatedObject = Object.keys(response.data).reduce((acc, key) => {
                        if (key !== 'loanApplicationStatusDtos') {
                            acc[key] = response.data[key];
                        }
                        return acc;
                    }, {});
                    props.deleteLoanInitiationDetails(global.LOANAPPLICATIONID);
                    props.addLoanInitiationDetails(updatedObject);
                    insertData(response.data);
                }
                else if (response.data.statusCode === 201) {
                    setApiError(response.data.message);
                    setErrorModalVisible(true);
                } else if (response.data.statusCode === 202) {
                    setApiError(response.data.message);
                    setErrorModalVisible(true);
                }
            })
            .catch((error) => {
                // Handle the error
                setLoading(false)
                if (global.DEBUG_MODE) console.log("LoanAppDetailsError::" + JSON.stringify(error.response.data));
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
    }

    const insertData = async (value) => {

        global.STAGESTATUS = value.lnAppInitiationCompletedDto.stageStatus;
        global.COMPLETEDSUBSTAGE = value.lnAppInitiationCompletedDto.subStageCode;
        global.COMPLETEDMODULE = value.lnAppInitiationCompletedDto.moduleCode;
        global.LOANAPPLICATIONID = value.id;
        global.TEMPAPPID = value.loanApplicationNumber;
        const filteredProcessSubStage = processSubStage.filter((data) => {
            return data.wfId === listData.wfId && (data.subStageCode === value.lnAppInitiationCompletedDto.subStageCode);
        }).sort((a, b) => a.displayOrder - b.displayOrder)

        const filteredProcessModule = processModule.filter((data) => {
            return data.wfId === listData.wfId && (data.moduleCode === value.lnAppInitiationCompletedDto.moduleCode);
        }).sort((a, b) => a.displayOrder - b.displayOrder)

        const filteredProcessPage = processPage.filter((data) => {
            return data.wfId === listData.wfId;
        }).sort((a, b) => a.displayOrder - b.displayOrder)

        const index = filteredProcessPage.findIndex(item => item.pageCode === value.lnAppInitiationCompletedDto.pageCode);

        if (value.lnAppInitiationCompletedDto.subStageStatus?.toUpperCase() == 'COMPLETED' || value.lnAppInitiationCompletedDto.subStageStatus?.toUpperCase() == 'REJECTED') {
            global.COMPLETEDPAGE = value.lnAppInitiationCompletedDto.pageCode
        } else {
            if (index > 0) {
                const previousPage = filteredProcessPage[index - 1];
                global.COMPLETEDPAGE = previousPage.pageCode;
                if (global.DEBUG_MODE) console.log(previousPage);
            } else {
                if (global.DEBUG_MODE) console.log("No previous entry found.");
            }
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
            value.product, value.loanAmount, value.workflowId, '', value.consent, '', '', value.applicationAppliedBy, '', value.lmsApplicationNumber, value.isKycManual, value.manualKycStatus, '', '', value.createdBy, 'value.createdDate', '', 'value.modifiedDate', '', '')

        await value.clientDetail.forEach(async (client) => {
            var dob = '';
            if (client.dateOfBirth && client.dateOfBirth != undefined) {
                dob = Common.convertDateFormat(client.dateOfBirth);
            }
            if (global.DEBUG_MODE) console.log('ClientDetails:' + JSON.stringify(client));

            await tbl_client.insertClient(client.id, loanApplicationID, client.clientType, client.leadId, client.relationType, client.title, client.firstName, client.middleName, client.lastName, dob, client.age, client.fatherName, client.spouseName, client.caste, client.religion, client.motherTongue, client.educationQualification, client.gender, client.maritalStatus, client.mobileNumber, client.email, client.isKycManual,
                client.kycTypeId1, client.kycIdValue1, client.kycType1ExpiryDate, client.kycTypeId2, client.kycIdValue2, client.kycType2ExpiryDate, client.kycTypeId3, client.kycIdValue3, client.kycType3ExpiryDate, client.kycTypeId4, client.kycIdValue4, client.kycType4ExpiryDate, client.isMsme, client.isAadharNumberVerified, client.isPanVerified, client.udyamRegistrationNumber, client.isUdyamRegistrationNumberVerified, client.isMobileNumberVerified, client.isEmailVerified, value.dedupeCheck, client.dedupePassed, client.dmsId, client.imageName, client.geoCode, 'true', '', '', '', '', '', '', '', value.lmsClientId, value.lmsCustomerTypeId);

            // If there are clientAddress details, iterate through them
            if (client.clientAddress && client.clientAddress.length > 0) {

                if (global.DEBUG_MODE) console.log('Client Address Details:' + JSON.stringify(client.clientAddress));
                client.clientAddress.forEach((address) => {

                    if (address.addressType == 'P' || address.addressType == 'C') {
                        tbl_clientaddressinfo.insertClientAddress(loanApplicationID, address.id, client.id, client.clientType, address.addressType, address.addressLine1, address.addressLine2, address.landmark, address.pincode, address.city, address.district, address.state, address.country, address.mobileOrLandLineNumber, address.emailId, address.addressOwnership, address.ownerDetails, address.ownerName, address.geoClassification, address.yearsAtResidence, address.yearsInCurrentCityOrTown, 'true', '', '', '', '', '', '', client.isAadharNumberVerified);
                    } else {
                        tbl_loanaddressinfo.insertLoanAddress(loanApplicationID, address.id, client.id, client.clientType, address.addressType, address.addressLine1, address.addressLine2, address.landmark, address.pincode, address.city, address.district, address.state, address.country, address.mobileOrLandLineNumber, address.emailId, address.addressOwnership, address.ownerDetails, address.ownerName, "true", "0")
                    }
                });
            }

            if (client.clientBankDetail && client.clientBankDetail.length > 0) {

                if (global.DEBUG_MODE) console.log('Client Bank Details:' + client.clientBankDetail);
                client.clientBankDetail.forEach((bankdetail) => {
                    tbl_bankdetails.insertBankDetails(bankdetail.id, loanApplicationID, client.id, client.clientType, bankdetail.accountType, bankdetail.accountHolderNameAsPerBank, bankdetail.ifscCode, bankdetail.bankName, bankdetail.branchName, bankdetail.accountNumber, bankdetail.bankLinkedMobileNo, bankdetail.upiId, bankdetail.dmsId, bankdetail.accountToBeUsedFor, "")
                });
            }

            if (client.clientBusinessDetail != undefined) {
                if (global.DEBUG_MODE) console.log('Client Business Details:' + client.clientBusinessDetail);

                const businessdetail = client.clientBusinessDetail
                //  client.clientBusinessDetail.forEach((businessdetail) => {
                tbl_loanbusinessDetail.insertBusinessDetail(loanApplicationID, businessdetail.id, client.id, client.clientType, businessdetail.customerSubcategory, businessdetail.enterpriseShopName, businessdetail.udyamRegistrationNumber, businessdetail.dateOfIncorporation, businessdetail.dateOfRegistration, businessdetail.dateOfBusinessCommencement, businessdetail.businessVintageYears, businessdetail.businessVintageMonths, businessdetail.industryType, businessdetail.industryLine, businessdetail.companyType, businessdetail.enterpriseType, businessdetail.businessLocationVillage, businessdetail.noOfEmployees, businessdetail.operatingDaysInAWeek, businessdetail.operatingTimesInADay, businessdetail.bookKeepingStatus, businessdetail.homeBasedBusiness, businessdetail.applicantCustomerTransactionMode, businessdetail.timeSpentAtTheBusinessInADay, businessdetail.npmRateOfBusiness, businessdetail.purchasesFrequency, businessdetail.typeOfPurchasingFacility, businessdetail.salesFrequency, businessdetail.clientBusinessImageGeocodeDetail[0].dmsId);

                // });

            }

            if (client.clientFinancialDetail != undefined) {

                if (global.DEBUG_MODE) console.log('Client Financial Details:' + client.clientFinancialDetail);
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

        // await value.familyDetail.forEach(async (client) => {
        //     var dob = '', exp1 = '', exp2 = '', exp3 = '', exp4 = '';
        //     if (global.DEBUG_MODE) console.log('Loan Family Details:' + client);
        //     if (client.dateOfBirth && client.dateOfBirth != undefined) {
        //         dob = Common.convertDateFormat(client.dateOfBirth);
        //     }
        //     if (client.kycType1ExpiryDate && client.kycType1ExpiryDate != undefined) {
        //         exp1 = Common.convertDateFormat(client.kycType1ExpiryDate);
        //     }
        //     if (client.kycType2ExpiryDate && client.kycType2ExpiryDate != undefined) {
        //         exp2 = Common.convertDateFormat(client.kycType2ExpiryDate);
        //     }
        //     if (client.kycType3ExpiryDate && client.kycType3ExpiryDate != undefined) {
        //         exp3 = Common.convertDateFormat(client.kycType3ExpiryDate);
        //     }
        //     if (client.kycType4ExpiryDate && client.kycType4ExpiryDate != undefined) {
        //         exp4 = Common.convertDateFormat(client.kycType4ExpiryDate);
        //     }
        //     await tbl_familydetails.insertFamilyDetails(client.id, loanApplicationID, 'APPL', client.relationshipWithApplicant, client.title, client.name, '', '', dob, client.age, client.gender, client.mobileNumber, client.kycTypeId1, client.kycIdValue1, exp1, client.kycTypeId2, client.kycIdValue2, exp2, client.kycTypeId3, client.kycIdValue3, exp3, client.kycTypeId4, client.kycIdValue4, exp4, '0', client.relationshipWithCoApplicant, client.relationshipWithGuarantor);

        // });


        setLoading(false);
        props.navigation.navigate('LoanApplicationMain', { fromScreen: 'ApplicationTrackerDetails' })
    }

    const updateLoanStatus = () => {

        if (remarks.length <= 0) {
            ToastAndroid.showWithGravityAndOffset(
                'Please Enter Remarks',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
            );
            return;
        }

        const appDetails = {
            loanApplicationId: global.LOANAPPLICATIONID,
            userId: global.USERID,
            remarks: remarks,
        };
        const baseURL = global.PORT1;
        setLoading(true);
        apiInstance(baseURL)
            .post(`/api/v2/rejectApplication`, appDetails)
            .then(async response => {
                // Handle the response data
                if (global.DEBUG_MODE)
                    console.log(
                        'UpdateStatusApiResponse::' + JSON.stringify(response.data),
                    );
                setLoading(false);
                if (response.status == 200) {
                    props.navigation.replace('HomeScreen');
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

    const closeErrorModal = () => {
        setErrorModalVisible(false);
    };

    const handleClick = (componentName, textValue) => {
        if (componentName === 'remarks') {
            setRemarks(textValue);
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#fefefe' }}>
            <MyStatusBar backgroundColor={'white'} barStyle="dark-content" />
            <ErrorModal isVisible={errorModalVisible} onClose={closeErrorModal} textContent={apiError} textClose={language[0][props.language].str_ok} />


            <ModalContainer
                visible={rejectModalVisible}
                closeModal={hideRejectModal}
                modalstyle={styles.modalContent}
                contentComponent={
                    <SafeAreaView
                        style={[
                            styles.parentView,
                            { backgroundColor: Colors.lightwhite },
                        ]}>

                        <View style={{ width: '100%' }}>

                            <View
                                style={{
                                    width: '90%',
                                    marginTop: 19,
                                    paddingHorizontal: 0,
                                    alignSelf: 'center'

                                }}>
                                <View
                                    style={{
                                        width: '90%',
                                        marginTop: 3,
                                        paddingHorizontal: 0,
                                    }}>
                                    <TextComp
                                        textVal={'Remarks'}
                                        textStyle={Commonstyles.inputtextStyle}
                                        Visible={true}
                                    />
                                </View>

                                <TextInputComp
                                    textValue={remarks}
                                    textStyle={[
                                        Commonstyles.textinputtextStyle,
                                        { maxHeight: 100 },
                                    ]}
                                    type="email-address"
                                    Disable={false}
                                    ComponentName="remarks"
                                    returnKey="done"
                                    handleClick={handleClick}
                                    length={250}
                                    multilines={true}
                                />
                            </View>

                            <View style={{ width: '90%', alignItems: 'flex-end', marginTop: 25 }}>
                                <ButtonViewComp
                                    textValue={language[0][
                                        props.language
                                    ].str_ok.toUpperCase()}
                                    textStyle={{
                                        color: Colors.white,
                                        fontSize: 13,
                                        fontWeight: 500,
                                    }}
                                    viewStyle={[
                                        Commonstyles.buttonView,
                                        { width: 100, height: 20 },
                                    ]}
                                    innerStyle={[
                                        Commonstyles.buttonViewInnerStyle,
                                        { height: 35 },
                                    ]}
                                    handleClick={updateLoanStatus}
                                />
                            </View>
                        </View>

                    </SafeAreaView>
                }
            />

            <ScrollView style={styles.scrollView}
                contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
                {loading ? <Loading /> : null}
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
                                {listData.assignedTo &&
                                    <View style={{ width: '100%', flexDirection: 'row', marginTop: 11, marginBottom: 5 }}>
                                        <View style={{ width: '45%' }}>
                                            <Text style={styles.headText}>{language[0][props.language].str_assignedto}</Text>
                                        </View>
                                        <View style={{ width: '55%' }}>
                                            <Text style={styles.childText}>:  {listData.assignedTo}</Text>
                                        </View>
                                    </View>}
                                <View style={{ width: '100%', flexDirection: 'row', marginTop: 11, marginBottom: 5 }}>
                                    <View style={{ width: '45%' }}>
                                        <Text style={styles.headText}>{language[0][props.language].str_currentleadownerid}</Text>
                                    </View>
                                    <View style={{ width: '55%' }}>
                                        <Text style={styles.childText}>:  {listData.agentName}</Text>
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

                {!(listData?.status?.toUpperCase() == 'COMPLETED') && !(listData?.status?.toUpperCase() == 'REJECTED') &&
                    <ButtonViewComp
                        textValue={
                            language[0][props.language].str_reject.toUpperCase()
                        }
                        textStyle={{ color: Colors.white, fontSize: 13, fontWeight: 500 }}
                        viewStyle={Commonstyles.buttonView}
                        innerStyle={Commonstyles.buttonViewInnerStyle}
                        handleClick={showRejectModal}
                    />
                }

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
    addLoanInitiationDetails: (item) => dispatch(addLoanInitiationDetails(item)),
    deleteLoanInitiationDetails: (item) => dispatch(deleteLoanInitiationDetails(item)),
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
    },
    modalContent: {
        width: '90%', // Set width to 90% of the screen width
        aspectRatio: 1.5,
        backgroundColor: 'white',
        padding: 10,
        margin: 10,
        borderRadius: 20,
        alignContent: 'center'
    },

});