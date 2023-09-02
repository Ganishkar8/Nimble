
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ApplicationScreen from '../Screens/ApplicationScreen';
import HomeScreen from '../Screens/HomeScreen';
import LoanApplicationTracker from '../Screens/LoanApplicationTracker';

const Stack = createNativeStackNavigator();

export default HomeStack = () => {

  return (

    <Stack.Navigator initialRouteName="HomeScreen" headerMode={null}>
      <Stack.Screen
        name="ApplicationScreen"
        component={ApplicationScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="LoanApplicationTracker"
        component={LoanApplicationTracker}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />

    </Stack.Navigator>
  );
};
