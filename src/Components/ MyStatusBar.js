import  React ,{useEffect,useState}from 'react';
import {View, Text, Modal,StatusBar,SafeAreaView,StyleSheet} from 'react-native';


const MyStatusBar = ({backgroundColor, ...props}) => (
    <View style={[styles.statusBar, { backgroundColor }]}>
      <SafeAreaView>
        <StatusBar  backgroundColor={backgroundColor} {...props} />
      </SafeAreaView>
    </View>
  );
export default MyStatusBar;

const styles = StyleSheet.create({

})