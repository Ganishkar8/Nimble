import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from '../Utils/Colors';
import ImageComp from './ImageComp';
import TextComp from './TextComp';
import TextInputComp from './TextInputComp';
import Common from '../Utils/Common';
import Commonstyles from '../Utils/Commonstyles';
import { connect } from 'react-redux';
import { languageAction } from '../Utils/redux/actions/languageAction';
import { language } from '../Utils/LanguageString';
import Entypo from 'react-native-vector-icons/Entypo';


const ImageDetailComp = ({ props, isVisible, onClose, fileName, time, geoLocation, fileType }) => {



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

                    <View style={{ width: '100%', alignItems: 'flex-end' }}>
                        <TouchableOpacity onPress={onClose}>
                            <View>
                                <Entypo name='cross' size={25} color={Colors.black} />
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={{ width: '100%', paddingHorizontal: 0, alignItems: 'center', justifyContent: 'center' }}>

                        <View style={{ width: '100%', paddingHorizontal: 0, }}>
                            <TextComp textVal={language[0][props.language].str_details} textStyle={{ color: Colors.black, fontWeight: 500, fontSize: 17 }} Visible={false} />
                        </View>

                        <View style={{ width: '100%', flexDirection: 'row', marginTop: 20 }}>
                            <View style={{ width: '40%', marginTop: 3, paddingHorizontal: 0, }}>
                                <TextComp textVal={language[0][props.language].str_fileName} textStyle={Commonstyles.inputtextStyle} Visible={false} />
                            </View>
                            <View style={{ width: '60%', marginTop: 3, paddingHorizontal: 0, }}>
                                <TextComp textVal={fileName} textStyle={Commonstyles.inputtextStyle} Visible={false} />
                            </View>
                        </View>

                        <View style={{ width: '100%', flexDirection: 'row', marginTop: 7 }}>
                            <View style={{ width: '40%', marginTop: 3, paddingHorizontal: 0, }}>
                                <TextComp textVal={language[0][props.language].str_time} textStyle={Commonstyles.inputtextStyle} Visible={false} />
                            </View>
                            <View style={{ width: '60%', marginTop: 3, paddingHorizontal: 0, }}>
                                <TextComp textVal={`${Common.formatDate(time)} ${Common.formatTime(time)}`} textStyle={Commonstyles.inputtextStyle} Visible={false} />
                            </View>
                        </View>

                        <View style={{ width: '100%', flexDirection: 'row', marginTop: 7 }}>
                            <View style={{ width: '40%', marginTop: 3, paddingHorizontal: 0, }}>
                                <TextComp textVal={language[0][props.language].str_geolocation} textStyle={Commonstyles.inputtextStyle} Visible={false} />
                            </View>
                            <View style={{ width: '60%', marginTop: 3, paddingHorizontal: 0, }}>
                                <TextComp textVal={geoLocation} textStyle={Commonstyles.inputtextStyle} Visible={false} />
                            </View>
                        </View>

                        <View style={{ width: '100%', flexDirection: 'row', marginTop: 7, marginBottom: 50 }}>
                            <View style={{ width: '40%', marginTop: 3, paddingHorizontal: 0, }}>
                                <TextComp textVal={language[0][props.language].str_filetype} textStyle={Commonstyles.inputtextStyle} Visible={false} />
                            </View>
                            <View style={{ width: '60%', marginTop: 3, paddingHorizontal: 0, }}>
                                <TextComp textVal={fileType} textStyle={Commonstyles.inputtextStyle} Visible={false} />
                            </View>
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

const mapStateToProps = (state) => {
    const { language } = state.languageReducer;
    return {
        language: language
    }
}

const mapDispatchToProps = (dispatch) => ({
    languageAction: (item) => dispatch(languageAction(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ImageDetailComp);
