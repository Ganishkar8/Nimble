/* eslint-disable prettier/prettier */
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../Screens/Login/HomeScreen';
import LoanApplicationTracker from '../Screens/Application/ApplicationTracker/LoanApplicationTracker';
import LeadCreationBasic from '../Screens/Lead/LeadCreation/LeadCreationBasic';
import LeadCreationBusiness from '../Screens/Lead/LeadCreation/LeadCreationBusiness';
import LeadCreationLoan from '../Screens/Lead/LeadCreation/LeadCreationLoan';
import LeadCreationCustomerPhoto from '../Screens/Lead/LeadCreation/LeadCreationCustomerPhoto';
import LeadManagement from '../Screens/Lead/LeadTracker/LeadManagement';
import LeadDetails from '../Screens/Lead/LeadTracker/LeadDetails';
import LeadLog from '../Screens/Lead/LeadTracker/LeadLog';
import LeadApproval from '../Screens/Lead/LeadTracker/LeadApproval';
import ReAssign from '../Screens/Lead/LeadTracker/ReAssign';
import PreviewImage from '../Components/PreviewImage';
import ProfileShortBasicDetails from '../Screens/Application/ApplicationInitiation/ProfileShortBasicDetails';
import OTPVerification from '../Screens/Application/ApplicationInitiation/OTPVerification';
import AddressMainList from '../Screens/Application/Address/AddressMainList';
import AddressDetails from '../Screens/Application/Address/AddressDetails';
import LoanApplicationMain from '../Screens/LoanApplication/LoanApplicationMain';
import ConsentScreen from '../Screens/LoanApplication/ConsentScreen';
import AadharOTPVerification from '../Screens/Application/ApplicationInitiation/AadharOTPVerification';
import ProfileShortKYCVerificationStatus from '../Screens/Application/ApplicationInitiation/ProfileShortKYCVerificationStatus';
import ProfileShortApplicantDetails from '../Screens/Application/ApplicationInitiation/ProfileShortApplicantDetails';
import ProfileShortExistingClientDetails from '../Screens/Application/ApplicationInitiation/ProfileShortExistingClientDetails';
import LoanApplicationTrackerDetails from '../Screens/Application/ApplicationTracker/LoanApplicationTrackerDetails';
import DemographicsGSTDetails from '../Screens/Application/ApplicationInitiation/DemographicsGSTDetails';
import LoanDemographicsGSTDetails from '../Screens/Application/ApplicationInitiation/LoanDemographicsGSTDetails';
import LoanDemographicsFinancialDetails from '../Screens/Application/ApplicationInitiation/LoanDemographicsFinancialDetails';
import LoanDemographicFamilyDetails from '../Screens/Application/ApplicationInitiation/LoanDemographicFamilyDetails';
import FamilyDetailList from '../Screens/Application/ApplicationInitiation/FamilyDetailList';
import LoanDemographicBusinessDetail from '../Screens/Application/ApplicationInitiation/LoanDemographicBusinessDetail';
import LoanAddressList from '../Screens/Application/LoanAddress/LoanAddressList';
import LoanAddressDetails from '../Screens/Application/LoanAddress/LoanAddressDetails';
import BankList from '../Screens/Application/BankDetails/BankList';
import BankDetailsScreen from '../Screens/Application/BankDetails/BankDetailsScreen';
import CBResponseScreen from '../Screens/CreditBureau/CBResponseScreen';
import CBStatus from '../Screens/CreditBureau/CBStatus';
import LoanDemographicProductSelection from '../Screens/Application/ApplicationInitiation/LoanDemographicProductSelection';
import LoanNomineeList from '../Screens/Application/ApplicationInitiation/LoanNomineeList';
import LoanNomineeDetails from '../Screens/Application/ApplicationInitiation/LoanNomineeDetails';
import RepaymentSchedule from '../Screens/Application/ApplicationInitiation/RepaymentSchedule';
import LoanDocumentUpload from '../Screens/Application/ApplicationInitiation/LoanDocumentUpload';
import CBPreview from '../Screens/Application/ApplicationInitiation/CBPreview';
import BREView from '../Screens/Application/ApplicationInitiation/BREView';
import FinalConsentScreen from '../Screens/LoanApplication/FinalConsentScreen';
import ConsentOTPVerification from '../Screens/Application/ApplicationInitiation/ConsentOTPVerification';
import PdMainScreen from '../Screens/PD/PdMainScreen';
import PdQuestionarire from '../Screens/PD/PdQuestionarire';
import PDReferenceCheck from '../Screens/PD/PDReferenceCheck';
import PDItems from '../Screens/PD/PDItems';
import PdTravelDetails from '../Screens/PD/PdTravelDetails';
import PDTracker from '../Screens/PD/Tracker/PDTracker';
import PDTrackerDetails from '../Screens/PD/Tracker/PDTrackerDetails';
import PdQuestionSubStage from '../Screens/PD/PdQuestionSubStage';
import PDFinancialVerification from '../Screens/PD/PDFinancialVerification';
import PDReferenceCheckList from '../Screens/PD/PDReferenceCheckList';
const Stack = createNativeStackNavigator();

