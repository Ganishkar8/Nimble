
import { PROFILEDETAIL, DEDUPEDETAIL, DELETE_ALL_DEDUPE_DETAILS } from "./ProfileActionType"

export const profileAction = (parameter) => {
    return {
        type: PROFILEDETAIL,
        payload: parameter
    }
}

export const dedupeAction = (parameter) => {
    return {
        type: DEDUPEDETAIL,
        payload: parameter
    }
}

export const deleteDedupe = () => {
    return {
        type: DELETE_ALL_DEDUPE_DETAILS,
    }
}