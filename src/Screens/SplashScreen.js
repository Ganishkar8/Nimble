import React, { useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ImageBackground,
    View,
    Platform,
    Alert,
    Text,
    TouchableOpacity
} from 'react-native';

const SplashScreen = ({ navigation }) => {

    useEffect(() => {


    }, []);

    const nav = () => {
        navigation.navigate('BottomNavigation')
    }


    return (
        // enclose all components in this View tag
        <SafeAreaView>

            <View style={styles.parentView}>
                <TouchableOpacity onPress={nav}>
                    <Text style={{ color: '#000' }}>hi</Text>
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
    imageStyle1: {
        width: 230,
        height: 100,
        resizeMode: 'contain'
    },
    imageStyleLogo: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
    }
});


export default SplashScreen;
