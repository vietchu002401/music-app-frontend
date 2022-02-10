import axios from 'axios';
import React, { useState } from 'react';
import Modal from "react-modal"
import { useSelector } from 'react-redux';
import newsApi from '../../api/newsApi';
import MyInput from '../my-input/MyInput';
import "./LoginModal.scss"

const AddNewsModal = () => {
    let adminState = useSelector(state => state.adminReducer)

    let [modalIsOpen, setIsOpen] = useState(false)
    let [changeClass, setChangeClass] = useState(false)
    let [loader, setLoader] = useState(false)
    let [createError, setCreateError] = useState(false)

    let [header, setHeader] = useState("")
    let [body, setBody] = useState("")
    let [image, setImage] = useState("")
    let [code, setCode] = useState("")

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

    let changeHeader=(e)=>{
        setHeader(e.target.value)
    }
    let changeBody=(e)=>{
        setBody(e.target.value)
    }
    let changeImage=(e)=>{
        setImage(e.target.value)
    }
    let changeCode=(e)=>{
        setCode(e.target.value)
    }

    let submit = async(e) => {
        e.preventDefault()
        setLoader(true)
        setCreateError(false)
        let data ={
            header : header,
            body : body,
            image : image,
            code : code,
            authCode : adminState.code
        }
        await axios.post(process.env.REACT_APP_SERVER_URL + newsApi.crateNews, data)
        .then(res=>{
            console.log(res.data.message)
            setLoader(false)
            setHeader("")
            setBody('')
            setCode('')
            setImage('')
            closeModal()
        }).catch(err=>{
            console.log(err)
            setLoader(false)
            setCreateError(true)
        })
    }
    return (
        <div>
            <button onClick={openModal} className="my-button">Add news</button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                shouldCloseOnOverlayClick={true}
                className={changeClass ? "Modal fadeIn" : "Modal fadeOut"}
                overlayClassName="Overlay"
                ariaHideApp={false}
            >
                <form onSubmit={submit}>
                    <h1>Add NEWS</h1>
                    <div className="song-information">
                        <MyInput onChange={changeHeader} value={header} placeHolder="Header" />
                        <MyInput onChange={changeBody} value={body} placeHolder="Body" />
                        <MyInput onChange={changeImage} value={image} placeHolder="Image url" />
                        <MyInput onChange={changeCode} value={code} placeHolder="Youtube code" />
                    </div>
                    {!loader && createError ? <p style={{color : "red"}}>Create Error, server error</p> : null}
                    {loader ? <div className="loader"></div> : <button className="my-button">Submit</button>}
                </form>
            </Modal>
        </div>
    );
};

export default AddNewsModal;