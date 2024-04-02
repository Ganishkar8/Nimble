import React, { useState, useEffect } from 'react';
import { Text, TextInput, View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ModalContainer from './ModalContainer';
import { connect, useDispatch, useSelector } from 'react-redux';
import Common from '../Utils/Common';
import Colors from '../Utils/Colors';

const SearchDropDownComp = (props) => {

    const [search, setSearch] = useState('');
    const [filteredData, setFilteredData] = useState(props.dropDownData);
    const [nonFilteredData, setNonFilteredData] = useState(props.dropDownData);
    const [dropdownValue, setDropdownValue] = useState();
    const userCodeDetail = useSelector(state => state.mobilecodeReducer.leadUserCodeDto);

    useEffect(() => {

        if (props.dropDownData) {
            setFilteredData(props.dropDownData)
            setNonFilteredData(props.dropDownData)
        }
    }, [props.dropDownData]);


    const searchFilterFunction = (text) => {

        if (text) {
            const newData = nonFilteredData.filter(
                function (item) {

                    const itemData = item.Description
                        ? item.Description.toUpperCase()
                        : ''.toUpperCase();
                    const regex = /^[0-9]+$/;
                    let textData = ''
                    if (regex.test(text)) {
                        textData = text
                        if (global.DEBUG_MODE) console.log("String consists of only numbers.");
                    } else {
                        textData = text.toUpperCase();
                        if (global.DEBUG_MODE) console.log("String contains non-numeric characters.");
                    }

                    return ((itemData.indexOf(textData) > -1));
                });
            setFilteredData(newData);
            setSearch(text);
        } else {
            setFilteredData(nonFilteredData);
            setSearch(text);
        }
    };

    const listView = ({ item }) => {

        return (
            <View>
                <TouchableOpacity onPress={() => { props.getDropDownSubcodeId(item.subCodeId); setSearch(''); setFilteredData(nonFilteredData) }} activeOpacity={0.9}>
                    <View style={{
                        width: '100%', margin: 13, backgroundColor: 'white',
                        alignItems: 'center'
                    }}>


                        <View style={{ width: '100%', flexDirection: 'row', }}>

                            <Text style={{ color: Colors.black, fontSize: 13, fontFamily: 'Poppins-Medium' }}>{item.Description}</Text>

                        </View>

                    </View>
                    <View style={{ width: '100%', height: .9, backgroundColor: Colors.line, marginTop: 5 }} />

                </TouchableOpacity>
            </View>

        )
    }

    return (

        <ModalContainer
            visible={props.dropDownSearchVisible}
            closeModal={props.closeSearchModal}
            modalstyle={styles.modalContent}
            contentComponent={
                <View style={{ flex: 1 }}>

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
                                onChangeText={search => {
                                    searchFilterFunction(search)

                                }}
                                placeholder={'Search By Name or ID'}
                                placeholderTextColor={'gray'}
                                keyboardType='default'
                                secureTextEntry={false}
                                autoCapitalize="none"
                                style={{
                                    width: '80%',
                                    height: 44,
                                    fontSize: 14.4,
                                    color: Colors.black,
                                    fontFamily: 'PoppinsRegular'
                                }}
                            />
                            <Ionicons name="search" style={{ marginStart: 32 }} size={20} color={'#aaaaaa'} />
                        </View>
                    </View>
                    <View style={{ width: '100%', marginBottom: 60, justifyContent: 'center' }}>
                        <FlatList

                            data={filteredData}
                            renderItem={listView}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>

                </View>
            }
        />
    );
};

const styles = StyleSheet.create({

    modalContent: {
        width: '90%',  // Set width to 90% of the screen width
        aspectRatio: 1,
        backgroundColor: 'white',
        padding: 10,
        margin: 10,
        borderRadius: 20,
        alignItems: 'center',
    },

});

export default SearchDropDownComp;