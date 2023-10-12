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
    ScrollView
} from 'react-native';
import MyStatusBar from '../../Components/ MyStatusBar';
import Colors from '../../Utils/Colors';
import Entypo from 'react-native-vector-icons/Entypo';
import Loading from '../../Components/Loading';
import apiInstance from '../../Utils/apiInstance';
import { connect } from 'react-redux';
import { languageAction } from '../../Utils/redux/actions/languageAction';
import { profileAction } from '../../Utils/redux/actions/ProfileAction';



const ProfessionalDetailsScreen = (props, { navigation }) => {

    const [loading, setLoading] = useState(false);
    const [agentType, setAgentType] = useState(false);
    const [agencyName, setagencyName] = useState(false);
    const [supervisorID, setSupervisorID] = useState(false);
    const [professionalDetail, setProfessionalDetail] = useState(props.profiledetail.userAgencyDetailsDto);


    useEffect(() => {
        //getProfessionalDetails();
    }, []);

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
                        <View style={{ width: '92%', flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ width: '10%', height: 56, justifyContent: 'center' }}>
                                <View >

                                    <Entypo name='chevron-left' size={25} color={Colors.darkblack} />

                                </View>
                            </TouchableOpacity>
                            <View style={{ width: '80%', height: 56, justifyContent: 'center' }}>
                                <Text style={{ fontSize: 18, color: Colors.darkblack }}>Professional Details</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{ width: '100%', alignItems: 'center', marginTop: '6%' }}>

                        <View style={{ width: '90%', marginTop: 3, }}>
                            <Text
                                style={{
                                    color: Colors.lightgrey,
                                    fontSize: 14,
                                }}>
                                AGENT TYPE
                            </Text>

                            <Text
                                style={{
                                    color: Colors.darkblack,
                                    fontSize: 14,
                                    marginTop: 10
                                }}>
                                {professionalDetail.agentType}
                            </Text>

                        </View>
                        <View style={styles.line}></View>

                        <View style={{ width: '90%', marginTop: 20, }}>
                            <Text
                                style={{
                                    color: Colors.lightgrey,
                                    fontSize: 14,
                                }}>
                                AGENCY NAME
                            </Text>

                            <Text
                                style={{
                                    color: Colors.darkblack,
                                    fontSize: 14,
                                    marginTop: 10
                                }}>
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
    },
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
