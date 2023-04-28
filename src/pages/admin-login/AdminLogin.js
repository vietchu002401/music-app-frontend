import React from 'react';

import bg from "../../assets/backgroundImage/bg_pc.jpg"
import Login from '../../components/login/Login';
import adminApi from "../../api/adminApi"
import { useDispatch } from 'react-redux';
import { adminLogin } from '../../store/actions';
import { useHistory } from 'react-router';

const AdminLogin = () => {

    let history = useHistory()

    let dispatch = useDispatch()
    let dispatchAdminLogin = (item)=> dispatch(adminLogin(item))

    let handleLogin =(response)=>{
        if(response.message === process.env.REACT_APP_CODE){
            dispatchAdminLogin(response.message)
            history.push({
                pathname : "/admin/manage/all-songs"
            })
        }
    }
   
    return (
        <div style={{ backgroundImage: "url(" + bg + ")", maxWidth: "600px", margin: "50px auto", padding: "20px", borderRadius: "20px" }}>
            <Login api={adminApi.loginApi} handleLogin={handleLogin}/>
        </div>
    )
};

export default AdminLogin;