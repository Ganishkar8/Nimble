import React, { useEffect, useState } from 'react';
import {
    View,
    StatusBar,
    Text,
    Image,
    FlatList,
    StyleSheet,
    TextInput,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
} from 'react-native';
import TextComp from '../../../Components/TextComp';
import Colors from '../../../Utils/Colors';
import MyStatusBar from '../../../Components/ MyStatusBar';
import Loading from '../../../Components/Loading';
import { connect } from 'react-redux';
import { languageAction } from '../../../Utils/redux/actions/languageAction';
import { language } from '../../../Utils/LanguageString';
import HeadComp from '../../../Components/HeadComp';
import ButtonViewComp from '../../../Components/ButtonViewComp';
import Commonstyles from '../../../Utils/Commonstyles';
import tbl_SystemCodeDetails from '../../../Database/Table/tbl_SystemCodeDetails';
import PickerComp from '../../../Components/PickerComp';
import TextInputComp from '../../../Components/TextInputComp';
import ErrorMessageModal from '../../../Components/ErrorMessageModal';
import apiInstancelocal from '../../../Utils/apiInstancelocal';




const LeadApproval = (props, { navigation, route }) => {

    const [errMsg, setErrMsg] = useState('');
    const [currentPosition, setCurrentPosition] = useState(0);
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [approverComment, setApproverComment] = useState('');
    const [leadStatusLabel, setLeadStatusLabel] = useState('');
    const [leadStatusIndex, setLeadStatusIndex] = useState('');
    const [leadStatusData, setLeadStatusData] = useState([]);
    const [bottomErrorSheetVisible, setBottomErrorSheetVisible] = useState(false);
    const showBottomSheet = () => setBottomErrorSheetVisible(true);
    const hideBottomSheet = () => setBottomErrorSheetVisible(false);
    const [leadData, setLeadData] = useState(props.route.params.leadData);
    const [statusDisable, setStatusDisable] = useState(false);
    const [commentDisable, setCommentDisable] = useState(false);
    const [logData, setLogData] = useState(props.route.params.logDetail);

    useEffect(() => {
        //below code is used for hiding  bottom tab
        props.navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' }, tabBarVisible: false });
        //pickerData();
        callPickerApi();

        if (props.route.params.position == 1) {
            setApproverComment(logData[1].approverComments);
            setLeadStatusLabel(1667)
        } else {
            setLeadStatusLabel(1666)
        }

        if (global.USERTYPEID == '1164') {
            setStatusDisable(true);
            setCommentDisable(true);
        } else {
            setStatusDisable(false);
            setCommentDisable(false);
            if (props.route.params.position == 1) {
                setStatusDisable(true);
                setCommentDisable(true);
            }
        }
        return () =>
            props.navigation.getParent()?.setOptions({ tabBarStyle: undefined, tabBarVisible: undefined });
    }, [navigation]);


    const pickerData = async () => {
        tbl_SystemCodeDetails.getSystemCodeDetailsBasedOnID('LeadStatus').then(value => {
            if (value !== undefined && value.length > 0) {
                console.log(value)

                for (var i = 0; i < value.length; i++) {
                    if (value[i].IsDefault === '1') {
                        setLeadStatusLabel(value[i].SubCodeID);
                        setLeadStatusIndex(i + 1);
                    }
                }

                setLeadStatusData(value)

            }
        })
    }

    const handleClick = (componentName, textValue) => {

        setApproverComment(textValue)

    }

    const handleReference = (componentName) => {

    };

    const handlePickerClick = (componentName, label, index) => {

        if (componentName === 'leadStatusPicker') {
            setLeadStatusLabel(label);
            setLeadStatusIndex(index);
        }

    }

    const validate = () => {
        var flag = false; var i = 1;
        var errorMessage = '';


        if (leadStatusLabel === '') {
            errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsselect + "LEAD STATUS" + '\n';
            i++;
            flag = true;
        }


        if (approverComment.length <= 0) {
            errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsenter + "APPROVER COMMENT" + '\n';
            i++;
            flag = true;
        }


        setErrMsg(errorMessage);
        return flag;
    }

    const callPickerApi = () => {

        const baseURL = '8082'
        setLoading(true)

        apiInstancelocal(baseURL).get('/api/v1/system-code/master/LEAD_STATUS')
            .then(async (response) => {

                setLoading(false);
                var data = [];
                for (var i = 0; i < response.data.length; i++) {
                    if (response.data[i].id == 1667) {
                        data.push(response.data[i])
                    } else if (response.data[i].id == 1668) {
                        data.push(response.data[i])
                    }
                }
                setLeadStatusData(data)

            })
            .catch((error) => {
                if (global.DEBUG_MODE) console.log("Error" + JSON.stringify(error.response))
                setLoading(false)
                alert(error);
            });


    }

    const leadApproval = () => {

        if (global.USERTYPEID == '1164') {
            return;
        } else if (statusDisable) {
            return;
        }

        if (validate()) {
            showBottomSheet();
            return;
        }

        const appDetails = {
            "status": leadStatusLabel,
            "comments": approverComment,
            "userId": global.USERID
        }
        const baseURL = '8901'
        setLoading(true)
        // alert(props.route.params.leadData.id)
        apiInstancelocal(baseURL).post(`/api/v1/lead-Approved/ByBm/${props.route.params.leadData.id}`, appDetails)
            .then(async (response) => {
                // Handle the response data
                setLoading(false)
                props.navigation.navigate('LeadManagement', { fromScreen: 'LeadApproval' })

            })
            .catch((error) => {
                // Handle the error
                setLoading(false)
                alert(JSON.stringify(error.response));
            });
    }

    return (

        <SafeAreaView style={[styles.parentView, { backgroundColor: Colors.lightwhite }]}>

            <MyStatusBar backgroundColor={'white'} barStyle="dark-content" />

            <ScrollView style={styles.scrollView}
                contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
                {loading ? <Loading /> : null}

                <View style={{ flex: 1 }}>

                    <ErrorMessageModal isVisible={bottomErrorSheetVisible} hideBottomSheet={hideBottomSheet} errMsg={errMsg} textError={language[0][props.language].str_error} textClose={language[0][props.language].str_ok} />


                    <View style={{ width: '100%', height: 56, alignItems: 'center', justifyContent: 'center', }}>

                        <HeadComp textval={language[0][props.language].str_leadapproval} props={props} />

                    </View>


                    <View style={{ width: '100%', height: 50, justifyContent: 'center' }}>
                        <Text style={{
                            fontSize: 16, color: Colors.mediumgrey, marginLeft: 23,
                        }}>{language[0][props.language].str_leadid} :  <Text style={{ color: Colors.black }}>{leadData.leadNumber}</Text></Text>
                    </View>


                    <View style={{ width: '100%', alignItems: 'center', marginTop: '4%' }}>
                        <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, }}>

                            <TextComp textVal={language[0][props.language].str_leadstatus} textStyle={Commonstyles.inputtextStyle} Visible={true} />

                        </View>

                        <PickerComp textLabel={leadStatusLabel} pickerStyle={Commonstyles.picker} Disable={statusDisable} pickerdata={leadStatusData} componentName='leadStatusPicker' handlePickerClick={handlePickerClick} />


                    </View>

                    <View style={{ width: '100%', marginTop: 19, paddingHorizontal: 0, alignItems: 'center', justifyContent: 'center' }}>

                        <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, }}>
                            <TextComp textVal={language[0][props.language].str_approvercomment} textStyle={Commonstyles.inputtextStyle} Visible={true} />
                        </View>

                        <TextInputComp textValue={approverComment} textStyle={Commonstyles.textinputtextStyle} type='email-address' Disable={commentDisable} ComponentName='approverComment' returnKey="done" handleClick={handleClick} handleReference={handleReference} />



                    </View>

                </View>

                <ButtonViewComp textValue={language[0][props.language].str_submit.toUpperCase()} textStyle={{ color: Colors.white, fontSize: 13, fontWeight: 500 }} viewStyle={Commonstyles.buttonView} innerStyle={global.USERTYPEID == '1164' ? Commonstyles.disableBg : statusDisable ? Commonstyles.disableBg : Commonstyles.buttonViewInnerStyle} handleClick={leadApproval} />


            </ScrollView>
        </SafeAreaView>
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


