import React, { useState, useRef, useEffect, createRef } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    StatusBar,
    Keyboard,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    ToastAndroid,
    KeyboardAvoidingView,
    Dimensions,
    ImageBackground,
    TextInput,
    Alert,
    PermissionsAndroid,
    Platform,
} from 'react-native';

import Feather from 'react-native-vector-icons/Feather';
import apiInstance from '../Utils/apiInstance';
import jwtDecode from 'jwt-decode';
import Colors from '../Utils/Colors';
import MyStatusBar from './ MyStatusBar';
import Loading from './Loading';
import TextComp from '../Components/TextComp';
import { connect } from 'react-redux';
import { languageAction } from '../Utils/redux/actions/languageAction';
import { language } from '../Utils/LanguageString';
import Commonstyles from '../Utils/Commonstyles';
import ImageComp from '../Components/ImageComp';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import HeadComp from '../Components/HeadComp';
import { ProgressBar, MD3Colors } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import ProgressComp from '../Components/ProgressComp';
import Geolocation from '@react-native-community/geolocation';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import MapView, {Marker} from 'react-native-maps';

const LeadCreationCustomerPhoto = (props, { navigation }) => {

    const [
        currentLongitude,
        setCurrentLongitude
    ] = useState(0.0);
    const [
        currentLatitude,
        setCurrentLatitude
    ] = useState(0.0);
    const [
        locationStatus,
        setLocationStatus
    ] = useState('');
    const [gpslatlon, setGPSLatLon] = useState('');
    const mapRef = useRef(null);

    useEffect(() => {
        const requestLocationPermission = async () => {
            if (Platform.OS === 'ios') {
                getOneTimeLocation();
                subscribeLocationLocation();
            } else {
                try {
                    const granted = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                        {
                            title: 'Location Access Required',
                            message: 'This App needs to Access your location',
                        },
                    );
                    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                       
                                getOneTimeLocation();
                                subscribeLocationLocation();
                          
                       
                    } else {
                        setLocationStatus('Permission Denied');
                    }
                } catch (err) {
                    console.warn(err);
                }
            }
        };
        requestLocationPermission();
        return () => {
           // Geolocation.clearWatch(watchID);
        };
    }, []);


    const zoomToMarker = () => {
        if (mapRef.current) {
          mapRef.current.animateToRegion(
            {
              latitude: currentLatitude,
              longitude: currentLongitude,
              latitudeDelta: 0.02, // Adjust the zoom level as needed
              longitudeDelta: 0.02,
            },
            1000 // Duration of the animation in milliseconds
          );
        
        }
      };


    const  getOneTimeLocation = () => {
        setLocationStatus('Getting Location ...');
        Geolocation.getCurrentPosition(
            //Will give you the current location
            (position) => {
                setLocationStatus('You are Here');
               
                //getting the Longitude from the location json
                const currentLongitude =
                    JSON.stringify(position.coords.longitude);

                //getting the Latitude from the location json
                const currentLatitude =
                    JSON.stringify(position.coords.latitude);
                
                //Setting Longitude state
                setCurrentLongitude(parseFloat(currentLongitude));

                //Setting Longitude state
                setCurrentLatitude(parseFloat(currentLatitude));
                
               // setGPSLatLon(currentLatitude+","+currentLongitude)
                zoomToMarker();
                setGPSLatLon(currentLatitude+","+currentLongitude)
                
                
            },
            (error) => {
                setLocationStatus(error.message);
            },
            {
                enableHighAccuracy: false,
                timeout: 30000,
                maximumAge: 1000
            },
        );
    };

    const subscribeLocationLocation = () => {
        watchID = Geolocation.watchPosition(
            (position) => {
                //Will give you the location on location change

                setLocationStatus('You are Here');
                console.log(position);

                //getting the Longitude from the location json        
                const currentLongitude =
                    JSON.stringify(position.coords.longitude);

                //getting the Latitude from the location json
                const currentLatitude =
                    JSON.stringify(position.coords.latitude);

                //Setting Longitude state
                setCurrentLongitude(currentLongitude);

                //Setting Latitude state
                setCurrentLatitude(currentLatitude);
            },
            (error) => {
                setLocationStatus(error.message);
            },
            {
                enableHighAccuracy: false,
                maximumAge: 1000
            },
        );
    };


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
                        <HeadComp textval={language[0][props.language].str_leadcreation} props={props} />
                    </View>

                    <View style={{ width: '100%', alignItems: 'center', marginTop: '3%' }}>

                        <View style={{ width: '90%', marginTop: 3, }}>

                            <TextComp textStyle={{ color: Colors.mediumgrey, fontSize: 15, fontWeight: '500' }} textVal={language[0][props.language].str_phtcapture}></TextComp>

                            <ProgressComp progressvalue={1} textvalue="4 of 4" />

                        </View>


                    </View>



                    <View style={{ width: '100%', alignItems: 'center', marginTop: '4%' }}>
                        <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, }}>
                            <TextComp textVal={language[0][props.language].str_capturecustpht} textStyle={Commonstyles.inputtextStyle} Visible={true} />

                        </View>

                        <View style={{ width: '90%', height:50, marginTop: 3, paddingHorizontal: 0, borderRadius: 10, backgroundColor: '#e2e2e2' }}>



                        </View>



                    </View>


                    <View style={{ width: '100%', marginTop: 19, paddingHorizontal: 0, alignItems: 'center', justifyContent: 'center' }}>

                        <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, }}>
                            <TextComp textVal={language[0][props.language].str_gpslocation} textStyle={Commonstyles.inputtextStyle} Visible={true} />
                        </View>

                        <View style={{ width: '90%', flexDirection: 'row', marginTop: 3, paddingHorizontal: 0, borderBottomWidth: 1, borderBottomColor: '#e2e2e2' }}>

                            <TextInput
                                value={gpslatlon}
                                onChangeText={txt => setGPSLatLon(txt)}
                                placeholder={''}
                                editable={false}
                                placeholderTextColor={Colors.lightgrey}
                                secureTextEntry={false}
                                autoCapitalize="none"
                                style={Commonstyles.textinputtextStyle}
                            />

                            <FontAwesome6 name='location-dot' size={23} color={Colors.darkblue} />


                        </View>

                    </View>


                    <View style={{ width: '100%', alignItems: 'center', marginTop: '4%' }}>
                    
                        <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, borderBottomWidth: 1, borderBottomColor: '#e2e2e2' }}>


                        <MapView
          style={{width:'100%',height:200,marginTop:15}}
          ref={mapRef}
          initialRegion={{
            latitude: currentLatitude,
            longitude: currentLongitude,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          }}
          >
          <Marker
        
            coordinate={{
              latitude: parseFloat(currentLatitude),
              longitude: parseFloat(currentLongitude),
            }}
            onDragEnd={
              (e) => alert(JSON.stringify(e.nativeEvent.coordinate))
            }
            title={'Test Marker'}
            description={'This is a description of the marker'}
          />
        </MapView>

                        </View>



                    </View>



                </View>


                <View
                    style={{
                        width: '100%',
                        height: 50,
                        marginTop: 25,
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                    }}>
                    <TouchableOpacity onPress={() => { }} activeOpacity={10} style={{
                        width: '88%', height: 50, backgroundColor: '#0294ff',
                        borderRadius: 45, alignItems: 'center', justifyContent: 'center'
                    }}>
                        <View >

                            <TextComp textVal={language[0][props.language].str_submit} textStyle={{ color: Colors.white, fontSize: 13, fontWeight: 500 }} />

                        </View>
                    </TouchableOpacity>
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
    picker: {
        height: 50,
        width: '100%',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        textAlign: 'center'
    },
});


const mapStateToProps = (state) => {
    const { language } = state.languageReducer;
    return {
        language: language
    }
}

const mapDispatchToProps = (dispatch) => ({
    languageAction: (item) => dispatch(languageAction(item)),
});


export default connect(mapStateToProps, mapDispatchToProps)(LeadCreationCustomerPhoto);
