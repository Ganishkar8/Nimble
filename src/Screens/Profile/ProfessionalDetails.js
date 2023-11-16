import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Image,
    View,
    Platform,
    Alert,
    Text,
    TouchableOpacity,
    ScrollView,
    BackHandler
} from 'react-native';
import MyStatusBar from '../../Components/MyStatusBar';
import Colors from '../../Utils/Colors';
import Entypo from 'react-native-vector-icons/Entypo';
import Loading from '../../Components/Loading';
import apiInstance from '../../Utils/apiInstance';
import { connect } from 'react-redux';
import { languageAction } from '../../Utils/redux/actions/languageAction';
import { profileAction } from '../../Utils/redux/actions/ProfileAction';
import HeadComp from '../../Components/HeadComp';
import { useIsFocused } from '@react-navigation/native';

const ProfessionalDetailsScreen = (props, { navigation }) => {

    const [loading, setLoading] = useState(false);
    const [agentType, setAgentType] = useState(false);
    const [agencyName, setagencyName] = useState(false);
    const [supervisorID, setSupervisorID] = useState(false);
    const [professionalDetail, setProfessionalDetail] = useState(props.profiledetail.userAgencyDetailsDto);
    const isScreenVisible = useIsFocused();


    useEffect(() => {
        //getProfessionalDetails();
        props.navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' }, tabBarVisible: false });
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);
        return () => {
            props.navigation.getParent()?.setOptions({ tabBarStyle: undefined, tabBarVisible: undefined });
            backHandler.remove();
        }

    }, [navigation, isScreenVisible]);

    const handleBackButton = () => {
        props.navigation.goBack();
        return true; // Prevent default back button behavior
    };

    const getProfessionalDetails = () => {

        const baseURL = '8901'
        setLoading(true)
        apiInstance(baseURL).post(`/api/v1/user-personal-details/getall/userID/${global.USERID}`)
            .then(async (response) => {
                // Handle the response data
                console.log("ProfessionalApiResponse::" + JSON.stringify(response.data));
                setLoading(false)
                setAgentType(response.data.agentType)
                setagencyName(response.data.agencyName)
                setSupervisorID(response.data.supervisorName)
                //alert(JSON.stringify(response.data))


            })
            .catch((error) => {
                // Handle the error
                console.log("Error" + JSON.stringify(error.response))
                setLoading(false)
                alert(error);
            });



    }

    return (
        // enclose all components in this View tag
        <SafeAreaView style={[styles.parentView, { backgroundColor: Colors.lightwhite }]}>

            <MyStatusBar backgroundColor={'white'} barStyle="dark-content" />

            <ScrollView style={styles.scrollView}
                contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
                {loading ? <Loading /> : null}
                <View style={{ flex: 1 }}>

                    <View style={{
                        width: '100%', height: 56, alignItems: 'center', justifyContent: 'center',

                    }}>
                        <HeadComp textval={'Professional Details'} props={props} />

                    </View>

                    <View style={{ width: '100%', alignItems: 'center', marginTop: '6%' }}>

                        <View style={{ width: '90%', marginTop: 3, }}>
                            <Text
                                style={styles.headText}>
                                AGENT TYPE
                            </Text>

                            <Text
                                style={styles.childText}>
                                {professionalDetail.agentType}
                            </Text>

                        </View>
                        <View style={styles.line}></View>

                        <View style={{ width: '90%', marginTop: 20, }}>
                            <Text
                                style={styles.headText}>
                                AGENCY NAME
                            </Text>

                            <Text
                                style={styles.childText}>
                                {professionalDetail.agencyName}
                            </Text>

                        </View>
                        <View style={styles.line}></View>




                    </View>



                </View>
            </ScrollView>
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    parentView: {
        flex: 1,

    },
    scrollView: {
        flex: 1,

    },
    contentContainer: {

        paddingBottom: 50,
        flexGrow: 1
    }, line: {
        backgroundColor: '#dbdbdb', // Change the color as needed
        height: 1,
        width: '90%',
        marginTop: '3%'           // Adjust the height as needed
    }, headText: {
        color: Colors.lightgrey,
        fontSize: 14,
        fontFamily: 'PoppinsRegular'
    },
    childText: {
        color: Colors.darkblack,
        fontSize: 14,
        marginTop: 10,
        fontFamily: 'PoppinsRegular'
    }
});


const mapStateToProps = (state) => {
    const { language } = state.languageReducer;
    const { profileDetails } = state.profileReducer;
    return {
        language: language,
        profiledetail: profileDetails,
    }
}

const mapDispatchToProps = (dispatch) => ({
    languageAction: (item) => dispatch(languageAction(item)),
    profileAction: (item) => dispatch(profileAction(item)),
});


export default connect(mapStateToProps, mapDispatchToProps)(ProfessionalDetailsScreen);
