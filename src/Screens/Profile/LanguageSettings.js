import React, { useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Image,
    View,
    Platform,
    Alert,
    Text,
    TouchableOpacity,
    ScrollView,
    BackHandler
} from 'react-native';
import MyStatusBar from '../../Components/MyStatusBar';
import Colors from '../../Utils/Colors';
import Entypo from 'react-native-vector-icons/Entypo';
import { RadioButton } from 'react-native-paper';
import HeadComp from '../../Components/HeadComp';
import { useIsFocused } from '@react-navigation/native';

const LanguageSettingsScreen = (props, { navigation }) => {

    const [checked, setChecked] = React.useState('first');
    const isScreenVisible = useIsFocused();

    useEffect(() => {

        props.navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' }, tabBarVisible: false });
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);
        return () => {
            props.navigation.getParent()?.setOptions({ tabBarStyle: undefined, tabBarVisible: undefined });
            backHandler.remove();
        }

    }, [navigation, isScreenVisible]);


    const handleBackButton = () => {
        props.navigation.goBack();
        return true; // Prevent default back button behavior
    };

    const onGoBack = () => {
        props.navigation.goBack();
    }

    return (
        // enclose all components in this View tag
        <SafeAreaView style={[styles.parentView, { backgroundColor: Colors.lightwhite }]}>

            <MyStatusBar backgroundColor={'white'} barStyle="dark-content" />

            <ScrollView style={styles.scrollView}
                contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">

                <View style={{ flex: 1 }}>

                    <View style={{
                        width: '100%', height: 56, alignItems: 'center', justifyContent: 'center',

                    }}>

                        <HeadComp textval={'Language Settings'} props={props} onGoBack={onGoBack} />

                    </View>

                    <View style={{ width: '100%', alignItems: 'center', marginTop: '6%' }}>

                        <View style={{ width: '90%', marginTop: 3, }}>
                            <Text
                                style={{
                                    color: Colors.mediumgrey,
                                    fontSize: 15,
                                    fontFamily: 'Poppins-Medium'
                                }}>
                                Please select your language
                            </Text>

                            <View style={{ flexDirection: 'row', marginTop: '10%' }}>
                                <View style={{ width: '80%' }}>
                                    <Text
                                        style={{
                                            color: Colors.lightgrey,
                                            fontSize: 15,
                                            fontFamily: 'PoppinsRegular'
                                        }}>
                                        English
                                    </Text>
                                </View>

                                <View style={{ width: '10%' }}>
                                    <RadioButton
                                        value="first"
                                        color={Colors.darkblue}
                                        status={checked === 'first' ? 'checked' : 'unchecked'}
                                        onPress={() => setChecked('first')}
                                    />
                                </View>
                            </View>

                            {/* <View style={{ flexDirection: 'row', marginTop: '3%' }}>
                                <View style={{ width: '80%' }}>
                                    <Text
                                        style={{
                                            color: Colors.lightgrey,
                                            fontSize: 15,
                                        }}>
                                        Tamil
                                    </Text>
                                </View>

                                <View style={{ width: '10%' }}>
                                    <RadioButton
                                        value="first"
                                        color={Colors.darkblue}
                                        status={checked === 'second' ? 'checked' : 'unchecked'}
                                        onPress={() => setChecked('second')}
                                    />
                                </View>
                            </View> */}




                        </View>


                    </View>



                </View>
            </ScrollView>
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    parentView: {
        flex: 1,

    },
    scrollView: {
        flex: 1,

    },
    contentContainer: {

        paddingBottom: 50,
        flexGrow: 1
    }, line: {
        backgroundColor: '#dbdbdb', // Change the color as needed
        height: 1,
        width: '90%',
        marginTop: '5%'           // Adjust the height as needed
    },
});


export default LanguageSettingsScreen;
