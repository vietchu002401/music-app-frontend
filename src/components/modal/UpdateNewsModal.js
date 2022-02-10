import React, { useEffect, useState } from 'react';
import Modal from "react-modal"
import "./LoginModal.scss"
import MyInput from '../my-input/MyInput';

import newsApi from '../../api/newsApi';
import axios from 'axios';

const UpdateNewsModal = (props) => {
    let [modalIsOpen, setIsOpen] = useState(false)
    let [changeClass, setChangeClass] = useState(false)

    let [id, setId] = useState("")
    let [header, setHeader] = useState("")
    let [body, setBody] = useState("")
    let [image, setImage] = useState("")
    let [code, setCode] = useState("")

    useEffect(() => {
        setId(props.newsData.id)
        setHeader(props.newsData.header)
        setBody(props.newsData.body)
        setImage(props.newsData.image)
        setCode(props.newsData.code)
    }, [props])

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

    let changeHeader = (e) => {
        setHeader(e.target.value)
    }
    let changeBody = (e) => {
        setBody(e.target.value)
    }
    let changeImage = (e) => {
        setImage(e.target.value)
    }
    let changeCode = (e) => {
        setCode(e.target.value)
    }


    let handleUpdate = async () => {
        let data = {
            id : id,
            header : header, 
            body : body,
            image :  image,
            code : code
        }
        await axios.post(process.env.REACT_APP_SERVER_URL + newsApi.updateNews, data)
        .then(res=>{
            console.log(res.data.message)
            props.fetchAgain()
            closeModal()
        }).catch(err=>{
            console.log(err)
            closeModal()
        })
    }
    return (
        <div>
            <p onClick={openModal} style={{ backgroundColor: "lightgreen" }}>Edit</p>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                shouldCloseOnOverlayClick={true}
                className={changeClass ? "Modal fadeIn" : "Modal fadeOut"}
                overlayClassName="Overlay"
                ariaHideApp={false}
            >
                <h1>Update Song's Information</h1>
                <div className="song-information">
                    <div className="song-information__field">
                        <h2>ID: {id}</h2>
                    </div>
                    <NewsField change={changeHeader} fieldName={"Header"} field={header} />
                    <NewsField change={changeBody} fieldName={"Body"} field={body.slice(0,40)+"..."} />
                    <NewsField change={changeImage} fieldName={"Image"} field={image.slice(0,40)+ "..."} />
                    <NewsField change={changeCode} fieldName={"Youtube Code"} field={code} />

                </div>
                <button onClick={handleUpdate} className="my-button">Update</button>
            </Modal>
        </div>
    );
};

let NewsField = (props) => {

    let [change, setChange] = useState(false)
    return (
        <div className="song-information__field">
            {change ? <MyInput placeHolder={props.fieldName} onChange={(e) => props.change(e)} /> : <p>{props.fieldName}: {props.field}</p>}
            <svg onClick={() => setChange(!change)} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-pencil-square button-update-icon" viewBox="0 0 16 16">
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
            </svg>
        </div>
    )
}

export default UpdateNewsModal;