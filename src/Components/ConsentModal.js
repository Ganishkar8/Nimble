import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Colors from '../Utils/Colors';
import ImageComp from './ImageComp';
import { connect } from 'react-redux';
import { languageAction } from '../Utils/redux/actions/languageAction';
import { language } from '../Utils/LanguageString';
import CheckBox from '@react-native-community/checkbox';

const ConsentModal = props => {
    const [isSelected, setSelection] = useState(false);
    return (
        <Modal
            visible={true}
            animationType="slide"
            transparent={true}
            onRequestClose={props.onClose}
        >

            <View style={styles.modalContainer}>

                <View style={styles.modalContent}>
                    <ScrollView style={{}} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" >

                        <Text style={{ color: Colors.black, alignSelf: 'flex-start' }}>{language[0][props.language].str_consentundertaking}</Text>

                        <View>
                            <Text style={{ color: Colors.mediumgrey, marginTop: 20 }}>{props.textContent}</Text>

                        </View>
                    </ScrollView>

                    <View
                        style={{
                            width: '93%',
                            flexDirection: 'row',
                            alignItems: 'center',
                            flexDirection: 'column',
                            marginTop: 15,
                        }}>

                        <View style={{ flexDirection: 'row', width: '100%', }}>
                            <CheckBox
                                value={isSelected}
                                onValueChange={setSelection}
                                tintColors={{ true: Colors.darkblue }}
                            />
                            <Text style={{ color: Colors.black, fontWeight: 800, marginLeft: 4 }}>{language[0][props.language].str_agreeto}
                                <Text style={{ color: Colors.black, fontWeight: 800, marginLeft: 4, textDecorationLine: 'underline', }}> {language[0][props.language].str_privacypolicy}</Text>
                                <Text style={{ color: Colors.black, fontWeight: 800, marginLeft: 4, textDecorationLine: 'underline', }}>, {language[0][props.language].str_termsandcondition}</Text>
                                <Text style={{ color: Colors.black, fontWeight: 800, marginLeft: 4 }}> {language[0][props.language].str_and}</Text>
                                <Text style={{ color: Colors.black, fontWeight: 800, marginLeft: 4, textDecorationLine: 'underline', }}> {language[0][props.language].str_disclaimers}</Text>
                            </Text>
                        </View>

                        <View style={{ width: '93%', justifyContent: 'flex-end', flexDirection: 'row', marginTop: 25 }}>
                            <TouchableOpacity onPress={() => { if (isSelected) { props.nextScreen('Agree') } }} >
                                <Text style={{ color: isSelected ? Colors.darkblue : Colors.dimText, fontWeight: 500 }}>{language[0][props.language].str_agree}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => { props.nextScreen('Cancel') }} >
                                <Text style={{ color: Colors.darkblue, marginLeft: 20, fontWeight: 500 }}>{language[0][props.language].str_cancel}</Text>
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
        width: '95%',
        height: '95%',
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
    scrollView: {
        flex: 1,
        alignSelf: 'center',
    },
    contentContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 1,
    },
});

const mapStateToProps = (state) => {
    const { language } = state.languageReducer;
    return {
        language: language
    }
}

const mapDispatchToProps = (dispatch) => ({
    languageAction: (item) => dispatch(languageAction(item)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ConsentModal);
