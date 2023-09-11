import React, { useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ImageBackground,
    View,
    Platform,
    Alert,
    Text,
    Image,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import Colors from '../Utils/Colors';
import Commonstyles from '../Utils/Commonstyles';
import Entypo from 'react-native-vector-icons/Entypo';

const ProfileScreen = ({navigation}) => {

    useEffect(() => {


    }, []);


    return (
        // enclose all components in this View tag
        <SafeAreaView style={[styles.parentView, { backgroundColor: Colors.lightwhite }]}>



            <ScrollView style={styles.scrollView}
                contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">

                <View style={{ flex: 1 }}>

                    <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>

                        <View style={{ width: '92%', flexDirection: 'row', marginTop: '12%' }}>
                            <View style={{ width: '25%' }}>
                                <View style={[Commonstyles.circularView, { backgroundColor: Colors.lightblue }]}>
                                    <Image source={require('../Images/profile_user.png')}
                                        style={{ width: 35, height: 35 }} />
                                </View>
                            </View>



                            <View style={{ width: '75%', justifyContent: 'center', alignSelf: 'center' }}>
                                <Text style={{ textAlign: 'left', fontSize: 20, color: Colors.darkblack }}>{global.USERNAME}</Text>
                                <Text style={{ fontSize: 12, color: Colors.lightgrey, marginTop: 5, }}>User ID :{global.USERID}</Text>
                            </View>

                        </View>


                        <TouchableOpacity onPress={()=>navigation.navigate('PersonalDetailsScreen')} activeOpacity={0.5} style={{ width: '92%', marginTop: '15%', alignItems: 'center' }}>
                        <View style={{flexDirection: 'row'}}>

                            <View style={{ width: '15%' }}>
                                <Image source={require('../Images/about.png')}
                                    style={{ width: 21.5, height: 25 }} />
                            </View>

                            <View style={{ width: '67%', justifyContent: 'center' }}>
                                <Text style={{ fontSize: 16, color: Colors.mediumgrey, marginTop: 5, }}>Personal Details</Text>
                            </View>

                            <View style={{ width: '10%' }}></View>
                            <Entypo name='chevron-right' size={23} color={Colors.darkblack} />

                        </View>
                        </TouchableOpacity>

                        <View style={styles.line}></View>

                        <TouchableOpacity onPress={()=>navigation.navigate('ProfessionalDetailsScreen')} activeOpacity={0.5} style={{ width: '92%', marginTop: '8%', alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row' }}>

                            <View style={{ width: '15%' }}>
                                <Image source={require('../Images/professional.png')}
                                    style={{ width: 25, height: 25 }} />
                            </View>

                            <View style={{ width: '67%', justifyContent: 'center' }}>
                                <Text style={{ fontSize: 16, color: Colors.mediumgrey, marginTop: 5, }}>Professional Details</Text>
                            </View>

                            <View style={{ width: '10%' }}></View>
                            <Entypo name='chevron-right' size={23} color={Colors.darkblack} />

                        </View>
                        </TouchableOpacity>

                        <View style={styles.line}></View>

                        <TouchableOpacity onPress={()=>navigation.navigate('LanguageSettingsScreen')} activeOpacity={0.5} style={{ width: '92%', marginTop: '8%', alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row' }}>

                            <View style={{ width: '15%' }}>
                                <Image source={require('../Images/language.png')}
                                    style={{ width: 23, height: 25 }} />
                            </View>

                            <View style={{ width: '67%', justifyContent: 'center' }}>
                                <Text style={{ fontSize: 16, color: Colors.mediumgrey, marginTop: 5, }}>Language Settings</Text>
                            </View>

                            <View style={{ width: '10%' }}></View>
                            <Entypo name='chevron-right' size={23} color={Colors.darkblack} />

                        </View>
                        </TouchableOpacity>

                        <View style={styles.line}></View>


                    </View>


                </View>

                <View style={{width:'100%',justifyContent:'flex-end',alignItems:'center'}}>
    <View style={{width:'92%'}}>
    <Text style={{ fontSize: 16, color: Colors.darkblue, marginTop: 5, }}>Logout</Text>
    <Text style={{ fontSize: 12, color: Colors.lightgrey, marginTop: 5, }}>Version 1.0.0</Text>
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
        backgroundColor: '#f1f1f1', // Change the color as needed
        height: 1,
        width: '93%',
        marginTop: '5%'           // Adjust the height as needed
    },

});


export default ProfileScreen;
