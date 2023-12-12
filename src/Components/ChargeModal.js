import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, FlatList, ScrollView } from 'react-native';
import Colors from '../Utils/Colors';
import ImageComp from './ImageComp';
import TextComp from './TextComp';

const ChargeModal = ({ isVisible, onClose, data }) => {
    return (
        <Modal
            visible={isVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>

                    <View style={{ width: '85%', alignSelf: 'center', flexDirection: 'row' }}>

                        <View style={{ width: '65%', marginTop: 15, marginBottom: 15 }}>
                            <Text style={{ color: Colors.mediumgrey, fontSize: 12.5, fontFamily: 'Poppins-Medium' }}>Total Charges</Text>
                        </View>



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
                                {data.map(item => (

                                    <View key={item.key} style={[styles.item, { alignItems: 'center' }]}>
                                        <Text style={{ width: 120, marginLeft: 15, textAlign: 'center', color: Colors.mediumgrey, fontSize: 12, fontFamily: 'Poppins-Medium' }}>{item.chargeDescription}</Text>
                                        <Text style={{ width: 120, marginLeft: 15, textAlign: 'center', color: Colors.mediumgrey, fontSize: 12, fontFamily: 'Poppins-Medium' }}>{item.chargeAmount}</Text>
                                        <Text style={{ width: 120, marginLeft: 15, textAlign: 'center', color: Colors.mediumgrey, fontSize: 12, fontFamily: 'Poppins-Medium' }}>{item.chargeAmount}</Text>
                                        <Text style={{ width: 120, marginLeft: 15, textAlign: 'center', color: Colors.mediumgrey, fontSize: 12, fontFamily: 'Poppins-Medium' }}>{item.chargeAmount}</Text>
                                        <Text style={{ width: 120, marginLeft: 15, textAlign: 'center', color: Colors.mediumgrey, fontSize: 12, fontFamily: 'Poppins-Medium' }}>{item.chargeAmount}</Text>
                                    </View>
                                ))}
                            </View>

                            <View style={{ width: '100%', alignSelf: 'center', minHeight: 40, flexDirection: 'row', backgroundColor: '#EDF7FF', marginTop: 5, alignItems: 'center', justifyContent: 'center' }}>

                                <View style={{ width: '65%', textAlign: 'center', }}>
                                    <Text style={{ color: Colors.darkblack, fontSize: 12.5, fontFamily: 'Poppins-Bold' }}>Total</Text>
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
        flexDirection: 'row',
    },
    item: {
        minHeight: 40,
        backgroundColor: '#EDF7FF',
        flexDirection: 'row',
        marginTop: 5
    },
});

export default ChargeModal;