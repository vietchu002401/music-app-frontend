import React, { useEffect, useState } from 'react';
import Modal from "react-modal"
import MyInput from '../my-input/MyInput';
import "./LoginModal.scss"

import songApi from "../../api/songApi"
import axios from 'axios';

const UpdateSongModal = (props) => {

    let [modalIsOpen, setIsOpen] = useState(false)
    let [changeClass, setChangeClass] = useState(false)

    let [id, setId] = useState("")
    let [image, setImage] = useState("")
    let [name, setName] = useState("")
    let [singer, setSinger] = useState("")
    let [composer, setComposer] = useState("")
    let [code, setCode] = useState("")
    let [lyric, setLyric] = useState("")
    let [isSoundTrack, setIsSoundTrack] = useState(false)
    let [isSong, setIsSong] = useState(false)
    let [movie, setMovie] = useState("")

    useEffect(() => {
        setId(props.songInfo.id)
        setImage(props.songInfo.image)
        setName(props.songInfo.name)
        setSinger(props.songInfo.singer)
        setComposer(props.songInfo.composer)
        setCode(props.songInfo.code)
        setLyric(props.songInfo.lyric)
        setIsSoundTrack(props.songInfo.isSoundTrack)
        setIsSong(props.songInfo.isSong)
        setMovie(props.songInfo.movie)
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

    let changeImage=(e)=>{
        setImage(e.target.value)
    }

    let changeName = (e) => {
        setName(e.target.value)
    }
    let changeSinger = (e) => {
        setSinger(e.target.value)
    }
    let changeComposer = (e) => {
        setComposer(e.target.value)
    }
    let changeCode = (e) => {
        setCode(e.target.value)
    }
    let changeLyric = (e) => {
        setLyric(e.target.value)
    }
    let changeIsSoundTrack = (e) => {
        if (e.target.value === "1") {
            setIsSoundTrack(true)
        } else {
            setIsSoundTrack(false)
        }
    }
    let changeIsSong = (e) => {
        if (e.target.value === "1") {
            setIsSong(true)
        } else {
            setIsSong(false)
        }
    }
    let changeMovie = (e) => {
        setMovie(e.target.value)
    }

    let handleUpdate = async() => {
        let data = {
            id: id,
            image : image,
            name: name,
            singer: singer,
            composer: composer,
            code: code,
            lyric: lyric,
            isSoundTrack: isSoundTrack,
            isSong: isSong,
            movie: movie
        }
        await axios.post(process.env.REACT_APP_SERVER_URL + songApi.updateSong, data)
        .then(res=>{
            console.log(res.data.message)
        }).catch(err=>{
            console.log(err)
        })
        props.fetchAgain()
        closeModal()
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
                    <SongField change={changeImage} fieldName={"Image"} field={image} />
                    <SongField change={changeName} fieldName={"Name"} field={name} />
                    <SongField change={changeSinger} fieldName={"Singer"} field={singer} />
                    <SongField change={changeComposer} fieldName={"Composer"} field={composer} />
                    <SongField change={changeCode} fieldName={"Youtube Code"} field={code} />
                    <SongField change={changeLyric} fieldName={"Lyric"} field={lyric.slice(0,40) + "..."} />
                    <SongFieldTrueFalse change={changeIsSoundTrack} fieldName={"Sound Track?"} field={isSoundTrack ? "1" : "0"} />
                    <SongFieldTrueFalse change={changeIsSong} fieldName={"Song?"} field={isSong ? "1" : "0"} />
                    <SongField change={changeMovie} fieldName={"Movie"} field={movie} />

                </div>
                <button onClick={handleUpdate} className="my-button">Update</button>
            </Modal>
        </div>
    );
};

let SongField = (props) => {

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

let SongFieldTrueFalse = (props) => {

    let [change, setChange] = useState(false)

    let selection = (fieldName) => {
        return (
            <select onChange={(e) => props.change(e)} name="song" value={props.field}>
                <option value="">is {fieldName}?</option>
                <option value="1">TRUE</option>
                <option value="0">FALSE</option>
            </select>
        )
    }
    return (
        <div className="song-information__field">
            {change ? selection(props.fieldName) : <p>{props.fieldName}: {props.field}</p>}
            <svg onClick={() => setChange(!change)} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-pencil-square button-update-icon" viewBox="0 0 16 16">
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
            </svg>
        </div>
    )
}

export default UpdateSongModal;