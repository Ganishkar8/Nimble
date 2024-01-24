/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react-native/no-inline-styles */
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    SafeAreaView,
    FlatList, TouchableOpacity, BackHandler,
    TextInput, PermissionsAndroid,
    Image
} from 'react-native';
import Modal from 'react-native-modal';
import React, { useState, useRef, useEffect } from 'react';
import MyStatusBar from '../../Components/MyStatusBar';
import HeadComp from '../../Components/HeadComp';
import { connect } from 'react-redux';
import { languageAction } from '../../Utils/redux/actions/languageAction';
import { language } from '../../Utils/LanguageString';
import Loading from '../../Components/Loading';
import ChildHeadComp from '../../Components/ChildHeadComp';
import ProgressComp from '../../Components/ProgressComp';
import Colors from '../../Utils/Colors';
import Commonstyles from '../../Utils/Commonstyles';
import IconButtonViewComp from '../../Components/IconButtonViewComp';
import { useIsFocused } from '@react-navigation/native';
import TextComp from '../../Components/TextComp';
import ImageComp from '../../Components/ImageComp';
import Entypo from 'react-native-vector-icons/Entypo';
import { Picker } from '@react-native-picker/picker';
import ButtonViewComp from '../../Components/ButtonViewComp';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Common from '../../Utils/Common';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ErrorModal from '../../Components/ErrorModal';
import Geolocation from 'react-native-geolocation-service';

