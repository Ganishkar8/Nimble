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
} from 'react-native';

//redux
import { connect } from 'react-redux';
import { languageAction } from '../../Utils/redux/actions/languageAction';
import { language } from '../../Utils/LanguageString';
//
import HeadComp from '../../Components/HeadComp';
import MyStatusBar from '../../Components/ MyStatusBar';
import Colors from '../../Utils/Colors';
import TextComp from '../../Components/TextComp';
import LinearGradient from 'react-native-linear-gradient';
import ButtonViewComp from '../../Components/ButtonViewComp';
import Commonstyles from '../../Utils/Commonstyles';
import { useIsFocused } from '@react-navigation/native';


const data = [

    {
        name: 'Profile Short', id: 1, isSelected: true, nesteddata: [
            {
                nestedName: 'Applicant',
                id: 'AA',
                nestedIsSelected: true,
                subDataIsCompleted: false,
                nestedSubdata: [
                    {
                        name: 'Basic Details',
                        id: 'BD',
                        nestedSubDataIsCompleted: false,
                        parent: 'Applicant',
                    },
                    {
                        name: 'KYC Verification Status',
                        id: 'KVS',
                        nestedSubDataIsCompleted: false,
                        parent: 'Applicant'
                    },
                    {
                        name: 'Personal Details',
                        id: 'PD',
                        nestedSubDataIsCompleted: false,
                        parent: 'Applicant'
                    },
                    {
                        name: 'Address Details',
                        id: 'AD',
                        nestedSubDataIsCompleted: false,
                        parent: 'Applicant'
                    }

                ]
            },
            {
                nestedName: 'Co Applicant',
                id: 'CA',
                nestedIsSelected: false,
                subDataIsCompleted: false,
                nestedSubdata: [
                    {
                        name: 'Basic Details',
                        id: 'BD',
                        nestedSubDataIsCompleted: false,
                        parent: 'CApplicant'
                    },
                    {
                        name: 'KYC Verification Status',
                        id: 'KVS',
                        nestedSubDataIsCompleted: false,
                        parent: 'CApplicant'
                    },
                    {
                        name: 'Personal Details',
                        id: 'PD',
                        nestedSubDataIsCompleted: false,
                        parent: 'CApplicant'
                    },
                    {
                        name: 'Address Details',
                        id: 'AD',
                        nestedSubDataIsCompleted: false,
                        parent: 'CApplicant'
                    }

                ]
            }
        ]
    },
    {
        name: 'CB Check', id: 2, isSelected: false, nesteddata: [
            {
                nestedName: 'Applicant CB Data',
                id: 'AA',
                nestedIsSelected: true
            },
            {
                nestedName: 'Co Applicant CB Data',
                id: 'CA',
                nestedIsSelected: false
            }
        ]
    },
    { name: 'Loan', id: 3, isSelected: false },
    { name: 'BRE', id: 4, isSelected: false }
]

