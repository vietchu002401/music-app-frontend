import types from "../typeAction/typeAction"
import vietnamese from "../../language/vietnam.json"
import english from "../../language/english.json"

let initialState = english

let languageReducer = (state = initialState, action)=>{
    switch(action.type){
        case types.VIETNAMESE:
            state = vietnamese
            return {...state}
        case types.ENGLISH:
            state = english
            return {...state}
        default:
            return state
    }
}

export default languageReducer