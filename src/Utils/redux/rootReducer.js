import { combineReducers } from "redux";
import languageReducer from "./reducers/languageReducer";
import profileReducer from "./reducers/profileReducer";
import mobilecodeReducer from "./reducers/mobilecodeReducer";

const rootReducer = combineReducers({
    languageReducer: languageReducer, profileReducer: profileReducer, mobilecodeReducer: mobilecodeReducer
});

export default rootReducer;