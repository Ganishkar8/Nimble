import { createStore, applyMiddleware } from 'redux';
import rootReducer from './rootReducer';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { encryptTransform } from 'redux-persist-transform-encrypt';
import 'react-native-get-random-values';
const encryptor = encryptTransform({
    secretKey: 'mydatabase',
    onError: function (error) {
        // Handle the error.
    },
});

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    transforms: [encryptor]
}

const persistedReducer = persistReducer(persistConfig, rootReducer)


//const store = createStore(rootReducer, applyMiddleware(thunk));

export default () => {
    let store = createStore(persistedReducer, applyMiddleware(thunk))
    let persistor = persistStore(store)
    return { store, persistor }
}

//export default store;