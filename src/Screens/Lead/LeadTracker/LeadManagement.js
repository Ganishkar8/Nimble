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
    SafeAreaView
} from 'react-native';

import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import apiInstance from '../../../Utils/apiInstance';
import Colors from '../../../Utils/Colors';
import MyStatusBar from '../../../Components/ MyStatusBar';
import Loading from '../../../Components/Loading';
import { BottomSheet } from 'react-native-btr';
import { connect } from 'react-redux';
import { languageAction } from '../../../Utils/redux/actions/languageAction';
import { language } from '../../../Utils/LanguageString';
import { FAB } from 'react-native-paper';
import Modal from 'react-native-modal';
import TextComp from '../../../Components/TextComp';
import apiInstancelocal from '../../../Utils/apiInstancelocal';
import { useIsFocused } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';

//
import SortByComp from '../../../Components/Filter/SortByComp';
import StatusComp from '../../../Components/Filter/StatusComp';
import TypeComp from '../../../Components/Filter/TypeComp';
import AgeingComp from '../../../Components/Filter/AgeingComp';
import DateComp from '../../../Components/Filter/DateComp';

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

    { name: 'Approve', id: 'APR', checked: false },
    { name: 'Pending', id: 'PEN', checked: false },
    { name: 'Rejected', id: 'REJ', checked: false },
    { name: 'Draft', id: 'DFT', checked: false },

]

const typeDataArr = [

    { name: 'Hot', id: 'HOT', checked: false },
    { name: 'Warm', id: 'WARM', checked: false },
    { name: 'Cold', id: 'COLD', checked: false }

]

