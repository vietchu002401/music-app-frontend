import types from "../typeAction/typeAction"
let initialState = {
    harryPotterFont : true
}

let fontReducer = (state = initialState, action)=>{
    switch(action.type){
        case types.CHANGEFONT:
            state.harryPotterFont = ! state.harryPotterFont
            return {...state}
        default:
            return state
    }
}

export default fontReducer