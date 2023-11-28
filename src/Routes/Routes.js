/* eslint-disable prettier/prettier */
import * as React from 'react';
import SplashScreen from '../Screens/Login/SplashScreen';
import BottomNavigation from '../Navigation/BottomNavigation';
import LoginScreen from '../Screens/Login/LoginScreen';
import BankRegistration from '../Screens/Login/BankRegistration';
import SetUpMPIN from '../Screens/Login/SetUpMPIN';
import MPINLogin from '../Screens/Login/MPINLogin';
import AddressMainList from '../Screens/Application/Address/AddressMainList';
import AddressDetails from '../Screens/Application/Address/AddressDetails';
import DemographicsAddressDetails from '../Screens/LoanDemographics/DemoGraphicAddress/DemographicsAddressDetails';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import ProfileShortBasicDetails from '../Screens/Application/ApplicationInitiation/ProfileShortBasicDetails';
import ProfileShortExistingClientDetails from '../Screens/Application/ApplicationInitiation/ProfileShortExistingClientDetails';
import ProfileShortKYCVerificationStatus from '../Screens/Application/ApplicationInitiation/ProfileShortKYCVerificationStatus';
import ProfileShortApplicantDetails from '../Screens/Application/ApplicationInitiation/ProfileShortApplicantDetails';
import LeadCreationCustomerPhoto from '../Screens/Lead/LeadCreation/LeadCreationCustomerPhoto';
import DemographicsGSTDetails from '../Screens/Application/ApplicationInitiation/DemographicsGSTDetails';
import LoanDemographicsGSTDetails from '../Screens/Application/ApplicationInitiation/LoanDemographicsGSTDetails';
import LoanDemographicsFinancialDetails from '../Screens/Application/ApplicationInitiation/LoanDemographicsFinancialDetails';

const Stack = createNativeStackNavigator();

//dev imports
// eslint-disable-next-line no-unused-vars
//dev imports
import LeadManagement from '../Screens/Lead/LeadTracker/LeadManagement';
import LoanApplicationMain from '../Screens/LoanApplication/LoanApplicationMain';
import CBResponseScreen from '../Screens/CreditBureau/CBResponseScreen';
import CBStatus from '../Screens/CreditBureau/CBStatus';
import BankDetails from '../Screens/LoanDemographics/bankDetails/BankDetails';

const Route = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BankRegistration"
          component={BankRegistration}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SetUpMPIN"
          component={SetUpMPIN}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MPINLogin"
          component={MPINLogin}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="BottomNavigation"
          component={BottomNavigation}
          options={{ headerShown: false }}
        />


      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Route;
