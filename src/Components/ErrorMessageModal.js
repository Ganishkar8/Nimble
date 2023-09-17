import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from '../Utils/Colors';
import ImageComp from './ImageComp';
import Modal from 'react-native-modal';
import TextComp from './TextComp';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const ErrorMessageModal = ({ isVisible, hideBottomSheet, errMsg, textError, textClose }) => {
    return (
        <Modal
            isVisible={isVisible}
            onBackdropPress={hideBottomSheet}
            style={styles.modal}
        >
            <View style={styles.modalContent}>
                <View style={{ alignItems: 'center' }}>

                    <View style={{ width: '100%', flexDirection: 'row', }}>

                        <TextComp textVal={textError} textStyle={{ fontSize: 14, color: Colors.black, fontWeight: 600 }} Visible={false} />

                        <MaterialIcons name='error' size={20} color={Colors.red} />

                    </View>

                    <View style={{ width: '100%', marginTop: 15 }}>
                        <TextComp textVal={errMsg} textStyle={{ fontSize: 14, color: Colors.black, lineHeight: 20 }} Visible={false} />
                    </View>

                    <View style={{ width: '100%', justifyContent: 'flex-end', alignItems: 'flex-end', flexDirection: 'row' }}>

                        <View
                            style={{
                                width: '25%',
                                height: 40,
                                justifyContent: 'flex-end',
                                alignItems: 'center',
                            }}>
                            <TouchableOpacity onPress={hideBottomSheet} activeOpacity={0.5} style={{
                                width: '88%', height: 40, backgroundColor: '#0294ff',
                                borderRadius: 35, alignItems: 'center', justifyContent: 'center'
                            }}>
                                <View >

                                    <TextComp textVal={textClose} textStyle={{ color: Colors.white, fontSize: 15, fontWeight: 600 }} />

                                </View>
                            </TouchableOpacity>
                        </View>

                    </View>

                </View>


            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 16,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
});

export default ErrorMessageModal;