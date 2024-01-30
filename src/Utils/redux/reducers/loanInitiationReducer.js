import { ADDLOANINITIATION_DETAIL, UPDATELOANINITIATION_DETAIL, DELETELOANINITIATION_DETAIL } from "../actions/loanInitiationActionType"

const initialState = {
    loanInitiationDetails: [],
};

const loanInitiationReducer = (state = initialState, action) => {
    switch (action.type) {

        case ADDLOANINITIATION_DETAIL:
            return { ...state, loanInitiationDetails: [...state.loanInitiationDetails, action.payload.data] };


        case UPDATELOANINITIATION_DETAIL:
            const { loanData } = action.payload.loanData;
            const existingItemIndex = state.loanInitiationDetails.findIndex(
                item => item.loanApplicationId === action.payload.loanApplicationId
            );

            if (existingItemIndex !== -1) {
                // Update existing item
                return {
                    ...state,
                    loanInitiationDetails: state.loanInitiationDetails.map((item, index) =>
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
                    loanInitiationDetails: [...state.loanInitiationDetails, { id: action.payload.loanApplicationId, loanApplicationNumber: loanData.loanApplicationNumber, tempNumber: loanData.tempNumber, branchId: loanData.branchId, customerCategory: loanData.customerCategory, customerSubcategory: loanData.customerSubcategory, customerType: loanData.customerType, loanType: loanData.loanType, loanPurpose: loanData.loanPurpose, product: loanData.product, loanAmount: loanData.loanAmount, workflowId: loanData.workflowId, consent: loanData.consent, finalConsent: loanData.finalConsent, applicationAppliedBy: loanData.applicationAppliedBy, applicationCreationDate: loanData.applicationCreationDate, lmsApplicationNumber: loanData.lmsApplicationNumber, isManualKyc: loanData.isManualKyc, manualKycStatus: loanData.manualKycStatus, manualKycApprovedBy: loanData.manualKycApprovedBy, manualKycApprovedDate: loanData.manualKycApprovedDate, [action.payload.key]: action.payload.data }],
                };
            }

        case DELETELOANINITIATION_DETAIL:
            return {
                ...state,
                loanInitiationDetails: state.loanInitiationDetails.filter(item =>
                    item.loanApplicationId !== action.payload.loanApplicationId
                ),
            };

        default:
            return state;
    }
};

export default loanInitiationReducer;
