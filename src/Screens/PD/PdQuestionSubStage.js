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
    TextInput,
    Image
} from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
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
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Common from '../../Utils/Common';

const PdQuestionSubStage = (props, { navigation }) => {
    const [loading, setLoading] = useState(false);
    const [remarks, setRemarks] = useState('');
    const [pdData, setPdData] = useState([]);
    const [refreshFlatlist, setRefreshFlatList] = useState(false);
    const isScreenVisible = useIsFocused();

    useEffect(() => {
        props.navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' }, tabBarVisible: false });
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);
        // const filteredData = global.PDSTAGES[0].pdSubstages
        //     .filter(data => data.clientType === global.CLIENTTYPE)
        //     .sort((a, b) => a.displayOrder - b.displayOrder);

        // const filterSubData = filteredData[0].pdModules.filter(data => data.moduleCode === 'QU_RFR_CHCK_APPL')
        //     .sort((a, b) => a.displayOrder - b.displayOrder);

        // setPdData(filterSubData[0].pdSubModules)
        return () => {
            props.navigation.getParent()?.setOptions({ tabBarStyle: undefined, tabBarVisible: undefined });
            backHandler.remove();
        }
    }, [props.navigation, isScreenVisible]);


    useFocusEffect(
        React.useCallback(() => {

            if (Common.DEBUG_MODE) console.log('Screen Available');

            const filteredData = props.pdSubStage[0].personalDiscussionSubStageLogs
                .filter(data => data.subStageCode === 'PD_APPL')

            const filteredModule = filteredData[0].personalDiscussionModuleLogs
                .filter(data => data.moduleCode === 'QU_RFR_CHCK_APPL')

            setPdData(filteredModule[0].personalDiscussionSubModuleLogs)
            //  alert(JSON.stringify(filteredModule))

            return () => {
                if (Common.DEBUG_MODE) console.log('Screen is blurred');
            };
        }, [])
    );

    const handleBackButton = () => {
        onGoBack();
        return true; // Prevent default back button behavior
    };


    const onGoBack = () => {
        props.navigation.goBack();
    }

    const navigateToQuestion = (item) => {
        if (item.subModuleCode == 'REFF_CHECK_APPL') {
            props.navigation.navigate('PDReferenceCheck');
        } else {
            props.navigation.navigate('PdQuestionarire', { subCode: item.subModuleCode });
        }
    }

    const FlatView = ({ item }) => {

        return (
            <View style={{ width: '90%', alignItems: 'center', flexDirection: 'row', alignSelf: 'center', height: 50 }}>

                <View style={{ width: '90%', justifyContent: 'center', textAlign: 'center' }}>
                    <Text style={{ color: Colors.black, fontFamily: 'PoppinsRegular' }}>{item.subModuleDescription}</Text>
                </View>
                <TouchableOpacity
                    onPress={() => { navigateToQuestion(item) }}
                    style={{ width: '10%', justifyContent: 'center' }}>
                    <View>
                        <Entypo name="chevron-right" color={Colors.darkblack} size={25} />
                    </View>
                </TouchableOpacity>
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
            <View
                style={{
                    width: '100%',
                    alignItems: 'center',
                }}>
                <View
                    style={{
                        width: '90%',
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                    <Image
                        source={require('../../Images/orderblue.png')}
                        style={{ width: 16, height: 20 }}
                    />
                    <Text
                        style={{
                            marginLeft: 10,
                            fontSize: 14,
                            fontFamily: 'Poppins-Medium',
                            color: Colors.mediumgrey,
                        }}>
                        Questionarire
                    </Text>
                </View>
            </View>

            <View style={{ marginTop: 20 }}>
                <FlatList
                    data={pdData}
                    renderItem={FlatView}
                    extraData={refreshFlatlist}
                    keyExtractor={item => item.id}
                />
            </View>

        </SafeAreaView >
    );
};

const mapStateToProps = state => {
    const { language } = state.languageReducer;
    const { profileDetails } = state.profileReducer;
    const { mobileCodeDetails } = state.mobilecodeReducer;
    const { pdSubStages } = state.pdStagesReducer;
    return {
        language: language,
        profiledetail: profileDetails,
        mobilecodedetail: mobileCodeDetails,
        pdSubStage: pdSubStages
    }
};

const mapDispatchToProps = dispatch => ({
    languageAction: item => dispatch(languageAction(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PdQuestionSubStage);
