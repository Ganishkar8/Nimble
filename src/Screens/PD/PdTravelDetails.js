/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react-native/no-inline-styles */
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    SafeAreaView,
    FlatList, TouchableOpacity, BackHandler, Modal
} from 'react-native';
import { React, useState, useEffect, useRef } from 'react';
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
import Feather from 'react-native-vector-icons/Feather';
import DateInputComp from '../../Components/DateInputComp';
import PickerComp from '../../Components/PickerComp';
import TextInputComp from '../../Components/TextInputComp';
import ButtonViewComp from '../../Components/ButtonViewComp';
import { tr } from 'react-native-paper-dates';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const PdTravelDetails = (props, { navigation }) => {
    const [loading, setLoading] = useState(false);
    const [pdDetails, setPdDetails] = useState([]);
    const [refreshFlatlist, setRefreshFlatList] = useState(false);
    const isScreenVisible = useIsFocused();

    const [dateOfTravel, setDateOfTravel] = useState('');
    const [dateOfTravelCaption, setDateOfTravelCaption] = useState('DATE OF TRAVEL');
    const [dateOfTravelMan, setDateOfTravelMan] = useState(true);
    const [dateOfTravelVisible, setDateOfTravelVisible] = useState(true);
    const [dateOfTravelDisable, setDateOfTravelDisable] = useState(false);
    const dateOfTravelRef = useRef(null);

    const [modeOfTravelMan, setModeOfTravelMan] = useState(false);
    const [modeOfTravelVisible, setModeOfTravelVisible] = useState(true);
    const [modeOfTravelDisable, setModeOfTravelDisable] = useState(false);
    const [modeOfTravelData, setModeOfTravelData] = useState([{ 'subCodeId': 'BI', 'Description': 'Bike' }, { 'subCodeId': 'CAR', 'Description': 'Car' }]);
    const [modeOfTravelCaption, setModeOfTravelCaption] = useState('MODE OF TRAVEL');
    const [modeOfTravelLabel, setModeOfTravelLabel] = useState('');
    const [modeOfTravelIndex, setModeOfTravelIndex] = useState('');

    const [distanceTravelled, setDistanceTravelled] = useState('');
    const [distanceTravelledCaption, setNomineeBranchNameCaption] = useState('DISTANCE TRAVELLED (IN KM)');
    const [distanceTravelledMan, setNomineeBranchNameMan] = useState(false);
    const [distanceTravelledVisible, setNomineeBranchNameVisible] = useState(true);
    const [distanceTravelledDisable, setNomineeBranchNameDisable] = useState(false);
    const distanceTravelledRef = useRef(null);

    const [remarks, setRemarks] = useState('');
    const [remarksCaption, setRemarksCaption] = useState('Remarks');
    const [remarksMan, setRemarksMan] = useState(false);
    const [remarksVisible, setRemarksVisible] = useState(true);
    const [remarksDisable, setRemarksDisable] = useState(false);
    const remarksRef = useRef(null);

    const [componentName, setComponentName] = useState('officer');
    const [officerMainList, setOfficerMainList] = useState([]);
    const [officerList, setOfficerList] = useState([{ 'subCodeId': 'ID1', 'Description': 'Ganishkar' }, { 'subCodeId': 'ID2', 'Description': 'Guru' }]);
    const [officerModalVisible, setOfficerModalVisible] = useState(false);
    const showOfficerSheet = (label) => {
        setComponentName(label)
        setOfficerModalVisible(true)
    };
    const hideOfficerSheet = () => setOfficerModalVisible(false);

    const [empID, setEmpID] = useState('');
    const [officerIDLabel, setOfficerIDLabel] = useState('');
    const [officerIDIndex, setOfficerIDIndex] = useState('');
    useEffect(() => {
        props.navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' }, tabBarVisible: false });
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);

        return () => {
            props.navigation.getParent()?.setOptions({ tabBarStyle: undefined, tabBarVisible: undefined });
            backHandler.remove();
        }
    }, [props.navigation, isScreenVisible]);

    const handleBackButton = () => {
        onGoBack();
        return true; // Prevent default back button behavior
    };

    const onGoBack = () => {

    }
    const addItem = () => {
        const newDataArray = [...officerMainList];
        const newObject = {
            officerID: officerIDLabel,
            officerName: officerIDIndex,
            empId: empID
        };
        newDataArray.push(newObject);
        setOfficerIDLabel('');
        setOfficerIDIndex('');
        setEmpID('')
        hideOfficerSheet(true)

        //alert(JSON.stringify(newDataArray))
        setOfficerMainList(newDataArray)
        setRefreshFlatList(!refreshFlatlist)
    }

    const deleteOfficer = (data) => {
        const updatedOfficerList = officerMainList.filter((item) => item.officerID !== data.officerID);
        setOfficerMainList(updatedOfficerList)
        setRefreshFlatList(!refreshFlatlist)
    }

    const submitTravelData = () => {

        console.log("DateOfTravel::"+dateOfTravel+" "+" Mode Of Travel::"+modeOfTravelLabel+" "+
        "Distance Travelled::"+distanceTravelled+" "+"Remarks::"+remarks)

    }

    const FlatView = ({ item }) => {
        return (
            <View style={{ width: '100%', alignItems: 'center', marginTop: 15 }}>
                <View style={{ width: '90%', minHeight: 100, backgroundColor: item.colorCode == 'Green' ? '#B6F4B470' : '#FFEAE5', borderRadius: 5, flexDirection: 'row', alignItems: 'center' }}>
                    <ImageComp imageSrc={item.colorCode == 'Green' ? require('../../Images/income.png') : require('../../Images/expense.png')} imageStylee={{ marginLeft: 10, width: 30, height: 30 }} />
                    <View style={{ width: '80%' }}>

                        <Text style={{ width: '80%', fontSize: 12, fontFamily: 'PoppinsRegular', marginTop: 5, color: Colors.black, marginLeft: 10 }}>
                            {item.empId}
                        </Text>

                        <Text style={{ width: '80%', fontSize: 12, fontFamily: 'Poppins-Medium', marginTop: 5, color: Colors.black, marginLeft: 10 }}>
                            {item.officerID}
                        </Text>

                    </View>
                    <View>
                        <MaterialCommunityIcons
                            name="delete"
                            size={20}
                            onPress={() => { deleteOfficer(item) }}
                            color="#F76464"></MaterialCommunityIcons>
                    </View>
                </View>
            </View >
        )
    }


    const handleReference = (componentName) => {

        if (componentName === 'accountHolderName') {

        } else if (componentName === 'ifsccode') {

        }

    };

    const handleClick = (componentName, textValue) => {
        if (componentName === 'DOB') {
            setDateOfTravel(textValue);
            //setAge(Common.calculateAge(textValue).toString())
        } else if (componentName === 'empid') {
            setEmpID(textValue);
        } else if (componentName === 'distance') {
            setDistanceTravelled(textValue);
        } else if (componentName === 'remarks') {
            setRemarks(textValue);
        }
    }
    const handlePickerClick = (componentName, label, index) => {
        if (componentName === 'mot') {
            setModeOfTravelLabel(label);
            setModeOfTravelIndex(index);
        } else if (componentName === 'officerlist') {
            setOfficerIDLabel(label);
            setOfficerIDIndex(index);
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            {loading ? <Loading /> : null}
            <MyStatusBar backgroundColor={'white'} barStyle="dark-content" />
            <Modal
                visible={officerModalVisible}
                transparent={false}
                animationType="slide"
                onRequestClose={hideOfficerSheet}>


                <View style={{ width: '100%', backgroundColor: Colors.white }}>

                    <View style={{ width: '100%', alignItems: 'center', marginTop: '4%' }}>
                        <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, }}>
                            <TextComp textVal={'Accompanying Officer (Branch)'} textStyle={Commonstyles.inputtextStyle} Visible={true} />
                        </View>
                        <PickerComp textLabel={officerIDLabel} pickerStyle={Commonstyles.picker} Disable={false} pickerdata={officerList} componentName='officerlist' handlePickerClick={handlePickerClick} />
                    </View>

                    <View style={{ width: '100%', marginTop: 19, paddingHorizontal: 0, alignItems: 'center', justifyContent: 'center' }}>

                        <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, }}>
                            <TextComp textVal={'Employee ID'} textStyle={Commonstyles.inputtextStyle} Visible={true} />
                        </View>

                        <TextInputComp textValue={empID} textStyle={[Commonstyles.textinputtextStyle, { maxHeight: 100 }]} type='numeric' Disable={false} ComponentName='empid' returnKey="done" handleClick={handleClick} length={10} multilines={true} />

                    </View>

                    <View style={{ alignItems: 'flex-end', marginTop: 25 }}>
                        <ButtonViewComp textValue={language[0][props.language].str_add.toUpperCase()} textStyle={{ color: Colors.white, fontSize: 13, fontWeight: 500 }} viewStyle={[Commonstyles.buttonView, { width: 100, height: 20 }]} innerStyle={[Commonstyles.buttonViewInnerStyle, { height: 35 }]} handleClick={addItem} />
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
            <View style={{ width: '93%', flexDirection: 'row', marginLeft: 20 }}>
                <TouchableOpacity
                    activeOpacity={1}
                    style={{ width: '10%', height: 40, justifyContent: 'center' }}>
                    <View>
                        <Feather name="briefcase" size={25} color={Colors.darkblue} />
                    </View>
                </TouchableOpacity>
                <View style={{ width: '80%', height: 40, justifyContent: 'center' }}>
                    <Text style={{ fontSize: 18, color: Colors.darkblack, fontFamily: 'PoppinsRegular', marginTop: 3 }}>
                        {language[0][props.language].str_traveldetails}
                    </Text>
                </View>
            </View>
            {dateOfTravelVisible && (
                <View
                    style={{
                        width: '100%',
                        marginTop: 19,
                        paddingHorizontal: 0,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                    <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0 }}>
                        <TextComp
                            textVal={dateOfTravelCaption}
                            textStyle={Commonstyles.inputtextStyle}
                            Visible={dateOfTravelMan}
                        />
                    </View>

                    <View style={{ width: '100%', alignItems: 'center' }}>
                        <DateInputComp textStyle={[Commonstyles.inputtextStyle, { width: '90%' }]} ComponentName="DOB"
                            textValue={dateOfTravel}
                            type="numeric"
                            handleClick={handleClick}
                            Disable={dateOfTravelDisable}
                            reference={dateOfTravelRef}
                            minDate={new Date()}
                        />
                    </View>

                </View>
            )}

            {modeOfTravelVisible && (
                <View
                    style={{
                        width: '100%',
                        alignItems: 'center',
                        marginTop: '4%',
                    }}>
                    <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0 }}>
                        <TextComp
                            textVal={modeOfTravelCaption}
                            textStyle={Commonstyles.inputtextStyle}
                            Visible={modeOfTravelMan}
                        />
                    </View>

                    <PickerComp
                        textLabel={modeOfTravelLabel}
                        pickerStyle={Commonstyles.picker}
                        Disable={modeOfTravelDisable}
                        pickerdata={modeOfTravelData}
                        componentName="mot"
                        handlePickerClick={handlePickerClick}
                    />
                </View>
            )}

            {distanceTravelledVisible && (
                <View
                    style={{
                        width: '100%',
                        marginTop: 19,
                        paddingHorizontal: 0,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                    <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0 }}>
                        <TextComp
                            textVal={distanceTravelledCaption}
                            textStyle={Commonstyles.inputtextStyle}
                            Visible={distanceTravelledMan}
                        />
                    </View>

                    <TextInputComp
                        textValue={distanceTravelled}
                        textStyle={Commonstyles.textinputtextStyle}
                        type="number-pad"
                        Disable={distanceTravelledDisable}
                        ComponentName="distance"
                        reference={distanceTravelledRef}
                        returnKey="next"
                        handleClick={handleClick}
                        handleReference={handleReference}
                    />
                </View>
            )}

            {remarksVisible && (
                <View
                    style={{
                        width: '100%',
                        marginTop: 19,
                        paddingHorizontal: 0,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                    <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0 }}>
                        <TextComp
                            textVal={remarksCaption}
                            textStyle={Commonstyles.inputtextStyle}
                            Visible={remarksMan}
                        />
                    </View>

                    <TextInputComp
                        textValue={remarks}
                        textStyle={Commonstyles.textinputtextStyle}
                        type="email-address"
                        Disable={remarksDisable}
                        ComponentName="remarks"
                        reference={remarksRef}
                        returnKey="next"
                        handleClick={handleClick}
                        handleReference={handleReference}
                    />
                </View>
            )}

            <View
                style={{
                    marginTop: 25,
                    width: '90%',
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                }}>
                <TouchableOpacity onPress={() => showOfficerSheet('Income')}>
                    <Text
                        style={{
                            color: Colors.darkblue,
                            fontFamily: 'Poppins-Medium'
                        }}>
                        + Add Officer
                    </Text>
                </TouchableOpacity>
            </View>

            <FlatList
                showsVerticalScrollIndicator={false}
                data={officerMainList}
                renderItem={FlatView}
                extraData={refreshFlatlist}
                keyExtractor={item => item.id}
            />

            <ButtonViewComp
                textValue={language[0][props.language].str_submit.toUpperCase()}
                textStyle={{ color: Colors.white, fontSize: 13, fontWeight: 500,marginBottom : 5 }}
                viewStyle={Commonstyles.buttonView}
                innerStyle={Commonstyles.buttonViewInnerStyle}
                handleClick={submitTravelData}
            />


        </SafeAreaView >
    );
};

const mapStateToProps = state => {
    const { language } = state.languageReducer;
    const { profileDetails } = state.profileReducer;
    const { mobileCodeDetails } = state.mobilecodeReducer;
    return {
        language: language,
        profiledetail: profileDetails,
        mobilecodedetail: mobileCodeDetails
    }
};

const mapDispatchToProps = dispatch => ({
    languageAction: item => dispatch(languageAction(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PdTravelDetails);
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
