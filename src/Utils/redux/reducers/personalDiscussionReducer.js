import { ADDPD_DETAIL, UPDATEPD_DETAIL, DELETEPD_DETAIL, ADD_TRAVEL_DETAILS, UPDATE_TRAVEL_DETAILS, DELETE_TRAVEL_DETAILS, DELETE_OFFICERTRAVEL_DETAILS } from "../actions/PersonalDiscussionActionType"

const initialState = {
    pdDetails: [],
};

const personalDiscussionReducer = (state = initialState, action) => {
    switch (action.type) {

        case ADDPD_DETAIL:
            return { ...state, pdDetails: [...state.pdDetails, action.payload.data] };


        case ADD_TRAVEL_DETAILS:
            const { loanApplicationId, travelDetails } = action.payload.data;
            const existingItemIndex = state.pdDetails.findIndex(
                item => item.loanApplicationId === action.payload.loanApplicationId
            );

            if (existingItemIndex !== -1) {
                // Update existing item
                return {
                    ...state,
                    pdDetails: state.pdDetails.map((item, index) =>
                        index === existingItemIndex
                            ? {
                                ...item,
                                [action.payload.key]: { ...(item[action.payload.key] || {}), ...action.payload.data },
                            }
                            : item
                    ),
                };
            } else {
                // Add new item
                return {
                    ...state,
                    pdDetails: [...state.pdDetails, { loanApplicationId: action.payload.loanApplicationId, [action.payload.key]: action.payload.data }],
                };
            }

        case UPDATE_TRAVEL_DETAILS:
            return {
                ...state,
                pdDetails: state.pdDetails.map(item =>
                    item.loanApplicationId === action.payload.loanApplicationId
                        ? { ...item, [action.payload.key]: action.payload.updatedDetails }
                        : item
                ),
            };

        case DELETE_TRAVEL_DETAILS:
            return {
                ...state,
                pdDetails: state.pdDetails.filter(item =>
                    item.loanApplicationId !== action.payload.loanApplicationId
                ),
            };

        case DELETE_OFFICERTRAVEL_DETAILS:
            return {
                ...state,
                pdDetails: state.pdDetails.map((item) =>
                    item.loanApplicationId === action.payload.loanApplicationId
                        ? {
                            ...item,
                            [action.payload.key]: {
                                ...item[action.payload.key],
                                OfficerList: item[action.payload.key].OfficerList.filter(
                                    (officer, index) => index !== action.payload.index
                                ),
                            },
                        }
                        : item
                ),
            };

        default:
            return state;
    }
};

export default personalDiscussionReducer;
