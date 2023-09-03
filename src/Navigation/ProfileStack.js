
import 'react-native-gesture-handler'
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from '../Screens/ProfileScreen';

const Stack = createNativeStackNavigator();

export default ProfileStack = () => { 

  return (

      <Stack.Navigator >
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{headerShown: false}}
        />
    
    </Stack.Navigator>
  );
};
