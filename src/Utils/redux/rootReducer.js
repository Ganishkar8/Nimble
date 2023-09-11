import { combineReducers } from "redux";
import languageReducer from "./reducers/languageReducer";

const rootReducer = combineReducers({
    languageReducer: languageReducer,
});
 
export default rootReducer;