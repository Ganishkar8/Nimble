
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ApplicationScreen from '../Screens/ApplicationScreen';
import HomeScreen from '../Screens/HomeScreen';
import LoanApplicationTracker from '../Screens/LoanApplicationTracker';
import LeadCreationBasic from '../Screens/LeadCreationBasic';
import LeadCreationBusiness from '../Screens/LeadCreationBusiness';
import LeadCreationLoan from '../Screens/LeadCreationLoan';
import LeadCreationCustomerPhoto from '../Screens/LeadCreationCustomerPhoto';

const Stack = createNativeStackNavigator();

export default HomeStack = () => {

  return (

    <Stack.Navigator >

      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="LoanApplicationTracker"
        component={LoanApplicationTracker}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ApplicationScreen"
        component={ApplicationScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="LeadCreationBasic"
        component={LeadCreationBasic}
        options={{ headerShown: false, tabBarVisible: false }}

      />

      <Stack.Screen
        name="LeadCreationBusiness"
        component={LeadCreationBusiness}
        options={{ headerShown: false, tabBarVisible: false }}

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



    </Stack.Navigator>
  );
};
