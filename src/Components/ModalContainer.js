import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ModalContainer = ({ visible, closeModal, contentComponent, modalstyle }) => {
    return (
        <Modal visible={visible} transparent animationType="slide" onRequestClose={closeModal}>
            <View style={styles.modalContainer}>
                <View style={modalstyle}>
                    {/* Render the content component */}
                    {contentComponent}

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
        width: '90%',  // Set width to 90% of the screen width
        aspectRatio: 1,
        backgroundColor: 'white',
        padding: 10,
        margin: 10,
        borderRadius: 20,
        alignItems: 'center',
    },
    closeButton: {
        marginTop: 10,
    },
    closeButtonText: {
        color: 'blue',
        fontSize: 16,
    },
    contentContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 1,
    },
});

export default ModalContainer;