const PdQuestionSubStage = (props, { navigation }) => {
    const [loading, setLoading] = useState(false);
    const [remarks, setRemarks] = useState('');
    const [pdData, setPdData] = useState([]);
    const [refreshFlatlist, setRefreshFlatList] = useState(false);
    const isScreenVisible = useIsFocused();
    const showLocationBottomSheet = () => setLocationSheetVisible(true);
    const hideLocationBottomSheet = () => setLocationSheetVisible(false);

    const [locationSheetVisible, setLocationSheetVisible] = useState(false);
    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [apiError, setApiError] = useState('');


    useEffect(() => {
        props.navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' }, tabBarVisible: false });
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);
        // const filteredData = global.PDSTAGES[0].pdSubstages
        //     .filter(data => data.clientType === global.CLIENTTYPE)
        //     .sort((a, b) => a.displayOrder - b.displayOrder);

        // const filterSubData = filteredData[0].pdModules.filter(data => data.moduleCode === 'QU_RFR_CHCK_APPL')
        //     .sort((a, b) => a.displayOrder - b.displayOrder);

        // setPdData(filterSubData[0].pdSubModules)
        return () => {
            props.navigation.getParent()?.setOptions({ tabBarStyle: undefined, tabBarVisible: undefined });
            backHandler.remove();
        }
    }, [props.navigation, isScreenVisible]);


    useFocusEffect(
        React.useCallback(() => {

            if (Common.DEBUG_MODE) console.log('Screen Available');

            const filteredData = props.pdSubStage[0].personalDiscussionSubStageLogs
                .filter(data => data.subStageCode === global.PDSUBSTAGE)

            const filteredModule = filteredData[0].personalDiscussionModuleLogs
                .filter(data => data.moduleCode === global.PDMODULE)

            setPdData(filteredModule[0].personalDiscussionSubModuleLogs)
            //  alert(JSON.stringify(filteredModule))

            return () => {
                if (Common.DEBUG_MODE) console.log('Screen is blurred');
            };
        }, [])
    );

    const handleBackButton = () => {
        onGoBack();
        return true; // Prevent default back button behavior
    };

    const checkPermissions = async () => {
        const permissionsToRequest = [];

        if (Platform.OS === 'android') {
            // Camera permission
            const cameraPermission = await PermissionsAndroid.check(
                PermissionsAndroid.PERMISSIONS.CAMERA
            );
            if (cameraPermission !== PermissionsAndroid.RESULTS.GRANTED) {
                permissionsToRequest.push(PermissionsAndroid.PERMISSIONS.CAMERA);
            }

            // Location permission
            const locationPermission = await PermissionsAndroid.check(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
            );
            if (locationPermission !== PermissionsAndroid.RESULTS.GRANTED) {
                permissionsToRequest.push(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
            }

            // Request all pending permissions
            return requestPermissions(permissionsToRequest);
        } else {
            // For iOS and other platforms, use react-native-permissions
            const cameraResult = await check(PERMISSIONS.IOS.CAMERA);
            const locationResult = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);

            const permissionsToRequest = [];

            if (cameraResult !== RESULTS.GRANTED) {
                permissionsToRequest.push(PERMISSIONS.IOS.CAMERA);
            }

            if (locationResult !== RESULTS.GRANTED) {
                permissionsToRequest.push(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
            }

            // Request all pending permissions
            request(permissionsToRequest);
        }
    };

    const requestPermissions = async (permissions) => {
        if (Platform.OS === 'android') {
            try {
                const grantedPermissions = await PermissionsAndroid.requestMultiple(permissions);
                const allPermissionsGranted = Object.values(grantedPermissions).every(
                    status => status === PermissionsAndroid.RESULTS.GRANTED
                );

                if (allPermissionsGranted) {
                    // All permissions granted

                } else {

                    // Handle denied permissions
                }
                return allPermissionsGranted
            } catch (error) {
                console.error(error);
            }
        } else {
            // For iOS and other platforms, use react-native-permissions
            const results = await request(permissions);

            if (results.every(result => result === RESULTS.GRANTED)) {
                // All permissions granted
            } else {
                // Handle denied permissions
            }
        }
    };

    const getOneTimeLocation = (item) => {
        showLocationBottomSheet();
        var pageId = item.personalDiscussionPageLogs[0].id;
        var pageCode = item.personalDiscussionPageLogs[0].pageCode;
        var pageDesc = item.personalDiscussionPageLogs[0].pageDescription;
        var pageMan = item.personalDiscussionPageLogs[0].isMandatory;
        Geolocation.getCurrentPosition(
            //Will give you the current location
            (position) => {



                //getting the Longitude from the location json
                const currentLongitude =
                    JSON.stringify(position.coords.longitude);

                //getting the Latitude from the location json
                const currentLatitude =
                    JSON.stringify(position.coords.latitude);

                hideLocationBottomSheet();
                props.navigation.replace('PDReferenceCheckList', { 'pageId': pageId, 'pageCode': pageCode, 'pageDesc': pageDesc, 'pageMandatory': pageMan });

            },
            (error) => {

                console.log(error)
            },
            {
                enableHighAccuracy: true,
                timeout: 30000,
                maximumAge: 1000
            },
        );
    };


    const onGoBack = () => {
        props.navigation.replace('PDItems', { clientType: global.CLIENTTYPE });
    }

    const navigateToQuestion = (item) => {

        var pageId = item.personalDiscussionPageLogs[0].id;
        var pageCode = item.personalDiscussionPageLogs[0].pageCode;
        var pageDesc = item.personalDiscussionPageLogs[0].pageDescription;
        var pageMan = item.personalDiscussionPageLogs[0].isMandatory;

        global.PDSUBMODULE = item.subModuleCode;
        if (item.subModuleCode == 'REFF_CHECK_APPL' || item.subModuleCode == 'REFF_CHECK_CO_APPL' || item.subModuleCode == 'REFF_CHECK_GRNTR') {
            // checkPermissions().then(res => {
            //     if (res == true) {
            //         getOneTimeLocation(item);
            //     } else {
            //         setApiError('Permission Not Granted');
            //         setErrorModalVisible(true)
            //     }

            // });
            props.navigation.replace('PDReferenceCheckList', { 'pageId': pageId, 'pageCode': pageCode, 'pageDesc': pageDesc, 'pageMandatory': pageMan });

        } else {
            props.navigation.replace('PdQuestionarire', { 'pageId': pageId, 'pageCode': pageCode, 'pageDesc': pageDesc, 'pageMandatory': pageMan });
        }
    }


    const closeErrorModal = () => {
        setErrorModalVisible(false);
    };

    const FlatView = ({ item }) => {

        return (
            <View style={{ width: '90%', alignItems: 'center', flexDirection: 'row', alignSelf: 'center', height: 50 }}>

                <View style={{ width: '70%', justifyContent: 'center', textAlign: 'center' }}>
                    <Text style={{ color: Colors.black, fontFamily: 'PoppinsRegular' }}>{item.subModuleDescription} {item.isMandatory ? '' : '(Optional)'}</Text>
                </View>


                <View style={{ width: '20%' }}>
                    {item.subModuleStatus === 'Completed' &&
                        <AntDesign name="checkcircle" size={18} color={Colors.green} />
                    }
                </View>

                <TouchableOpacity
                    onPress={() => { navigateToQuestion(item) }}
                    style={{ width: '10%', justifyContent: 'center' }}>
                    <View>
                        <Entypo name="chevron-right" color={Colors.darkblack} size={25} />
                    </View>
                </TouchableOpacity>
            </View>

        )

    }
    return (
        <SafeAreaView
            style={[styles.parentView, { backgroundColor: Colors.lightwhite }]}>
            {loading ? <Loading /> : null}
            <MyStatusBar backgroundColor={'white'} barStyle="dark-content" />
            <ErrorModal isVisible={errorModalVisible} onClose={closeErrorModal} textContent={apiError} textClose={language[0][props.language].str_ok} />
            <Modal
                isVisible={locationSheetVisible}
                onBackdropPress={() => { }}
                backdropOpacity={0.5}
                style={styles.modal}
            >
                <View style={styles.modalContent}>
                    <View style={{ alignItems: 'center' }}>

                        <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>

                            <TextComp textVal={"Fetching Location......"} textStyle={{ fontSize: 14, color: Colors.black, fontWeight: 600, marginTop: 30, marginBottom: 30 }} Visible={false} />


                        </View>




                    </View>


                </View>
            </Modal>

            <View
                style={{
                    width: '100%',
                    height: 56,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                <HeadComp
                    textval={language[0][props.language].str_pd}
                    props={props}
                    onGoBack={onGoBack}
                />
            </View>
            <View
                style={{
                    width: '100%',
                    alignItems: 'center',
                }}>
                <View
                    style={{
                        width: '90%',
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                    <Image
                        source={require('../../Images/orderblue.png')}
                        style={{ width: 16, height: 20 }}
                    />
                    <Text
                        style={{
                            marginLeft: 10,
                            fontSize: 14,
                            fontFamily: 'Poppins-Medium',
                            color: Colors.mediumgrey,
                        }}>
                        Questionarire
                    </Text>
                </View>
            </View>

            <View style={{ marginTop: 20 }}>
                <FlatList
                    data={pdData}
                    renderItem={FlatView}
                    extraData={refreshFlatlist}
                    keyExtractor={item => item.id}
                />
            </View>

        </SafeAreaView >
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
        flexGrow: 1,
    },
    line: {
        backgroundColor: '#dbdbdb', // Change the color as needed
        height: 1,
        width: '90%',
        marginTop: '5%', // Adjust the height as needed
    },
    picker: {
        height: 50,
        width: '100%',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        textAlign: 'center',
    },
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 16,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
});

const mapStateToProps = state => {
    const { language } = state.languageReducer;
    const { profileDetails } = state.profileReducer;
    const { mobileCodeDetails } = state.mobilecodeReducer;
    const { pdSubStages } = state.pdStagesReducer;
    return {
        language: language,
        profiledetail: profileDetails,
        mobilecodedetail: mobileCodeDetails,
        pdSubStage: pdSubStages
    }
};

const mapDispatchToProps = dispatch => ({
    languageAction: item => dispatch(languageAction(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PdQuestionSubStage);
