import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from '../Utils/Colors';
import ImageComp from './ImageComp';
import TextComp from './TextComp';
import TextInputComp from './TextInputComp';
import Common from '../Utils/Common';
import Commonstyles from '../Utils/Commonstyles';

const BottomToastModal = ({ IsVisible, onClose, textContent }) => {

    return (
        <Modal
            animationType="slide"
            visible={IsVisible}
            transparent={true}
        >
            <View style={styles.leadmodal}>
                <View style={styles.leadmodalContent}>
                    <View style={{ alignItems: 'center' }}>

                        <View style={{ width: '100%', minHeight: 30 }}>
                            <TextComp textVal={textContent} textStyle={{ fontSize: 14, color: Colors.white, lineHeight: 20, fontFamily: 'PoppinsRegular' }} Visible={false} />
                        </View>


                    </View>

                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    leadmodal: {
        flex: 1,
        justifyContent: 'flex-end',
        margin: 10,
    },
    leadmodalContent: {
        backgroundColor: '#362F2F',
        padding: 16,
        borderRadius: 10,
    }
});

export default BottomToastModal;