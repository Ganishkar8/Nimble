import React, { useEffect, useState } from 'react';
import {
    View,
    StatusBar,
    Text,
    Image,
    FlatList,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
} from 'react-native';
import { DatePickerModal, tr } from 'react-native-paper-dates';

import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import TextComp from '../../../Components/TextComp';
import Colors from '../../../Utils/Colors';
import MyStatusBar from '../../../Components/ MyStatusBar';
import Loading from '../../../Components/Loading';
import { BottomSheet } from 'react-native-btr';
import { connect } from 'react-redux';
import { languageAction } from '../../../Utils/redux/actions/languageAction';
import { language } from '../../../Utils/LanguageString';
import { FAB } from 'react-native-paper';

const data = [

    { name: 'Filter' },
    { name: 'Sort by' },
    { name: 'Draft' },
    { name: 'Rejected' }
]
const mainFilterDataArr = [

    { name: 'Sort', isSelected: true, id: 'SO' },
    { name: 'Status', isSelected: false, id: 'ST' },
    { name: 'Date', isSelected: false, id: 'DT' },
    { name: 'Type', isSelected: false, id: 'TP' },
    { name: 'Ageing', isSelected: false, id: 'AG' }
]

const statusDataArr = [

    { name: 'Approve', id: 'APR', checked: true },
    { name: 'Pending', id: 'PEN', checked: false },
    { name: 'Rejected', id: 'REJ', checked: false },
    { name: 'Draft', id: 'DFT', checked: false },

]

const typeDataArr = [

    { name: 'Hot', id: 'HOT', checked: true },
    { name: 'Warm', id: 'WARM', checked: false },
    { name: 'Cold', id: 'COLD', checked: false }

]

