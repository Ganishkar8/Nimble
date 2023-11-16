import { MOBILECODEDETAIL } from "../actions/MobileCodeActionType";


const initialState = {
    mobileCodeDetails: [],
}

const mobilecodeReducer = (state = initialState, action) => {
    switch (action.type) {
        case MOBILECODEDETAIL: return {
            ...state,
            mobileCodeDetails: action.payload,
        };
        default: return state
    }
}
export default mobilecodeReducer;