import types from "../typeAction/typeAction"
let initialState = {
    userData : {
        id : "",
        email: "",
        googleId: "",
        name : "",
        imageUrl : "",
        liked : []
    },
    status : false
}

let userReducer = (state = initialState, action)=>{
    switch(action.type){
        case types.USERLOGIN:
            state.userData = action.item
            state.status = true
            return {...state}
        case types.USERLOGOUT:
            state.userData = {}
            state.status = false
            return {...state}
        case types.ADDTOLIKELIST:
            state.userData.liked = [...state.userData.liked, action.item]
            return {...state}
        case types.REMOVELIKELIST:
            state.userData.liked.splice(state.userData.liked.indexOf(action.item), 1)
            return {...state}
        default:
            return state
    }
}

export default userReducer