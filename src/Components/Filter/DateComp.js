import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import Colors from '../../Utils/Colors';

import { connect } from 'react-redux';
import { languageAction } from '../../Utils/redux/actions/languageAction';
import { language } from '../../Utils/LanguageString';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Commonstyles from '../../Utils/Commonstyles';
import DateTimePicker from '@react-native-community/datetimepicker';

const DateComp = ({ props, filterClick }) => {

    const currentDate = new Date();

    // Extract the components of the current date
    const day = currentDate.getDate().toString().padStart(2, '0');
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Note: Months are 0-indexed, so we add 1.
    const year = currentDate.getFullYear();

    // Create the formatted date string
    const formattedDatee = `${day}/${month}/${year}`;
    const [fromDate, setFromDate] = React.useState(formattedDatee);
    const [toDate, setToDate] = React.useState(formattedDatee);
    const [mydate, setDate] = React.useState(new Date());
    const [mydateTo, setTooDate] = React.useState(new Date());
    const [displaymode, setMode] = React.useState('date');
    const [isDisplayDate, setShow] = React.useState(false);
    const [isDisplayDateTo, setShowTo] = React.useState(false);
    React.useEffect(() => {
        updateAgeData(formattedDatee, formattedDatee)
    }, []);
    const displayDatepicker = (type) => {
        if (type == 1) {
            showMode('date');
        } else {
            showModeTo('date');
        }
    };
    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };
    const showModeTo = (currentMode) => {
        setShowTo(true);
        setMode(currentMode);
    };
    const changeSelectedDate = (event, selectedDate) => {
        const currentDate = selectedDate || mydate;
        console.log("SelectedDate::" + currentDate)
        const date = new Date(currentDate);
        setDate(date)
        setShow(false);

        // Get day, month, and year components from the Date object
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Note: Months are 0-indexed, so we add 1.
        const year = date.getFullYear();

        // Create the formatted date string
        const formattedDate = `${day}/${month}/${year}`;
        console.log("FormattedDate::" + formattedDate)
        console.log("Event::" + JSON.stringify(event))
        updateAgeData(formattedDate, toDate)
        setFromDate(formattedDate);

    };
    const changeSelectedDateTo = (event, selectedDate) => {
        const currentDate = selectedDate || mydate;
        console.log("SelectedDate::" + currentDate)
        const date = new Date(currentDate);
        setTooDate(date);
        setShowTo(false);

        // Get day, month, and year components from the Date object
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Note: Months are 0-indexed, so we add 1.
        const year = date.getFullYear();

        // Create the formatted date string
        const formattedDate = `${day}/${month}/${year}`;
        console.log("FormattedDate::" + formattedDate)
        console.log("Event::" + JSON.stringify(event))
        updateAgeData(fromDate, formattedDate)
        setToDate(formattedDate);

    };


    const updateAgeData = (cdate, tdate) => {
        let data = {
            FromDate: cdate,
            ToDate: tdate
        };
        filterClick('DT', data)
    }
    return (
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
                        <TouchableOpacity onPress={() => displayDatepicker(1)} activeOpacity={10} style={{ width: '10%', marginTop: 8 }}>
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
                        <TouchableOpacity onPress={() => displayDatepicker(2)} activeOpacity={10} style={{ width: '10%', marginTop: 8 }}>
                            <View>
                                <Ionicons name='calendar-clear-outline' size={22} color={Colors.dimText} />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: '80%', height: 1.5, backgroundColor: Colors.line, marginLeft: 4 }} />
                </View>
            </View>
            {isDisplayDate && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={mydate}
                    mode={displaymode}
                    is24Hour={true}
                    display="default"
                    onChange={changeSelectedDate}
                />
            )}
            {isDisplayDateTo && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={mydateTo}
                    mode={displaymode}
                    is24Hour={true}
                    display="default"
                    onChange={changeSelectedDateTo}
                />
            )}
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


export default connect(mapStateToProps, mapDispatchToProps)(DateComp);
