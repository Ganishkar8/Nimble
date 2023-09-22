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

const Test = (props, { navigation }) => {






    useEffect(() => {

    }, []);



    return (

        <View style={{ flex: 1, backgroundColor: '#fefefe', alignItems: 'center', justifyContent: 'center' }}>
            <Text>hi</Text>

            <View style={[styles.textColor, { width: '100%', height: 100, backgroundColor: '#000000' }]}>

            </View>

        </View>
    );
};



export default Test;

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
        width: '90%'
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