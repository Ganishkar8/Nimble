/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react-native/no-inline-styles */
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    SafeAreaView,
    FlatList, TouchableOpacity, BackHandler, Modal,
    TextInput
} from 'react-native';
import { React, useState, useEffect } from 'react';
import MyStatusBar from '../../Components/MyStatusBar';
import HeadComp from '../../Components/HeadComp';
import { connect } from 'react-redux';
import { languageAction } from '../../Utils/redux/actions/languageAction';
import { language } from '../../Utils/LanguageString';
import Loading from '../../Components/Loading';
import ChildHeadComp from '../../Components/ChildHeadComp';
import ProgressComp from '../../Components/ProgressComp';
import Colors from '../../Utils/Colors';
import Commonstyles from '../../Utils/Commonstyles';
import IconButtonViewComp from '../../Components/IconButtonViewComp';
import { useIsFocused } from '@react-navigation/native';
import TextComp from '../../Components/TextComp';
import ImageComp from '../../Components/ImageComp';
import Entypo from 'react-native-vector-icons/Entypo';
import { Picker } from '@react-native-picker/picker';
import ButtonViewComp from '../../Components/ButtonViewComp';
const PdQuestionarire = (props, { navigation }) => {
    const [loading, setLoading] = useState(false);
    const [remarks, setRemarks] = useState('');
    const [pdData, setPdData] = useState([{ id: '1', remarks: '', reason: '' }, { id: '2', remarks: '', reason: '' }]);
    const [refreshFlatlist, setRefreshFlatList] = useState(false);
    const isScreenVisible = useIsFocused();
    const [spinnerList, setSpinnerList] = useState([{ 'subCodeId': 'S', 'Description': 'Statisfactory' }, { 'subCodeId': 'NS', 'Description': 'Non-Statisfactory' }]);
    const [tempItem, setTempItem] = useState([]);

    const [remarksModalVisible, setRemarksModalVisible] = useState(false);
    const showRemarksSheet = (item) => {
        setRemarksModalVisible(true)
        setTempItem(item)
    };
    const hideRemarksSheet = () => setRemarksModalVisible(false);

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
    const addItem = () => {
        const newData = [...pdData];
        for (let i = 0; i < newData.length; i++) {
            if (newData[i].id === tempItem.id) {
                newData[i] = { ...newData[i], remarks: remarks };
            }
        }
        setPdData(newData);
        console.log("UpdatedValueText::" + JSON.stringify(newData))
        setRefreshFlatList(!refreshFlatlist)
        hideRemarksSheet()
    }
    const setSelectedValue = (itemValue, item) => {

        //const itemIndex = pdData.findIndex((item) => item.id === itemId);

        const newData = [...pdData];
        for (let i = 0; i < newData.length; i++) {
            if (newData[i].id === item.id) {
                newData[i] = { ...newData[i], reason: itemValue };
            }
        }
        setPdData(newData);
        console.log("UpdatedValue::" + JSON.stringify(newData))
        setRefreshFlatList(!refreshFlatlist)
    }

    const submitQuestionare = () => {
        console.log('QuestionFinalData::' + JSON.stringify(pdData))
    }



    const FlatView = ({ item }) => {
        let rem = item.remarks

        return (
            <View style={{ width: '100%', alignItems: 'center' }}>
                <Modal
                    visible={remarksModalVisible}
                    transparent={false}
                    animationType="slide"
                    onRequestClose={hideRemarksSheet}>


                    <View style={{ width: '100%', backgroundColor: Colors.white }}>

                        <View style={{ width: '100%', marginTop: 19, paddingHorizontal: 0, alignItems: 'center', justifyContent: 'center' }}>

                            <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, }}>
                                <TextComp textVal={'Remarks'} textStyle={Commonstyles.inputtextStyle} Visible={true} />
                            </View>

                            <TextInput
                                onChangeText={txt => { setRemarks(txt) }}
                                placeholder={''}
                                editable={true}
                                contextMenuHidden={true}
                                placeholderTextColor={Colors.lightgrey}
                                secureTextEntry={false}
                                keyboardType={'email-address'}
                                multiline={true}
                                maxLength={100}
                                style={[Commonstyles.textinputtextStyle, { color: Colors.black, overflow: 'scroll' }]}
                                returnKeyType={'done'}
                            />
                        </View>

                        <View style={{ alignItems: 'flex-end', marginTop: 25 }}>
                            <ButtonViewComp textValue={language[0][props.language].str_add.toUpperCase()} textStyle={{ color: Colors.white, fontSize: 13, fontWeight: 500 }} viewStyle={[Commonstyles.buttonView, { width: 100, height: 20 }]} innerStyle={[Commonstyles.buttonViewInnerStyle, { height: 35 }]} handleClick={() => addItem(item)} />
                        </View>

                    </View>
                </Modal>
                <View style={{ width: '93%', marginLeft: 20, marginTop: 20 }}>
                    <Text style={{ fontSize: 15, color: Colors.darkblack, fontFamily: 'PoppinsRegular', marginTop: 3 }}>
                        1. Brief About Your Business Product / Service, Business Vintage And Target Customers?
                    </Text>

                    <Text style={{ fontSize: 15, color: Colors.lightgrey, fontFamily: 'Poppins-Medium', marginTop: 3 }}>
                        {language[0][props.language].str_remarks}
                    </Text>
                    <Picker
                        selectedValue={item.reason}
                        style={[Commonstyles.picker, { color: Colors.black }]}
                        enabled={true}
                        mode='dropdown'
                        dropdownIconColor={Colors.black}
                        themeVariant='light'
                        onValueChange={(itemValue, itemIndex) => {
                            setSelectedValue(itemValue, item)
                        }}>
                        {/* {componentName == 'productIdPicker' && */}
                        <Picker.Item value='' label='Select' style={{ backgroundColor: '#fff', color: '#000', fontFamily: 'PoppinsRegular' }} />

                        {
                            spinnerList.map(item1 => {
                                let labelValue;
                                return <Picker.Item value={item1.subCodeId} label={item1.Description} style={{ backgroundColor: '#fff', color: '#000', fontFamily: 'PoppinsRegular' }} />
                            })
                        }
                    </Picker>
                    <View style={{ width: '91%', height: 1, backgroundColor: Colors.dimText, marginLeft: 15 }} />
                    <View style={{ width: '91%', height: 100, backgroundColor: '#F5F8FA', marginLeft: 15, marginTop: 5 }}>
                        <Text style={{ fontSize: 15, color: Colors.black, fontFamily: 'PoppinsRegular', marginTop: 3, padding: 10 }}>
                            {item.remarks}
                        </Text>
                    </View>
                    <View style={{ alignItems: 'flex-end', marginTop: 25 }}>
                        <View
                            style={{
                                marginTop: 10,
                                width: '90%',
                                flexDirection: 'row',
                                justifyContent: 'flex-end',
                                marginRight: 15
                            }}>
                            <TouchableOpacity onPress={() => showRemarksSheet(item)}>
                                {item.remarks ?
                                    (<Text
                                        style={{
                                            color: Colors.darkblue,
                                            fontFamily: 'Poppins-Medium'
                                        }}>
                                        + Edit Remarks
                                    </Text>) : <Text
                                        style={{
                                            color: Colors.darkblue,
                                            fontFamily: 'Poppins-Medium'
                                        }}>
                                        + Add Remarks
                                    </Text>}
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={{ width: '90%', height: 0.5, backgroundColor: Colors.dimblue }} />
            </View>
        )

    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            {loading ? <Loading /> : null}
            <MyStatusBar backgroundColor={'white'} barStyle="dark-content" />
            <View
                style={{
                    width: '100%',
                    height: 56,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                <HeadComp
                    textval={language[0][props.language].str_pd}
                    props={props}
                    onGoBack={onGoBack}
                />
            </View>
            <View style={{ width: '93%', flexDirection: 'row', marginLeft: 20 }}>
                <Text style={{ fontSize: 15, color: Colors.lightgrey, fontFamily: 'Poppins-Medium', marginTop: 3 }}>
                    {language[0][props.language].str_basic_details_optional}
                </Text>
            </View>

            <FlatList
                data={pdData}
                renderItem={FlatView}
                extraData={refreshFlatlist}
                keyExtractor={item => item.id}
            />
            <ButtonViewComp
                textValue={language[0][props.language].str_submit.toUpperCase()}
                textStyle={{ color: Colors.white, fontSize: 13, fontWeight: 500, marginBottom: 5 }}
                viewStyle={Commonstyles.buttonView}
                innerStyle={Commonstyles.buttonViewInnerStyle}
                handleClick={submitQuestionare}
            />
        </SafeAreaView >
    );
};

const mapStateToProps = state => {
    const { language } = state.languageReducer;
    const { profileDetails } = state.profileReducer;
    const { mobileCodeDetails } = state.mobilecodeReducer;
    return {
        language: language,
        profiledetail: profileDetails,
        mobilecodedetail: mobileCodeDetails
    }
};

const mapDispatchToProps = dispatch => ({
    languageAction: item => dispatch(languageAction(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PdQuestionarire);
