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
import { connect } from 'react-redux';
import { languageAction } from '../../Utils/redux/actions/languageAction';
import { profileAction } from '../../Utils/redux/actions/ProfileAction';
import HeadComp from '../../Components/HeadComp';
import { useIsFocused } from '@react-navigation/native';



const PersonalDetailsScreen = (props, { navigation, route }) => {

    const [profileDetail, setProfileDetail] = useState(props.profiledetail.userPersonalDetailsDto);
    const isScreenVisible = useIsFocused();

    useEffect(() => {

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

    const onGoBack = () => {
        props.navigation.goBack();
    }

    return (
        // enclose all components in this View tag
        <SafeAreaView style={[styles.parentView, { backgroundColor: Colors.lightwhite }]}>

            <MyStatusBar backgroundColor={'white'} barStyle="dark-content" />

            <ScrollView style={styles.scrollView}
                contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">

                <View style={{ flex: 1 }}>

                    <View style={{
                        width: '100%', height: 56, alignItems: 'center', justifyContent: 'center',

                    }}>
                        <HeadComp textval={'Personal Details'} props={props} onGoBack={onGoBack} />

                    </View>

                    <View style={{ width: '100%', alignItems: 'center', marginTop: '6%' }}>

                        <View style={{ width: '90%', marginTop: 3, }}>
                            <Text
                                style={styles.headText}>
                                USER ID
                            </Text>

                            <Text
                                style={styles.childText}>
                                {profileDetail.userId}
                            </Text>

                        </View>
                        <View style={styles.line}></View>

                        <View style={{ width: '90%', marginTop: 20, }}>
                            <Text
                                style={styles.headText}>
                                USER NAME
                            </Text>

                            <Text
                                style={styles.childText}>
                                {profileDetail.userName}
                            </Text>

                        </View>
                        <View style={styles.line}></View>


                        <View style={{ width: '90%', marginTop: 20, }}>
                            <Text
                                style={styles.headText}>
                                MOBILE NUMBER
                            </Text>

                            <Text
                                style={styles.childText}>
                                {profileDetail.mobileNumber}
                            </Text>

                        </View>
                        <View style={styles.line}></View>

                        <View style={{ width: '90%', marginTop: 20, }}>
                            <Text
                                style={styles.headText}>
                                EMAIL
                            </Text>

                            <Text
                                style={styles.childText}>
                                {profileDetail.emailId}
                            </Text>

                        </View>
                        <View style={styles.line}></View>

                        <View style={{ width: '90%', marginTop: 20, }}>
                            <Text
                                style={styles.headText}>
                                ADDRESS
                            </Text>

                            <Text
                                style={styles.childText}>
                                {profileDetail.address}
                            </Text>

                        </View>
                        <View style={styles.line}></View>

                        <View style={{ width: '90%', marginTop: 20, }}>
                            <Text
                                style={styles.headText}>
                                SUPERVISOR ID
                            </Text>

                            <Text
                                style={styles.childText}>
                                {profileDetail.supervisorName}/{profileDetail.supervisorId}
                            </Text>

                        </View>
                        <View style={styles.line}></View>

                        <View style={{ width: '90%', marginTop: 20, }}>
                            <Text
                                style={styles.headText}>
                                BRANCH ID
                            </Text>

                            <Text
                                style={styles.childText}>
                                {profileDetail.branchName}/{profileDetail.branchId}
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
    headText: {
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


export default connect(mapStateToProps, mapDispatchToProps)(PersonalDetailsScreen);

