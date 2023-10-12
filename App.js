/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-gesture-handler'
import React from 'react';
import { Provider } from 'react-redux';
import store from './src/Utils/redux/store';
import AppContainer from './src/Routes/Routes';
import './src/Utils/Global';
import { ModalPortal } from 'react-native-modals';
import { PaperProvider } from 'react-native-paper';


const App = () => {
  return (
    <Provider store={store}>
      <PaperProvider>
        <AppContainer />
      </PaperProvider>
      <ModalPortal />
    </Provider>
  );
};

export default App;