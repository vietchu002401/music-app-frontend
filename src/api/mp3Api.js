import axios from "axios"

let mp3Api = {
    getAllList : "/mp3/get-all-list",
    getById : "/mp3/get-mp3-by-id?id=",
    updateMp3 : "/mp3/update-mp3?",
    addContent : "/mp3/add-content?"
}

export let addContent = async(body, query)=>{
    return await axios.post(process.env.REACT_APP_SERVER_URL + mp3Api.addContent + query, body)
}

export default mp3Api