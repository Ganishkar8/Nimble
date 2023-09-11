
import 'react-native-gesture-handler'
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from '../Screens/ProfileScreen';
import PersonalDetailsScreen from '../Screens/PersonalDetails';
import ProfessionalDetailsScreen from '../Screens/ProfessionalDetails';
import LanguageSettingsScreen from '../Screens/LanguageSettings';

const Stack = createNativeStackNavigator();

export default ProfileStack = () => { 

  return (

      <Stack.Navigator >
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{headerShown: false}}
        />
        <Stack.Screen
        name="PersonalDetailsScreen"
        component={PersonalDetailsScreen}
        options={{headerShown: false}}
        />
        <Stack.Screen
        name="ProfessionalDetailsScreen"
        component={ProfessionalDetailsScreen}
        options={{headerShown: false}}
        />
        <Stack.Screen
        name="LanguageSettingsScreen"
        component={LanguageSettingsScreen}
        options={{headerShown: false}}
        />
    
    </Stack.Navigator>
  );
};
