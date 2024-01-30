
import { ADDLOANINITIATION_DETAIL, UPDATELOANINITIATION_DETAIL, DELETELOANINITIATION_DETAIL } from "./loanInitiationActionType"

export const addLoanInitiationDetails = (data) => {
    return {
        type: ADDLOANINITIATION_DETAIL,
        payload: { data },
    }
}

export const updateLoanInitiationDetails = (loanApplicationId, loanData, key, updatedDetails) => {
    return {
        type: UPDATELOANINITIATION_DETAIL,
        payload: { loanApplicationId, loanData, key, updatedDetails },
    }
}

export const deleteLoanInitiationDetails = (loanApplicationId) => {
    return {
        type: DELETELOANINITIATION_DETAIL,
        payload: { loanApplicationId },
    }
}
