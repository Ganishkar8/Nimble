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
        <WebView
            originWhitelist={['*']}
            source={{ html: htmlContent }}
            style={{ flex: 1 }}
        />
    );
};

export default CBPreview;