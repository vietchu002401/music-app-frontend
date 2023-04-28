import types from "../typeAction/typeAction"

let initialState = {
    status : true
}

let aosReducer = (state = initialState, action)=>{
    switch(action.type){
        case types.DISABLEAOS:
            state.status = false
            return {...state}
        case types.ENABLEAOS:
            state.status = true
            return {...state}
        default:
            return {...state}
    }
}

export default aosReducer