import { ADDBANK } from "../actions/bankActionType";


const initialState = {
    bankDetails: [],
}

const bankDetailReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADDBANK: return {
            bankDetails: action.payload,
        };
        default: return state
    }
}
export default bankDetailReducer;