const LeadDetails = (props, { navigation, route }) => {


    const [mainFilterData, setMainFilteredData] = useState(mainFilterDataArr);
    const [leadData, setLeadData] = useState(props.route.params.leadData);
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [status, setStatus] = useState('COMP');


    useEffect(() => {
        //below code is used for hiding  bottom tab
        props.navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' }, tabBarVisible: false });
        return () =>
            props.navigation.getParent()?.setOptions({ tabBarStyle: undefined, tabBarVisible: undefined });
    }, [navigation]);

    const hideAndShow = () => {

        setVisible(!visible);
    }


    return (

        <View style={{ flex: 1, backgroundColor: '#fefefe' }}>
            <MyStatusBar backgroundColor={'white'} barStyle="dark-content" />
            {loading ? <Loading /> : null}
            <View style={styles.headerView}>
                <View style={{
                    width: '100%', height: 50, alignItems: 'center', justifyContent: 'center',
                    flexDirection: 'row'
                }}>
                    <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ width: '15%', height: 56, alignItems: 'center', justifyContent: 'center' }}>
                        <View >

                            <Entypo name='chevron-left' size={25} color='#4e4e4e' />

                        </View>
                    </TouchableOpacity>
                    <View style={{ width: '85%', height: 50, justifyContent: 'center' }}>
                        <Text style={{ fontSize: 18, color: '#000', fontWeight: '400' }}>{language[0][props.language].str_leaddetails}</Text>
                    </View>
                </View>
            </View>
            <View style={{ width: '100%', height: 5, backgroundColor: Colors.skyblue }} />


            <View style={{ width: '100%', justifyContent: 'center' }}>
                <View style={{
                    width: '92%', margin: 13, backgroundColor: Colors.white,
                    borderRadius: 6, paddingHorizontal: 0, borderColor: Colors.dimText, borderWidth: 0.5,
                    alignItems: 'center'
                }}>

                    <View style={{ width: '100%', flexDirection: 'row', marginTop: 13 }}>
                        <View style={{ width: '55%', flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ color: Colors.black, fontSize: 14, fontWeight: '100', marginLeft: 20 }}>{language[0][props.language].str_leadapprovalstatuss}</Text>
                        </View>
                        <View style={{ width: '45%', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                            <View style={styles.pendingbackground}>
                                <Text style={{ color: Colors.black, fontSize: 14, fontWeight: '100' }}>Pending</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{ width: '100%', flexDirection: 'row', marginTop: 13, }}>
                        <View style={{ width: '55%' }}>
                            <Text style={{ color: Colors.dimText, fontSize: 13, fontWeight: '400', marginLeft: 20 }}>{language[0][props.language].str_customername}</Text>
                        </View>
                        <View style={{ width: '45%' }}>
                            <Text style={{ color: Colors.black, fontSize: 13, fontWeight: '400' }}>:  {leadData.leadCreationBasicDetails.firstName} {leadData.leadCreationBasicDetails.middleName} {leadData.leadCreationBasicDetails.lastName}</Text>
                        </View>
                    </View>
                    <View style={{ width: '100%', flexDirection: 'row', marginTop: 11, }}>
                        <View style={{ width: '55%' }}>
                            <Text style={{ color: Colors.dimText, fontSize: 13, fontWeight: '400', marginLeft: 20 }}>{language[0][props.language].str_leadid}</Text>
                        </View>
                        <View style={{ width: '45%' }}>
                            <Text style={{ color: Colors.black, fontSize: 13, fontWeight: '400' }}>:  {leadData.leadNumber}</Text>
                        </View>
                    </View>
                    <View style={{ width: '100%', flexDirection: 'row', marginTop: 11, }}>
                        <View style={{ width: '55%' }}>
                            <Text style={{ color: Colors.dimText, fontSize: 13, fontWeight: '400', marginLeft: 20 }}>{language[0][props.language].str_leadtype}</Text>
                        </View>
                        <View style={{ width: '45%' }}>
                            <Text style={{ color: Colors.black, fontSize: 13, fontWeight: '400' }}>:  Hot</Text>
                        </View>
                    </View>
                    {/* hide */}

                    {visible && <View>
                        <View style={{ width: '100%', flexDirection: 'row', marginTop: 11, }}>
                            <View style={{ width: '55%' }}>
                                <Text style={{ color: Colors.dimText, fontSize: 13, fontWeight: '400', marginLeft: 20 }}>{language[0][props.language].str_approvername}</Text>
                            </View>
                            <View style={{ width: '45%' }}>
                                <Text style={{ color: Colors.black, fontSize: 13, fontWeight: '400' }}>:  </Text>
                            </View>
                        </View>

                        <View style={{ width: '100%', flexDirection: 'row', marginTop: 11, }}>
                            <View style={{ width: '55%' }}>
                                <Text style={{ color: Colors.dimText, fontSize: 13, fontWeight: '400', marginLeft: 20 }}>{language[0][props.language].str_loanamount}</Text>
                            </View>
                            <View style={{ width: '45%' }}>
                                <Text style={{ color: Colors.black, fontSize: 13, fontWeight: '400' }}>:  {leadData.leadCreationLoanDetails.loanAmount}</Text>
                            </View>
                        </View>

                        <View style={{ width: '100%', flexDirection: 'row', marginTop: 11, }}>
                            <View style={{ width: '55%' }}>
                                <Text style={{ color: Colors.dimText, fontSize: 13, fontWeight: '400', marginLeft: 20 }}>{language[0][props.language].str_loantype}</Text>
                            </View>
                            <View style={{ width: '45%' }}>
                                <Text style={{ color: Colors.black, fontSize: 13, fontWeight: '400' }}>:  Business</Text>
                            </View>
                        </View>

                        <View style={{ width: '100%', flexDirection: 'row', marginTop: 11, }}>
                            <View style={{ width: '55%' }}>
                                <Text style={{ color: Colors.dimText, fontSize: 13, fontWeight: '400', marginLeft: 20 }}>{language[0][props.language].str_creationdate}</Text>
                            </View>
                            <View style={{ width: '45%' }}>
                                <Text style={{ color: Colors.black, fontSize: 13, fontWeight: '400' }}>:  15-09-2023</Text>
                            </View>
                        </View>

                        <View style={{ width: '100%', flexDirection: 'row', marginTop: 11, }}>
                            <View style={{ width: '55%' }}>
                                <Text style={{ color: Colors.dimText, fontSize: 13, fontWeight: '400', marginLeft: 20 }}>{language[0][props.language].str_completiondate}</Text>
                            </View>
                            <View style={{ width: '45%' }}>
                                <Text style={{ color: Colors.black, fontSize: 13, fontWeight: '400' }}>:  </Text>
                            </View>
                        </View>

                        <View style={{ width: '100%', flexDirection: 'row', marginTop: 11, }}>
                            <View style={{ width: '55%' }}>
                                <Text style={{ color: Colors.dimText, fontSize: 13, fontWeight: '400', marginLeft: 20 }}>{language[0][props.language].str_ageing}</Text>
                            </View>
                            <View style={{ width: '45%' }}>
                                <Text style={{ color: Colors.black, fontSize: 13, fontWeight: '400' }}>:  0</Text>
                            </View>
                        </View>
                    </View>
                    }
                    <TouchableOpacity onPress={hideAndShow} activeOpacity={10} style={{ marginTop: 20, marginBottom: 9 }}>
                        <View style={{ width: '100%' }}>
                            {visible ? (
                                <AntDesign name='up' size={12} color={Colors.black} />
                            ) : <AntDesign name='down' size={12} color={Colors.black} />}

                        </View>
                    </TouchableOpacity>

                </View>

                <TouchableOpacity onPress={() => alert('hi')} activeOpacity={0.5} style={{ width: '100%', marginTop: '5%', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row' }}>

                        <View style={{ width: '70%', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 16, color: Colors.mediumgrey, marginTop: 5, }}>{language[0][props.language].str_captureddetails}</Text>
                        </View>

                        <View style={{ width: '10%' }}></View>
                        <Entypo name='chevron-right' size={23} color={Colors.darkblack} style={{ marginLeft: 10 }} />

                    </View>
                </TouchableOpacity>

                <View style={styles.line}></View>

                {(status == 'PEND') ? <TouchableOpacity onPress={() => alert('Cant ReAssign')} activeOpacity={0.5} style={{ width: '100%', marginTop: '5%', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row' }}>

                        <View style={{ width: '70%', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 16, color: Colors.lightgrey, marginTop: 5, }}>{language[0][props.language].str_reassign}</Text>
                        </View>

                        <View style={{ width: '10%' }}></View>
                        <Entypo name='chevron-right' size={23} color={Colors.lightgrey} style={{ marginLeft: 10 }} />

                    </View>
                </TouchableOpacity> : <TouchableOpacity onPress={() => props.navigation.navigate('ReAssign')} activeOpacity={0.5} style={{ width: '100%', marginTop: '5%', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row' }}>

                        <View style={{ width: '70%', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 16, color: Colors.mediumgrey, marginTop: 5, }}>{language[0][props.language].str_reassign}</Text>
                        </View>

                        <View style={{ width: '10%' }}></View>
                        <Entypo name='chevron-right' size={23} color={Colors.darkblack} style={{ marginLeft: 10 }} />

                    </View>
                </TouchableOpacity>}

                <View style={styles.line}></View>

                <TouchableOpacity onPress={() => props.navigation.navigate('LeadApproval')} activeOpacity={0.5} style={{ width: '100%', marginTop: '8%', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row' }}>

                        <View style={{ width: '70%', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 16, color: Colors.mediumgrey, marginTop: 5, }}>{language[0][props.language].str_leadapprovals}</Text>
                        </View>

                        <View style={{ width: '10%' }}></View>
                        <Entypo name='chevron-right' size={23} color={Colors.darkblack} style={{ marginLeft: 10 }} />

                    </View>
                </TouchableOpacity>

                <View style={styles.line}></View>

                <TouchableOpacity onPress={() => props.navigation.navigate('LeadLog')} activeOpacity={0.5} style={{ width: '100%', marginTop: '8%', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row' }}>

                        <View style={{ width: '70%', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 16, color: Colors.mediumgrey, marginTop: 5, }}>{language[0][props.language].str_leadlog}</Text>
                        </View>

                        <View style={{ width: '10%' }}></View>
                        <Entypo name='chevron-right' size={23} color={Colors.darkblack} style={{ marginLeft: 10 }} />

                    </View>
                </TouchableOpacity>
            </View>

            <View style={styles.fab}>
                <View
                    style={{

                        marginTop: 10,
                        justifyContent: 'center',
                        alignItems: 'center', marginTop: 90
                    }}>
                    <TouchableOpacity activeOpacity={10} style={styles.disableBg}>
                        <View >
                            <TextComp textVal={language[0][props.language].str_initiateloanapplication.toUpperCase()} textStyle={{ color: Colors.white, fontSize: 13, fontWeight: 500 }} />

                        </View>
                    </TouchableOpacity>
                </View>
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


export default connect(mapStateToProps, mapDispatchToProps)(LeadDetails);

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#f5f8fa',
        alignItems: 'center'
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