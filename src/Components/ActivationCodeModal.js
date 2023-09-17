import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from '../Utils/Colors';
import ImageComp from './ImageComp';
import TextComp from './TextComp';
import TextInputComp from './TextInputComp';
import Common from '../Utils/Common';
import Commonstyles from '../Utils/Commonstyles';

const ActivationCodeModal = ({ isVisible, onClose, textValue, textValue1, textinputValue, textCancel, textProceed, handleClick }) => {

    const setValue = (ComponentName, txt) => {
        handleClick(ComponentName, txt);
    };

    const setValue1 = (ComponentName, txt) => {

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

                    <View style={{ width: '100%', marginTop: 19, paddingHorizontal: 0, alignItems: 'center', justifyContent: 'center' }}>

                        <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, }}>
                            <TextComp textVal={textValue} textStyle={Commonstyles.inputtextStyle} Visible={false} />
                        </View>

                        <View style={{ width: '90%', marginTop: 25, paddingHorizontal: 0, }}>
                            <TextComp textVal={textValue1} textStyle={Commonstyles.inputtextStyle} Visible={false} />
                        </View>
                        <TextInputComp textValue={textinputValue} textStyle={[Commonstyles.textinputtextStyle, { height: 38 }]} type="numeric" Disable={false} ComponentName='activationCode' returnKey="done" handleClick={setValue} handleReference={setValue1} />

                        <View style={{ width: '100%', flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-end', marginTop: 40 }}>

                            <TouchableOpacity onPress={() => { onClose("Proceed") }} style={styles.closeButton}>
                                <Text style={{ color: Colors.darkblue, fontWeight: 500 }}>{textProceed}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => { onClose("Cancel") }} style={styles.closeButton}>
                                <Text style={{ color: Colors.darkblue, fontWeight: 500 }}>{textCancel}</Text>
                            </TouchableOpacity>

                        </View>


                    </View>

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
        borderRadius: 10,
        alignItems: 'center',
    },
    closeButton: {
        marginTop: 10,
        padding: 10,
        alignItems: 'flex-end', justifyContent: 'flex-end'
    },
});

export default ActivationCodeModal;