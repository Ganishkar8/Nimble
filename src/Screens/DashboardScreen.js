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



const DashboardScreen = ({ navigation }) => {

    useEffect(() => {
        
    }, []);


    return (
        // enclose all components in this View tag
        <SafeAreaView>

            <View style={styles.parentView}>
                
                <TouchableOpacity>
                    <Text style={{ color: '#000',marginTop: 20,fontSize:20 }}>DashboardScreen</Text>
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


export default DashboardScreen;
