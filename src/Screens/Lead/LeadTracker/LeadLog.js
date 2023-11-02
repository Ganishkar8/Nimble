import React, { useEffect, useState } from 'react';
import {
    View,
    StatusBar,
    Text,
    Image,
    FlatList,
    StyleSheet,
    TextInput,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
} from 'react-native';
import { DatePickerModal, tr } from 'react-native-paper-dates';

import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import TextComp from '../../../Components/TextComp';
import Colors from '../../../Utils/Colors';
import MyStatusBar from '../../../Components/ MyStatusBar';
import Loading from '../../../Components/Loading';
import { BottomSheet } from 'react-native-btr';
import { connect } from 'react-redux';
import { languageAction } from '../../../Utils/redux/actions/languageAction';
import { language } from '../../../Utils/LanguageString';
import StepIndicator from 'react-native-step-indicator';
import Common from '../../../Utils/Common';
import { getAvailableLocationProviders } from 'react-native-device-info';
import apiInstance from '../../../Utils/apiInstance';
import HeadComp from '../../../Components/HeadComp';

const data = [

    { name: 'Filter' },
    { name: 'Sort by' },
    { name: 'Draft' },
    { name: 'Rejected' }
]
const mainFilterDataArr = [

    { name: 'Sort', isSelected: true, id: 'SO' },
    { name: 'Status', isSelected: false, id: 'ST' },
    { name: 'Date', isSelected: false, id: 'DT' },
    { name: 'Type', isSelected: false, id: 'TP' },
    { name: 'Ageing', isSelected: false, id: 'AG' }
]

const statusDataArr = [
    {
        "date": "",
        "time": "",
        "userId": "",
        "userName": ""
    }
]