const LeadManagement = (props, { navigation, route }) => {

    const [search, setSearch] = useState('');
    const [pendingData, setPendingData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [mainFilterData, setMainFilteredData] = useState(mainFilterDataArr);
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [filterVisible, setFilterVisible] = useState('');
    const [bottomLeadSheetVisible, setBottomLeadSheetVisible] = useState(false);
    const showBottomSheet = () => setBottomLeadSheetVisible(true);
    const hideBottomSheet = () => setBottomLeadSheetVisible(false);
    const isScreenVisible = useIsFocused();

    const [sortedFilterValue, setSortedFilterValue] = useState('');
    const [statusFilterValue, setStatusFilterValue] = useState('');
    const [typeFilterValue, setTypeFilterValue] = useState('');
    const [dateFilterValue, setDateFilterValue] = useState('');
    const [ageFilterValue, setAgeFilterValue] = useState('');


    useEffect(() => {
        //getPendingData()
        if (props.route.params.fromScreen == "LeadCompletion") {
            showBottomSheet();
        }
        if (isScreenVisible) {
            getPendingData();
        }

        setFilterVisible(mainFilterData[0].id)
        //below code is used for hiding  bottom tab
        props.navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' }, tabBarVisible: false });
        return () =>
            props.navigation.getParent()?.setOptions({ tabBarStyle: undefined, tabBarVisible: undefined });
    }, [navigation, isScreenVisible]);

    const filterClick = (type, value) => {
        console.log('SortedValues::' + JSON.stringify(value))
        if (type == 'SO') {
            setSortedFilterValue(value)
        }
        if (type == 'ST') {
            setStatusFilterValue(value)
        }
        if (type == 'DT') {
            setDateFilterValue(value)
        }
        if (type == 'TP') {
            setTypeFilterValue(value)
        }
        if (type == 'AG') {
            setAgeFilterValue(value)
        }
    }

    const applyFilter = () => {
        let sort = sortedFilterValue;
        let status = '';
        for (let i = 0; i < statusFilterValue.length; i++) {
            if (statusFilterValue[i].checked == true) {
                status = statusFilterValue[i].id
                break
            }
        }
        let from = dateFilterValue.FromDate
        let to = dateFilterValue.ToDate
        let type = '';
        for (let i = 0; i < typeFilterValue.length; i++) {
            if (typeFilterValue[i].checked == true) {
                type = typeFilterValue[i].id
                break
            }
        }
        let age = ageFilterValue.AGE
        let operator = ageFilterValue.Label
        console.log("ApplyFilterData::" + "Sort::" + sort + " Status::" + status 
        + " FromDate::" + from + " ToDate::" + to + " Type::" + type
        + " Age::" + age + " Operator::" + operator)
    }

    const toggleBottomNavigationView = () => {
        //Toggling the visibility state of the bottom sheet
        setVisible(!visible);
    };

    const getPendingData = () => {

        const baseURL = '8901'
        setLoading(true)
        apiInstancelocal(baseURL).get('api/v1/lead-creation-initiation')
            .then((response) => {
                // Handle the response data
                console.log("ResponseDataApi::" + JSON.stringify(response.data));
                setPendingData(response.data)
                setFilteredData(response.data)
                setLoading(false)
                // const decodedToken = jwtDecode(response.data.jwtToken);
                // console.log("LoginJWTDecode::" + JSON.stringify(decodedToken));
            })
            .catch((error) => {
                // Handle the error
                setLoading(false)
                console.error("ErrorDataApi::" + error);
            });
    }

    const handleclick = (value, index) => {
        //alert(JSON.stringify(value))
        if (value.name == 'Filter') {
            setVisible(true)
        } else {
            alert('Please go..tata bye')
        }
    }

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

    const listView = ({ item }) => {

        return (
            <View>
                <TouchableOpacity onPress={() => props.navigation.navigate('LeadDetails', { leadData: item })} activeOpacity={0.9}>
                    <View style={{
                        width: '92%', margin: 13, backgroundColor: 'white',
                        elevation: 4, borderRadius: 8, paddingHorizontal: 0,
                        shadowColor: 'black',
                        shadowOpacity: 0.2,
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        }, alignItems: 'center'
                    }}>

                        <View style={{ width: '100%', flexDirection: 'row', marginTop: 13 }}>
                            <View style={{ width: '60%', flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ color: Colors.black, fontSize: 14, fontWeight: '100', marginLeft: 20 }}>{language[0][props.language].str_leadapprovalstatus}</Text>
                            </View>
                            <View style={{ width: '40%', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                                <View style={styles.pendingbackground}>
                                    <Text style={{ color: Colors.black, fontSize: 14, fontWeight: '100' }}>Pending</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ width: '100%', height: .9, backgroundColor: Colors.line, marginTop: 13 }} />

                        <View style={{ width: '100%', flexDirection: 'row', marginTop: 13, }}>
                            <View style={{ width: '45%' }}>
                                <Text style={{ color: Colors.dimText, fontSize: 13, fontWeight: '400', marginLeft: 26 }}>{language[0][props.language].str_customername}</Text>
                            </View>
                            <View style={{ width: '55%' }}>
                                <Text style={{ color: Colors.black, fontSize: 13, fontWeight: '400' }}>:  {item.leadCreationBasicDetails.firstName} {item.leadCreationBasicDetails.middleName} {item.leadCreationBasicDetails.lastName}</Text>
                            </View>
                        </View>
                        <View style={{ width: '100%', flexDirection: 'row', marginTop: 11, }}>
                            <View style={{ width: '45%' }}>
                                <Text style={{ color: Colors.dimText, fontSize: 13, fontWeight: '400', marginLeft: 26 }}>{language[0][props.language].str_leadid}</Text>
                            </View>
                            <View style={{ width: '55%' }}>
                                <Text style={{ color: Colors.black, fontSize: 13, fontWeight: '400' }}>:  {item.leadNumber}</Text>
                            </View>
                        </View>
                        <View style={{ width: '100%', flexDirection: 'row', marginTop: 11, }}>
                            <View style={{ width: '45%' }}>
                                <Text style={{ color: Colors.dimText, fontSize: 13, fontWeight: '400', marginLeft: 26 }}>{language[0][props.language].str_leadtype}</Text>
                            </View>
                            <View style={{ width: '55%' }}>
                                <Text style={{ color: Colors.black, fontSize: 13, fontWeight: '400' }}>:  Hot</Text>
                            </View>
                        </View>
                        <View style={{ width: '100%', flexDirection: 'row', marginTop: 11, }}>
                            <View style={{ width: '45%' }}>
                                <Text style={{ color: Colors.dimText, fontSize: 13, fontWeight: '400', marginLeft: 26 }}>{language[0][props.language].str_creationdate}</Text>
                            </View>
                            <View style={{ width: '55%' }}>
                                <Text style={{ color: Colors.black, fontSize: 13, fontWeight: '400' }}>:  15-09-2023</Text>
                            </View>
                        </View>
                        <View style={{ width: '100%', flexDirection: 'row', marginTop: 11, }}>
                            <View style={{ width: '45%' }}>
                                <Text style={{ color: Colors.dimText, fontSize: 13, fontWeight: '400', marginLeft: 26 }}>{language[0][props.language].str_completiondate}</Text>
                            </View>
                            <View style={{ width: '55%' }}>
                                <Text style={{ color: Colors.black, fontSize: 13, fontWeight: '400' }}>:  </Text>
                            </View>
                        </View>
                        <View style={{ width: '100%', flexDirection: 'row', marginTop: 11, }}>
                            <View style={{ width: '45%' }}>
                                <Text style={{ color: Colors.dimText, fontSize: 13, fontWeight: '400', marginLeft: 26 }}>{language[0][props.language].str_ageing}</Text>
                            </View>
                            <View style={{ width: '55%' }}>
                                <Text style={{ color: Colors.black, fontSize: 13, fontWeight: '400' }}>:  0</Text>
                            </View>
                        </View>
                        <View style={{ width: '100%', height: 5, backgroundColor: Colors.pendingBorder, marginTop: 13, borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }} />


                    </View>
                </TouchableOpacity>
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
                    const name = item.leadCreationBasicDetails.firstName + item.leadCreationBasicDetails.middleName + item.leadCreationBasicDetails.lastName
                    const itemData = name
                        ? name.toUpperCase()
                        : ''.toUpperCase();
                    const itemDataID = item.leadNumber
                        ? item.leadNumber.toString()
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

    return (

        <View style={{ flex: 1, backgroundColor: '#fefefe' }}>
            <MyStatusBar backgroundColor={'white'} barStyle="dark-content" />
            {loading ? <Loading /> : null}
            <View style={styles.headerView}>

                <Modal
                    isVisible={bottomLeadSheetVisible}
                    onBackdropPress={hideBottomSheet}
                    backdropOpacity={0}
                    style={styles.modal}
                >
                    <View style={styles.modalContent}>
                        <View style={{ alignItems: 'center' }}>


                            <View style={{ width: '100%', height: 30 }}>
                                <TextComp textVal={"Lead ID Created"} textStyle={{ fontSize: 14, color: Colors.white, lineHeight: 20 }} Visible={false} />
                            </View>


                        </View>


                    </View>
                </Modal>

                <View style={{
                    width: '100%', height: 56, alignItems: 'center', justifyContent: 'center',
                    flexDirection: 'row'
                }}>
                    <TouchableOpacity onPress={() => props.navigation.navigate('HomeScreen')} style={{ width: '15%', height: 56, alignItems: 'center', justifyContent: 'center' }}>
                        <View >

                            <Entypo name='chevron-left' size={25} color='#4e4e4e' />

                        </View>
                    </TouchableOpacity>
                    <View style={{ width: '85%', height: 56, justifyContent: 'center' }}>
                        <Text style={{ fontSize: 18, color: '#000', fontWeight: '400' }}>{language[0][props.language].str_leadmanagement}</Text>
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
                                            <Image source={require('../../../Images/filter.png')}
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
                        placeholder={'Search for Name or Lead ID'}
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
                                        <TouchableOpacity onPress={() => updateMainFilteredData(item, index)} activeOpacity={0.5}>
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
                                <SortByComp props={props} filterClick={filterClick} />
                            }

                            {filterVisible === 'ST' &&
                                <StatusComp props={props} statusData={statusDataArr} filterClick={filterClick} />
                            }

                            {filterVisible === 'DT' &&
                                <DateComp props={props} filterClick={filterClick} />
                            }

                            {filterVisible === 'TP' &&
                                <TypeComp props={props} typeData={typeDataArr} filterClick={filterClick} />
                            }

                            {filterVisible === 'AG' &&
                                <AgeingComp props={props} filterClick={filterClick} />
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
                    <TouchableOpacity activeOpacity={10} onPress={applyFilter} style={{
                        width: '40%', height: 45, backgroundColor: Colors.darkblue, alignItems: 'center', justifyContent: 'center', marginRight: 20,
                        borderRadius: 25
                    }}>
                        <View>
                            <TextComp textStyle={{ marginTop: 0, fontSize: 14, color: Colors.white, marginLeft: 3 }} textVal={language[0][props.language].str_apply} Visible={false}></TextComp>
                        </View>
                    </TouchableOpacity>

                </View>
            </BottomSheet>
            <FAB
                icon="plus"
                color={Colors.white}
                style={styles.fab}
                label='Create New Lead'
                onPress={() => props.navigation.navigate('LeadCreationBasic')}
            />

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


export default connect(mapStateToProps, mapDispatchToProps)(LeadManagement);

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
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: Colors.darkblue,
        borderRadius: 30
    },
    modal: {
        justifyContent: 'flex-end',
        margin: 10,
    },
    modalContent: {
        backgroundColor: '#362F2F',
        padding: 16,
        borderRadius: 10,
    },

});