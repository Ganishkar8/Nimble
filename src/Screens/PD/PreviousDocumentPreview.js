import React, { useState, useRef, useEffect, createRef } from 'react';
import {
  Text,
  Image,
  View,
  Dimensions,
  ScrollView,
  StyleSheet,
  BackHandler,
} from 'react-native';
import HeadComp from '../../Components/HeadComp';
import { language } from '../../Utils/LanguageString';
import apiInstance from '../../Utils/apiInstance';
import Colors from '../../Utils/Colors';
import Common from '../../Utils/Common';
import Loading from '../../Components/Loading';
import { languageAction } from '../../Utils/redux/actions/languageAction';
import { connect } from 'react-redux';

const PreviousDocumentPreview = (props, { navigation, route }) => {
  const [imageName, setImageName] = useState(props.route.params.imageName);
  const [fileName, setFileName] = useState('');
  const [imageUri, setImageUri] = useState('');
  const [imageUriprev, setPrevImageUri] = useState('');
  const [currentLatitude, setCurrentLattitude] = useState('');
  const [currentLongitude, setCurrentLongitude] = useState('');
  const [previousGeoLocation, setPreviousGeoLocation] = useState('');
  // const [previousLongitude, setpreviousLongitude] = useState('');
  const [imageHeight, setImageHeight] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPageId, setCurrentPageId] = useState(props.route.params.pageId);
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [apiError, setApiError] = useState('');
  const [fromScreen, setFromScreen] = useState(props.route.params.fromScreen);

  const screenHeight = Dimensions.get('window').height;

  // Calculate half of the screen height
  const halfScreenHeight = screenHeight / 2;


  useEffect(() => {
    props.navigation
      .getParent()
      ?.setOptions({ tabBarStyle: { display: 'none' }, tabBarVisible: false });
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackButton,
    );

    getAllDocuments();

    setPrevImageUri(props.route.params.imageUri);

    setCurrentLongitude(props.route.params.longitude);
    setCurrentLattitude(props.route.params.latitude);

    return () => {
      props.navigation
        .getParent()
        ?.setOptions({ tabBarStyle: undefined, tabBarVisible: undefined });
      backHandler.remove();
    };
  }, [props.navigation]);

  const getAllDocuments = () => {
    const baseURL = global.PORT1;
    setLoading(true);
    var stage = '';
    var pageId = 0;
    var apiName = '';

    if (fromScreen == 'HouseVisit') {
      apiName = 'PDHouseVisit';
      if (global.CLIENTTYPE == 'APPL') {
        if (global.PDSTAGE == 'PD_2') {
          pageId = 11;
        } else if (global.PDSTAGE == 'PD_3') {
          pageId = 48;
        }
      } else if (global.CLIENTTYPE == 'CO-APPL') {
        if (global.PDSTAGE == 'PD_2') {
          pageId = 23;
        } else if (global.PDSTAGE == 'PD_3') {
          pageId = 60;
        }
      } else if (global.CLIENTTYPE == 'GRNTR') {
        if (global.PDSTAGE == 'PD_2') {
          pageId = 35;
        } else if (global.PDSTAGE == 'PD_3') {
          pageId = 72;
        }
      }
    } else {
      apiName = 'PDBusinessVisit';
      if (global.CLIENTTYPE == 'APPL') {
        if (global.PDSTAGE == 'PD_2') {
          pageId = 12;
        } else if (global.PDSTAGE == 'PD_3') {
          pageId = 49;
        }
      } else if (global.CLIENTTYPE == 'CO-APPL') {
        if (global.PDSTAGE == 'PD_2') {
          pageId = 24;
        } else if (global.PDSTAGE == 'PD_3') {
          pageId = 61;
        }
      } else if (global.CLIENTTYPE == 'GRNTR') {
        if (global.PDSTAGE == 'PD_2') {
          pageId = 36;
        } else if (global.PDSTAGE == 'PD_3') {
          pageId = 73;
        }
      }
    }

    if (global.PDSTAGE == 'PD_2') {
      stage = 'PD_1';
    } else if (global.PDSTAGE == 'PD_3') {
      stage = 'PD_2';
    }

    const appDetails = {
      clientId: global.CLIENTID,
      userId: global.USERID,
      pageId: pageId,
      pdLevel: stage,
      loanApplicationNumber: global.LOANAPPLICATIONNUM,
    };


    apiInstance(baseURL)
      .post(`/api/v1/pd/${apiName}`, appDetails)
      .then(response => {
        // Handle the response data
        if (global.DEBUG_MODE)
          console.log('ResponseDataApi::' + JSON.stringify(response.data));

        if (response.status == 200) {
          if (response.data) {
            // setParentDocId(response.data.id);
            // getDocuments([response.data]);
            if (fromScreen == 'HouseVisit') {
              const filteredData = response.data.pdHouseVisitChild.filter(
                item => item.documentType == 'HOU_VIS_IMG',
              );
              getImage(filteredData[0].dmsId);
              setPreviousGeoLocation(filteredData[0].geolocation);
            } else {
              const filteredData = response.data.pdBusinessVisitChild.filter(
                item => item.documentType == 'BUS_VIS_IMG',
              );
              getImage(filteredData[0].dmsId);
              setPreviousGeoLocation(filteredData[0].geolocation);
            }
          }
        } else if (response.data.statusCode === 201) {
          setLoading(false);
          setApiError(response.data.message);
          setErrorModalVisible(true);
        } else if (response.data.statusCode === 202) {
          setLoading(false);
          setApiError(response.data.message);
          setErrorModalVisible(true);
        }
      })
      .catch(error => {
        // Handle the error
        setLoading(false);
        if (global.DEBUG_MODE)
          console.log(
            'ResponseDataApi::' + JSON.stringify(error.response.data),
          );
        if (error.response.status == 404) {
          setApiError(Common.error404);
          setErrorModalVisible(true);
        } else if (error.response.status == 400) {
          setApiError(Common.error400);
          setErrorModalVisible(true);
        } else if (error.response.status == 500) {
          setApiError(Common.error500);
          setErrorModalVisible(true);
        } else if (error.response.data != null) {
          setApiError(error.response.data.message);
          setErrorModalVisible(true);
        }
      });
  };

  const getImage = dmsId => {
    Common.getNetworkConnection().then(value => {
      if (value.isConnected == true) {
        setLoading(true);
        const baseURL = global.PORT2;
        apiInstance(baseURL)
          .get(`/api/documents/document/${dmsId}`)
          .then(async response => {
            setLoading(false);

            // Handle the response data
            if (response.status == 200) {
              console.log(
                'FinalLeadCreationApiResponse::' +
                JSON.stringify(response.data),
              );
              setFileName(response.data.fileName);

              setImageUri(
                'data:image/png;base64,' + response.data.base64Content,
              );

              // props.navigation.navigate('PreviewImage', {
              //   imageName: response.data.fileName,
              //   imageUri:
              //     'data:image/png;base64,' + response.data.base64Content,
              // });
              // props.navigation.navigate('LeadManagement', { fromScreen: 'LeadCompletion' })
            } else if (response.data.statusCode === 201) {
              setApiError(response.data.message);
              setErrorModalVisible(true);
            } else if (response.data.statusCode === 202) {
              setApiError(response.data.message);
              setErrorModalVisible(true);
            }
          })
          .catch(error => {
            // Handle the error
            if (global.DEBUG_MODE)
              console.log(
                'FinalLeadCreationApiResponse::' +
                JSON.stringify(error.response.data),
              );
            setLoading(false);
            if (error.response.status == 404) {
              setApiError(Common.error404);
              setErrorModalVisible(true);
            } else if (error.response.status == 400) {
              setApiError(Common.error400);
              setErrorModalVisible(true);
            } else if (error.response.status == 500) {
              setApiError(Common.error500);
              setErrorModalVisible(true);
            } else if (error.response.data != null) {
              setApiError(error.response.data.message);
              setErrorModalVisible(true);
            }
          });
      } else {
        setApiError(language[0][props.language].str_errinternetimage);
        setErrorModalVisible(true);
      }
    });
  };

  const handleBackButton = () => {
    props.navigation.popToTop();

    // return true; // Prevent default back button behavior
  };

  const onGoBack = () => {
    props.navigation.goBack();
    //return true;
  };

  const getImageSize = uri => {
    Image.getSize(uri, (width, height) => {
      // Calculate the height while maintaining the original aspect ratio
      const screenWidth = Dimensions.get('window').width;
      const aspectRatio = width / height;
      const calculatedHeight = screenWidth / aspectRatio;

      setImageHeight(calculatedHeight);
    });
  };

  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      <View
        style={{
          width: '100%',
          height: 56,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <HeadComp
          textval={language[0].en.str_imageComparison}
          props={props}
          onGoBack={onGoBack}
        />
      </View>
      {loading ? <Loading /> : null}
      <Text
        style={[styles.textStyle, { paddingLeft: '5%', marginBottom: '5%' }]}>
        {fromScreen == 'HouseVisit'
          ? language[0][props.language].str_HouseVisitImage
          : language[0][props.language].str_BusinessVisitImage}
      </Text>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        <View style={{ flex: 1 }}>

          <View style={styles.imgContainer}>
            <Text style={styles.textStyle}>
              {fromScreen == 'HouseVisit'
                ? language[0][props.language].str_currentHouseImage
                : language[0][props.language].str_currentBusinessImage}
            </Text>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#00000080',
              }}>
              {imageUriprev != '' && (
                <Image
                  source={{ uri: imageUriprev }}
                  style={{ width: '100%', height: halfScreenHeight, resizeMode: 'stretch' }}
                />
              )}
            </View>
            <View>
              <Text
                style={{
                  flex: 1,
                  color: Colors.darkblack,
                  fontFamily: 'Poppins-Medium',
                  marginTop: 20,
                }}>
                Geo Location : {currentLatitude} , {currentLongitude}
              </Text>
            </View>
          </View>
          <View style={styles.imgContainer}>
            <Text style={styles.textStyle}>
              {fromScreen == 'HouseVisit'
                ? language[0][props.language].str_prevHouseImage
                : language[0][props.language].str_prevBusinessImage}

            </Text>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#00000080',
              }}>
              {imageUri != '' && (
                <Image
                  source={{ uri: imageUri }}
                  style={{ width: '100%', height: halfScreenHeight, resizeMode: 'stretch' }}
                />
              )}
            </View>
            <View>
              <Text
                style={{
                  color: Colors.darkblack,
                  fontFamily: 'Poppins-Medium',
                  marginTop: '3%',
                }}>
                Geo Location : {previousGeoLocation}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  textStyle: {
    fontSize: 16,
    color: Colors.darkblack,
    fontFamily: 'Poppins-Medium',
    marginTop: 3,
  },
  imgContainer: {
    marginLeft: '5%',
    marginRight: '5%',
  },
  contentContainer: {
    paddingBottom: 50,
    flexGrow: 1,
  },
});

const mapStateToProps = state => {
  const { language } = state.languageReducer;

  return {
    language: language,
  };
};

const mapDispatchToProps = dispatch => ({
  languageAction: item => dispatch(languageAction(item)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PreviousDocumentPreview);
