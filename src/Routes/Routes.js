import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
const Stack = createNativeStackNavigator();

import SplashScreen from '../Screens/SplashScreen';
import BottomNavigation from '../Navigation/BottomNavigation';
import LoginScreen from '../Screens/LoginScreen';
import LoanApplicationTracker from '../Screens/LoanApplicationTracker';

const Route = () => {

  return (

    <NavigationContainer>

      <Stack.Navigator initialRouteName="LoginScreen">

        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="LoanApplicationTracker"
          component={LoanApplicationTracker}
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
}

export default Route;