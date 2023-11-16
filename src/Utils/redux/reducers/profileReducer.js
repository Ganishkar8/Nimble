import { PROFILEDETAIL, DEDUPEDETAIL } from "../actions/ProfileActionType"


const initialState = {
    profileDetails: [],
    dedupeDetails: [],
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case PROFILEDETAIL: return {
            ...state,
            profileDetails: action.payload,
        };

        case DEDUPEDETAIL: return {
            ...state,
            dedupeDetails: action.payload,
        };

        default: return state
    }
}
export default profileReducer;