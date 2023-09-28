/* eslint-disable prettier/prettier */
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
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
import AddressMainList from '../Screens/Application/Address/AddressMainList';
const Stack = createNativeStackNavigator();

export default HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="LeadManagement"
        component={LeadManagement}
        options={{headerShown: false, tabBarVisible: false}}
      />

      <Stack.Screen
        name="LeadDetails"
        component={LeadDetails}
        options={{headerShown: false, tabBarVisible: false}}
      />

      <Stack.Screen
        name="LeadLog"
        component={LeadLog}
        options={{headerShown: false, tabBarVisible: false}}
      />

      <Stack.Screen
        name="LeadApproval"
        component={LeadApproval}
        options={{headerShown: false, tabBarVisible: false}}
      />

      <Stack.Screen
        name="ReAssign"
        component={ReAssign}
        options={{headerShown: false, tabBarVisible: false}}
      />

      <Stack.Screen
        name="LoanApplicationTracker"
        component={LoanApplicationTracker}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="LeadCreationBasic"
        component={LeadCreationBasic}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="LeadCreationBusiness"
        component={LeadCreationBusiness}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="LeadCreationLoan"
        component={LeadCreationLoan}
        options={{headerShown: false, tabBarVisible: false}}
      />

      <Stack.Screen
        name="LeadCreationCustomerPhoto"
        component={LeadCreationCustomerPhoto}
        options={{headerShown: false, tabBarVisible: false}}
      />

      <Stack.Screen
        name="AddressMainList"
        component={AddressMainList}
        options={{headerShown: false, tabBarVisible: false}}
      />
    </Stack.Navigator>
  );
};
