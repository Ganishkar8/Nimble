import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Entypo from 'react-native-vector-icons/Entypo';
import Colors from '../Utils/Colors';
import HomeStack from './HomeStack';
import DashboardStack from './DashboardStack';
import ProfileStack from './ProfileStack';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function BottomNavigation({ }) {


    return (

        <Tab.Navigator
            initialRouteName="Home"

            screenOptions={{
                headerShown: false,
                tabBarStyle: { width: '100%', backgroundColor: Colors.white, height: 55, paddingVertical: 2 },
                tabBarActiveTintColor: Colors.textBlue,
                tabBarHideOnKeyboard: true,
                tabBarLabelStyle: {
                    fontSize: 12,
                }
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
                        //style={[styles.buttonIcon, { color: Colors.textBlue }]}
                        />
                    ),
                }}
            />

            <Tab.Screen
                name="Dashboard"
                component={DashboardStack}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Dashboard',
                    tabBarIcon: ({ color }) => (
                        <Entypo
                            name={'home'}
                            size={23}
                        // style={[styles.buttonIcon, { color: Colors.textBlue }]}
                        />
                    ),
                }}
            />

            <Tab.Screen
                name="Profile"
                component={ProfileStack}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color }) => (
                        <Entypo
                            name={'home'}
                            size={23}
                        // style={[styles.buttonIcon, { color: Colors.textBlue }]}
                        />
                    ),
                }}
            />



        </Tab.Navigator>
    );
}
export default BottomNavigation;