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


const PANModal = props => {


    React.useEffect(() => {
        //updateAgeData(formattedServerDatee, formattedServerDatee)


    }, []);

    return (
        <Modal
            visible={props.isVisible}
            animationType="slide"
            transparent={true}
        >
            <View style={styles.modalContainer}>

                <View style={styles.modalContent}>

                    <TouchableOpacity onPress={() => props.onClose('Cancel', [])} style={{ alignSelf: 'flex-end' }}>
                        <View >

                            <Entypo name='cross' size={23} color={Colors.darkblack} />

                        </View>
                    </TouchableOpacity>

                    <ScrollView>

                        <View style={{ flex: 1 }}>

                            <View style={{ width: '100%', marginTop: 5 }}>


                                <Text style={[{ color: Colors.black, fontFamily: 'Poppins-Medium', fontSize: 12, marginTop: 5 }]}>
                                    Status of the PAN
                                </Text>

                                <Text style={[{ color: Colors.mediumgrey, fontFamily: 'Poppins-Medium', fontSize: 12, marginTop: 5 }]}>
                                    {props?.panDetails?.status}
                                </Text>

                                <Text style={[{ color: Colors.black, fontFamily: 'Poppins-Medium', fontSize: 12, marginTop: 5 }]}>
                                    {`PAN has been tagged as duplicate by Income Tax Department(ITD)`}
                                </Text>

                                <Text style={[{ color: Colors.mediumgrey, fontFamily: 'Poppins-Medium', fontSize: 12, marginTop: 5 }]}>
                                    {props?.panDetails?.duplicate ? 'Yes' : '-'}
                                </Text>

                                <Text style={[{ color: Colors.black, fontFamily: 'Poppins-Medium', fontSize: 12, marginTop: 5 }]}>
                                    {`Given Name matches with the ITD Records`}
                                </Text>

                                <Text style={[{ color: Colors.mediumgrey, fontFamily: 'Poppins-Medium', fontSize: 12, marginTop: 5 }]}>
                                    {props?.panDetails?.nameMatch ? 'Yes' : 'No'}
                                </Text>

                                <Text style={[{ color: Colors.black, fontFamily: 'Poppins-Medium', fontSize: 12, marginTop: 5 }]}>
                                    {`Given DOB matches with the ITD Records`}
                                </Text>

                                <Text style={[{ color: Colors.mediumgrey, fontFamily: 'Poppins-Medium', fontSize: 12, marginTop: 5 }]}>
                                    {props?.panDetails?.dobMatch ? 'Yes' : 'No'}
                                </Text>


                            </View>

                        </View>
                    </ScrollView>

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

export default connect(mapStateToProps)(PANModal);

//export default DedupeModal;