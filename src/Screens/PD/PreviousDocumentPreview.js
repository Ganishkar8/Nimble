import React, { useState, useRef, useEffect, createRef } from 'react';
import { Text, Image, View, Dimensions, ScrollView, StyleSheet, BackHandler } from 'react-native';
import HeadComp from '../../Components/HeadComp';
import { language } from '../../Utils/LanguageString';
import apiInstance from '../../Utils/apiInstance';


const PreviousDocumentPreview = (props, { navigation, route }) => {
    const [imageName, setImageName] = useState(props.route.params.imageName);
    const [imageUri, setImageUri] = useState(props.route.params.imageUri);
    const [imageHeight, setImageHeight] = useState(null);
    const [loading, setLoading] = useState(false);
    const [currentPageId, setCurrentPageId] = useState(props.route.params.pageId);
    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [apiError, setApiError] = useState('');   

    useEffect(() => {
        props.navigation
            .getParent()
            ?.setOptions({ tabBarStyle: { display: 'none' }, tabBarVisible: false });
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);

        getImageSize(props.route.params.imageUri);
        checkGeo();
        return () => {
            props.navigation.getParent()?.setOptions({ tabBarStyle: undefined, tabBarVisible: undefined });
            backHandler.remove();
        }
    }, [props.navigation]);

    const handleBackButton = () => {
        onGoBack();
        return true; // Prevent default back button behavior
    };

    const onGoBack = () => {
        props.navigation.replace('HouseDocumentUpload', { clientType: global.CLIENTTYPE })
        //return true;
    }

    const getImageSize = (uri) => {
        Image.getSize(uri, (width, height) => {
            // Calculate the height while maintaining the original aspect ratio
            const screenWidth = Dimensions.get('window').width;
            const aspectRatio = width / height;
            const calculatedHeight = screenWidth / aspectRatio;

            setImageHeight(calculatedHeight);
        });
    };

    const checkGeo = () => {

        const baseURL = global.PORT1;
        setLoading(true)

        const appDetails = {
            "clientId": global.CLIENTID,
            "userId": global.USERID,
            "pageId": currentPageId,
            "pdLevel": global.PDSTAGE,
            "loanApplicationNumber": global.LOANAPPLICATIONNUM,
            "date":global.date,
            "g2":global.g2,
            "subcode":global.subcode
        }

        apiInstance(baseURL).post(`/api/v1/pd/PDHouseVisit/checkGeo`, appDetails)
            .then((response) => {
                // Handle the response data
                if (global.DEBUG_MODE) console.log("ResponseDataApi::" + JSON.stringify(response.data));

                if (response.status == 200) {
                    if (response.data === '') {
                        alert('empty')
                    } else {
                        alert(JSON.stringify(response.data))
                    }

                }
                else if (response.data.statusCode === 201) {
                    setLoading(false)
                    setApiError(response.data.message);
                    setErrorModalVisible(true);
                } else if (response.data.statusCode === 202) {
                    setLoading(false)
                    setApiError(response.data.message);
                    setErrorModalVisible(true);
                }

            })
            .catch((error) => {
                // Handle the error
                setLoading(false)
                if (global.DEBUG_MODE) console.log("ResponseDataApi::" + JSON.stringify(error.response.data));
                if (error.response.status == 404) {
                    setApiError(Common.error404);
                    setErrorModalVisible(true)
                } else if (error.response.status == 400) {
                    setApiError(Common.error400);
                    setErrorModalVisible(true)
                } else if (error.response.status == 500) {
                    setApiError(Common.error500);
                    setErrorModalVisible(true)
                } else if (error.response.data != null) {
                    setApiError(error.response.data.message);
                    setErrorModalVisible(true)
                }
            });
    }

    return (
        <View style={{ backgroundColor: 'white', flex: 1 }}>

            <View style={{width: '100%', height: 56, alignItems: 'center', justifyContent: 'center'}}>
                <HeadComp  props={props} onGoBack={onGoBack} />
            </View>

            <ScrollView style={styles.scrollView}
                // textval={language[0][props.language].str_imageComparison}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled">
            </ScrollView>
        </View>
    );
};



const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
    },
    contentContainer: {
        paddingBottom: 50,
        flexGrow: 1,
        backgroundColor: 'white'
    },
});

export default PreviousDocumentPreview;