const LeadLog = (props, { navigation }) => {


    const [currentPosition, setCurrentPosition] = useState(0);
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [leadData, setLeadData] = useState(props.route.params.leadData);
    //const [labels, setLabels] = useState(typeDataArr);
    const [logData, setLogData] = useState();
    const [logTotalData, setLogTotalData] = useState();
    const [logDataLength, setLogDataLength] = useState(0);
    //const labels = ["Cart", "Delivery Address"];
    const customStyles = {
        stepIndicatorSize: 15,
        currentStepIndicatorSize: 15,
        separatorStrokeWidth: 1,
        currentStepStrokeWidth: 3,
        stepStrokeCurrentColor: Colors.green,
        stepStrokeWidth: 1,
        stepStrokeFinishedColor: Colors.green,
        stepStrokeUnFinishedColor: Colors.dimText,
        separatorFinishedColor: Colors.green,
        separatorUnFinishedColor: Colors.dimText,
        stepIndicatorFinishedColor: Colors.green,
        stepIndicatorUnFinishedColor: Colors.dimText,
        stepIndicatorCurrentColor: Colors.green,
        stepIndicatorLabelFontSize: 0,
        currentStepIndicatorLabelFontSize: 0,
        stepIndicatorLabelCurrentColor: Colors.green,
        stepIndicatorLabelFinishedColor: Colors.green,
        stepIndicatorLabelUnFinishedColor: Colors.green,
        marginTop: 20
    };


    useEffect(() => {
        //below code is used for hiding  bottom tab
        //alert(JSON.stringify(props.route.params.leadData.leadCreationLeadLogDtoList))
        props.navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' }, tabBarVisible: false });
        leadLogApi();
        return () =>
            props.navigation.getParent()?.setOptions({ tabBarStyle: undefined, tabBarVisible: undefined });
    }, [navigation]);



    const StatusTrain = () => {
        return (
            <View style={styles.statusTrain}>
                <View style={styles.statusTrainStatus}>
                    <View style={styles.statusTrainHeader}>
                        <Text style={styles.statusTrainHeaderText}>Order Confirmed</Text>
                    </View>
                    <View style={styles.statusTrainStatusConfirm}>
                        <Text style={styles.statusTrainStatusConfirmText}>
                            Awaiting Confirmation
                        </Text>
                    </View>
                </View>
                <View style={styles.statusTrainTime}>
                    <Text style={styles.statusTrainTimeText}>August 01, 10:00AM</Text>
                </View>
            </View>
        );
    };

    const leadLogApi = () => {

        const baseURL = '8901'
        setLoading(true)
        // alert(props.route.params.leadData.id)
        apiInstance(baseURL).post(`/api/v1/lead-log/foragent/${global.leadNumber}`)
            .then(async (response) => {
                // Handle the response data
                setLoading(false)
                if (response.data.length > 1) {
                    var data = [];
                    for (var i = 0; i < response.data.length; i++) {
                        data.push({
                            "id": "1",
                            "date": response.data[i].date,
                            "time": response.data[i].time,
                            "userId": response.data[i].userId,
                            "userName": response.data[i].userName,
                            "reassignfrom": "",
                            "reassignto": "",
                            "reassignby": ""
                        })
                    }
                    setCurrentPosition(response.data.length - 1)
                    getReAssignApi(data);
                } else {
                    var data = [];
                    data.push({
                        "id": "1",
                        "date": response.data[0].date,
                        "time": response.data[0].time,
                        "userId": response.data[0].userId,
                        "userName": response.data[0].userName,
                        "reassignfrom": "",
                        "reassignto": "",
                        "reassignby": ""
                    })
                    data.push({
                        "id": "1",
                        "date": "",
                        "time": "",
                        "userId": "",
                        "userName": "",
                        "reassignfrom": "",
                        "reassignto": "",
                        "reassignby": ""

                    })
                    setLogTotalData(data);
                    setCurrentPosition(0)
                }

            })
            .catch((error) => {
                // Handle the error
                setLoading(false)
                alert(JSON.stringify(error.response));
            });
    }


    const getReAssignApi = (data) => {

        const baseURL = '8901'
        setLoading(true)
        // alert(props.route.params.leadData.id)
        apiInstance(baseURL).post(`/api/v1/updatedLog/new/${global.leadNumber}`)
            .then(async (response) => {
                // Handle the response data
                setLoading(false)
                if (response.data.length > 0) {
                    for (var i = 0; i < response.data.length; i++) {
                        data.push({
                            "id": "2",
                            "date": response.data[i].reAssignedByDate,
                            "time": response.data[i].reAssignedByTime,
                            "userId": "",
                            "userName": "",
                            "reassignfrom": response.data[i].reAssignFromUsername + "/" + response.data[i].reAssignedFrom,
                            "reassignto": response.data[i].reAssignedToUsername + "/" + response.data[i].reAssignedTo,
                            "reassignby": response.data[i].reAssignedByUsername + "/" + response.data[i].reAssignedBy
                        })
                    }

                    setCurrentPosition(currentPosition + response.data.length)
                    setLogTotalData(data);
                } else {

                    setLogTotalData(data);
                }



            })
            .catch((error) => {
                // Handle the error
                setLoading(false)
                alert(JSON.stringify(error.response));
            });
    }


    return (

        <SafeAreaView style={[styles.parentView, { backgroundColor: Colors.lightwhite }]}>

            <MyStatusBar backgroundColor={'white'} barStyle="dark-content" />

            {loading ? <Loading /> : null}

            <View style={{ flex: 1 }}>

                <View style={{ width: '100%', height: 56, alignItems: 'center', justifyContent: 'center', }}>

                    <HeadComp textval={language[0][props.language].str_leadlog} props={props} />

                </View>


                <View style={{ width: '100%', height: 5, backgroundColor: Colors.skyblue }} />


                <View style={{ width: '100%', height: 50, justifyContent: 'center' }}>
                    <Text style={{
                        fontSize: 16, color: Colors.mediumgrey, marginLeft: 23, fontFamily: 'PoppinsRegular'
                    }}>{language[0][props.language].str_leadid} :  <Text style={{ color: Colors.black, fontFamily: 'PoppinsRegular' }}>{leadData.leadNumber}</Text></Text>
                </View>

                <View style={{ width: '100%', height: 5, backgroundColor: Colors.skyblue }} />

                {/* <View style={{ width: '100%', justifyContent: 'center' }}>
                    <Text style={{
                        fontSize: 16, color: Colors.mediumgrey, marginLeft: 23, marginTop: 10, fontFamily: 'PoppinsRegular'
                    }}>{language[0][props.language].str_leadlog}</Text>

                </View> */}
                <View style={{ width: '100%', alignItems: 'flex-start', justifyContent: 'flex-start', marginLeft: 20, marginTop: 20, marginBottom: 190 }}>

                    <FlatList
                        data={logTotalData}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => {
                            return (
                                <View style={{ width: '100%' }}>
                                    <View style={{ width: '100%', flexDirection: 'row', marginTop: index == 0 ? 8 : 0 }}>
                                        <View style={{
                                            width: '15%', // Adjust as needed
                                            alignItems: 'center',
                                        }}>
                                            <View style={{
                                                width: 15, // Set the width of your rounded view
                                                height: 15, // Set the height of your rounded view
                                                borderRadius: 15,

                                                // Half of the width or height to create a circle
                                                backgroundColor: index == 1 ? currentPosition == 0 ? Colors.lightgrey : Colors.green : Colors.green, // Set the background color
                                                justifyContent: 'center', // Adjust as needed
                                                alignItems: 'center', // Adjust as needed
                                            }}>
                                            </View>
                                            {logTotalData.length != index + 1 &&
                                                <View style={{
                                                    flex: 1, borderColor: currentPosition == 0 ? Colors.lightgrey : Colors.green, borderLeftWidth: 1, justifyContent: 'center', // Adjust as needed
                                                    alignItems: 'center',
                                                }}></View>}

                                        </View>

                                        <View style={{ width: '80%' }}>
                                            <Text style={{
                                                fontSize: 14, color: '#000', marginLeft: 10, fontFamily: 'Poppins-Medium'
                                            }}>{index == 0 ? language[0][props.language].str_leadcreation : index == 1 ? leadData.leadCreationLeadLogDto.leadStatus == '1668' ? language[0][props.language].str_leadrejected : language[0][props.language].str_leadapproval : language[0][props.language].str_reassign}</Text>
                                            <View style={{ width: '100%', marginTop: 11, }}>
                                                <View style={{ width: '100%' }}>
                                                    <Text style={styles.headText}>{language[0][props.language].str_completiondate.toUpperCase()} </Text>
                                                </View>
                                                <View style={{ width: '100%' }}>
                                                    <Text style={styles.childText}>{item.date}</Text>
                                                </View>
                                            </View>
                                            <View style={{ width: '100%', marginTop: 11, }}>
                                                <View style={{ width: '100%' }}>
                                                    <Text style={styles.headText}>{language[0][props.language].str_completiontime.toUpperCase()} </Text>
                                                </View>
                                                <View style={{ width: '100%' }}>
                                                    <Text style={styles.childText}>{item.time}</Text>
                                                </View>
                                            </View>
                                            {item.id == '1' && <View style={{ width: '100%', marginTop: 11, }}>
                                                <View style={{ width: '100%' }}>
                                                    <Text style={styles.headText}>{language[0][props.language].str_userid.toUpperCase()} </Text>
                                                </View>
                                                <View style={{ width: '100%' }}>
                                                    <Text style={styles.childText}>{item.userId}</Text>
                                                </View>
                                            </View>}
                                            {item.id == '1' &&
                                                <View style={{ width: '100%', marginTop: 11, }}>
                                                    <View style={{ width: '100%' }}>
                                                        <Text style={styles.headText}>{language[0][props.language].str_username.toUpperCase()} </Text>
                                                    </View>
                                                    <View style={{ width: '100%' }}>
                                                        <Text style={styles.childText}>{item.userName}</Text>
                                                    </View>
                                                </View>
                                            }
                                            {item.id == '2' && <View style={{ width: '100%', marginTop: 11, }}>
                                                <View style={{ width: '100%' }}>
                                                    <Text style={styles.headText}>{language[0][props.language].str_reassignfrom.toUpperCase()} </Text>
                                                </View>
                                                <View style={{ width: '100%' }}>
                                                    <Text style={styles.childText}>{item.reassignfrom}</Text>
                                                </View>
                                            </View>}

                                            {item.id == '2' && <View style={{ width: '100%', marginTop: 11, }}>
                                                <View style={{ width: '100%' }}>
                                                    <Text style={styles.headText}>{language[0][props.language].str_reassignto.toUpperCase()} </Text>
                                                </View>
                                                <View style={{ width: '100%' }}>
                                                    <Text style={styles.childText}>{item.reassignto}</Text>
                                                </View>
                                            </View>}

                                            {item.id == '2' && <View style={{ width: '100%', marginTop: 11, }}>
                                                <View style={{ width: '100%' }}>
                                                    <Text style={styles.headText}>{language[0][props.language].str_reassignby.toUpperCase()} </Text>
                                                </View>
                                                <View style={{ width: '100%' }}>
                                                    <Text style={styles.childText}>{item.reassignby}</Text>
                                                </View>
                                            </View>}

                                        </View>
                                    </View>

                                    {logTotalData.length != index + 1 && <View style={{ height: 20, flexDirection: 'row' }}>
                                        <View style={{
                                            width: '15%', // Adjust as needed
                                            alignItems: 'center', justifyContent: 'center'
                                        }}>


                                            <View style={{
                                                flex: 1, borderColor: currentPosition == 0 ? Colors.lightgrey : Colors.green, borderLeftWidth: 1, justifyContent: 'center', // Adjust as needed
                                                alignItems: 'center',
                                            }}></View>

                                        </View>

                                        <View style={{ width: '85%' }} />
                                    </View>}

                                </View>
                            );
                        }} />
                </View>

                <View>

                </View>

            </View >

        </SafeAreaView >
    );
};

