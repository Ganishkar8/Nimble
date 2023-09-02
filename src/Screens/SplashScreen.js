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
                
                <Image source={require('../Images/loginbg.png')} style={{width:200,height:200}}/>
                <TouchableOpacity onPress={secondAPI}>
                    <Text style={{ color: '#000',marginTop: 20,fontSize:20 }}>Nimble</Text>
                </TouchableOpacity>

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
