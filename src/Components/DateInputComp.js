import React from 'react';
import { TextInput, View, TouchableOpacity } from 'react-native';
import Colors from '../Utils/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';

const DateInputComp = ({ textValue, textStyle, Disable, type, ComponentName, reference, returnKey, handleClick, handleReference, minDate, maxDate }) => {

    const [mydate, setDate] = React.useState(new Date());
    const [date, setDatee] = React.useState(textValue);
    const [displaymode, setMode] = React.useState('date');
    const [isDisplayDate, setShow] = React.useState(false);
    React.useEffect(() => {
        const currentDate = new Date();

        // Extract the components of the current date
        const day = currentDate.getDate().toString().padStart(2, '0');
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Note: Months are 0-indexed, so we add 1.
        const year = currentDate.getFullYear();
        const formattedDatee = `${day}-${month}-${year}`;
        setDatee(textValue)
    }, [textValue]);

    const displayDatepicker = () => {
        showMode('date');
    };
    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const changeSelectedDate = (event, selectedDate) => {
        setShow(false);
        if (event.type == 'set') {
            const currentDate = selectedDate || mydate;
            console.log("SelectedDate::" + currentDate)
            const date = new Date(currentDate);
            setDate(date)
            // Get day, month, and year components from the Date object
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Note: Months are 0-indexed, so we add 1.
            const year = date.getFullYear();

            // Create the formatted date string
            const formattedDate = `${day}-${month}-${year}`;
            console.log("FormattedDate::" + formattedDate)
            console.log("Event::" + JSON.stringify(event))
            //setDatee(formattedDate);
            handleClick(ComponentName, formattedDate);
        }
    };
    const setValue = txt => {
        handleTextChange(txt)
    };

    const handleTextChange = (input) => {
        const numericInput = input.replace(/\D/g, '');

        // Insert slashes while typing
        let formattedDate = '';
        for (let i = 0; i < numericInput.length; i++) {
            if (i === 2 || i === 4) {
                formattedDate += '-';
            }
            formattedDate += numericInput[i];
        }
        handleClick(ComponentName, formattedDate);
        setDatee(formattedDate)
    };

    return (
        <View style={{ width: '90%', }}>

            <View style={{ flexDirection: 'row' }}>
                <TextInput
                    value={date}
                    onChangeText={txt => { setValue(txt) }}
                    placeholder={''}
                    editable={false}
                    placeholderTextColor={Colors.lightgrey}
                    secureTextEntry={false}
                    keyboardType={type}
                    style={textStyle}
                    ref={reference}
                    returnKeyType={returnKey}
                    onSubmitEditing={() => { handleReference(ComponentName) }}
                />
                <TouchableOpacity style={{ alignItems: 'flex-end' }} activeOpacity={2} onPress={() => {
                    if (!Disable) {
                        displayDatepicker();
                    }
                }}>
                    <Ionicons name='calendar-clear-outline' size={22} color={Disable ? Colors.lightgrey : Colors.darkblue} style={{ marginTop: 12 }} />
                </TouchableOpacity>
            </View>
            <View style={{ width: '98%', height: 0.9, backgroundColor: Colors.line }} />
            {isDisplayDate && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={mydate}
                    mode={displaymode}
                    is24Hour={true}
                    display="default"
                    onChange={changeSelectedDate}
                    maximumDate={maxDate}
                    minimumDate={minDate ? minDate : new Date(1900, 0, 1)}

                />
            )}
        </View>
    );
};

export default DateInputComp;