const mapStateToProps = (state) => {
    const { language } = state.languageReducer;
    return {
        language: language
    }
}

const mapDispatchToProps = (dispatch) => ({
    languageAction: (item) => dispatch(languageAction(item)),
});


export default connect(mapStateToProps, mapDispatchToProps)(LeadLog);

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#f5f8fa',
        alignItems: 'center'
    },
    parentView: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    contentContainer: {

        paddingBottom: 50,
        flexGrow: 1
    },
    headerView: {
        width: '100%',
        paddingVertical: 15,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    viewStyle: {
        alignItems: 'center',
        paddingHorizontal: 20, marginLeft: 9, marginRight: 4,
        borderColor: '#e3e3e3',
        marginBottom: 4,
        marginStart: 12,
        paddingVertical: 7,
        borderWidth: 1,
        borderRadius: 8,
    },
    bottomNavigationView: {
        backgroundColor: '#fff',
        width: '100%',
        height: 400,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },

    textColor: {
        color: '#000',
        fontSize: 14,
        fontWeight: '400'
    },
    viewStyleFilter: {
        alignItems: 'center', justifyContent: 'center',
    },
    viewStyleStatusData: {
        alignItems: 'center'
    },
    picker: {
        height: 50,
        width: '85%',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        textAlign: 'center'
    },
    pendingbackground: {
        width: 90, borderColor: Colors.pendingBorder, backgroundColor: Colors.pendingBg, alignItems: 'center', padding: 3, borderRadius: 15, borderWidth: 1
    },
    approvedbackground: {
        width: 90, borderColor: Colors.approvedBorder, backgroundColor: Colors.approvedBg, alignItems: 'center', padding: 3, borderRadius: 15, borderWidth: 1
    },
    line: {
        backgroundColor: '#f1f1f1', // Change the color as needed
        height: 1,
        width: '90%', marginLeft: '5%',
        marginTop: '5%', alignItems: 'center'         // Adjust the height as needed
    },
    disableBg: {
        width: '88%', height: 50, backgroundColor: Colors.disableBg,
        borderRadius: 45, alignItems: 'center', justifyContent: 'center'
    },
    enableBg: {
        width: '88%', height: 50, backgroundColor: Colors.enableBg,
        borderRadius: 45, alignItems: 'center', justifyContent: 'center'
    }, fab: {
        position: 'absolute',
        margin: 0,
        right: 0,
        bottom: 12,
        width: '100%',

    },
    headText: {
        color: Colors.dimText, fontSize: 12, marginLeft: 10, fontFamily: 'PoppinsRegular'
    },
    childText: {
        color: Colors.black, fontSize: 12, marginLeft: 10, fontFamily: 'Poppins-Medium'
    }

});