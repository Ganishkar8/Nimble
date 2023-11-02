
import React from 'react';
import { Text, StyleSheet } from 'react-native';

const CustomText = ({ children }) => {
    return (
        <Text style={styles.text}>{children}</Text>
    );
};

const styles = StyleSheet.create({
    text: {
        fontFamily: 'PoppinsRegular',
        backgroundColor: '#fff', color: '#000'// Replace with your desired font family
    },
});

export default CustomText;