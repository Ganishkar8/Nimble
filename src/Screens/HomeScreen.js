import React, { useEffect,useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ImageBackground,
    View,
    Platform,
    TouchableOpacity,
    Alert,
    Image,
    StatusBar,
    Text
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../Utils/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MyStatusBar from './ MyStatusBar';
import Loading from './Loading';

const HomeScreen = ({ navigation }) => {

    const [loading, setLoading] = useState(false);

    useEffect(() => {

    }, []);

    return (
           
             <View>
             <MyStatusBar backgroundColor={'white'} barStyle="dark-content" />
             {loading ? <Loading /> : null}
             <View style={styles.parentView}>

                <View style={{ width: '100%', marginLeft: '4.4%', marginTop: '5%', 
                flexDirection: 'row',alignItems:'center' ,paddingHorizontal:5}}>

                <Text style={{ textAlign:'left',flex: 0.9, fontSize: 20, color: '#4e4e4e' }}>Hi! {global.USERNAME}</Text>

                 <Image source={require('../Images/notification_bell_new.png')}
                 style={styles.tinyLogo} />

                </View>

                <Text style={{ width: '100%', marginLeft: '4.4%', fontSize: 12, 
                color: '#9f9f9f', marginTop: 5 ,paddingHorizontal:5}}>User ID :{global.USERID}</Text>
                <View style={{ width: '95%', height: '30%', borderRadius: 10, 
                marginTop: '4%', backgroundColor: '#ffffff', flexDirection: 'column' }}>

                    <View style={{ marginLeft: '4%' }}>

                        <Text style={{ fontSize: 16, color: '#4e4e4e', marginTop: '5%' }}>Quick Items</Text>


                        <View style={{ height: '75%', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>

                            <View style={{ flexDirection: 'column' }}>
                                <View style={styles.circularView}>
                                <Image source={require('../Images/money.png')}
                                style={{width:20,height:20}} />
                                </View>
                                <Text style={{ fontSize: 12, color: '#4e4e4e', marginTop:8, textAlign: 'center', }}>Products</Text>
                            </View>

                            <View style={{ flexDirection: 'column', flex: 0.25 }}>
                                <View style={styles.circularView1}>
                                <Image source={require('../Images/calculator.png')}
                                style={{width:20,height:20}} />
                                </View>
                                <Text style={{ fontSize: 12, color: '#4e4e4e', marginTop:8, textAlign: 'center' }}>Calculator</Text>
                            </View>

                            <TouchableOpacity onPress={()=>navigation.navigate('LoanApplicationTracker')} activeOpacity ={10} style={{ flexDirection: 'column', flex: 0.25 }}>
                            <View>
                                <View style={styles.circularView2}>
                                <Image source={require('../Images/lead_list.png')}
                                style={{width:20,height:23}} />
                                </View>
                                <Text style={{ fontSize: 12, color: '#4e4e4e', marginTop:8, textAlign: 'center' }}>Application</Text>
                            </View>
                            </TouchableOpacity>

                            <View style={{ flexDirection: 'column', alignItems: 'center', flex: 0.25 }}>
                                <View style={styles.circularView3}>
                                <Image source={require('../Images/iconly_broken_profile.png')}
                                style={{width:22,height:26}} />
                                </View>
                                <Text style={{ fontSize: 12, color: '#4e4e4e', marginTop:8 }}>Lead</Text>
                            </View>

                        </View>

                    </View>


                </View>

                <View style={{ width: '95%', height: '28%', borderRadius: 10, marginTop: '6%', backgroundColor: '#ffffff', flexDirection: 'column' }}>

                    <LinearGradient
                        colors={['#d1ecff', '#ffffff']}
                        // For a vertical gradient (as in your example), set x: 0 and x: 1
                        style={{ flex: 1, borderRadius: 10 }}>

                        <View style={{ marginLeft: '7%', flexDirection: 'column' }}>

                            <Text style={{ fontSize: 15, color: '#343434', marginTop: '8%' }}>New</Text>

                            <Text style={{ fontSize: 15, color: '#343434', marginTop: '3%', fontWeight: 'bold', }}>MSME  Loan</Text>

                            <Text style={{ fontSize: 12, color: '#979797', marginTop: '3%' }}>New Application Initiation</Text>


                        </View>


                        <View style={{ width: '40%', height: '20%',marginLeft:'7%',marginTop:'7%',alignItems:'center',justifyContent:'center',flexDirection:'row', backgroundColor: Colors.darkblue,borderRadius:20 }}>
                        
                        <Text style={{flex:0.8, fontSize: 14, color: '#ffffff',marginLeft:'7%' }}>Get Started</Text>

                        <AntDesign
                            name={'arrowright'}
                            size={18}
                            color={'#ffffff'}
                        //style={[styles.buttonIcon, { color: Colors.textBlue }]}
                        />

                        </View>

                    </LinearGradient>




                </View>




             </View>
             </View>
    );
};


const styles = StyleSheet.create({
    parentView: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        backgroundColor: '#f7f9fd',
        flexDirection: 'column'
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
    },
    tinyLogo: {
        width: 15,
        height: 18,
        justifyContent:'center'
    },
    circularView: {
        width: 60,
        height: 60,
        borderRadius: 50,
        backgroundColor: '#e3dbd4',
        justifyContent: 'center',
        alignItems: 'center',
    },
    circularView1: {
        width: 60,
        height: 60,
        borderRadius: 50,
        backgroundColor: '#fbefdc',
        justifyContent: 'center',
        alignItems: 'center',
    },
    circularView2: {
        width: 60,
        height: 60,
        borderRadius: 50,
        backgroundColor: '#d7f0db',
        justifyContent: 'center',
        alignItems: 'center',
    },
    circularView3: {
        width: 60,
        height: 60,
        borderRadius: 50,
        backgroundColor: '#cceaff',
        justifyContent: 'center',
        alignItems: 'center',
    },
});


export default HomeScreen;
