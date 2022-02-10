import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RecommendModal from '../modal/RecommendModal';
import "./toolbar.scss"
import { openSearchAction, changeFontAction, userLoginAction, userLogoutAction, enableVietnameseAction, enableEnglishAction } from "../../store/actions/index"
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import axios from 'axios';
import userApi from "../../api/userApi"
import { useHistory } from 'react-router-dom';
import vietnam from "../../assets/header-image/vietnam.png"
import england from "../../assets/header-image/england.png"

const Toolbar = () => {

    let dispatch = useDispatch()
    let dispatchSearch = () => dispatch(openSearchAction())
    let dispatchChangeFont = () => dispatch(changeFontAction())
    let dispatchUserLogin = (item) => dispatch(userLoginAction(item))
    let dispatchUserLogout = () => dispatch(userLogoutAction())
    let dispatchEnableVietnamese = ()=> dispatch(enableVietnameseAction())
    let dispatchEnableEnglish = ()=> dispatch(enableEnglishAction())

    let userState = useSelector(state => state.userReducer)
    let fontState = useSelector(state => state.fontReducer)
    let adminState = useSelector(state => state.adminReducer)
    let languageState = useSelector(state => state.languageReducer)
    let history = useHistory()

    let [isLogged, setIsLogged] = useState(false)

    let responseGoogle = (response) => {
        let data = {
            googleId: response.profileObj.googleId,
            imageUrl: response.profileObj.imageUrl
        }
        new Promise(async () => {
            try {
                await axios.post(process.env.REACT_APP_SERVER_URL + userApi.getUser, data)
                    .then(res => {
                        let data = {
                            id: res.data.data.id,
                            email: response.profileObj.email,
                            googleId: response.profileObj.googleId,
                            name: response.profileObj.givenName,
                            imageUrl: res.data.data.imageUrl,
                            liked: res.data.data.liked
                        }
                        dispatchUserLogin(data)
                        setIsLogged(true)
                    }).catch(err => {
                        console.log(err)
                    })
            } catch (err) {
                console.log(err)
            }
        })
    }

    let logout = () => {
        setIsLogged(false)
        dispatchUserLogout()
    }

    return (
        <div className="tool-bar">
            <div className="toolbar__directional"></div>
            {userState.status ? <UserData languageState={languageState} name={userState.userData.name} imageUrl={userState.userData.imageUrl} /> : null}
            <h3 onClick={dispatchSearch}>{languageState.taskbar.search}</h3>
            {fontState.harryPotterFont ? <h3 onClick={dispatchChangeFont}>{languageState.taskbar.disable}</h3> : <h3 onClick={dispatchChangeFont}>{languageState.taskbar.enable}</h3>}
            <RecommendModal languageState={languageState} />
            {adminState.isAdmin && adminState.code === process.env.REACT_APP_CODE ? <h3 onClick={() => history.push({ pathname: "/admin/manage/all-songs" })}>Go to admin manager</h3> : null}
            <h3 onClick={() => history.push({ pathname: "/mp3" })}>{languageState.taskbar.listMp3}</h3>
            {isLogged ? <GoogleLogout
                clientId={process.env.REACT_APP_LOGIN_KEY}
                buttonText="Logout"
                onLogoutSuccess={logout}
            /> : < GoogleLogin
                clientId={process.env.REACT_APP_LOGIN_KEY}
                buttonText="Login with Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
            />}
            <ChangeLanguage dispatchEnableEnglish={dispatchEnableEnglish} dispatchEnableVietnamese={dispatchEnableVietnamese} languageState={languageState}/>
        </div>
    );
};

let UserData = (props) => {
    let [showMenu, setShowMenu] = useState(false)
    let closeMenu = () => {
        setShowMenu(false)
    }
    return (
        <div className="toolbar__user-info">
            <div style={{ backgroundImage: "url(" + props.imageUrl + ")" }} className="user-info__img"></div>
            <p>{props.name}</p>
            <svg onClick={() => setShowMenu(!showMenu)} xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-three-dots-vertical menu-icon" viewBox="0 0 16 16">
                <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
            </svg>
            {showMenu ? <UserMenu languageState={props.languageState} closeMenu={closeMenu} /> : null}
        </div>
    )
}

let UserMenu = (props) => {
    let history = useHistory()
    let goTo = () => {
        props.closeMenu()
        history.push({
            pathname: "/favorites-list"
        })
    }
    return (
        <div className="user-info__menu">
            <p onClick={goTo}>{props.languageState.taskbar.favorite}</p>
        </div>
    )
}

let ChangeLanguage = (props) => {
    
    return (
        <div className='change-language'>
            <p>{props.languageState.changeLanguage}</p>
            <div>
                <img alt='' src={vietnam} onClick={()=> props.dispatchEnableVietnamese()}/>
                <img alt='' src={england} onClick={()=> props.dispatchEnableEnglish()}/>
            </div>
        </div>
    )
}

export default Toolbar;