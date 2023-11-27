/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-gesture-handler'
import React from 'react';
import { Provider } from 'react-redux';
import reduxStore from './src/Utils/redux/store';
import AppContainer from './src/Routes/Routes';
import './src/Utils/Global';
import { ModalPortal } from 'react-native-modals';
import { PaperProvider } from 'react-native-paper';
import { PersistGate } from 'redux-persist/integration/react'

const App = () => {

  const { store, persistor } = reduxStore();

  return (
    <Provider store={store}>
      <PaperProvider>
        <PersistGate loading={null} persistor={persistor}>
          <AppContainer />
        </PersistGate>
      </PaperProvider>
      <ModalPortal />
    </Provider>
  );
};

export default App;