
import { PROFILEDETAIL } from "./ProfileActionType"

export const profileAction = (parameter) => {
    return {
        type: PROFILEDETAIL,
        payload: parameter
    }
}