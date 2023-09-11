import { CHANGELANGUANGE } from '../actions/languageActionType';


const initialState = {
    language: 'en'
 }

 const languageReducer = (state = initialState, action) => {
    switch (action.type) {
       case CHANGELANGUANGE: return {
          ...state, 
          language: action.payload
       }
       
       default: return state
    }
 }
 export default languageReducer;