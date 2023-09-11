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
import { DatePickerModal } from 'react-native-paper-dates';

import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import apiInstance from '../Utils/apiInstance';
import Colors from '../Utils/Colors';
import MyStatusBar from './ MyStatusBar';
import Loading from './Loading';
import { BottomSheet } from 'react-native-btr';
import { connect } from 'react-redux';
import { languageAction } from '../Utils/redux/actions/languageAction';
import { language } from '../Utils/LanguageString';
import { RadioButton } from 'react-native-paper';
import Commonstyles from '../Utils/Commonstyles';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import TextComp from '../Components/TextComp';
import { Picker } from '@react-native-picker/picker';

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

const typeDataArr = [

    { name: 'Hot', id: 'HOT', checked: true },
    { name: 'Warm', id: 'WARM', checked: false },
    { name: 'Cold', id: 'COLD', checked: false }

]

const LoanApplicationTracker = (props, { navigation }) => {

    const [click, setClick] = useState('');
    const [search, setSearch] = useState('');
    const [pendingData, setPendingData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [mainFilterData, setMainFilteredData] = useState(mainFilterDataArr);
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [checked, setChecked] = useState('first');
    const [filterVisible, setFilterVisible] = useState('');
    const [statusData, setStatusData] = useState(statusDataArr);
    const [typeData, setTypeData] = useState(typeDataArr);
    const [refreshFlatlist, setRefreshFlatList] = useState(false);
    const [refreshTypeFlatlist, setRefreshTypeFlatList] = useState(false);
    const [fromDate, setFromDate] = useState('10/09/2023');
    const [toDate, setToDate] = useState('11/09/2023');
    const [choosenLabel, setChoosenLabel] = useState('Native');
    const [choosenIndex, setChoosenIndex] = useState('2');
    const [age, setAge] = useState('25');




    useEffect(() => {
        getPendingData()
        setFilterVisible(mainFilterData[0].id)
        //below code is used for hiding  bottom tab
        props.navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' }, tabBarVisible: false });
        return () =>
            props.navigation.getParent()?.setOptions({ tabBarStyle: undefined, tabBarVisible: undefined });
    }, [navigation]);

    const toggleBottomNavigationView = () => {
        //Toggling the visibility state of the bottom sheet
        setVisible(!visible);
    };

    const getPendingData = () => {
        const appDetails = {
            "isActive": true
        }
        const baseURL = '8101'
        setLoading(true)
        apiInstance(baseURL).post('/api/v1/cases?page=0&size=20', appDetails)
            .then((response) => {
                // Handle the response data
                console.log("ResponseDataApi::" + JSON.stringify(response.data));
                setPendingData(response.data.content)
                setFilteredData(response.data.content)
                setLoading(false)
                // const decodedToken = jwtDecode(response.data.jwtToken);
                // console.log("LoginJWTDecode::" + JSON.stringify(decodedToken));
            })
            .catch((error) => {
                // Handle the error
                console.error("ErrorDataApi::" + error);
            });
    }

    const handleclick = (value, index) => {
        //alert(JSON.stringify(value))
        if(value.name == 'Filter'){
            setVisible(true)
        }else{
            alert('Please go..tata bye')
        }
    }

    const listView = ({ item }) => {

        return (
            <View style={{
                width: '92%', margin: 13, backgroundColor: 'white',
                elevation: 4, borderRadius: 8, paddingHorizontal: 5,
                shadowColor: 'black',
                shadowOpacity: 0.2,
                shadowOffset: {
                    width: 0,
                    height: 2,
                }, alignItems: 'center'
            }}>

                <View style={{ width: '92%', flexDirection: 'row', marginTop: 13, }}>
                    <Text style={{ color: '#707070', fontSize: 16, fontWeight: '500' }}>{item.actionBy}</Text>
                </View>
                <View style={{ width: '92%', flexDirection: 'row', marginTop: 13, }}>
                    <Text style={{ color: '#707070', fontSize: 13, fontWeight: '400' }}>Loan Application ID :</Text>
                    <Text style={{ color: '#3f3f3f', fontSize: 13, fontWeight: '500', paddingHorizontal: 3 }}>{item.loanAppId}</Text>
                </View>
                <View style={{ width: '92%', flexDirection: 'row', marginTop: 13, }}>
                    <Text style={{ color: '#707070', fontSize: 13, fontWeight: '400' }}>Workflow stage :</Text>
                    <Text style={{ color: '#3f3f3f', fontSize: 13, fontWeight: '500', paddingHorizontal: 3 }}>{item.loanWorkFlowStage}</Text>
                </View>
                <View style={{ width: '92%', justifyContent: 'center', marginTop: 8 }}>
                    <View style={{ width: '100%', height: .9, backgroundColor: '#e3e3e3' }} />
                </View>
                <View style={{ width: '92%', flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                    <View>
                        <Text style={{ color: '#707070', fontSize: 13, fontWeight: '400' }}>Creation Date</Text>
                        <View>
                            <Text style={{ color: '#707070', fontSize: 13, fontWeight: '500', marginTop: 5 }}>{item.appCreationDate}</Text>
                        </View>
                    </View>

                    <View>
                        <Text style={{ color: '#707070', fontSize: 13, fontWeight: '400' }}>Completion Date</Text>
                        <View>
                            <Text style={{ color: '#707070', fontSize: 13, fontWeight: '500', marginTop: 5 }}>{item.actionOn}</Text>
                        </View>
                    </View>

                </View>

                <View style={{ width: '92%', flexDirection: 'row', justifyContent: 'space-between', marginTop: 8, marginBottom: 13 }}>
                    <View>
                        <Text style={{ color: '#707070', fontSize: 13, fontWeight: '400' }}>Status</Text>
                        <View>
                            <Text style={{ color: '#e85050', fontSize: 13, fontWeight: '500', marginTop: 5 }}>{item.status}</Text>
                        </View>
                    </View>

                    <View>
                        <Text style={{ color: '#707070', fontSize: 13, fontWeight: '400' }}>Ageing</Text>
                        <View>
                            <Text style={{ color: '#707070', fontSize: 13, fontWeight: '500', marginTop: 5 }}>{item.ageing}</Text>
                        </View>
                    </View>

                </View>
            </View>

        )
    }

    const searchFilterFunction = (text) => {
        // Check if searched text is not blank
        if (text) {
            // Inserted text is not blank
            // Filter the masterDataSource
            // Update FilteredDataSource
            const newData = pendingData.filter(
                function (item) {
                    const itemData = item.actionBy
                        ? item.actionBy.toUpperCase()
                        : ''.toUpperCase();
                    const itemDataID = item.loanAppId
                        ? item.loanAppId.toString()
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
            setFilteredData(pendingData);
            setSearch(text);
        }
    };

    const updateMainFilteredData = (item, index) => {
        let fiterPosition = mainFilterData
        for (let i = 0; i < fiterPosition.length; i++) {
            if (fiterPosition[i].id == item.id) {
                fiterPosition[i].isSelected = true
                setFilterVisible(fiterPosition[i].id)
            } else {
                fiterPosition[i].isSelected = false
            }
        }
        //alert(JSON.stringify(fiterPosition))
        setMainFilteredData(fiterPosition)
    }

    const updateStatusData = (item) => {
        let fiterStatusPosition = statusData
        for (let i = 0; i < fiterStatusPosition.length; i++) {
            if (fiterStatusPosition[i].id == item.id) {
                fiterStatusPosition[i].checked = true
            } else {
                fiterStatusPosition[i].checked = false
            }
        }
        //alert(JSON.stringify(fiterPosition))
        //console.log('StatusData::')
        setStatusData(fiterStatusPosition)
        setRefreshFlatList(!refreshFlatlist)
    }

    const updateTypeData = (item) => {
        let fiterStatusPosition = typeData
        for (let i = 0; i < fiterStatusPosition.length; i++) {
            if (fiterStatusPosition[i].id == item.id) {
                fiterStatusPosition[i].checked = true
            } else {
                fiterStatusPosition[i].checked = false
            }
        }
        //alert(JSON.stringify(fiterPosition))
        //console.log('StatusData::')
        setTypeData(fiterStatusPosition)
        setRefreshTypeFlatList(!refreshTypeFlatlist)
    }

    return (

        <View style={{ flex: 1, backgroundColor: '#fefefe' }}>
            <MyStatusBar backgroundColor={'white'} barStyle="dark-content" />
            {loading ? <Loading /> : null}
            <View style={styles.headerView}>
                <View style={{
                    width: '100%', height: 56, alignItems: 'center', justifyContent: 'center',
                    flexDirection: 'row'
                }}>
                    <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ width: '15%', height: 56, alignItems: 'center', justifyContent: 'center' }}>
                        <View >

                            <Entypo name='chevron-left' size={25} color='#4e4e4e' />

                        </View>
                    </TouchableOpacity>
                    <View style={{ width: '85%', height: 56, justifyContent: 'center' }}>
                        <Text style={{ fontSize: 18, color: '#000', fontWeight: '400' }}>Loan Application Tracker</Text>
                    </View>
                </View>

                <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', marginTop: 7, }}>
                    <FlatList
                        data={data}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => {
                            return (
                                <TouchableOpacity onPress={() => handleclick(item, index)} activeOpacity={11}>
                                    <View style={[styles.viewStyle, { flexDirection: 'row' }]}>
                                        <Text style={[styles.textColor, { marginRight: 8, }]}>{item.name}</Text>
                                        {item.name === 'Filter' &&
                                            <Image source={require('../Images/filter.png')}
                                                style={{ width: 15, height: 15, resizeMode: 'contain', marginStart: 8 }} />
                                        }
                                        {item.name === 'Sort by' &&
                                            <AntDesign name='caretdown' size={11} color='#343434' />
                                        }
                                        {item.name === 'Draft' &&
                                            <View style={{
                                                width: 15, height: 15, borderRadius: 15, backgroundColor: 'red',
                                                alignItems: 'center', justifyContent: 'center', marginTop: 2, marginStart: 4
                                            }}>
                                                <Text style={{ color: '#fff', fontSize: 9 }}>2</Text>
                                            </View>
                                        }

                                    </View>
                                </TouchableOpacity>
                            )
                        }}
                    />
                </View>
            </View>

            <View style={{
                width: '100%', alignItems: 'center',
                justifyContent: 'center', marginTop: 10, marginBottom: 8
            }}>
                <View style={{
                    width: '90%', backgroundColor: '#f2f2f2',
                    borderRadius: 7, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10
                }}>

                    <TextInput
                        value={search}
                        onChangeText={search => searchFilterFunction(search)}
                        placeholder={'Search for Name or Loan App ID'}
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

            <View style={{ width: '100%', justifyContent: 'center', marginBottom: 200 }}>
                <FlatList
                    data={filteredData}
                    renderItem={listView}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>

            <BottomSheet
                visible={visible}
                //setting the visibility state of the bottom shee
                onBackButtonPress={toggleBottomNavigationView}
                //Toggling the visibility state
                onBackdropPress={toggleBottomNavigationView}
            //Toggling the visibility state
            >
                {/*Bottom Sheet inner View*/}
                <View style={styles.bottomNavigationView}>
                    <View
                        style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text
                            style={{
                                padding: 15,
                                fontSize: 16,
                                color: Colors.black
                            }}>
                            {language[0][props.language].str_filter}
                        </Text>
                        <TouchableOpacity onPress={toggleBottomNavigationView} activeOpacity={9} style={{ justifyContent: 'center', alignItems: 'center', marginRight: 10 }}>
                            <View >
                                <Feather name='x' size={25} color={Colors.dimText} />
                            </View>
                        </TouchableOpacity>


                    </View>
                    <View style={{ height: 1, width: '100%', backgroundColor: Colors.line }} />
                    <View style={{ width: '100%', flexDirection: 'row' }}>
                        <View style={{ width: '35%' }}>
                            <FlatList
                                data={mainFilterData}
                                horizontal={false}
                                showsVerticalScrollIndicator={false}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item, index }) => {
                                    return (
                                        <TouchableOpacity onPress={() => updateMainFilteredData(item, index)} activeOpacity={11}>
                                            <View style={[styles.viewStyleFilter, { flexDirection: 'row', marginTop: 5 }]}>

                                                {item.isSelected ?
                                                    (<View style={{ width: 7, height: 35, backgroundColor: Colors.skyBlue }} />) : null}
                                                <View style={{ width: '95%', padding: 17 }}>
                                                    <Text style={[styles.textColor, { marginRight: 8, textAlign: 'left' }]}>{item.name}</Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                }}
                            />
                        </View>
                        <View style={{ width: 1, height: 400, backgroundColor: Colors.line }} />
                        <View style={{ width: '65%' }}>
                            {filterVisible === 'SO' &&
                                <View>
                                    <View style={{ marginLeft: 15 }}>
                                        <Text
                                            style={{ marginTop: 15, fontSize: 14, color: Colors.dimText }}>
                                            {language[0][props.language].str_sortby}
                                        </Text>
                                        <Text
                                            style={{ marginTop: 8, fontSize: 14, color: Colors.black }}>
                                            {language[0][props.language].str_creationdate}
                                        </Text>
                                    </View>
                                    <View style={{ width: '100%', alignItems: 'center', marginTop: '3%' }}>

                                        <View style={{ width: '100%', marginTop: 3, marginLeft: 15 }}>

                                            <View style={{ flexDirection: 'row', marginTop: '5%' }}>
                                                <View style={{ width: '18%', justifyContent: 'center' }}>
                                                    <RadioButton
                                                        uncheckedColor={Colors.darkblue}
                                                        value="first"
                                                        color={Colors.darkblue}
                                                        status={checked === 'first' ? 'checked' : 'unchecked'}
                                                        onPress={() => setChecked('first')}
                                                    />
                                                </View>
                                                <View style={{ width: '70%', justifyContent: 'center' }}>
                                                    <Text
                                                        style={{
                                                            color: Colors.black,
                                                            fontSize: 15,
                                                        }}>
                                                        {language[0][props.language].str_lto}
                                                    </Text>
                                                </View>

                                            </View>

                                            <View style={{ flexDirection: 'row', marginTop: '3%' }}>
                                                <View style={{ width: '18%', justifyContent: 'center' }}>
                                                    <RadioButton
                                                        uncheckedColor={Colors.darkblue}
                                                        value="first"
                                                        color={Colors.darkblue}
                                                        status={checked === 'second' ? 'checked' : 'unchecked'}
                                                        onPress={() => setChecked('second')}
                                                    />
                                                </View>
                                                <View style={{ width: '70%', justifyContent: 'center' }}>
                                                    <Text
                                                        style={{
                                                            color: Colors.black,
                                                            fontSize: 15,
                                                        }}>
                                                        {language[0][props.language].str_otl}
                                                    </Text>
                                                </View>


                                            </View>
                                        </View>


                                    </View>
                                </View>
                            }

                            {filterVisible === 'ST' &&
                                <View>
                                    <View style={{ marginLeft: 15 }}>
                                        <Text
                                            style={{ marginTop: 15, fontSize: 14, color: Colors.dimText }}>
                                            {language[0][props.language].str_statuscap}
                                        </Text>
                                    </View>
                                    <View style={{ width: '100%', alignItems: 'center' }}>

                                        <View style={{ width: '100%', marginTop: 3, marginLeft: 15 }}>

                                            <FlatList
                                                data={statusData}
                                                extraData={refreshFlatlist}
                                                horizontal={false}
                                                showsVerticalScrollIndicator={false}
                                                keyExtractor={(item, index) => item.id}
                                                renderItem={({ item, index }) => {
                                                    return (
                                                        <View style={[styles.viewStyleStatusData, { flexDirection: 'row', marginTop: 2 }]}>

                                                            <View style={{ flexDirection: 'row', marginTop: '2%' }}>
                                                                <View style={{ width: '18%', justifyContent: 'center' }}>
                                                                    <RadioButton
                                                                        uncheckedColor={Colors.darkblue}
                                                                        color={Colors.darkblue}
                                                                        status={item.checked ? 'checked' : 'unchecked'}
                                                                        //status={checked === 'second' ? 'checked' : 'unchecked'}
                                                                        onPress={() => updateStatusData(item)}
                                                                    />
                                                                </View>
                                                                <View style={{ width: '70%', justifyContent: 'center' }}>
                                                                    <Text
                                                                        style={{
                                                                            color: Colors.black,
                                                                            fontSize: 15,
                                                                        }}>
                                                                        {item.name}
                                                                    </Text>
                                                                </View>

                                                            </View>
                                                        </View>
                                                    )
                                                }}
                                            />
                                        </View>


                                    </View>
                                </View>
                            }

                            {filterVisible === 'DT' &&
                                <View>
                                    <View style={{ marginLeft: 15 }}>
                                        <Text
                                            style={{ marginTop: 15, fontSize: 14, color: Colors.dimText }}>
                                            {language[0][props.language].str_cdcaps}
                                        </Text>
                                    </View>
                                    <View style={{ width: '100%', alignItems: 'center', marginLeft: 15 }}>

                                        <View style={{ width: '100%', marginTop: 3 }}>
                                            <Text
                                                style={{ marginTop: 15, fontSize: 14, color: Colors.dimmText, marginLeft: 3 }}>
                                                {language[0][props.language].str_from}
                                            </Text>
                                            <View style={{ width: '100%', flexDirection: 'row' }}>
                                                <View style={{ width: '70%' }}>
                                                    <TextInput
                                                        editable={false}
                                                        value={fromDate}
                                                        onChangeText={txt => setFromDate(txt)}
                                                        placeholder={''}
                                                        placeholderTextColor={Colors.lightgrey}
                                                        secureTextEntry={false}
                                                        autoCapitalize="none"
                                                        style={[Commonstyles.textinputtextStyle, { color: Colors.dimmText }]}
                                                    />
                                                </View>
                                                <TouchableOpacity onPress={() => setOpen(true)} activeOpacity={10} style={{ width: '10%', marginTop: 8 }}>
                                                    <View>
                                                        <Ionicons name='calendar-clear-outline' size={22} color={Colors.dimText} />
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                            <View style={{ width: '80%', height: 1.5, backgroundColor: Colors.line, marginLeft: 4 }} />
                                        </View>
                                    </View>
                                    <View style={{ width: '100%', alignItems: 'center', marginLeft: 15 }}>

                                        <View style={{ width: '100%', marginTop: 3 }}>
                                            <Text
                                                style={{ marginTop: 15, fontSize: 14, color: Colors.dimmText, marginLeft: 3 }}>
                                                {language[0][props.language].str_to}
                                            </Text>
                                            <View style={{ width: '100%', flexDirection: 'row' }}>
                                                <View style={{ width: '70%' }}>
                                                    <TextInput
                                                        editable={false}
                                                        value={toDate}
                                                        onChangeText={txt => setToDate(txt)}
                                                        placeholder={''}
                                                        placeholderTextColor={Colors.lightgrey}
                                                        secureTextEntry={false}
                                                        autoCapitalize="none"
                                                        style={[Commonstyles.textinputtextStyle, { color: Colors.dimmText }]}
                                                    />
                                                </View>
                                                <View style={{ width: '10%', marginTop: 8 }}>
                                                    <Ionicons name='calendar-clear-outline' size={22} color={Colors.dimText} />
                                                </View>
                                            </View>
                                            <View style={{ width: '80%', height: 1.5, backgroundColor: Colors.line, marginLeft: 4 }} />
                                        </View>
                                    </View>
                                </View>
                            }

                            {filterVisible === 'TP' &&
                                <View>
                                    <View style={{ marginLeft: 15 }}>
                                        <Text
                                            style={{ marginTop: 15, fontSize: 14, color: Colors.dimText }}>
                                            {language[0][props.language].str_leadtype}
                                        </Text>
                                    </View>
                                    <View style={{ width: '100%', alignItems: 'center' }}>

                                        <View style={{ width: '100%', marginTop: 3, marginLeft: 15 }}>

                                            <FlatList
                                                data={typeData}
                                                extraData={refreshTypeFlatlist}
                                                horizontal={false}
                                                showsVerticalScrollIndicator={false}
                                                keyExtractor={(item, index) => item.id}
                                                renderItem={({ item, index }) => {
                                                    return (
                                                        <View style={[styles.viewStyleStatusData, { flexDirection: 'row', marginTop: 2 }]}>

                                                            <View style={{ flexDirection: 'row', marginTop: '2%' }}>
                                                                <View style={{ width: '18%', justifyContent: 'center' }}>
                                                                    <RadioButton
                                                                        uncheckedColor={Colors.darkblue}
                                                                        color={Colors.darkblue}
                                                                        status={item.checked ? 'checked' : 'unchecked'}
                                                                        //status={checked === 'second' ? 'checked' : 'unchecked'}
                                                                        onPress={() => updateTypeData(item)}
                                                                    />
                                                                </View>
                                                                <View style={{ width: '70%', justifyContent: 'center' }}>
                                                                    <Text
                                                                        style={{
                                                                            color: Colors.black,
                                                                            fontSize: 15,
                                                                        }}>
                                                                        {item.name}
                                                                    </Text>
                                                                </View>

                                                            </View>
                                                        </View>
                                                    )
                                                }}
                                            />
                                        </View>


                                    </View>
                                </View>
                            }

                            {filterVisible === 'AG' &&
                                <View>
                                    <View style={{ marginLeft: 15 }}>
                                        <Text
                                            style={{ marginTop: 15, fontSize: 14, color: Colors.dimText }}>
                                            {language[0][props.language].str_ageingcap}
                                        </Text>
                                    </View>
                                    <View style={{ width: '100%', alignItems: 'center', marginLeft: 15 }}>

                                        <View style={{ width: '100%', marginTop: 3 }}>
                                            <TextComp textStyle={{ marginTop: 15, fontSize: 14, color: Colors.dimmText, marginLeft: 3 }} textVal={language[0][props.language].str_operator} Visible={true}></TextComp>

                                            <View style={{ width: '100%', flexDirection: 'row' }}>
                                                <View style={{ width: '6%', marginTop: 16 }}>
                                                    <MaterialIcons name='keyboard-arrow-right' size={20} color={Colors.dimmText} />
                                                </View>
                                                <View style={{
                                                    width: '95%',
                                                }}>

                                                    <Picker
                                                        selectedValue={choosenLabel}
                                                        style={styles.picker}
                                                        onValueChange={(itemValue, itemIndex) => {
                                                            setChoosenLabel(itemValue);
                                                            setChoosenIndex(itemIndex);
                                                        }}>
                                                        <Picker.Item label="Hello" value="Hello" />
                                                        <Picker.Item label="React" value="React" />
                                                        <Picker.Item label="Native" value="Native" />
                                                        <Picker.Item label="How" value="How" />
                                                        <Picker.Item label="are" value="are" />
                                                        <Picker.Item label="you" value="you" />
                                                    </Picker>

                                                </View>

                                            </View>
                                            <View style={{ width: '80%', height: 1.5, backgroundColor: Colors.line, marginLeft: 4 }} />
                                        </View>
                                    </View>
                                    <View style={{ width: '100%', alignItems: 'center', marginLeft: 15 }}>

                                        <View style={{ width: '100%', marginTop: 3 }}>

                                            <TextComp textStyle={{ marginTop: 15, fontSize: 14, color: Colors.dimmText, marginLeft: 3 }} textVal={language[0][props.language].str_age} Visible={true}></TextComp>
                                            <View style={{ width: '100%', flexDirection: 'row' }}>
                                                <View style={{ width: '70%' }}>
                                                    <TextInput
                                                        value={age}
                                                        onChangeText={txt => setAge(txt)}
                                                        placeholder={''}
                                                        placeholderTextColor={Colors.lightgrey}
                                                        secureTextEntry={false}
                                                        autoCapitalize="none"
                                                        inputMode='numeric'
                                                        maxLength={2}
                                                        style={[Commonstyles.textinputtextStyle, { color: Colors.dimmText }]}
                                                    />
                                                </View>

                                            </View>
                                            <View style={{ width: '80%', height: 1.5, backgroundColor: Colors.line, marginLeft: 4 }} />
                                        </View>
                                    </View>
                                </View>
                            }

                        </View>

                    </View>
                </View>
                <View style={{
                    backgroundColor: Colors.white, height: 90, width: '100%', shadowColor: '#000',
                    shadowOffset: { width: 0, height: 5 },
                    shadowOpacity: 0.7,
                    shadowRadius: 2,
                    elevation: 6, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row'
                }}>
                    <View style={{ padding: 25 }}>
                        <TextComp textStyle={{ marginTop: 0, fontSize: 18, color: Colors.dimmText, marginLeft: 3 }} textVal={language[0][props.language].str_clearfilters} Visible={false}></TextComp>
                    </View>
                    <View style={{
                        width: '40%', height: 45, backgroundColor: Colors.darkblue, alignItems: 'center', justifyContent: 'center', marginRight: 20,
                        borderRadius: 25
                    }}>
                        <TextComp textStyle={{ marginTop: 0, fontSize: 14, color: Colors.white, marginLeft: 3 }} textVal={language[0][props.language].str_apply} Visible={false}></TextComp>
                    </View>

                </View>
            </BottomSheet>




        </View>
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


export default connect(mapStateToProps, mapDispatchToProps)(LoanApplicationTracker);

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
    bottomView: {
        width: '100%', alignItems: 'center', justifyContent: 'flex-end',
        marginTop: 5, position: 'absolute', bottom: 0, marginBottom: 25
    },

});