import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import Colors from '../../../Utils/Colors';
import TextComp from '../../../Components/TextComp';
import TextInputComp from '../../../Components/TextInputComp';
import Common from '../../../Utils/Common';
import Commonstyles from '../../../Utils/Commonstyles';
import { language } from '../../../Utils/LanguageString';
import { connect } from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';


const RemarksScreen = props => {



    return (


        <View style={{ width: '100%', marginTop: 19, paddingHorizontal: 0, alignItems: 'center', justifyContent: 'center' }}>


            <TextComp textVal={props.route.params.remarks} textStyle={{ width: '90%', color: Colors.darkblack, fontFamily: 'Poppins-Medium', fontSize: 14, marginTop: 20 }} Visible={false} />


        </View>


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
        aspectRatio: 0.7,
        borderRadius: 10,
        alignItems: 'center',
    },
    closeButton: {
        marginTop: 10,
        padding: 10,
        alignItems: 'flex-end', justifyContent: 'flex-end'
    }, viewStyle: {
        alignItems: 'center',
        paddingHorizontal: 20, marginLeft: 9, marginRight: 4,
        marginBottom: 4,
        marginStart: 12,
        paddingVertical: 5,
        borderWidth: 1,
        borderRadius: 8,
    },
});

const mapStateToProps = (state) => {
    const { language } = state.languageReducer;
    const { profileDetails } = state.profileReducer;
    const { mobileCodeDetails } = state.mobilecodeReducer;
    const { dedupeDetails } = state.profileReducer;
    return {
        language: language,
        profiledetail: profileDetails,
        mobilecodedetail: mobileCodeDetails,
        dedupeDetails: dedupeDetails
    }
}

export default connect(mapStateToProps)(RemarksScreen);

//export default DedupeModal;