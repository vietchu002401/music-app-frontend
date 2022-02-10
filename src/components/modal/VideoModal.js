import React, { useState } from 'react';
import ModalVideo from 'react-modal-video'
import { useDispatch } from 'react-redux';
import { disableAosAction, enableAosAction } from "../../store/actions/index"

import '../../../node_modules/react-modal-video/scss/modal-video.scss';

import "./LoginModal.scss"
import { useHistory } from 'react-router';
import axios from 'axios';
import trendApi from '../../api/trendApi';

let VideoModal = (props) => {

    let history = useHistory()

    let dispatch = useDispatch()
    let dispatchDisableAos = () => dispatch(disableAosAction())
    let dispatchEnableAos = () => dispatch(enableAosAction())

    let [isOpen, setOpen] = useState(false)
    let [showButton, setShowButton] = useState(false)

    let goTo = (isSong, isSoundTrack) => {
        accessContent(isSong, isSoundTrack)
        history.push({
            pathname: "/detail/" + props.id
        })
    }
    let accessContent = (isSong, isSoundTrack) => {
        if (isSong && isSoundTrack) {
            axios.put(process.env.REACT_APP_SERVER_URL + trendApi.accessSong)
            axios.put(process.env.REACT_APP_SERVER_URL + trendApi.accessSoundTrack)
            return
        } else if (isSong && !isSoundTrack) {
            axios.put(process.env.REACT_APP_SERVER_URL + trendApi.accessSong)
            return
        }
        axios.put(process.env.REACT_APP_SERVER_URL + trendApi.accessSoundTrack)
    }

    let openModal = (isSong, isSoundTrack) => {
        setOpen(true)
        dispatchDisableAos()
        accessContent(isSong, isSoundTrack)
    }

    let closeModal = () => {
        setOpen(false)
        setShowButton(false)
        dispatchEnableAos()
    }

    return (
        <div onMouseOver={() => setShowButton(true)} onMouseOut={() => setShowButton(false)} className="video-modal">
            <ModalVideo channel='youtube' autoplay isOpen={isOpen} videoId={props.code} onClose={closeModal} />
            <div style={{ opacity: showButton ? "1" : "0", display: "flex", flexDirection: "column", transition: "0.2s" }} >
                <button className="my-button" onClick={() => openModal(props.isSong, props.isSoundTrack)}>{props.languageState.watchNow}</button>
                <button className="my-button" onClick={()=>goTo(props.isSong, props.isSoundTrack)}>{props.languageState.information}</button>
            </div>
        </div>
    );
};

export default VideoModal;