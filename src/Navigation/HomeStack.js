
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ApplicationScreen from '../Screens/ApplicationScreen';
import HomeScreen from '../Screens/HomeScreen';
import LoanApplicationTracker from '../Screens/LoanApplicationTracker';
import LeadCreationBasic from '../Screens/LeadCreationBasic';
import LeadCreationBusiness from '../Screens/LeadCreationBusiness';

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
        options={{ headerShown: false }}

      />

      <Stack.Screen
        name="LeadCreationBusiness"
        component={LeadCreationBusiness}
        options={{ headerShown: false }}

      />





    </Stack.Navigator>
  );
};
