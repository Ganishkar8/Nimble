import React, { useEffect, useState } from 'react';
import {
    View,
    StatusBar,
    Text,
    Image,
    FlatList,
    StyleSheet,
    TextInput,
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

    { name: 'Approve', id: 'APR', checked: true },
    { name: 'Pending', id: 'PEN', checked: false },
    { name: 'Rejected', id: 'REJ', checked: false },
    { name: 'Draft', id: 'DFT', checked: false },

]


const LeadLog = (props, { navigation }) => {


    const [currentPosition, setCurrentPosition] = useState(0);
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [leadData, setLeadData] = useState(props.route.params.leadData);
    //const [labels, setLabels] = useState(typeDataArr);
    const [logData, setLogData] = useState(props.route.params.logDetail);
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
    };


    useEffect(() => {
        //below code is used for hiding  bottom tab
        //alert(JSON.stringify(props.route.params.leadData.leadCreationLeadLogDtoList))
        props.navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' }, tabBarVisible: false });
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


    return (

        <View style={{ flex: 1, backgroundColor: '#fefefe' }}>
            <MyStatusBar backgroundColor={'white'} barStyle="dark-content" />
            {loading ? <Loading /> : null}
            <View style={styles.headerView}>
                <View style={{
                    width: '100%', height: 50, alignItems: 'center', justifyContent: 'center',
                    flexDirection: 'row'
                }}>
                    <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ width: '15%', height: 56, alignItems: 'center', justifyContent: 'center' }}>
                        <View >

                            <Entypo name='chevron-left' size={25} color='#4e4e4e' />

                        </View>
                    </TouchableOpacity>
                    <View style={{ width: '85%', height: 50, justifyContent: 'center' }}>
                        <Text style={{ fontSize: 18, color: '#000', fontWeight: '400' }}>{language[0][props.language].str_leadlog}</Text>
                    </View>
                </View>
            </View>
            <View style={{ width: '100%', height: 5, backgroundColor: Colors.skyblue }} />


            <View style={{ width: '100%', height: 50, justifyContent: 'center' }}>
                <Text style={{
                    fontSize: 16, color: Colors.mediumgrey, marginLeft: 23,
                }}>{language[0][props.language].str_leadid} :  <Text style={{ color: Colors.black }}>{leadData.leadNumber}</Text></Text>
            </View>

            <View style={{ width: '100%', height: 5, backgroundColor: Colors.skyblue }} />

            <View style={{ width: '100%', justifyContent: 'center' }}>
                <Text style={{
                    fontSize: 16, color: '#000', marginLeft: 23, marginTop: 10
                }}>{language[0][props.language].str_leadlog}</Text>

            </View>
            <View style={{ width: '100%', height: '40%', justifyContent: 'center', marginLeft: 20 }}>

                <StepIndicator
                    customStyles={customStyles}
                    currentPosition={currentPosition}
                    labels={logData}
                    direction={'vertical'}
                    stepCount={logData.length}
                    renderLabel={({ position, stepStatus, label, currentPosition }) => {
                        return (
                            <View style={{ width: '100%', marginTop: 110 }}>
                                <Text style={{
                                    fontSize: 16, color: '#000', marginLeft: 10,
                                }}>{label.leadStatus == '1667' ? language[0][props.language].str_leadapproval : language[0][props.language].str_leadcreation}</Text>
                                <View style={{ width: '100%', flexDirection: 'row', marginTop: 11, }}>
                                    <View style={{ width: '50%' }}>
                                        <Text style={{ color: Colors.dimText, fontSize: 13, fontWeight: '400', marginLeft: 10 }}>{language[0][props.language].str_completiondate}:</Text>
                                    </View>
                                    <View style={{ width: '40%' }}>
                                        <Text style={{ color: Colors.black, fontSize: 13, fontWeight: '400' }}>{label.leadStatus == '1667' ? label.approvedOn != '' ? Common.formatDate(label.approvedOn) : '' : Common.formatDate(label.createdOn)}</Text>
                                    </View>
                                </View>
                                <View style={{ width: '100%', flexDirection: 'row', marginTop: 11, }}>
                                    <View style={{ width: '50%' }}>
                                        <Text style={{ color: Colors.dimText, fontSize: 13, fontWeight: '400', marginLeft: 10 }}>{language[0][props.language].str_completiontime}:</Text>
                                    </View>
                                    <View style={{ width: '40%' }}>
                                        <Text style={{ color: Colors.black, fontSize: 13, fontWeight: '400' }}>{label.leadStatus == '1667' ? label.approvedOn != '' ? Common.formatTime(label.approvedOn) : '' : Common.formatTime(label.createdOn)}</Text>
                                    </View>
                                </View>
                                <View style={{ width: '100%', flexDirection: 'row', marginTop: 11, }}>
                                    <View style={{ width: '50%' }}>
                                        <Text style={{ color: Colors.dimText, fontSize: 13, fontWeight: '400', marginLeft: 10 }}>{language[0][props.language].str_userid}:</Text>
                                    </View>
                                    <View style={{ width: '40%' }}>
                                        <Text style={{ color: Colors.black, fontSize: 13, fontWeight: '400' }}>{label.createdBy}</Text>
                                    </View>
                                </View>
                                <View style={{ width: '100%', flexDirection: 'row', marginTop: 11, }}>
                                    <View style={{ width: '50%' }}>
                                        <Text style={{ color: Colors.dimText, fontSize: 13, fontWeight: '400', marginLeft: 10 }}>{language[0][props.language].str_username}:</Text>
                                    </View>
                                    <View style={{ width: '40%' }}>
                                        <Text style={{ color: Colors.black, fontSize: 13, fontWeight: '400' }}>userName</Text>
                                    </View>
                                </View>
                            </View>
                        );
                    }} />
            </View>

            <View>

            </View>





        </View >
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
    headerView: {
        width: ('100%'),
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

});