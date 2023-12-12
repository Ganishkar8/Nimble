import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Image,
    FlatList,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    BackHandler
} from 'react-native';

//redux
import { connect } from 'react-redux';
import { languageAction } from '../../Utils/redux/actions/languageAction';
import { language } from '../../Utils/LanguageString';
import ErrorModal from '../../Components/ErrorModal';
import MyStatusBar from '../../Components/MyStatusBar';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Colors from '../../Utils/Colors';
import TextComp from '../../Components/TextComp';
import { BottomSheet } from 'react-native-btr';
import { useIsFocused } from '@react-navigation/native';
import HeadComp from '../../Components/HeadComp';
import ButtonViewComp from '../../Components/ButtonViewComp';
import apiInstance from '../../Utils/apiInstance';
import Commonstyles from '../../Utils/Commonstyles';
import Common from '../../Utils/Common';

const data = [

    {
        name: 'Profile Short', id: 1, isSelected: true
    },
    {
        name: 'CB Check', id: 2, isSelected: false
    },
    { name: 'Loan', id: 3, isSelected: false },
    { name: 'BRE', id: 4, isSelected: false }
]

const CBResponseScreen = (props, { navigation }) => {

    const [cbResponse, setCBResponse] = useState(data);
    const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
    const isScreenVisible = useIsFocused();
    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [apiError, setApiError] = useState('');
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        props.navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' }, tabBarVisible: false });
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);
        return () => {
            props.navigation.getParent()?.setOptions({ tabBarStyle: undefined, tabBarVisible: undefined });
            backHandler.remove();
        }
    }, [props.navigation, isScreenVisible]);

    const handleBackButton = () => {
        onGoBack();
        return true; // Prevent default back button behavior
    };

    const onGoBack = () => {
        props.navigation.goBack();
    }

    const toggleBottomNavigationView = () => {
        //Toggling the visibility state of the bottom sheet
        setBottomSheetVisible(!bottomSheetVisible);
    };

    const updateLoanStatus = () => {

        var module = ''; var page = '';

        module = 'CB_RSPNS';
        page = 'CB_CHK_CB_RSPNS';


        const appDetails = {
            "loanApplicationId": global.LOANAPPLICATIONID,
            "loanWorkflowStage": "LN_APP_INITIATION",
            "subStageCode": "CB_CHK",
            "moduleCode": module,
            "pageCode": page,
            "status": "Completed"
        }
        const baseURL = '8901';
        setLoading(true);
        apiInstance(baseURL)
            .post(`/api/v2/loan-application-status/updateStatus`, appDetails)
            .then(async response => {
                // Handle the response data
                if (global.DEBUG_MODE) console.log('UpdateStatusApiResponse::' + JSON.stringify(response.data),);
                setLoading(false);
                global.COMPLETEDMODULE = 'CB_RSPNS';
                global.COMPLETEDPAGE = 'CB_CHK_CB_RSPNS';

                props.navigation.replace('CBStatus')

            })
            .catch(error => {
                // Handle the error
                if (global.DEBUG_MODE) console.log('UpdateStatusApiResponse' + JSON.stringify(error.response));
                setLoading(false);
                if (error.response.data != null) {
                    setApiError(error.response.data.message);
                    setErrorModalVisible(true)
                }
            });

    };

    const closeErrorModal = () => {
        setErrorModalVisible(false);
    };



    const listView = ({ item }) => {

        return (
            <View>
                <View style={{
                    width: '92%', margin: 15, backgroundColor: 'white',
                    elevation: 4, borderRadius: 8, paddingHorizontal: 0,
                    shadowColor: 'black',
                    shadowOpacity: 0.2,
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    }, alignItems: 'center'
                }}>

                    <View style={{ width: '100%', flexDirection: 'row', marginTop: 13 }}>
                        <View style={{ width: '89%', flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ color: Colors.black, fontSize: 14, fontWeight: '100', marginLeft: 20 }}>Applicant</Text>
                        </View>
                        <TouchableOpacity onPress={toggleBottomNavigationView}
                            style={{ width: '15%', flexDirection: 'row' }}>
                            <View >
                                <Entypo name='dots-three-vertical' size={20} color={Colors.skyBlue} />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: '100%', height: .9, backgroundColor: Colors.line, marginTop: 13 }} />

                    <View style={{ width: '100%', flexDirection: 'row', marginTop: 13, }}>
                        <View style={{ width: '50%' }}>
                            <Text style={{ color: Colors.dimText, fontSize: 13, fontWeight: '400', marginLeft: 20 }}>{language[0][props.language].str_accholdername}</Text>
                        </View>
                        <View style={{ width: '50%' }}>
                            <Text style={{ color: Colors.black, fontSize: 13, fontWeight: '400' }}>:  Ganishkar</Text>
                        </View>
                    </View>
                    <View style={{ width: '100%', flexDirection: 'row', marginTop: 11, }}>
                        <View style={{ width: '50%' }}>
                            <Text style={{ color: Colors.dimText, fontSize: 13, fontWeight: '400', marginLeft: 20 }}>{language[0][props.language].str_cb}</Text>
                        </View>
                        <View style={{ width: '50%' }}>
                            <Text style={{ color: Colors.black, fontSize: 13, fontWeight: '400' }}>:  152</Text>
                        </View>
                    </View>
                    <View style={{ width: '100%', flexDirection: 'row', marginTop: 11, }}>
                        <View style={{ width: '50%' }}>
                            <Text style={{ color: Colors.dimText, fontSize: 13, fontWeight: '400', marginLeft: 20 }}>{language[0][props.language].str_dt}</Text>
                        </View>
                        <View style={{ width: '50%' }}>
                            <Text style={{ color: Colors.black, fontSize: 13, fontWeight: '400' }}>:  Hot</Text>
                        </View>
                    </View>
                    <View style={{ width: '100%', flexDirection: 'row', marginTop: 11, }}>
                        <View style={{ width: '50%' }}>
                            <Text style={{ color: Colors.dimText, fontSize: 13, fontWeight: '400', marginLeft: 20 }}>{language[0][props.language].str_cbs}</Text>
                        </View>
                        <View style={{ width: '50%' }}>
                            <Text style={{ color: Colors.black, fontSize: 13, fontWeight: '400' }}>:  15-09-2023</Text>
                        </View>
                    </View>
                    <View style={{ width: '100%', flexDirection: 'row', marginTop: 11, }}>
                        <View style={{ width: '50%' }}>
                            <Text style={{ color: Colors.dimText, fontSize: 13, fontWeight: '400', marginLeft: 20 }}>{language[0][props.language].str_cbsd}</Text>
                        </View>
                        <View style={{ width: '50%' }}>
                            <View style={styles.pendingbackground}>
                                <Text style={{ color: Colors.black, fontSize: 14, fontWeight: '100' }}>Pass</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{ width: '100%', height: 5, backgroundColor: Colors.pendingBorder, marginTop: 13, borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }} />


                </View>
            </View>

        )
    }

    return (

        <View style={{ flex: 1, backgroundColor: Colors.approvedBg }}>
            <MyStatusBar backgroundColor={'white'} barStyle="dark-content" />
            <ErrorModal isVisible={errorModalVisible} onClose={closeErrorModal} textContent={apiError} textClose={language[0][props.language].str_ok} />
            <View style={{ width: '96%', height: 50, alignItems: 'center' }}>
                <HeadComp textval={language[0][props.language].str_cbresponseheader} props={props} onGoBack={onGoBack} />
            </View>

            <View style={{ width: '100%', justifyContent: 'center', marginBottom: 110 }}>
                <FlatList
                    data={cbResponse}
                    renderItem={listView}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
            <BottomSheet
                visible={bottomSheetVisible}
                //setting the visibility state of the bottom shee
                onBackButtonPress={toggleBottomNavigationView}
                //Toggling the visibility state
                onBackdropPress={toggleBottomNavigationView}
            //Toggling the visibility state
            >
                {/*Bottom Sheet inner View*/}
                <View style={styles.bottomNavigationView}>
                    <View style={{ width: '100%', alignItems: 'center', marginTop: 9 }}>
                        <View style={{ height: 2, width: 70, backgroundColor: Colors.dimText, borderRadius: 20 }} />
                    </View>
                    <View
                        style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text
                            style={{
                                padding: 6,
                                fontSize: 16,
                                color: Colors.black,
                                fontWeight: 400,
                                marginLeft: 10
                            }}>
                            {'Applicant : ' + language[0][props.language].str_Cbreport}
                        </Text>
                    </View>
                    <View style={{ height: 1, width: '100%', backgroundColor: Colors.line }} />

                    <TouchableOpacity onPress={() => alert('hi')}>
                        <View style={{ width: '100%', flexDirection: 'row', marginTop: 10 }}>
                            <View style={{ padding: 15 }}>
                                <FontAwesome name='arrows' size={20} color={Colors.skyBlue} />
                            </View>
                            <View style={{ marginTop: 14 }}>
                                <TextComp textVal={language[0][props.language].str_preview}
                                    textStyle={{ color: Colors.darkblack, fontWeight: 400, fontSize: 16 }} />
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </BottomSheet>
            <View style={styles.fab}>


                <ButtonViewComp
                    textValue={language[0][props.language].str_next.toUpperCase()}
                    textStyle={{ color: Colors.white, fontSize: 13, fontWeight: 500 }}
                    viewStyle={Commonstyles.buttonView}
                    innerStyle={Commonstyles.buttonViewInnerStyle}
                    handleClick={updateLoanStatus}
                />

            </View>
        </View>

    );
};


