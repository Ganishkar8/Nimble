
import { PROFILEDETAIL, DEDUPEDETAIL } from "./ProfileActionType"

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