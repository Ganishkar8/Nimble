
import { CHANGELANGUANGE } from './languageActionType';

export const languageAction = (parameter) => {
    return {
       type: CHANGELANGUANGE,
       payload: parameter
    }
 }