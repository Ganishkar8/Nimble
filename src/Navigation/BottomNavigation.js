/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/react-in-jsx-scope */
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../Utils/Colors';
import HomeStack from './HomeStack';
import DashboardStack from './DashboardStack';
import ProfileStack from './ProfileStack';
import DashboardScreen from '../Screens/DashBoard/DashboardScreen';
import { NavigationContainer } from '@react-navigation/native';
import AddressDetails from '../Screens/Application/Address/AddressDetails';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function BottomNavigation({ }) {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      detachInactiveScreens={false}
      screenOptions={{
        headerShown: false,
        tabBarStyle: { width: '100%', backgroundColor: Colors.white },
        tabBarActiveTintColor: Colors.darkblue,
        tabBarHideOnKeyboard: true,
        tabBarLabelStyle: {
          fontSize: 12,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <Entypo
              name={'home'}
              size={23}
              color={color}
            //style={[styles.buttonIcon, { color: Colors.textBlue }]}
            />
          ),
        }}
      />

      {/* <Tab.Screen
        name="Dashboard"
        component={DashboardStack}
        options={{
          headerShown: false,
          tabBarLabel: 'Dashboard',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name={'view-dashboard'}
              size={23}
              color={color}
            // style={[styles.buttonIcon, { color: Colors.textBlue }]}
            />
          ),
        }}
      /> */}

      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          headerShown: false,
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <FontAwesome5
              name={'user-circle'}
              size={23}
              color={color}
            // style={[styles.buttonIcon, { color: Colors.textBlue }]}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
export default BottomNavigation;
