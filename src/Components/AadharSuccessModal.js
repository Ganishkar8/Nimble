import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from '../Utils/Colors';
import ImageComp from './ImageComp';

const AadharSuccessModal = ({ isVisible, onClose, textContent, textClose, textMainContent, textViewContent, proceedClick }) => {

    const onClick = (value) => {
        if (value === 'proceed') {
            proceedClick(value)
        }else {
            proceedClick(value)
        }
    };
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

                        <ImageComp imageSrc={require('../Images/successanim.gif')} imageStylee={{ width: 100, height: 100, resizeMode: 'contain' }} />

                    </View>
                    <Text style={{ color: Colors.black, fontWeight: 500 }}>{textContent}</Text>

                    <View style={{
                        width: 180, height: 50, borderColor: Colors.dimblack, borderRadius: 25, borderWidth: 1
                        , alignItems: 'center', justifyContent: 'center', marginTop: 15
                    }}>
                        <Text style={{ color: Colors.darkblue, fontWeight: 500 }}>{textViewContent}</Text>
                    </View>

                    <View style={{ margin: 20 }}>
                        <Text style={{ color: Colors.dimblack }}>{textMainContent}</Text>
                    </View>

                    <TouchableOpacity onPress={()=>onClick('proceed')} style={styles.closeButton}>
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

export default AadharSuccessModal;