import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
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

const DedupeModal = props => {

    const setValue = (ComponentName, txt) => {
        props.handleClick(ComponentName, txt);
    };

    const setValue1 = (ComponentName, txt) => {

    };

    return (
        <Modal
            visible={props.isVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={props.onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>

                    <View style={{ width: '100%', marginTop: 19, paddingHorizontal: 0, alignItems: 'center', justifyContent: 'center' }}>

                        <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, flexDirection: 'row' }}>
                            <TextComp textVal={`${language[0][props.language].str_clientdedupecheck}${props.dedupeDetails.remarks ? 'Failed' : ''}`} textStyle={{ width: '90%', color: Colors.darkblack, fontFamily: 'Poppins-Medium', fontSize: 16 }} Visible={false} />

                            <TouchableOpacity onPress={() => props.onClose('Cancel')} style={{ justifyContent: 'center' }}>
                                <View >

                                    <Entypo name='cross' size={23} color={Colors.darkblack} />

                                </View>
                            </TouchableOpacity>
                        </View>

                        {props.dedupeDetails.remarks ? (
                            <View style={{ width: '90%' }}>
                                <Text style={[{ color: Colors.mediumgrey, fontFamily: 'Poppins-Medium', fontSize: 12, marginTop: 5 }]}>
                                    {props.dedupeDetails.remarks.substring(1, props.dedupeDetails.remarks.length - 1).replace('\n, ', '\n')}
                                </Text>
                            </View>
                        ) : (
                            <View style={{ width: '90%' }}>
                                <Text style={[{ color: Colors.lightgrey, fontFamily: 'PoppinsRegular', fontSize: 12 }]}>CLIENT ID - CLIENT NAME - BRANCH</Text>
                                <Text style={[{ color: Colors.mediumgrey, fontFamily: 'Poppins-Medium', fontSize: 12, marginTop: 5 }]}>{props.dedupeDetails.clientExistingDetails ? `${props.dedupeDetails.clientExistingDetails[0].lmsClientId} - ${props.dedupeDetails.clientExistingDetails[0].lmsCustomerName} - ${props.dedupeDetails.clientExistingDetails[0].branchId}` : ''}</Text>
                            </View>
                        )}

                        <View style={{ width: '100%', flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-end', alignSelf: 'flex-end', marginTop: 20 }}>

                            <TouchableOpacity onPress={() => { props.onClose("Proceed") }} style={styles.closeButton}>
                                <Text style={{ color: Colors.darkblue, fontWeight: 500 }}>{language[0][props.language].str_proceed}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => { props.onClose("Reject") }} style={styles.closeButton}>
                                <Text style={{ color: Colors.darkblue, fontWeight: 500 }}>{language[0][props.language].str_reject}</Text>
                            </TouchableOpacity>

                        </View>


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
        backgroundColor: 'white',
        padding: 20,
        aspectRatio: 1.5,
        borderRadius: 10,
        alignItems: 'center',
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