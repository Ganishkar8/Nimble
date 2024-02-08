import { PROFILEDETAIL, DEDUPEDETAIL, DELETE_ALL_DEDUPE_DETAILS } from "../actions/ProfileActionType"


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

        case DELETE_ALL_DEDUPE_DETAILS:
            return {
                ...state,
                dedupeDetails: [],
            };

        default: return state
    }
}
export default profileReducer;