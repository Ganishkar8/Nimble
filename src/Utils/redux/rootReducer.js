import { combineReducers } from "redux";
import languageReducer from "./reducers/languageReducer";
import profileReducer from "./reducers/profileReducer";
import mobilecodeReducer from "./reducers/mobilecodeReducer";
import personalDiscussionReducer from "./reducers/personalDiscussionReducer";
import pdStagesReducer from "./reducers/pdStagesReducer";
import loanInitiationReducer from "./reducers/loanInitiationReducer";

const rootReducer = combineReducers({
    languageReducer: languageReducer, profileReducer: profileReducer, mobilecodeReducer: mobilecodeReducer, personalDiscussionReducer: personalDiscussionReducer, pdStagesReducer: pdStagesReducer, loanInitiationReducer: loanInitiationReducer
});

export default rootReducer;