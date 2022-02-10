import types from "../typeAction/typeAction"

let initialState = {
    isSearch : false,
    content : ""
}

let searchReducer = (state = initialState, action)=>{
    switch(action.type){
        case types.OPENSEARCH:
            state.isSearch = true
            return {...state}
        case types.CLOSESEARCH:
            state.isSearch = false
            return {...state}
        default:
            return state
    }
}

export default searchReducer