import React, { useEffect, useState } from 'react';
import Modal from "react-modal"
import MyInput from '../my-input/MyInput';
import songApi from "../../api/songApi"
import axios from 'axios';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';

const RecommendModal = (props) => {

    let [modalIsOpen, setIsOpen] = useState(false)
    let [changeClass, setChangeClass] = useState(false)
    let [loader, setLoader] = useState(false)
    let [yourName, setYourName] = useState("")
    let [email, setEmail] = useState("")
    let [songName, setSongName] = useState("")
    let [movie, setMovie] = useState("")
    let [info, setInfo] = useState("")
    let [kind, setKind] = useState("")


    let userState = useSelector(state => state.userReducer)

    useEffect(() => {
        setEmail(userState.userData.email)
        setYourName(userState.userData.name)
    }, [userState])

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

    let changeYourName = (e) => {
        setYourName(e.target.value)
    }
    let changeEmail = (e) => {
        setEmail(e.target.value)
    }
    let changeSongName = (e) => {
        setSongName(e.target.value)
    }
    let changeMovie = (e) => {
        setMovie(e.target.value)
    }
    let changeInfo = (e) => {
        setInfo(e.target.value)
    }
    let changeKind = (e) => {
        if (e.target.value === "0") {
            setKind("Song")
        } else if (e.target.value === "1") {
            setKind("Soundtrack")
        } else {
            setKind("Song & Soundtrack")
        }
    }

    let submit = async (e) => {
        e.preventDefault()
        setLoader(true)
        let data = {
            user: yourName,
            email: email,
            songName: songName,
            singer: "singer",
            composer: "composer",
            movie: movie,
            info: info,
            kind: kind
        }
        await axios.post(process.env.REACT_APP_SERVER_URL + songApi.createRecommend, data)
            .then(res => {
                setLoader(false)
                setEmail(userState.userData.email)
                setYourName(userState.userData.name)
                setSongName("")
                setMovie("")
                setInfo("")
                setKind("")
                toast.success("Proposal successful. Please check your email.")
            }).catch(err => {
                console.log(err)
                setLoader(false)
                toast.error("Proposal failed. Please try again later.")
            })
        closeModal()
    }
    return (
        <div style={{ width: "100%" }}>
            <h3 onClick={openModal}>{props.languageState.taskbar.recommend}</h3>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                shouldCloseOnOverlayClick={true}
                className={changeClass ? "Modal fadeIn" : "Modal fadeOut"}
                overlayClassName="Overlay"
                ariaHideApp={false}
            >
                <form onSubmit={submit}>
                    <h1>Recommend song</h1>
                    <div className="song-information">
                        <MyInput onChange={changeYourName} value={yourName} placeHolder="Your name" />
                        <MyInput onChange={changeEmail} value={email} placeHolder="Email" />
                        <MyInput onChange={changeSongName} value={songName} placeHolder="Song name" />
                        <MyInput onChange={changeMovie} value={movie} placeHolder="In anime/movie?" />
                        <MyInput onChange={changeInfo} value={info} placeHolder="Link youtube or some information" />
                        <select className="selection" onChange={changeKind} name="song">
                            <option value="">This is Song or Soundtrack?</option>
                            <option value="0">SONG</option>
                            <option value="1">SOUNDTRACK</option>
                            <option value="2">BOTH</option>
                        </select>
                    </div>
                    {loader ? <div className="loader"></div> : <button className="my-button">Send</button>}
                </form>
            </Modal>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
};

export default RecommendModal;