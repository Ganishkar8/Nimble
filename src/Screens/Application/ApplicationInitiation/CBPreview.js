import React, { useEffect, useState } from 'react';
import { WebView } from 'react-native-webview';
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
import { useIsFocused } from '@react-navigation/native';
import HeadComp from '../../../Components/HeadComp';
import { language } from '../../../Utils/LanguageString';
import { languageAction } from '../../../Utils/redux/actions/languageAction';
import { connect } from 'react-redux';

const CBPreview = (props) => {
    const [htmlContent, setHtmlContent] = useState(props.route.params.htmlcontent);
    const isScreenVisible = useIsFocused();

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

    return (
        <View style={{ flex: 1 }}>
            <View
                style={{
                    width: '100%',
                    height: 56,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#fff'
                }}>

                <HeadComp
                    textval={props.route.params.header + ' : CB Report'}
                    props={props}
                    onGoBack={onGoBack}
                />
            </View>
            <WebView
                originWhitelist={['*']}
                source={{ html: htmlContent }}
                style={{ flex: 1 }}
            />
        </View>
    );
};

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
)(CBPreview);
