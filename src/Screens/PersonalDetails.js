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
    ScrollView
} from 'react-native';
import MyStatusBar from './ MyStatusBar';
import Colors from '../Utils/Colors';
import Entypo from 'react-native-vector-icons/Entypo';



const PersonalDetailsScreen = ({ navigation }) => {

    useEffect(() => {
        
    }, []);


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
                    <View style={{width:'92%',flexDirection: 'row'}}>
                    <TouchableOpacity onPress={()=>navigation.goBack()} style={{ width: '10%', height: 56, justifyContent: 'center' }}>
                    <View >
                    
                    <Entypo name='chevron-left' size={25} color={Colors.darkblack} />
                    
                    </View>
                    </TouchableOpacity>
                    <View style={{ width: '80%', height: 56, justifyContent: 'center' }}>
                        <Text style={{ fontSize: 18, color: Colors.darkblack }}>Personal Details</Text>
                    </View>
                    </View>
                </View>

                <View style={{width:'100%',alignItems:'center',marginTop:'6%'}}>

                <View style={{width: '90%', marginTop: 3,}}>
                            <Text
                                style={{
                                    color: Colors.lightgrey,
                                    fontSize: 14,
                                }}>
                                USER ID
                            </Text>

                            <Text
                                style={{
                                    color: Colors.darkblack,
                                    fontSize: 14,
                                    marginTop:10
                                }}>
                                {global.USERID}
                            </Text>

                        </View>
                        <View style={styles.line}></View>

                        <View style={{width: '90%', marginTop: 20,}}>
                            <Text
                                style={{
                                    color: Colors.lightgrey,
                                    fontSize: 14,
                                }}>
                                USER NAME
                            </Text>

                            <Text
                                style={{
                                    color: Colors.darkblack,
                                    fontSize: 14,
                                    marginTop:10
                                }}>
                                {global.USERNAME}
                            </Text>

                        </View>
                        <View style={styles.line}></View>


                        <View style={{width: '90%', marginTop: 20,}}>
                            <Text
                                style={{
                                    color: Colors.lightgrey,
                                    fontSize: 14,
                                }}>
                                MOBILE NUMBER
                            </Text>

                            <Text
                                style={{
                                    color: Colors.darkblack,
                                    fontSize: 14,
                                    marginTop:10
                                }}>
                                9868654578
                            </Text>

                        </View>
                        <View style={styles.line}></View>

                        <View style={{width: '90%', marginTop: 20,}}>
                            <Text
                                style={{
                                    color: Colors.lightgrey,
                                    fontSize: 14,
                                }}>
                                EMAIL
                            </Text>

                            <Text
                                style={{
                                    color: Colors.darkblack,
                                    fontSize: 14,
                                    marginTop:10
                                }}>
                                sriram.ganesan@example.com
                            </Text>

                        </View>
                        <View style={styles.line}></View>

                        <View style={{width: '90%', marginTop: 20,}}>
                            <Text
                                style={{
                                    color: Colors.lightgrey,
                                    fontSize: 14,
                                }}>
                                ADDRESS
                            </Text>

                            <Text
                                style={{
                                    color: Colors.darkblack,
                                    fontSize: 14,
                                    marginTop:10
                                }}>
                                ABC Industrial Area, J P Nagar, Bangalore
                            </Text>

                        </View>
                        <View style={styles.line}></View>


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


export default PersonalDetailsScreen;
