import React, { useEffect, useState, forwardRef } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, FlatList, ScrollView } from 'react-native';
import Colors from '../Utils/Colors';
import ImageComp from './ImageComp';
import TextComp from './TextComp';
import Entypo from 'react-native-vector-icons/Entypo';
import Common from '../Utils/Common';
import { connect } from 'react-redux';

const ChargeModal = (props) => {

    const [totalFinalChargeAmount, setTotalFinalChargeAmount] = React.useState(0);
    const [leadsystemCodeDetail, setLeadSystemCodeDetail] = useState(props.mobilecodedetail.leadSystemCodeDto);

    useEffect(() => {

        const totalFinalChargeAmount = props.data.reduce((sum, item) => parseFloat(sum) + parseFloat(item.finalChargeAmount), 0);

        setTotalFinalChargeAmount(totalFinalChargeAmount.toString());
    }, [props.data]);

    return (
        <Modal
            visible={props.isVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={props.onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>

                    <View style={{ width: '85%', alignSelf: 'center', flexDirection: 'row' }}>

                        <View style={{ width: '65%', marginTop: 15, marginBottom: 15 }}>
                            <Text style={{ color: Colors.darkblack, fontSize: 12.5, fontFamily: 'Poppins-Bold' }}>Total Charges</Text>
                        </View>

                        <TouchableOpacity onPress={() => props.onClose()} style={{ width: '43%', alignItems: 'flex-end', justifyContent: 'center' }}>
                            <View >

                                <Entypo name='cross' size={23} color={Colors.darkblack} />

                            </View>
                        </TouchableOpacity>


                    </View>
                    <ScrollView style={{ marginBottom: 30 }} horizontal>
                        <View style={{ flexDirection: 'column' }}>
                            <View style={[styles.item, { alignItems: 'center' }]}>
                                <Text style={{ width: 120, marginLeft: 15, textAlign: 'center', color: Colors.mediumgrey, fontSize: 12, fontFamily: 'Poppins-Medium' }}>Charge Type</Text>
                                <Text style={{ width: 120, marginLeft: 15, textAlign: 'center', color: Colors.mediumgrey, fontSize: 12, fontFamily: 'Poppins-Medium' }}>Amount</Text>
                                <Text style={{ width: 120, marginLeft: 15, textAlign: 'center', color: Colors.mediumgrey, fontSize: 12, fontFamily: 'Poppins-Medium' }}>GST Charges</Text>
                                <Text style={{ width: 120, marginLeft: 15, textAlign: 'center', color: Colors.mediumgrey, fontSize: 12, fontFamily: 'Poppins-Medium' }}>Total</Text>
                                <Text style={{ width: 120, marginLeft: 15, textAlign: 'center', color: Colors.mediumgrey, fontSize: 12, fontFamily: 'Poppins-Medium' }}>Charge Treatment</Text>
                            </View>
                            <View style={styles.container}>
                                {props.data?.map(item => (

                                    <View key={item.key} style={[styles.item, { alignItems: 'center' }]}>
                                        <Text style={{ width: 120, marginLeft: 15, textAlign: 'center', color: Colors.mediumgrey, fontSize: 12, fontFamily: 'Poppins-Medium' }}>{item.chargeDescription}</Text>
                                        <Text style={{ width: 120, marginLeft: 15, textAlign: 'center', color: Colors.mediumgrey, fontSize: 12, fontFamily: 'Poppins-Medium' }}>{item.chargeAmount}</Text>
                                        <Text style={{ width: 120, marginLeft: 15, textAlign: 'center', color: Colors.mediumgrey, fontSize: 12, fontFamily: 'Poppins-Medium' }}>{item.taxAmount}</Text>
                                        <Text style={{ width: 120, marginLeft: 15, textAlign: 'center', color: Colors.mediumgrey, fontSize: 12, fontFamily: 'Poppins-Medium' }}>{item.finalChargeAmount}</Text>
                                        <Text style={{ width: 120, marginLeft: 15, textAlign: 'center', color: Colors.mediumgrey, fontSize: 12, fontFamily: 'Poppins-Medium' }}>{Common.getSystemCodeDescription(props.mobilecodedetail.leadSystemCodeDto, 'PAYMENT_TYPE', item.paymentType)}</Text>
                                    </View>
                                ))}
                            </View>

                            <View style={{ width: '100%', alignSelf: 'center', minHeight: 40, flexDirection: 'row', backgroundColor: '#EDF7FF', marginTop: 5, alignItems: 'center', justifyContent: 'center' }}>

                                {/* <View style={{ width: '65%', textAlign: 'center', }}>
                                    <Text style={{ color: Colors.darkblack, fontSize: 12.5, fontFamily: 'Poppins-Bold' }}>Total</Text>
                                </View> */}

                                <View style={[styles.item, { alignItems: 'center' }]}>
                                    <Text style={{ width: 120, marginLeft: 15, textAlign: 'center', color: Colors.darkblack, fontSize: 12, fontFamily: 'Poppins-Bold' }}>Total</Text>
                                    <Text style={{ width: 120, marginLeft: 15, textAlign: 'center', color: Colors.mediumgrey, fontSize: 12, fontFamily: 'Poppins-Medium' }}></Text>
                                    <Text style={{ width: 120, marginLeft: 15, textAlign: 'center', color: Colors.mediumgrey, fontSize: 12, fontFamily: 'Poppins-Medium' }}></Text>
                                    <Text style={{ width: 120, marginLeft: 15, textAlign: 'center', color: Colors.darkblack, fontSize: 12, fontFamily: 'Poppins-Bold' }}>{totalFinalChargeAmount}</Text>
                                    <Text style={{ width: 120, marginLeft: 15, textAlign: 'center', color: Colors.mediumgrey, fontSize: 12, fontFamily: 'Poppins-Medium' }}></Text>
                                </View>


                            </View>

                        </View>


                    </ScrollView>
                </View>
            </View>
        </Modal>
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
        padding: 10,
        borderRadius: 20,
        alignItems: 'center',
    },
    closeButton: {
        width: '100%',
        marginTop: 10,
        padding: 10,
        alignItems: 'flex-end', justifyContent: 'flex-end'
    },
    container: {
        flexDirection: 'column',
    },
    item: {
        minHeight: 40,
        backgroundColor: '#EDF7FF',
        flexDirection: 'row',
        marginTop: 5
    },
});

const mapStateToProps = (state) => {
    const { language } = state.languageReducer;
    const { profileDetails } = state.profileReducer;
    const { mobileCodeDetails } = state.mobilecodeReducer;
    const { loanInitiationDetails } = state.loanInitiationReducer;
    return {
        language: language,
        profiledetail: profileDetails,
        mobilecodedetail: mobileCodeDetails,
        loanInitiationDetails: loanInitiationDetails
    }
}



export default connect(mapStateToProps)(ChargeModal);
