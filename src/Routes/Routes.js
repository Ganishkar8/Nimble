/* eslint-disable prettier/prettier */
import * as React from 'react';
import SplashScreen from '../Screens/Login/SplashScreen';
import BottomNavigation from '../Navigation/BottomNavigation';
import LoginScreen from '../Screens/Login/LoginScreen';
import BankRegistration from '../Screens/Login/BankRegistration';
import SetUpMPIN from '../Screens/Login/SetUpMPIN';
import MPINLogin from '../Screens/Login/MPINLogin';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import AddressMainList from '../Screens/Application/Address/AddressMainList';
import AddressDetails from '../Screens/Application/Address/AddressDetails';
const Stack = createNativeStackNavigator();

//dev imports
// eslint-disable-next-line no-unused-vars
import LeadManagement from '../Screens/Lead/LeadTracker/LeadManagement';

const Route = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="BankRegistration"
          component={BankRegistration}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SetUpMPIN"
          component={SetUpMPIN}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MPINLogin"
          component={MPINLogin}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="BottomNavigation"
          component={BottomNavigation}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="AddressMainList"
          component={AddressMainList}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="AddressDetails"
          component={AddressDetails}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Route;
