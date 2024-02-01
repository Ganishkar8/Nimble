
import { ADDBANK } from './bankActionType';

export const addBank = (parameter) => {
    return {
        type: ADDBANK,
        payload: parameter
    }
}