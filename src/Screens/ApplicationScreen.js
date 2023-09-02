import React, { useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ImageBackground,
    View,
    Platform,
    Alert,
    Text
} from 'react-native';

const ApplicationScreen = () => {

    useEffect(() => {


    }, []);


    return (
        // enclose all components in this View tag
        <SafeAreaView>
            
            <View style={styles.parentView}>
                <Text style={{color:'#000'}}>Application Screen</Text>

            </View>
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    parentView: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent : 'center'
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


export default ApplicationScreen;
