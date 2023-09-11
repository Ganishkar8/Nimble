import React, { useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Image,
    View,
    Platform,
    Alert,
    Text,
    TouchableOpacity
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../Utils/Colors';



const SplashScreen = ({ navigation }) => {

    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('LoginScreen')
          }, 1000);
    }, []);


    return (
        // enclose all components in this View tag
        <SafeAreaView>

            <View style={styles.parentView}>
                
                <Image source={require('../Images/splashlogo.png')} style={{width:100,height:35}}/>
                
                    <Text style={{ color: Colors.darkblack,fontSize:12,marginLeft:34 }}>Business Loan</Text>
                

            </View>
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    parentView: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    imageStyle: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
});


export default SplashScreen;
