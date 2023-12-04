import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Modal from 'react-native-modal';


const ImageBottomPreview = props => {


    const hide = () => {
        props.hideBottomSheet();
    }

    return (
        <Modal
            isVisible={props.bottomSheetVisible}
            onBackdropPress={hide}
            style={styles.modal}
        >
            <View style={styles.modalContent}>

                {(!props.deleteVisible) && <View style={{ marginBottom: 20 }}>

                    <TextComp textVal={props.fileName} textStyle={{ width: '90%', fontSize: 14, color: Colors.mediumgrey, marginTop: 15, fontFamily: 'PoppinsRegular' }} Visible={false} />


                    <View style={{ width: '100%', flexDirection: 'row', marginTop: 15, paddingHorizontal: 0, borderBottomWidth: 1, borderBottomColor: '#e2e2e2' }} />


                    <TouchableOpacity onPress={() => { props.previewImage(); }} style={{ width: '100%', flexDirection: 'row', marginTop: 18 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ width: '15%' }}>
                                <Image source={require('../Images/preview.png')}
                                    style={{ width: 20, height: 20 }} />
                            </View>
                            <View style={{ width: '85%', justifyContent: 'center', marginLeft: 3 }}>
                                <TextComp textVal={language[0][props.language].str_preview} textStyle={{ fontSize: 14, color: Colors.mediumgrey, fontFamily: 'PoppinsRegular' }} Visible={false} />
                            </View>

                        </View>

                    </TouchableOpacity>

                    {!props.detailHide &&
                        <TouchableOpacity onPress={() => { }} style={{ width: '100%', flexDirection: 'row', marginTop: 18, }}>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ width: '15%' }}>
                                    <MaterialIcons name='error' size={20} color={Colors.darkblue} />
                                </View>
                                <View style={{ width: '85%', justifyContent: 'center', marginLeft: 3 }}>
                                    <TextComp textVal={language[0][props.language].str_details} textStyle={{ fontSize: 14, color: Colors.mediumgrey, fontFamily: 'PoppinsRegular' }} Visible={false} />
                                </View>

                            </View>

                        </TouchableOpacity>
                    }
                    {!props.hideRetake &&
                        <TouchableOpacity onPress={() => { props.reTakePhoto() }} activeOpacity={0.5} style={{ width: '100%', flexDirection: 'row', marginTop: 18 }}>
                            <View style={{ flexDirection: 'row' }} >
                                <View style={{ width: '15%', marginLeft: 3 }}>
                                    <Image source={require('../Images/fileupload.png')}
                                        style={{ width: 16, height: 20 }} />
                                </View>
                                <View style={{ width: '85%', justifyContent: 'center' }}>
                                    <TextComp textVal={language[0][props.language].str_retake} textStyle={{ fontSize: 14, color: Colors.mediumgrey, fontFamily: 'PoppinsRegular' }} Visible={false} />
                                </View>

                            </View>
                        </TouchableOpacity>}

                    {!props.hideDelete &&
                        <TouchableOpacity onPress={() => { props.deletePhoto(); }} activeOpacity={0.5} style={{ width: '100%', flexDirection: 'row', marginTop: 20, marginBottom: 20 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ width: '15%' }}>

                                    <MaterialCommunityIcons name='delete' size={25} color={Colors.darkblue} />

                                </View>
                                <View style={{ width: '85%', justifyContent: 'center', marginLeft: 3 }}>
                                    <TextComp textVal={language[0][props.language].str_delete} textStyle={{ fontSize: 14, color: Colors.mediumgrey, fontFamily: 'PoppinsRegular' }} Visible={false} />
                                </View>

                            </View>
                        </TouchableOpacity>
                    }

                </View>}


                {props.deleteVisible && <View style={{ alignItems: 'center' }}>

                    <MaterialIcons name='error' size={35} color={Colors.red} />

                    <TextComp
                        textVal={language[0][props.language].str_deletephoto}
                        textStyle={{
                            fontSize: 14,
                            color: Colors.black,
                            fontWeight: 600,
                            marginTop: 20,
                        }}
                        Visible={false}
                    />

                    <TextComp
                        textVal={language[0][props.language].str_deletephotodesc}
                        textStyle={{ fontSize: 14, color: Colors.mediumgrey }}
                        Visible={false}
                    />

                    <View
                        style={{
                            width: '100%',
                            justifyContent: 'space-between',
                            flexDirection: 'row',
                        }}>
                        <View
                            style={{
                                width: '48%',
                                height: 50,
                                marginTop: 25,
                                justifyContent: 'flex-end',
                                alignItems: 'center',
                            }}>
                            <TouchableOpacity
                                onPress={() => {
                                    props.onDeleteorCancel('Cancel');
                                }}
                                activeOpacity={0.5}
                                style={{
                                    width: '88%',
                                    height: 50,
                                    borderBottomColor: Colors.mediumgrey,
                                    borderWidth: 1,
                                    borderRadius: 45,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                <View>
                                    <TextComp
                                        textVal={language[0][props.language].str_cancel}
                                        textStyle={{
                                            color: Colors.darkblue,
                                            fontSize: 13,
                                            fontWeight: 600,
                                        }}
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View
                            style={{
                                width: '48%',
                                height: 50,
                                marginTop: 25,
                                justifyContent: 'flex-end',
                                alignItems: 'center',
                            }}>
                            <TouchableOpacity
                                onPress={() => {
                                    props.onDeleteorCancel('Delete');
                                }}
                                activeOpacity={10}
                                style={{
                                    width: '88%',
                                    height: 50,
                                    backgroundColor: '#0294ff',
                                    borderRadius: 45,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                <View>
                                    <TextComp
                                        textVal={language[0][props.language].str_yesdelete}
                                        textStyle={{
                                            color: Colors.white,
                                            fontSize: 13,
                                            fontWeight: 600,
                                        }}
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                }

                {/*                             

                        <View style={{width:'100%',flexDirection:'row',marginTop:25,marginBottom:20}}>
                        <View style={{ width: '15%' }}>

                        <MaterialIcons name='error' size={25} color={Colors.darkblue} />

                        </View>
                        <View style={{width: '85%',justifyContent:'center'}}>
                        <TextComp textVal={language[0][props.language].str_details} textStyle={{  fontSize: 14, color: Colors.mediumgrey }} Visible={false} />
                        </View>
                        
                        </View> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(ImageBottomPreview);
