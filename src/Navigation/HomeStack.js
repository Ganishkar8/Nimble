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
        name="ProfileShortBasicDetails"
        component={ProfileShortBasicDetails}
        options={{ headerShown: false, tabBarVisible: false }}
      />

      <Stack.Screen
        name="LoanApplicationTracker"
        component={LoanApplicationTracker}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="LeadCreationBasic"
        component={LeadCreationBasic}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="PreviewImage"
        component={PreviewImage}
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

    </Stack.Navigator>


  );
};
