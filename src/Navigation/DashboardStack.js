
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashboardScreen from '../Screens/DashboardScreen';

const Stack = createNativeStackNavigator();

export default DashboardStack = () => { 

  return (

      <Stack.Navigator initialRouteName="DashboardScreen" headerMode={null}>
      <Stack.Screen
        name="DashboardScreen"
        component={DashboardScreen}
        options={{headerShown: false}}
        />
    
    </Stack.Navigator>
  );
};
