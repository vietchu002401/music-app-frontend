import { combineReducers } from "redux";
import aosReducer from "./aosReducer";
import adminReducer from "./adminReducer"
import searchReducer from "./searchReducer"
import fontReducer from "./fontReducer"
import userReducer from "./userReducer"
import languageReducer from "./languageReducer"

let myReducers = combineReducers({
    aosReducer : aosReducer,
    adminReducer : adminReducer,
    searchReducer : searchReducer,
    fontReducer : fontReducer,
    userReducer : userReducer,
    languageReducer : languageReducer
})

export default myReducers