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
} from 'react-native';

import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import apiInstance from '../Utils/apiInstance';

const data = [

    { name: 'Filter' },
    { name: 'Sort by' },
    { name: 'Draft' },
    { name: 'Rejected' }
]

const LoanApplicationTracker = ({ }) => {

    const [click, setClick] = useState('');
    const [search, setSearch] = useState('');
    const [pendingData, setPendingData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        getPendingData()
    }, []);

    const getPendingData = () => {
        const appDetails = {
            "isActive": true
        }
        const baseURL = '8101'
        apiInstance(baseURL).post('/api/v1/cases?page=0&size=20', appDetails)
            .then((response) => {
                // Handle the response data
                console.log("ResponseDataApi::" + JSON.stringify(response.data));
                setPendingData(response.data.content)
                setFilteredData(response.data.content)
                // const decodedToken = jwtDecode(response.data.jwtToken);
                // console.log("LoginJWTDecode::" + JSON.stringify(decodedToken));
            })
            .catch((error) => {
                // Handle the error
                console.error("ErrorDataApi::" + error);
            });
    }

    const handleclick = (value, index) => {
        setClick(value.name)
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
                            <Text style={{ color: '#707070', fontSize: 13, fontWeight: '500', marginTop: 5 }}>{item.status}</Text>
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
                    return ((itemData.indexOf(textData) > -1)||(itemDataID.indexOf(textData) > -1));
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

        <View style={styles.container}>
            <StatusBar backgroundColor='#fff' barStyle="dark-content" />

            <View style={styles.headerView}>

                <View style={{
                    width: '100%', height: 56, alignItems: 'center', justifyContent: 'center',
                    flexDirection: 'row'
                }}>
                    <View style={{ width: '15%', height: 56, alignItems: 'center', justifyContent: 'center' }}>
                        <Entypo name='chevron-left' size={25} color='#4e4e4e' />
                    </View>
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

            <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', marginTop: 10, }}>
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
            {filteredData.length > 0 ?
                (<View style={{ width: '100%', justifyContent: 'center', marginBottom: 200 }}>
                    <FlatList
                        data={filteredData}
                        renderItem={listView}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>) :
                <View style={{ width: '100%', justifyContent: 'center', marginTop: 100, alignItems: 'center' }}>
                    <Text style={{ color: '#707070', fontSize: 13, fontWeight: '500', marginTop: 5 }}>Loading...</Text>
                </View>
            }


        </View>
    );
};

export default LoanApplicationTracker;

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

    textColor: {
        color: '#000',
        fontSize: 14,
        fontWeight: '400'
    },

});