import React from 'react';
import "./videoCard.scss"

import VideoModal from "../modal/VideoModal"
import {  useSelector } from 'react-redux';

import bg from "../../assets/backgroundImage/error-bg.jpg"
import LikeIcon from '../like/LikeIcon';

const VideoCard = (props) => {

    let languageState = useSelector(state=> state.languageReducer)

    let aosState = useSelector(state => state.aosReducer)
    let userState = useSelector(state => state.userReducer)

    return (
        <div data-aos={aosState.status ? "fade-up" : null} className="video-card">
            <div className="img-card"><img src={props.propsSongData.image && props.propsSongData.image.includes("http") ? props.propsSongData.image : bg} alt="" /></div>
            <p>{languageState.songName} {props.propsSongData.name}</p>
            {props.propsSongData.movie === "No-result" ? <p>{languageState.singer} {props.propsSongData.singer}</p> : <p>{languageState.movie} {props.propsSongData.movie}</p>}
            <VideoModal languageState={languageState} id={props.propsSongData.id} code={props.propsSongData.code} isSong={props.propsSongData.isSong} isSoundTrack={props.propsSongData.isSoundTrack}/>
            {userState.status ? <LikeIcon id={props.propsSongData.id}/> : null}
        </div>
    );
};

export default VideoCard;