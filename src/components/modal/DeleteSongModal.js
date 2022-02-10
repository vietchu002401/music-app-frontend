import axios from 'axios';
import React, { useState } from 'react';
import Modal from "react-modal"
import "./LoginModal.scss"

const DeleteSongModal = (props) => {
    let [modalIsOpen, setIsOpen] = useState(false)
    let [changeClass, setChangeClass] = useState(false)

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
    let handleDelete=async(api,id)=>{
        await axios.delete(process.env.REACT_APP_SERVER_URL + api.deleteSong + id)
        .then(res=>{
            closeModal()
            props.fetchAgain()
        }).catch(err=>{
            console.log(err)
        })
    }

    return (
        <div>
            <p onClick={openModal} style={{ backgroundColor: "red" }}>Delete</p>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                shouldCloseOnOverlayClick={true}
                className={changeClass ? "Modal fadeIn" : "Modal fadeOut"}
                overlayClassName="Overlay"
                ariaHideApp={false}
            >
                <h1>Are you sure...?</h1>
                <div className="song-delete">
                    <button onClick={()=>handleDelete(props.api,props.id)} className="my-button">Yes</button>
                    <button onClick={closeModal} className="my-button">No</button>
                </div>
            </Modal>
        </div>
    );
};

export default DeleteSongModal;