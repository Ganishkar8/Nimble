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
    transforms: [encryptor],
    blacklist: ['mobilecodeReducer'],
}



const persistedReducer = persistReducer(persistConfig, rootReducer)


const serializableCheckMiddleware = store => next => action => {
    // Replace 'MobileCodeAction' with the action type of the reducer you want to skip the check for
    if (action.type === 'MobileCodeAction') {
        return next(action);
    }
    return next(action);
};

// Create the Redux store with middleware
export default () => {
    // Apply the serializableCheckMiddleware to the specific reducers you want
    let store = createStore(persistedReducer, applyMiddleware(thunk, serializableCheckMiddleware));
    let persistor = persistStore(store);
    return { store, persistor };
};

//export default store;