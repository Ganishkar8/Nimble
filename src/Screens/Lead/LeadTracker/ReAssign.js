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
    Modal,
} from 'react-native';
import TextComp from '../../../Components/TextComp';
import Colors from '../../../Utils/Colors';
import MyStatusBar from '../../../Components/ MyStatusBar';
import Loading from '../../../Components/Loading';
import { connect } from 'react-redux';
import { languageAction } from '../../../Utils/redux/actions/languageAction';
import { language } from '../../../Utils/LanguageString';
import HeadComp from '../../../Components/HeadComp';
import ButtonViewComp from '../../../Components/ButtonViewComp';
import Commonstyles from '../../../Utils/Commonstyles';
import tbl_SystemCodeDetails from '../../../Database/Table/tbl_SystemCodeDetails';
import PickerComp from '../../../Components/PickerComp';
import TextInputComp from '../../../Components/TextInputComp';
import ImageComp from '../../../Components/ImageComp';
import Ionicons from 'react-native-vector-icons/Ionicons';

const statusDataArr = [

    { name: 'Ajith', id: 'APR', checked: true },
    { name: 'Ganishkar', id: 'PEN', checked: false },
    { name: 'Muba', id: 'REJ', checked: false },

]

const ReAssign = (props, { navigation }) => {


    const [currentPosition, setCurrentPosition] = useState(0);
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [leadOwner, setLeadOwner] = useState('Uday/Ag01');
    const [reasonLabel, setReasonLabel] = useState('');
    const [reasonIndex, setReasonIndex] = useState('');
    const [reasonData, setReasonData] = useState([]);
    const [reAssignedto, setReAssignedto] = useState('');
    const [search, setSearch] = useState('');
    const [filteredData, setFilteredData] = useState(statusDataArr);
    const [nonFilteredData, setNonFilteredData] = useState(statusDataArr);



    useEffect(() => {
        //below code is used for hiding  bottom tab
        props.navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' }, tabBarVisible: false });
        pickerData();
        return () =>
            props.navigation.getParent()?.setOptions({ tabBarStyle: undefined, tabBarVisible: undefined });
    }, [navigation]);


    const pickerData = async () => {
        tbl_SystemCodeDetails.getSystemCodeDetailsBasedOnID('Reason').then(value => {
            if (value !== undefined && value.length > 0) {
                console.log(value)

                for (var i = 0; i < value.length; i++) {
                    if (value[i].IsDefault === '1') {
                        setReasonLabel(value[i].SubCodeID);
                        setReasonIndex(i + 1);
                    }
                }

                setReasonData(value)

            }
        })
    }

    const handleClick = (componentName, textValue) => {

        setLeadOwner(textValue)

    }

    const handleReference = (componentName) => {

    };

    const handlePickerClick = (componentName, label, index) => {

        if (componentName === 'reasonPicker') {
            setReasonLabel(label);
            setReasonIndex(index);
        }

    }

    const searchFilterFunction = (text) => {
        // Check if searched text is not blank
        if (text) {
            // Inserted text is not blank
            // Filter the masterDataSource
            // Update FilteredDataSource
            const newData = nonFilteredData.filter(
                function (item) {

                    const itemData = item.name
                        ? item.name.toUpperCase()
                        : ''.toUpperCase();
                    const itemDataID = item.id
                        ? item.id.toString()
                        : ''.toUpperCase();
                    const regex = /^[0-9]+$/;
                    let textData = ''
                    if (regex.test(text)) {
                        textData = text
                        console.log("String consists of only numbers.");
                    } else {
                        textData = text.toUpperCase();
                        console.log("String contains non-numeric characters.");
                    }
                    //const textData = text.toUpperCase();
                    return ((itemData.indexOf(textData) > -1) || (itemDataID.indexOf(textData) > -1));
                });
            setFilteredData(newData);
            setSearch(text);
        } else {
            // Inserted text is blank
            // Update FilteredDataSource with masterDataSource
            setFilteredData(nonFilteredData);
            setSearch(text);
        }
    };


    const listView = ({ item }) => {

        return (
            <View>
                <TouchableOpacity onPress={() => { setReAssignedto(item.name); setVisible(false); setSearch(''); setFilteredData(nonFilteredData) }} activeOpacity={0.9}>
                    <View style={{
                        width: '92%', margin: 13, backgroundColor: 'white',
                        alignItems: 'center'
                    }}>


                        <View style={{ width: '100%', flexDirection: 'row', }}>

                            <Text style={{ color: Colors.black, fontSize: 13, fontWeight: '400' }}>{item.name}</Text>

                        </View>

                    </View>
                    <View style={{ width: '100%', height: .9, backgroundColor: Colors.line, marginTop: 5 }} />

                </TouchableOpacity>
            </View>

        )
    }

    const leadApproval = () => { }

    return (

        <SafeAreaView style={[styles.parentView, { backgroundColor: Colors.lightwhite }]}>

            <MyStatusBar backgroundColor={'white'} barStyle="dark-content" />

            <ScrollView style={styles.scrollView}
                contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
                {loading ? <Loading /> : null}

                <Modal
                    visible={visible}
                    animationType="slide"
                    transparent={true}

                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>

                            <View style={{
                                width: '100%', alignItems: 'center',
                                justifyContent: 'center', marginTop: 10, marginBottom: 8
                            }}>
                                <View style={{
                                    width: '95%', backgroundColor: '#f2f2f2',
                                    borderRadius: 7, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10
                                }}>

                                    <TextInput
                                        value={search}
                                        onChangeText={search => searchFilterFunction(search)}
                                        placeholder={'Search By Name or ID'}
                                        placeholderTextColor={'gray'}
                                        keyboardType='default'
                                        secureTextEntry={false}
                                        autoCapitalize="none"
                                        style={{
                                            width: '80%',
                                            height: 44,
                                            fontSize: 14.4,
                                            fontWeight: '400'
                                        }}
                                    />
                                    <Ionicons name="search" style={{ marginStart: 32 }} size={20} color={'#aaaaaa'} />
                                </View>
                            </View>
                            <View style={{ width: '100%', justifyContent: 'center' }}>
                                <FlatList
                                    data={filteredData}
                                    renderItem={listView}
                                    showsVerticalScrollIndicator={false}
                                    keyExtractor={(item, index) => index.toString()}
                                />
                            </View>
                        </View>
                    </View>
                </Modal>

                <View style={{ flex: 1 }}>

                    <View style={{ width: '100%', height: 56, alignItems: 'center', justifyContent: 'center', }}>

                        <HeadComp textval={language[0][props.language].str_reassign} props={props} />

                    </View>


                    <View style={{ width: '100%', height: 50, justifyContent: 'center' }}>
                        <Text style={{
                            fontSize: 16, color: Colors.lightgrey, marginLeft: 23,
                        }}>{language[0][props.language].str_leadid} <Text style={{ color: Colors.black }}>: LX127</Text></Text>
                    </View>

                    <View style={{ width: '100%', marginTop: 19, paddingHorizontal: 0, alignItems: 'center', justifyContent: 'center' }}>

                        <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, }}>
                            <TextComp textVal={language[0][props.language].str_leadowner} textStyle={Commonstyles.inputtextStyle} Visible={true} />
                        </View>

                        <TextInputComp textValue={leadOwner} textStyle={Commonstyles.textinputtextStyle} type='email-address' Disable={true} ComponentName='approverComment' returnKey="done" handleClick={handleClick} handleReference={handleReference} />



                    </View>

                    <View style={{ width: '100%', alignItems: 'center', marginTop: '4%' }}>
                        <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, }}>

                            <TextComp textVal={language[0][props.language].str_reassignedto} textStyle={Commonstyles.inputtextStyle} Visible={true} />

                        </View>


                        <View style={{ width: '90%', height: 48, marginTop: 3, paddingHorizontal: 0, borderBottomWidth: 1, borderBottomColor: '#e2e2e2', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>

                            <TextComp textVal={reAssignedto} textStyle={[Commonstyles.inputtextStyle, { color: Colors.black, width: '85%', fontSize: 14 }]} Visible={false} />
                            <TouchableOpacity onPress={() => { setVisible(true) }} activeOpacity={0.8} >
                                <Ionicons name="search" style={{ marginStart: 32 }} size={20} color={'#aaaaaa'} />
                            </TouchableOpacity>
                        </View>

                    </View>


                    <View style={{ width: '100%', alignItems: 'center', marginTop: '4%' }}>
                        <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, }}>

                            <TextComp textVal={language[0][props.language].str_reason} textStyle={Commonstyles.inputtextStyle} Visible={true} />

                        </View>

                        <PickerComp textLabel={reasonLabel} pickerStyle={Commonstyles.picker} Disable={false} pickerdata={reasonData} componentName='reasonPicker' handlePickerClick={handlePickerClick} />


                    </View>

                </View>

                <ButtonViewComp textValue={language[0][props.language].str_reassign.toUpperCase()} textStyle={{ color: Colors.white, fontSize: 13, fontWeight: 500 }} viewStyle={Commonstyles.buttonView} innerStyle={Commonstyles.buttonViewInnerStyle} handleClick={leadApproval} />


            </ScrollView>
        </SafeAreaView>
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


export default connect(mapStateToProps, mapDispatchToProps)(ReAssign);

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

    }, modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent background
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 20,
        alignItems: 'center',
    },
    closeButton: {
        width: '100%',
        marginTop: 10,
        padding: 10,
        alignItems: 'flex-end', justifyContent: 'flex-end'
    },

});