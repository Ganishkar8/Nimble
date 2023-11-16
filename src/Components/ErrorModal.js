import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from '../Utils/Colors';
import ImageComp from './ImageComp';

const ErrorModal = ({ isVisible, onClose, textContent, textClose }) => {
    return (
        <Modal
            visible={isVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>

                    <View style={{ justifyContent: 'flex-start' }}>

                        <Text style={{ color: Colors.black, fontSize: 18, fontFamily: 'Poppins-Medium' }}>Try Again</Text>

                    </View>
                    <Text style={{ color: Colors.dimblack, marginTop: 25, fontFamily: 'Poppins-Medium' }}>{textContent}</Text>

                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                        <Text style={{ color: Colors.darkblue, fontFamily: 'Poppins-SemiBold', fontSize: 14 }}>{textClose.toUpperCase()}</Text>
                    </TouchableOpacity>
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
        padding: 20,
        borderRadius: 8,

    },
    closeButton: {
        width: '100%',
        marginTop: 10,
        padding: 10,
        alignItems: 'flex-end', justifyContent: 'flex-end'
    },
});

export default ErrorModal;