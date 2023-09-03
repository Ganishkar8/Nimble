import * as React from 'react';
import {View, Text, Modal} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';


const Loading = () => (
  <Modal transparent={true} animationType={'none'} loading={true}>
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000080',
      }}>
      <View
        style={{
          width: '85%',
          height: 70,
          backgroundColor:'white',
          elevation: 2,
          borderRadius: 4,
          position: 'absolute',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <ActivityIndicator
          size="small"
          style={{marginLeft: 20}}
          animating={true}
          color={'red'}
        />
        <Text style={{color:'gray', marginLeft: 15, fontSize: 16}}>
          Progress...
        </Text>
      </View>
    </View>
  </Modal>
);

export default Loading;
