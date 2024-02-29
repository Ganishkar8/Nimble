import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, FlatList, ScrollView } from 'react-native';
import Colors from '../Utils/Colors';
import ImageComp from './ImageComp';
import TextComp from './TextComp';
import TextInputComp from './TextInputComp';
import Common from '../Utils/Common';
import Commonstyles from '../Utils/Commonstyles';
import { language } from '../Utils/LanguageString';
import { connect } from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { it } from 'react-native-paper-dates';
import CheckBoxComp from './CheckBoxComp';
import CheckBox from '@react-native-community/checkbox';


const DedupeModal = props => {

    const [clientData, setClientData] = React.useState([]);
    const [oneSelected, setOneSelected] = React.useState(false);
    const [selectedItem, setSelectedItem] = React.useState([]);

    const setValue = (ComponentName, txt) => {
        props.handleClick(ComponentName, txt);
    };

    const valueChange = (item) => {
        let fiterStatusPosition = clientData
        for (let i = 0; i < fiterStatusPosition.length; i++) {
            if (fiterStatusPosition[i].lmsClientId == item.lmsClientId) {
                fiterStatusPosition[i].isSelected = !fiterStatusPosition[i].isSelected
            } else {
                fiterStatusPosition[i].isSelected = false;
            }
        }
        const isAtLeastOneSelected = fiterStatusPosition.some(item => item.isSelected);
        setOneSelected(isAtLeastOneSelected);
        if (isAtLeastOneSelected) {
            setSelectedItem(item);
        } else {
            setSelectedItem([]);
        }
        setClientData(fiterStatusPosition)
    }

    React.useEffect(() => {
        //updateAgeData(formattedServerDatee, formattedServerDatee)
        const extraJson = { isSelected: false };
        if (props.dedupeDetails.clientExistingDetails) {
            const updatedList = props.dedupeDetails.clientExistingDetails.map(item => ({ ...item, ...extraJson }));
            setClientData(updatedList);
        }

    }, [props]);

    return (
        <Modal
            visible={props.isVisible}
            animationType="slide"
            transparent={true}
        >
            <View style={styles.modalContainer}>

                <View style={styles.modalContent}>


                    <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, flexDirection: 'row' }}>
                        <TextComp textVal={`${language[0][props.language].str_clientdedupecheck}${props.dedupeDetails.remarks ? 'Failed' : ''}`} textStyle={{ width: '90%', color: Colors.darkblack, fontFamily: 'Poppins-Medium', fontSize: 16 }} Visible={false} />

                        <TouchableOpacity onPress={() => props.onClose('Cancel', [])} style={{ justifyContent: 'center' }}>
                            <View >

                                <Entypo name='cross' size={23} color={Colors.darkblack} />

                            </View>
                        </TouchableOpacity>
                    </View>


                    <ScrollView>

                        <View style={{ flex: 1 }}>

                            <View style={{ width: '100%', marginTop: 19, paddingHorizontal: 0, alignItems: 'center', justifyContent: 'center' }}>

                                {props.dedupeDetails.remarks ? (
                                    <View style={{ width: '90%' }}>
                                        <Text style={[{ color: Colors.mediumgrey, fontFamily: 'Poppins-Medium', fontSize: 12, marginTop: 5 }]}>
                                            {props.dedupeDetails.remarks.substring(1, props.dedupeDetails.remarks.length - 1).replace('\n, ', '\n')}
                                        </Text>
                                    </View>
                                ) : (
                                    <View style={{ width: '100%', marginTop: 15 }}>

                                        <FlatList
                                            data={clientData}
                                            showsHorizontalScrollIndicator={false}
                                            keyExtractor={(item, index) => index.toString()}
                                            renderItem={({ item, index }) => {
                                                return (

                                                    <View style={{ width: '100%', flexDirection: 'row', color: Colors.white, justifyContent: 'center' }}>

                                                        <CheckBox
                                                            value={item.isSelected}
                                                            disabled={false}
                                                            onValueChange={() => { valueChange(item) }}
                                                            color="#000000"
                                                            style={styles.checkbox}
                                                            tintColors={{ true: Colors.darkblue }}
                                                        />

                                                        <View style={{ width: '90%' }}>
                                                            <Text style={[{ color: Colors.lightgrey, fontFamily: 'PoppinsRegular', fontSize: 12 }]}>CLIENT ID - CLIENT NAME - BRANCH</Text>
                                                            <Text style={[{ color: Colors.mediumgrey, fontFamily: 'Poppins-Medium', fontSize: 12, marginTop: 5 }]}>{`${item.lmsClientId} - ${item.lmsCustomerName} - ${item.branchId}`}</Text>
                                                        </View>
                                                        {/* <TouchableOpacity onPress={() => alert('cancel')} style={{ justifyContent: 'center', alignItems: 'center', width: '10%' }}>
                                                    <View >

                                                        <AntDesign name='eye' size={23} color={Colors.darkblue} />

                                                    </View>
                                                </TouchableOpacity> */}
                                                    </View>

                                                )
                                            }}
                                        />

                                    </View>
                                )}


                            </View>

                        </View>
                    </ScrollView>

                    <View style={{ width: '100%', height: 'auto', flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-end', alignSelf: 'flex-end', marginTop: 20, }}>
                        {!(props.dedupeDetails.remarks) && oneSelected &&
                            <TouchableOpacity onPress={() => { props.onClose("Proceed", selectedItem) }} style={styles.closeButton}>
                                <Text style={{ color: Colors.darkblue, fontWeight: 500 }}>{language[0][props.language].str_proceed}</Text>
                            </TouchableOpacity>
                        }

                        <TouchableOpacity onPress={() => { props.onClose("Reject", []) }} style={styles.closeButton}>
                            <Text style={{ color: Colors.darkblue, fontWeight: 500 }}>{language[0][props.language].str_reject}</Text>
                        </TouchableOpacity>

                    </View>


                </View>


            </View>
        </Modal >
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent background
    },
    modalContent: {
        width: '80%',
        height: 'auto',
        maxHeight: '50%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    checkbox: {
        alignSelf: 'center',
        borderColor: Colors.black,
        fontFamily: 'PoppinsRegular'
    },
    closeButton: {
        marginTop: 10,
        padding: 10,
        alignItems: 'flex-end', justifyContent: 'flex-end'
    }, viewStyle: {
        alignItems: 'center',
        paddingHorizontal: 20, marginLeft: 9, marginRight: 4,
        marginBottom: 4,
        marginStart: 12,
        paddingVertical: 5,
        borderWidth: 1,
        borderRadius: 8,
    },
});

const mapStateToProps = (state) => {
    const { language } = state.languageReducer;
    const { profileDetails } = state.profileReducer;
    const { mobileCodeDetails } = state.mobilecodeReducer;
    const { dedupeDetails } = state.profileReducer;
    return {
        language: language,
        profiledetail: profileDetails,
        mobilecodedetail: mobileCodeDetails,
        dedupeDetails: dedupeDetails
    }
}

export default connect(mapStateToProps)(DedupeModal);

//export default DedupeModal;