export default HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="LeadManagement"
        component={LeadManagement}
        options={{ headerShown: false, tabBarVisible: false }}
      />

      <Stack.Screen
        name="LeadDetails"
        component={LeadDetails}
        options={{ headerShown: false, tabBarVisible: false }}
      />

      <Stack.Screen
        name="LeadLog"
        component={LeadLog}
        options={{ headerShown: false, tabBarVisible: false }}
      />

      <Stack.Screen
        name="LeadApproval"
        component={LeadApproval}
        options={{ headerShown: false, tabBarVisible: false }}
      />

      <Stack.Screen
        name="ReAssign"
        component={ReAssign}
        options={{ headerShown: false, tabBarVisible: false }}
      />

      <Stack.Screen
        name="LoanApplicationTracker"
        component={LoanApplicationTracker}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="LoanApplicationTrackerDetails"
        component={LoanApplicationTrackerDetails}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="CBResponseScreen"
        component={CBResponseScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="CBStatus"
        component={CBStatus}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="LeadCreationBasic"
        component={LeadCreationBasic}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="FinalConsentScreen"
        component={FinalConsentScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="PreviewImage"
        component={PreviewImage}
        options={{ headerShown: false }}

      />

      <Stack.Screen
        name="CBPreview"
        component={CBPreview}
        options={{ headerShown: false }}

      />

      <Stack.Screen
        name="BREView"
        component={BREView}
        options={{ headerShown: false }}

      />

      <Stack.Screen
        name="ConsentOTPVerification"
        component={ConsentOTPVerification}
        options={{ headerShown: false }}

      />

      <Stack.Screen
        name="LeadCreationBusiness"
        component={LeadCreationBusiness}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="LeadCreationLoan"
        component={LeadCreationLoan}
        options={{ headerShown: false, tabBarVisible: false }}
      />

      <Stack.Screen
        name="LeadCreationCustomerPhoto"
        component={LeadCreationCustomerPhoto}
        options={{ headerShown: false, tabBarVisible: false }}
      />

      <Stack.Screen
        name="LoanApplicationMain"
        component={LoanApplicationMain}
        options={{ headerShown: false, tabBarVisible: false }}
      />

      <Stack.Screen
        name="ConsentScreen"
        component={ConsentScreen}
        options={{ headerShown: false, tabBarVisible: false }}
      />

      <Stack.Screen
        name="ProfileShortBasicDetails"
        component={ProfileShortBasicDetails}
        options={{ headerShown: false, tabBarVisible: false }}
      />

      <Stack.Screen
        name="ProfileShortExistingClientDetails"
        component={ProfileShortExistingClientDetails}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="OTPVerification"
        component={OTPVerification}
        options={{ headerShown: false, tabBarVisible: false }}
      />

      <Stack.Screen
        name="AadharOTPVerification"
        component={AadharOTPVerification}
        options={{ headerShown: false, tabBarVisible: false }}
      />

      <Stack.Screen
        name="ProfileShortKYCVerificationStatus"
        component={ProfileShortKYCVerificationStatus}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="ProfileShortApplicantDetails"
        component={ProfileShortApplicantDetails}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="AddressMainList"
        component={AddressMainList}
        options={{ headerShown: false, tabBarVisible: false }}
      />

      <Stack.Screen
        name="AddressDetails"
        component={AddressDetails}
        options={{ headerShown: false, tabBarVisible: false }}
      />
      <Stack.Screen
        name="LoanNomineeList"
        component={LoanNomineeList}
        options={{ headerShown: false, tabBarVisible: false }}
      />

      <Stack.Screen
        name="LoanNomineeDetails"
        component={LoanNomineeDetails}
        options={{ headerShown: false, tabBarVisible: false }}
      />

      <Stack.Screen
        name="DemographicsGSTDetails"
        component={DemographicsGSTDetails}
        options={{ headerShown: false, tabBarVisible: false }}
      />

      <Stack.Screen
        name="LoanDemographicsGSTDetails"
        component={LoanDemographicsGSTDetails}
        options={{ headerShown: false, tabBarVisible: false }}
      />

      <Stack.Screen
        name="LoanDemographicsFinancialDetails"
        component={LoanDemographicsFinancialDetails}
        options={{ headerShown: false, tabBarVisible: false }}
      />

      <Stack.Screen
        name="LoanDemographicFamilyDetails"
        component={LoanDemographicFamilyDetails}
        options={{ headerShown: false, tabBarVisible: false }}
      />

      <Stack.Screen
        name="FamilyDetailList"
        component={FamilyDetailList}
        options={{ headerShown: false, tabBarVisible: false }}
      />

      <Stack.Screen
        name="LoanDemographicBusinessDetail"
        component={LoanDemographicBusinessDetail}
        options={{ headerShown: false, tabBarVisible: false }}
      />

      <Stack.Screen
        name="LoanAddressList"
        component={LoanAddressList}
        options={{ headerShown: false, tabBarVisible: false }}
      />

      <Stack.Screen
        name="LoanAddressDetails"
        component={LoanAddressDetails}
        options={{ headerShown: false, tabBarVisible: false }}
      />

      <Stack.Screen
        name="LoanDemographicProductSelection"
        component={LoanDemographicProductSelection}
        options={{ headerShown: false, tabBarVisible: false }}
      />

      <Stack.Screen
        name="BankList"
        component={BankList}
        options={{ headerShown: false, tabBarVisible: false }}
      />

      <Stack.Screen
        name="BankDetailsScreen"
        component={BankDetailsScreen}
        options={{ headerShown: false, tabBarVisible: false }}
      />

      <Stack.Screen
        name="RepaymentSchedule"
        component={RepaymentSchedule}
        options={{ headerShown: false, tabBarVisible: false }}
      />

      <Stack.Screen
        name="LoanDocumentUpload"
        component={LoanDocumentUpload}
        options={{ headerShown: false, tabBarVisible: false }}
      />

      <Stack.Screen
        name="PdMainScreen"
        component={PdMainScreen}
        options={{ headerShown: false, tabBarVisible: false }}
      />

      <Stack.Screen
        name="PdQuestionarire"
        component={PdQuestionarire}
        options={{ headerShown: false, tabBarVisible: false }}
      />

      <Stack.Screen
        name="PDReferenceCheck"
        component={PDReferenceCheck}
        options={{ headerShown: false, tabBarVisible: false }}
      />

      <Stack.Screen
        name="PDItems"
        component={PDItems}
        options={{ headerShown: false, tabBarVisible: false }}
      />

      <Stack.Screen
        name="PdTravelDetails"
        component={PdTravelDetails}
        options={{ headerShown: false, tabBarVisible: false }}
      />
      <Stack.Screen
        name="PDTracker"
        component={PDTracker}
        options={{ headerShown: false, tabBarVisible: false }}
      />
      <Stack.Screen
        name="PDTrackerDetails"
        component={PDTrackerDetails}
        options={{ headerShown: false, tabBarVisible: false }}
      />

      <Stack.Screen
        name="PdQuestionSubStage"
        component={PdQuestionSubStage}
        options={{ headerShown: false, tabBarVisible: false }}
      />

      <Stack.Screen
        name="PDFinancialVerification"
        component={PDFinancialVerification}
        options={{ headerShown: false, tabBarVisible: false }}
      />

      <Stack.Screen
        name="PDReferenceCheckList"
        component={PDReferenceCheckList}
        options={{ headerShown: false, tabBarVisible: false }}
      />

    </Stack.Navigator>


  );
};
