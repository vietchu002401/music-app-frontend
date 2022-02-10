import types from "../typeAction/typeAction"

export let disableAosAction = ()=>{
    return {
        type : types.DISABLEAOS
    }
}

export let enableAosAction = ()=>{
    return {
        type : types.ENABLEAOS
    }
}

export let adminLogin=(item)=>{
    return {
        type : types.ADMINLOGIN,
        item
    }
}

export let adminLogout=()=>{
    return {
        type : types.ADMINLOGOUT
    }
}

export let openSearchAction=()=>{
    return {
        type : types.OPENSEARCH
    }
}

export let closeSearchAction=()=>{
    return {
        type : types.CLOSESEARCH
    }
}

export let changeFontAction=()=>{
    return {
        type : types.CHANGEFONT
    }
}

export let userLoginAction=(item)=>{
    return{
        type : types.USERLOGIN,
        item
    }
}

export let userLogoutAction=(item)=>{
    return{
        type : types.USERLOGOUT,
        item
    }
}

export let addLikeListAction=(item)=>{
    return{
        type : types.ADDTOLIKELIST,
        item
    }
}
export let removeLikeListAction=(item)=>{
    return{
        type : types.REMOVELIKELIST,
        item
    }
}

export let enableVietnameseAction = ()=>{
    return {
        type : types.VIETNAMESE
    }
}

export let enableEnglishAction = ()=>{
    return {
        type : types.ENGLISH
    }
}
