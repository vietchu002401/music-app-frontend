import React, { useState } from 'react';
import "./LoginModal.scss"
import Modal from 'react-modal';
import { GoogleLogin, GoogleLogout } from 'react-google-login';




const LoginModal = () => {
    let [modalIsOpen, setIsOpen] = useState(false)
    let [changeClass, setChangeClass] = useState(false)
    let [isLogged, setIsLogged] = useState(true)


    let openModal = () => {
        setIsOpen(true);
        setChangeClass(true)
    }

    let closeModal = () => {
        setChangeClass(false)
        setTimeout(() => {
            setIsOpen(false);
        }, 500)
    }

    let responseGoogle = (response) => {
        console.log(response.profileObj);
        closeModal()
        setIsLogged(true)
    }
    let logout=()=>{
        closeModal()
        setIsLogged(false)
    }

    return (
        <div style={{ width: "100%" }}>
            {isLogged ? <GoogleLogout
                clientId={process.env.REACT_APP_LOGIN_KEY}
                buttonText="Logout"
                onLogoutSuccess={logout}
            /> : <h3 onClick={openModal}>Login</h3>}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                shouldCloseOnOverlayClick={true}
                className={changeClass ? "Modal fadeIn" : "Modal fadeOut"}
                overlayClassName="Overlay"
                ariaHideApp={false}
            >
                <GoogleLogin
                    clientId={process.env.REACT_APP_LOGIN_KEY}
                    buttonText="Login with Google"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={true}
                />
            </Modal>
        </div>
    );
};


export default LoginModal;