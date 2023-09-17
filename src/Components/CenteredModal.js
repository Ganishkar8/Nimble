import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from '../Utils/Colors';
import ImageComp from './ImageComp';

const CenteredModal = ({ isVisible, onClose, textContent, textClose }) => {
    return (
        <Modal
            visible={isVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>

                    <View style={{ minHeight: 150, justifyContent: 'center' }}>

                        <ImageComp imageSrc={require('../Images/locationanim.gif')} imageStylee={{ width: 50, height: 50, resizeMode: 'contain' }} />

                    </View>
                    <Text style={{ color: Colors.black }}>{textContent}</Text>

                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                        <Text style={{ color: Colors.darkblue }}>{textClose}</Text>
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
        borderRadius: 20,
        alignItems: 'center',
    },
    closeButton: {
        width: '100%',
        marginTop: 10,
        padding: 10,
        alignItems: 'flex-end', justifyContent: 'flex-end'
    },
});

export default CenteredModal;