const LoanApplicationMain = (props, { navigation }) => {

    const [labels, setLabels] = useState(data);
    const [subData, setSubData] = useState(labels[0].nesteddata);
    const [nestedSubData, setNestedSubData] = useState(labels[0].nesteddata);
    const [refreshFlatlist, setRefreshFlatList] = useState(false);
    const [selectedData, setSelectedData] = useState(labels[0].name);
    const isScreenVisible = useIsFocused();

    useEffect(() => {

        console.log('NesteSubdata::' + JSON.stringify(labels[0].nesteddata[0].nestedSubdata))
        props.navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' }, tabBarVisible: false });
        return () =>
            props.navigation.getParent()?.setOptions({ tabBarStyle: undefined, tabBarVisible: undefined });
    }, [navigation, isScreenVisible]);


    const nextScreen = () => {
        props.navigation.navigate('ProfileShortBasicDetails')
    }

    const onClickMainList = (item) => {
        let fiterStatusPosition = labels
        for (let i = 0; i < fiterStatusPosition.length; i++) {
            if (fiterStatusPosition[i].id == item.id) {
                fiterStatusPosition[i].isSelected = true
                setSelectedData(fiterStatusPosition[i].name)
                setSubData(fiterStatusPosition[i].nesteddata)
            } else {
                fiterStatusPosition[i].isSelected = false
            }
        }
        setLabels(fiterStatusPosition)
        setRefreshFlatList(!refreshFlatlist)
    }

    const nestedDataClick = (item) => {
        alert(JSON.stringify(item))
    }


    return (

        <View style={{ flex: 1, backgroundColor: '#fefefe' }}>
            <MyStatusBar backgroundColor={'white'} barStyle="dark-content" />
            <View style={{ width: '96%', height: 50, alignItems: 'center' }}>
                <HeadComp textval={language[0][props.language].str_loanapplication} props={props} />
            </View>

            <View style={{ width: '100%', height: 80, backgroundColor: Colors.maroon, marginTop: 10, flexDirection: 'row' }}>
                <View style={{ width: '70%', justifyContent: 'center', marginLeft: 14 }}>
                    <TextComp textVal={language[0][props.language].str_applicationNumber + ': 11079862356'}
                        textStyle={{ color: Colors.black, fontWeight: 500 }} />
                    <TextComp textVal={language[0][props.language].str_applicationStatus + ': 98%'}
                        textStyle={{ color: Colors.dimText, fontWeight: 500 }} />
                </View>
                <View style={{ width: '30%', justifyContent: 'center' }}>
                    <Image source={require('../../Images/loanappimage.png')}
                        style={{ width: 70, height: 100, resizeMode: 'contain' }} />
                </View>

            </View>

            <View style={{ width: '100%', marginTop: 30, alignItems: 'center' }}>
                <FlatList
                    extraData={refreshFlatlist}
                    data={labels}
                    horizontal={true}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity activeOpacity={1} onPress={() => onClickMainList(item)}>
                                <View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <LinearGradient colors={item.isSelected ? (['#D2FF21', '#FAD420', '#FFCE20']) : (['#ECECEC', '#DBDBDB', '#ECECEC'])} style={{
                                            width: 60, height: 60, backgroundColor: Colors.skyBlue, margin: 4, borderRadius: 30,
                                            alignItems: 'center', justifyContent: 'center'
                                        }}>
                                            <View >
                                                <View style={{ width: 40, height: 40, backgroundColor: Colors.white, borderRadius: 30, alignItems: 'center', justifyContent: 'center' }}>
                                                    {item.id == 1 &&
                                                        <Image source={require('../../Images/pro.png')}
                                                            style={{ width: 22, height: 22, resizeMode: 'contain' }} />
                                                    }
                                                    {item.id == 2 &&
                                                        <Image source={require('../../Images/file.png')}
                                                            style={{ width: 22, height: 22, resizeMode: 'contain' }} />
                                                    }
                                                    {item.id == 3 &&
                                                        <Image source={require('../../Images/bag.png')}
                                                            style={{ width: 22, height: 22, resizeMode: 'contain' }} />
                                                    }
                                                    {item.id == 4 &&
                                                        <Image source={require('../../Images/path.png')}
                                                            style={{ width: 22, height: 22, resizeMode: 'contain' }} />
                                                    }
                                                </View>
                                            </View>
                                        </LinearGradient>
                                        {index != labels.length - 1 ? (
                                            <View style={{ marginTop: 23 }}>
                                                <Text style={{ fontWeight: 700 }}>- - -</Text>
                                            </View>
                                        ) : null
                                        }
                                    </View>
                                    <View style={{ alignItems: 'center', marginRight: 5 }}>
                                        <TextComp textVal={item.name}
                                            textStyle={{ color: Colors.black, fontWeight: 200 }} />
                                    </View>
                                    <View style={{ marginLeft: 5 }}>

                                        {item.isSelected ?
                                            (<View style={{ width: 60, height: 3, backgroundColor: Colors.skyBlue, borderRadius: 20, marginTop: 20 }} />) : null}
                                    </View>
                                </View>
                            </TouchableOpacity>

                        )
                    }}
                />
                <View style={{ width: '100%', height: 4, backgroundColor: Colors.skyblue, marginTop: 1 }} />
            </View>

            <View style={{ width: '100%', marginLeft: 20, marginTop: 15 }}>
                <TextComp textVal={selectedData} textStyle={{ color: Colors.black, fontWeight: 500 }} />
            </View>
            <ScrollView showsVerticalScrollIndicator={false}
                contentContainerStyle={{ width: '100%', marginTop: 20, marginLeft: 10, marginBottom: 40 }}>
                <View>
                    <FlatList
                        data={subData}
                        horizontal={false}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => {
                            return (
                                <TouchableOpacity activeOpacity={1} >
                                    <View>
                                        <View style={{ flexDirection: 'row' }}>
                                            <View style={{
                                                width: 25, height: 25, backgroundColor: item.subDataIsCompleted ? Colors.green : Colors.dimText, borderRadius: 15, margin: 10,
                                                alignItems: 'center', justifyContent: 'center'
                                            }}>
                                                <TextComp textVal={index + 1} textStyle={{ color: Colors.white, fontWeight: 500, marginLeft: 2 }} />
                                            </View>
                                            <View style={{ width: '60%', borderWidth: 0.5, borderColor: Colors.dimText, margin: 5, borderRadius: 20, alignItems: 'center', justifyContent: 'center' }}>
                                                <TextComp textVal={item.nestedName} textStyle={{ color: item.subDataIsCompleted ? Colors.skyBlue : Colors.dimText, fontWeight: 500, marginLeft: 2 }} />
                                            </View>
                                        </View>
                                        {item.nestedSubdata ? (
                                            <View style={{ width: 1, height: 30, backgroundColor: item.subDataIsCompleted ? Colors.green : Colors.dimText, marginLeft: 23 }} />
                                        ) : null
                                        }
                                        {/* <View style={{ width: 1, height: 30, backgroundColor: Colors.green, marginLeft: 23 }} /> */}

                                        <FlatList
                                            data={item.nestedSubdata}
                                            keyExtractor={(item, index) => index.toString()}
                                            renderItem={({ item, index }) => {
                                                return (
                                                    <TouchableOpacity activeOpacity={1} onPress={() => nestedDataClick(item)}>
                                                        <View>
                                                            <View style={{ flexDirection: 'row' }}>
                                                                <View style={{
                                                                    width: 10, height: 10, backgroundColor: item.nestedSubDataIsCompleted ? Colors.green : Colors.dimText, borderRadius: 15, margin: 10,
                                                                    alignItems: 'center', justifyContent: 'center', marginLeft: 18
                                                                }}>

                                                                </View>
                                                                <View style={{ width: '60%', margin: 5, borderRadius: 20, justifyContent: 'center' }}>
                                                                    <TextComp textVal={item.name} textStyle={{ color: item.subDataIsCompleted ? Colors.skyBlue : Colors.dimText, fontWeight: 500, marginLeft: 2 }} />
                                                                </View>
                                                            </View>
                                                            {/* {index != subData.length - 1 ? (
                                                            <View style={{ width: 1, height: 30, backgroundColor: Colors.green, marginLeft: 23 }} />
                                                        ) : null
                                                        } */}
                                                            <View style={{ width: 1, height: 30, backgroundColor: item.nestedSubDataIsCompleted ? Colors.green : Colors.dimText, marginLeft: 23 }} />

                                                        </View>
                                                    </TouchableOpacity>

                                                )
                                            }}
                                        />

                                    </View>
                                </TouchableOpacity>

                            )
                        }}
                    />
                </View>
            </ScrollView>
            <ButtonViewComp textValue={language[0][props.language].str_editprofileshort.toUpperCase()} textStyle={{ color: Colors.white, fontSize: 13, fontWeight: 500 }} viewStyle={[Commonstyles.buttonView, { marginBottom: 10 }]} innerStyle={Commonstyles.buttonViewInnerStyle} handleClick={nextScreen} />
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
export default connect(mapStateToProps, mapDispatchToProps)(LoanApplicationMain);


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#f5f8fa',
        alignItems: 'center'
    },

});