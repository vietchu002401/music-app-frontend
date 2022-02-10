import types from "../typeAction/typeAction"

let initialState = {
    isAdmin : false,
    code : ""
}

let adminReducer=(state = initialState, action)=>{
    switch(action.type){
        case types.ADMINLOGIN:
            state.isAdmin = true
            state.code = action.item
            return {...state}
        case types.ADMINLOGOUT:
            state.isAdmin = false
            state.code = ""
            return {...state}
        default:
            return {...state}
    }
}

export default adminReducer