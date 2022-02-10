import React, { useEffect, useState } from 'react';
import "./mp3Detail.scss"
import "../mp3-page/mp3Page.scss"
import BackgroundEffect from '../../components/background-effect/BackgroundEffect';
import Footer from "../../components/footer/Footer"
import { useHistory, useLocation, useParams } from 'react-router-dom';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { Scrollbars } from 'react-custom-scrollbars';
import mp3Api from '../../api/mp3Api';
import { setTitle } from '../../custom-function/setTittle';
import { useFetch } from '../../custom-function/useFetch';

const Mp3Detail = () => {
    let history = useHistory()
    let params = useParams()
    let location = useLocation()
    let [display, setDisplay] = useState("block")
    let [playing, setPlaying] = useState(null)
    let [mp3Data, setMp3Data] = useState([])
    let [mainPic, setMainPic] = useState("")

    let url = process.env.REACT_APP_SERVER_URL + mp3Api.getById + location.state
    let [apiData, serverError, loading] = useFetch(url, "GET", null, location.state)

    useEffect(() => {
        if (!loading) {
            setTimeout(() => {
                setDisplay("none")
            }, 3000)
            return
        }
        setDisplay("flex")
    }, [loading])

    useEffect(()=>{
        let setState = ()=>{
            setMp3Data(apiData.data[0].list)
            setMainPic(apiData.data[0].image)
        }
        apiData && setState()
        serverError && console.log(serverError)
    },[apiData, serverError])

    useEffect(() => {
        setTitle(params.folder + " | My Music")
    }, [params])

    let goHome = () => {
        history.push(
            {
                pathname: "/"
            }
        )
    }

    let chooseSong = (src) => {
        setPlaying(src)
    }
    return (
        <div>
            <div onClick={goHome} className='mp3-go-to'>
                <p> &gt;&gt;&gt; Go to homepage &lt;&lt;&lt; </p>
            </div>
            <div className='mp3-detail-page'>
                <div className='mp3-list'>
                    <h1>List</h1>
                    <h1>{params.folder}</h1>
                    <Scrollbars style={{height: "600px"}}>
                        {mp3Data.map((item, index) => {
                            return <Mp3Song songData={item} key={index} chooseSong={chooseSong} playing={playing} />
                        })}
                    </Scrollbars>
                </div>
                <div className='mp3-main-pic'>
                    <img alt='' src={mainPic} />
                </div>
                <BackgroundEffect />
                <div style={{ display: display }} className={!loading ? "mp3-loading" : "mp3-load"}>
                    {loading ? <h1>Loading</h1> : null}
                </div>
            </div>
            <Footer />
            {playing && <MyAudioPlayer playing={playing} />}
        </div>
    );
};

let Mp3Song = (props) => {
    return (
        <div onClick={() => props.chooseSong(props.songData.src)} style={props.playing === props.songData.src ? { backgroundColor: "#ee688e" } : null} className='mp3-field'>
            {props.playing === props.songData.src ? <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-pause-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path d="M5 6.25a1.25 1.25 0 1 1 2.5 0v3.5a1.25 1.25 0 1 1-2.5 0v-3.5zm3.5 0a1.25 1.25 0 1 1 2.5 0v3.5a1.25 1.25 0 1 1-2.5 0v-3.5z" />
            </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-play-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445z" />
            </svg>}
            <p>{props.songData.name}</p>
        </div>
    )
}

let MyAudioPlayer = (props) => {
    return (
        <div className='my-mp3-player'>
            <AudioPlayer
                autoPlay
                src={props.playing}
            />
        </div>
    )
}

export default Mp3Detail;