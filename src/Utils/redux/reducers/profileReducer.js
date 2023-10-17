import { PROFILEDETAIL } from "../actions/ProfileActionType"


const initialState = {
    profileDetails: [],
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case PROFILEDETAIL: return {
            ...state,
            profileDetails: action.payload,
        };

        default: return state
    }
}
export default profileReducer;