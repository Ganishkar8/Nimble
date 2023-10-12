import { combineReducers } from "redux";
import languageReducer from "./reducers/languageReducer";
import profileReducer from "./reducers/profileReducer";

const rootReducer = combineReducers({
    languageReducer: languageReducer, profileReducer: profileReducer
});

export default rootReducer;