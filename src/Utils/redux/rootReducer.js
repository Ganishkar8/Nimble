import { combineReducers } from "redux";
import languageReducer from "./reducers/languageReducer";
import profileReducer from "./reducers/profileReducer";
import mobilecodeReducer from "./reducers/mobilecodeReducer";
import personalDiscussionReducer from "./reducers/personalDiscussionReducer";
import pdStagesReducer from "./reducers/pdStagesReducer";
import bankDetailReducer from "./reducers/bankDetailReducer";

const rootReducer = combineReducers({
    languageReducer: languageReducer, profileReducer: profileReducer, mobilecodeReducer: mobilecodeReducer, personalDiscussionReducer: personalDiscussionReducer, pdStagesReducer: pdStagesReducer, bankDetailReducer: bankDetailReducer
});

export default rootReducer;