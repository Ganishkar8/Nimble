
import { ADDPD_DETAIL, ADD_TRAVEL_DETAILS, UPDATE_TRAVEL_DETAILS, DELETE_TRAVEL_DETAILS } from "./PersonalDiscussionActionType"

export const addPdDetails = (data) => {
    return {
        type: ADDPD_DETAIL,
        payload: { data },
    }
}

export const addTravelDetails = (loanApplicationId, key, data) => {
    return {
        type: ADD_TRAVEL_DETAILS,
        payload: { loanApplicationId, key, data },
    }
}

export const updateTravelDetails = (loanApplicationId, key, updatedDetails) => {
    return {
        type: UPDATE_TRAVEL_DETAILS,
        payload: { loanApplicationId, key, updatedDetails },
    }
}

export const deleteTravelDetails = (loanApplicationId) => {
    return {
        type: DELETE_TRAVEL_DETAILS,
        payload: { loanApplicationId },
    }
}

export const deleteOfficerTravelDetails = (loanApplicationId, index) => {
    return {
        type: DELETE_OFFICERTRAVEL_DETAILS,
        payload: { loanApplicationId, index },
    }
}