import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Image,
    View,
    Platform,
    Alert,

    TouchableOpacity,
    ScrollView
} from 'react-native';
import MyStatusBar from '../../Components/MyStatusBar';
import Colors from '../../Utils/Colors';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Picker, Text } from 'react-native-paper';
import { ProgressBar, MD3Colors } from 'react-native-paper';


const DashboardScreen = ({ navigation }) => {

    const [selectedValue, setSelectedValue] = useState('');
    const [isAdditionalInfoEnabled, setIsAdditionalInfoEnabled] = useState(false);

    const data = [
        { label: 'Option 1', value: 'option1' },
        { label: 'Option 2', value: 'option2' },
        { label: 'Option 3', value: 'option3' },
    ];

    useEffect(() => {

    }, []);

    const handleChange = (itemValue) => {
        setSelectedValue(itemValue);
    };

    const toggleEnableDisable = () => {
        setIsAdditionalInfoEnabled(!isAdditionalInfoEnabled);
    };


    return (
        // enclose all components in this View tag
        <SafeAreaView style={[styles.parentView, { backgroundColor: Colors.lightwhite }]}>

            <MyStatusBar backgroundColor={'white'} barStyle="dark-content" />

            <ScrollView style={styles.scrollView}
                contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">

                <View style={{ flex: 1 }}>

                    <View style={{ width: '100%', alignItems: 'center' }}>

                        <View style={{ width: '90%', justifyContent: 'center', marginTop: '5%' }}>
                            <Text style={{ fontSize: 18, color: Colors.darkblack }}>Dashboard</Text>
                            {/* <ProgressBar progress={0.25} color={Colors.green} style={{height:5,borderRadius:5,marginTop:20}} /> */}
                        </View>

                        <View style={{ width: '90%', height: 130, justifyContent: 'space-between', flexDirection: 'row', marginTop: '4%' }}>


                            <View style={{ width: '48%', height: '100%', backgroundColor: '#FBEFDC', borderRadius: 10, justifyContent: 'center' }}>

                                <View style={{ flexDirection: 'column', marginLeft: 25 }}>

                                    <Text style={{ fontSize: 20, color: Colors.darkblack, fontWeight: 800 }}>4843</Text>

                                    <Text style={{ fontSize: 12, color: Colors.mediumgrey, fontWeight: 700, marginTop: 12 }}>TOTAL LOAN{'\n'}APPLICATIONS</Text>
                                </View>

                            </View>

                            <View style={{ width: '48%', height: '100%', backgroundColor: '#D7F0DB', borderRadius: 10, justifyContent: 'center' }}>

                                <View style={{ flexDirection: 'column', marginLeft: 25 }}>

                                    <Text style={{ fontSize: 20, color: Colors.darkblack, fontWeight: 800 }}>3578</Text>

                                    <Text style={{ fontSize: 12, color: Colors.mediumgrey, fontWeight: 700, marginTop: 12 }}>LOANS{'\n'}APPROVED</Text>
                                </View>

                            </View>

                        </View>

                        <View style={{ width: '90%', height: 130, justifyContent: 'space-between', flexDirection: 'row', marginTop: '4%' }}>


                            <View style={{ width: '48%', height: '100%', backgroundColor: '#E5F4FF', borderRadius: 10, justifyContent: 'center' }}>

                                <View style={{ flexDirection: 'column', marginLeft: 25 }}>

                                    <Text style={{ fontSize: 20, color: Colors.darkblack, fontWeight: 800 }}>100</Text>

                                    <Text style={{ fontSize: 12, color: Colors.mediumgrey, fontWeight: 700, marginTop: 12 }}>TOTAL LEAD{'\n'}CREATED</Text>
                                </View>

                            </View>

                            <View style={{ width: '48%', height: '100%', backgroundColor: '#E3DBD4', borderRadius: 10, justifyContent: 'center' }}>

                                <View style={{ flexDirection: 'column', marginLeft: 25 }}>

                                    <Text style={{ fontSize: 20, color: Colors.darkblack, fontWeight: 800 }}>₹ 4843</Text>

                                    <Text style={{ fontSize: 12, color: Colors.mediumgrey, fontWeight: 700, marginTop: 12 }}>AMOUNT{'\n'}APPROVED</Text>
                                </View>

                            </View>

                        </View>

                        <View style={{ width: '90%', height: 130, justifyContent: 'space-between', flexDirection: 'row', marginTop: '4%' }}>


                            <View style={{ width: '48%', height: '100%', backgroundColor: '#E5F4FF', borderRadius: 10, justifyContent: 'center' }}>

                                <View style={{ flexDirection: 'column', marginLeft: 25 }}>

                                    <Text style={{ fontSize: 20, color: Colors.darkblack, fontWeight: 800 }}>₹ 3200</Text>

                                    <Text style={{ fontSize: 12, color: Colors.mediumgrey, fontWeight: 700, marginTop: 12 }}>DISBURSED{'\n'}AMOUNT</Text>
                                </View>

                            </View>

                            <View style={{ width: '48%', height: '100%', backgroundColor: '#E3DBD4', borderRadius: 10, justifyContent: 'center' }}>

                                <View style={{ flexDirection: 'column', marginLeft: 25 }}>

                                    <Text style={{ fontSize: 20, color: Colors.darkblack, fontWeight: 800 }}>246</Text>

                                    <Text style={{ fontSize: 12, color: Colors.mediumgrey, fontWeight: 700, marginTop: 12 }}>REJECTED{'\n'}APPLICATIONS</Text>
                                </View>

                            </View>

                        </View>


                        <View style={{ width: '90%', marginTop: '4%', alignItems: 'center' }}>
                            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center' }}>
                                <TouchableOpacity onPress={() => toggleEnableDisable()} activeOpacity={0.5} >
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ fontSize: 15, color: Colors.darkblack, fontWeight: 800 }}>Additional Info</Text>
                                        {isAdditionalInfoEnabled && <Entypo name='chevron-down' size={25} color={Colors.darkblack} style={{ marginLeft: 5 }} />}
                                        {!isAdditionalInfoEnabled && <Entypo name='chevron-up' size={25} color={Colors.darkblack} style={{ marginLeft: 5 }} />}
                                    </View>
                                </TouchableOpacity>
                            </View>

                            {!isAdditionalInfoEnabled && <View style={{ width: '90%' }}>
                                <View style={{ marginTop: 12, alignItems: 'center', flexDirection: 'row' }}>
                                    <Text style={{ width: '80%', fontSize: 15, color: Colors.lightgrey }}>Application Under Progress</Text>
                                    <Text style={{ width: '20%', fontSize: 15, color: Colors.darkblack, fontWeight: 800 }}>1242</Text>
                                </View>

                                <View style={{ marginTop: 12, alignItems: 'center', flexDirection: 'row' }}>
                                    <Text style={{ width: '80%', fontSize: 15, color: Colors.lightgrey }}>No.of Pending Leads</Text>
                                    <Text style={{ width: '20%', fontSize: 15, color: Colors.darkblack, fontWeight: 800 }}>120</Text>
                                </View>

                                <View style={{ marginTop: 12, alignItems: 'center', flexDirection: 'row' }}>
                                    <Text style={{ width: '80%', fontSize: 15, color: Colors.lightgrey }}>No.of Approved Leads</Text>
                                    <Text style={{ width: '20%', fontSize: 15, color: Colors.darkblack, fontWeight: 800 }}>100</Text>
                                </View>

                            </View>}

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


export default DashboardScreen;
