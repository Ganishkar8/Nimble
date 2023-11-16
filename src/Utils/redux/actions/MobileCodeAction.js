
import { MOBILECODEDETAIL } from "./MobileCodeActionType"

export const MobileCodeAction = (parameter) => {
    return {
        type: MOBILECODEDETAIL,
        payload: parameter
    }
}