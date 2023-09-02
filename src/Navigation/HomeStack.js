
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ApplicationScreen from '../Screens/ApplicationScreen';

const Stack = createNativeStackNavigator();

export default HomeStack = () => { 

  return (

      <Stack.Navigator initialRouteName="ApplicationScreen" headerMode={null}>
      <Stack.Screen
        name="ApplicationScreen"
        component={ApplicationScreen}
        options={{headerShown: false}}
        />
    
    </Stack.Navigator>
  );
};
