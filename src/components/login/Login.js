import axios from "axios"
import React, { useState } from "react"
import "./login.scss"

let Login = (props) => {

    let [username, setUsername] = useState("")
    let [password, setPassword] = useState("")

    let handleUsername = (e) => {
        setUsername(e.target.value)
    }

    let handlePassword = (e) => {
        setPassword(e.target.value)
    }

    let handleLogin = async(e) => {
        e.preventDefault()
        let data = {
            username : username,
            password : password
        }
        await axios.post(process.env.REACT_APP_SERVER_URL + props.api, data)
        .then(res=>{
            props.handleLogin({...res.data})
        }).catch(err=>{
            console.log(err)
        })
        setUsername("")
        setPassword("")
    }
    return (
        <div>
            <h2 className="modal__title">Admin Login</h2>
            <form onSubmit={(e)=>handleLogin(e)} className="modal__form">
                <div>
                    <h4>Username</h4>
                    <input onChange={handleUsername} type="text" placeholder="Username" value={username}/>
                </div>
                <div>
                    <h4>Password</h4>
                    <input onChange={handlePassword} type="password" placeholder="Password" value={password}/>
                </div>
                <button className="my-button">
                    Login
                </button>
            </form>
        </div>
    )
}

export default Login