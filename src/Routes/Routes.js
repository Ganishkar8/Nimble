import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
const Stack = createNativeStackNavigator();

import SplashScreen from '../Screens/SplashScreen';
import BottomNavigation from '../Navigation/BottomNavigation';

const Route = () => {

  return (

    <NavigationContainer>

      <Stack.Navigator>

        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
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