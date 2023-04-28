import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import "./detail.scss"
import songApi from "../../api/songApi"
import Video from '../../components/video/Video';
import VideoCard from '../../components/videoCard/VideoCard';
import { useSelector } from 'react-redux';
import LikeIcon from '../../components/like/LikeIcon';
import PageLoading from '../page-loading/PageLoading';
import BackgroundEffect from '../../components/background-effect/BackgroundEffect';
import CommentFrame from '../../components/comment-frame/CommentFrame';
import { setTitle } from '../../custom-function/setTittle';
import { useFetch } from '../../custom-function/useFetch';
import api from '../../custom-function/axios';

const Detail = () => {

    let languageState = useSelector(state => state.languageReducer)

    let params = useParams()
    let history = useHistory()

    let [songData, setSongData] = useState({ lyric: "" })
    let [songList, setSongList] = useState([])
    let [apiData, serverError, loading] = useFetch(process.env.REACT_APP_SERVER_URL + songApi.getSongById + params.id, "GET", null)

    useEffect(() => {
        let setState = ()=>{
            let list = apiData.data.filter(item => {
                return item.id !== params.id
            })
            setSongList([...list.slice(0, 6)])
            setSongData({ ...apiData.data[apiData.data.length - 1] })
        }
        apiData && setState()
        serverError && console.log(serverError)
    }, [apiData, params.id, serverError])
 
    useEffect(() => {
        setTitle(songData.name + " | My Music")
    }, [params.id, songData])

    let goTo = () => {
        history.push({
            pathname: "/"
        })
    }
    return (
        <div className="detail">
            <div className="route">
                <svg onClick={goTo} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-house-door-fill home-icon" viewBox="0 0 16 16">
                    <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5z" />
                </svg>
                <p> / Detail</p>
            </div>
            <h1 data-aos="fade-right">{songData.name}</h1>
            <div className="detail__main">
                <Lyric languageState={languageState} songData={songData} />
                <SongInfo languageState={languageState} params={params} songData={songData} />
            </div>
            <h1 className="title">{languageState.related}</h1>
            <div className="detail__recommend">
                {songList.map((item, index) => {
                    return <VideoCard propsSongData={item} key={index} />
                })}
                {songList.length === 0 ? <h1>{languageState.noResult}</h1> : null}
            </div>
            <CommentFrame />
            <PageLoading loader={loading} />
            <BackgroundEffect />
        </div>
    );
};

let Lyric = (props) => {
    return (
        <div data-aos="fade-right" className="lyric">
            <h1 data-aos="fade-right">{props.languageState.information}</h1>
            <p>{props.languageState.composer} {props.songData.composer}</p>
            <p>{props.languageState.singer} {props.songData.singer}</p>
            <p>{props.languageState.movie} {props.songData.movie}</p>
            <h1 data-aos="fade-right">{props.languageState.lyric}</h1>
            {props.songData.lyric.split("^").map((item, index) => {
                if (item === "") {
                    return <br key={index} />
                } else {
                    return <p key={index}>{item}</p>
                }
            })}
        </div>
    )
}

let SongInfo = (props) => {

    let [description, setDescription] = useState([])
    let [loader, setLoader] = useState(true)
    let userState = useSelector(state => state.userReducer)
    useEffect(() => {
        setLoader(true)
        let fetchData = async () => {
            await api.get(process.env.REACT_APP_API_URL + "&part=snippet,statistics&id=" + props.songData.code)
                .then(res => {
                    let data = res.data.items[0].snippet ? res.data.items[0].snippet.description.split("\n") : []
                    setDescription([...data])
                    setLoader(false)
                }).catch(err => {
                    console.log(err)
                    setLoader(false)
                })
        }
        fetchData()
    }, [props.songData.code])
    return (
        <div className="detail__main__song-info">
            <Video code={props.songData.code} />
            <div className="detail__main__like">
                <div>
                    <p style={{ marginRight: "30px" }}>{props.languageState.goToYoutube}</p>
                    <a href={"https://www.youtube.com/watch?v=" + props.songData.code}> <svg xmlns="http://www.w3.org/2000/svg" color="red" width="30" height="30" fill="currentColor" className="bi bi-youtube" viewBox="0 0 16 16">
                        <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z" />
                    </svg></a>
                </div>
                {userState.status ? <div>
                    <LikeIcon id={props.params.id} />
                    {userState.userData.liked.includes(props.params.id) ? <p>Unlike</p> : <p>Like</p>}
                </div> : null}
            </div>
            <h1 data-aos="fade-right">{props.languageState.description}</h1>
            {description.map((item, index) => {
                if (item.length > 0) {
                    if (item.includes("http")) {
                        let slice = item.indexOf("http")
                        let text = item.slice(0, slice)
                        let link = item.slice(slice, item.length)
                        return <p key={index}>{text}<a href={link}>{link}</a></p>
                    } else {
                        return <p key={index}>{item}</p>
                    }
                } else {
                    return <br key={index} />
                }
            })}
            {loader ? <div className="loader"></div> : null}
        </div>
    )
}

export default Detail;