export default connect(mapStateToProps, mapDispatchToProps)(LeadApproval);

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#f5f8fa',
        alignItems: 'center'
    },
    parentView: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    contentContainer: {

        paddingBottom: 50,
        flexGrow: 1
    },
    headerView: {
        width: ('100%'),
        paddingVertical: 15,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    viewStyle: {
        alignItems: 'center',
        paddingHorizontal: 20, marginLeft: 9, marginRight: 4,
        borderColor: '#e3e3e3',
        marginBottom: 4,
        marginStart: 12,
        paddingVertical: 7,
        borderWidth: 1,
        borderRadius: 8,
    },
    bottomNavigationView: {
        backgroundColor: '#fff',
        width: '100%',
        height: 400,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },

    textColor: {
        color: '#000',
        fontSize: 14,
        fontWeight: '400'
    },
    viewStyleFilter: {
        alignItems: 'center', justifyContent: 'center',
    },
    viewStyleStatusData: {
        alignItems: 'center'
    },
    picker: {
        height: 50,
        width: '85%',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        textAlign: 'center'
    },
    pendingbackground: {
        width: 90, borderColor: Colors.pendingBorder, backgroundColor: Colors.pendingBg, alignItems: 'center', padding: 3, borderRadius: 15, borderWidth: 1
    },
    approvedbackground: {
        width: 90, borderColor: Colors.approvedBorder, backgroundColor: Colors.approvedBg, alignItems: 'center', padding: 3, borderRadius: 15, borderWidth: 1
    },
    line: {
        backgroundColor: '#f1f1f1', // Change the color as needed
        height: 1,
        width: '90%', marginLeft: '5%',
        marginTop: '5%', alignItems: 'center'         // Adjust the height as needed
    },
    disableBg: {
        width: '88%', height: 50, backgroundColor: Colors.disableBg,
        borderRadius: 45, alignItems: 'center', justifyContent: 'center'
    },
    enableBg: {
        width: '88%', height: 50, backgroundColor: Colors.enableBg,
        borderRadius: 45, alignItems: 'center', justifyContent: 'center'
    }, fab: {
        position: 'absolute',
        margin: 0,
        right: 0,
        bottom: 12,
        width: '100%',

    },

});