
import { ADDLOANINITIATION_DETAIL, UPDATELOANINITIATION_DETAIL, UPDATE_CLIENT_DETAIL, UPDATENESTED_CLIENT_DETAIL, DELETENESTED_CLIENT_DETAIL, DELETELOANINITIATION_DETAIL, DELETE_CLIENT_DETAIL, DELETEADDRESSNESTED_CLIENT_DETAIL } from "./loanInitiationActionType"

export const addLoanInitiationDetails = (data) => {
    return {
        type: ADDLOANINITIATION_DETAIL,
        payload: { data },
    }
}

export const updateLoanInitiationDetails = (loanApplicationId, loanData, key, clientId, data) => {
    return {
        type: UPDATELOANINITIATION_DETAIL,
        payload: { loanApplicationId, loanData, key, clientId, data },
    }
}

export const updateClientDetails = (loanApplicationId, clientId, key, data) => {
    return {
        type: UPDATE_CLIENT_DETAIL,
        payload: { loanApplicationId, clientId, key, data },
    }
}

export const updateNestedClientDetails = (loanApplicationId, clientId, key, nestedKey, data) => {
    return {
        type: UPDATENESTED_CLIENT_DETAIL,
        payload: { loanApplicationId, clientId, key, nestedKey, data },
    }
}

export const updateAsyncNestedClientDetails = (loanApplicationId, clientId, key, nestedKey, data) => {
    return (dispatch, getState) => {
        // Perform asynchronous operation (e.g., API call)
        return new Promise((resolve, reject) => {
            // Simulating asynchronous operation with setTimeout
            setTimeout(() => {
                // Dispatch an action to update the nested client details
                dispatch({
                    type: UPDATENESTED_CLIENT_DETAIL,
                    payload: { loanApplicationId, clientId, key, nestedKey, data }
                });
                resolve(); // Resolve the promise once the operation is completed
            }, 1000); // Simulating a delay of 1 second
        });
    };
};

export const deleteNestedClientDetails = (loanApplicationId, clientId, key, nestedKey, id) => {
    return {
        type: DELETENESTED_CLIENT_DETAIL,
        payload: { loanApplicationId, clientId, key, nestedKey, id },
    }
}

export const deleteAddressNestedClientDetails = (loanApplicationId, clientId, key, nestedKey, type) => {
    return {
        type: DELETEADDRESSNESTED_CLIENT_DETAIL,
        payload: { loanApplicationId, clientId, key, nestedKey, type },
    }
}

export const deleteLoanInitiationDetails = (loanApplicationId) => {
    return {
        type: DELETELOANINITIATION_DETAIL,
        payload: { loanApplicationId },
    }
}

export const deleteClientDetails = (loanApplicationId, clientId, key) => {
    return {
        type: DELETE_CLIENT_DETAIL,
        payload: { loanApplicationId, clientId, key },
    }
}