const mapStateToProps = (state) => {
    const { language } = state.languageReducer;
    return {
        language: language
    }
}

const mapDispatchToProps = (dispatch) => ({
    languageAction: (item) => dispatch(languageAction(item)),
});
export default connect(mapStateToProps, mapDispatchToProps)(CBResponseScreen);


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#f5f8fa',
        alignItems: 'center'
    },
    fab: {
        position: 'absolute',
        margin: 0,
        right: 0,
        bottom: 12,
        width: '100%',

    },
    disableBg: {
        width: '88%', height: 50, backgroundColor: Colors.disableBg,
        borderRadius: 45, alignItems: 'center', justifyContent: 'center'
    },
    enableBg: {
        width: '88%', height: 50, backgroundColor: Colors.skyBlue,
        borderRadius: 45, alignItems: 'center', justifyContent: 'center'
    },
    pendingbackground: {
        width: 115, borderColor: Colors.pendingBorder, backgroundColor: Colors.pendingBg, alignItems: 'center', padding: 2, borderRadius: 15, borderWidth: 1
    },
    approvedbackground: {
        width: 115, borderColor: Colors.approvedBorder, backgroundColor: Colors.approvedBg, alignItems: 'center', padding: 3, borderRadius: 15, borderWidth: 1
    },
    bottomNavigationView: {
        backgroundColor: '#fff',
        width: '100%',
        height: 150,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },

});