import React, { useEffect, useMemo, useState } from 'react';
import "./home.scss"

import ListVideoCard from '../../components/list-video-card/ListVideoCard';
import VideoCard from '../../components/videoCard/VideoCard';

import bg from "../../assets/backgroundImage/texture-old-faded-vintage-paper-beige-retro-background-grunge-paper-with-spots-streaks_213524-157.jpg"
import video from "../../assets/video/ep19.mp4"
import songApi from "../../api/songApi"
import newsApi from "../../api/newsApi"
import Loading from '../../components/loading/Loading';
import PageLoading from '../page-loading/PageLoading';
import NewsCard from '../../components/news-card/NewsCard';
import { useHistory } from 'react-router';
import BackgroundEffect from '../../components/background-effect/BackgroundEffect';
import { useSelector } from 'react-redux';
import { setTitle } from '../../custom-function/setTittle';
import { useFetch } from '../../custom-function/useFetch';
import api from '../../custom-function/axios';

const Home = () => {

    let languageState = useSelector(state => state.languageReducer)

    let [allSong, setAllSong] = useState([])
    let [slice, setSlice] = useState(12)
    let [loaderMore, setLoaderMore] = useState(false)

    let url = process.env.REACT_APP_SERVER_URL + songApi.getAll + 12
    let [apiData, serverError, loading] = useFetch(url, "GET", null)

    useEffect(() => {
        setTitle("My Music")
    }, [])

    useEffect(() => {
        apiData && setAllSong([...apiData.data])
        serverError && console.log(serverError)
    }, [apiData, serverError])

    let loadMore = async () => {
        let newSlice = slice + 12
        setSlice(slice + 12)
        setLoaderMore(true)

        await api.get(process.env.REACT_APP_SERVER_URL + songApi.getAll + newSlice)
            .then(res => {
                setAllSong([...res.data.data])
                setLoaderMore(false)
            }).catch(err => {
                console.log(err)
                setLoaderMore(false)
            })
    }

    let computerRenderVideoCard = (allSong) => {
        return allSong.map((item, index) => {
            return <VideoCard key={index} propsSongData={item} />
        })
    }

    let renderVideoCard = useMemo(()=> computerRenderVideoCard(allSong), [allSong])
    return (
        <div className="home">
            <ListVideoCard languageState={languageState} title={languageState.mostView} percent={false} />
            <div data-aos="fade-out" style={{ backgroundImage: "url(" + bg + ")" }} className="title">
                <h1 style={{ textAlign: "center" }}>{languageState.newest}</h1>
            </div>
            <div className="main-home">
                {renderVideoCard}
                {loaderMore ? <Loading /> : null}
                {!loading && allSong.length === 0 ? <h1>{languageState.noResult}</h1> : null}
            </div>
            <button style={{ display: allSong.length < slice ? "none" : "block" }} onClick={loadMore} className="my-button">{languageState.loadMore}</button>
            <ListVideoCard languageState={languageState} title={languageState.mostQuality} percent={true} />
            <MostLoved loader={loading} languageState={languageState} />
            <News languageState={languageState} />
            <PageLoading loader={loading} />
            <BackgroundEffect />
        </div>
    );
};

let News = (props) => {
    let { languageState } = props
    useEffect(() => {
        let video = document.getElementById("myVideo")
        video.play()
        return () => video.pause()
    }, [])

    let [list, setList] = useState([])
    let url = process.env.REACT_APP_SERVER_URL + newsApi.getNews
    let [apiData, serverError] = useFetch(url, "GET", null)

    useEffect(() => {
        let setState = () => {
            let list = apiData.data.reverse()
            setList([...list])
        }
        apiData && setState()
        serverError && console.log(serverError)
    }, [apiData, serverError])
    return (
        <div className="video-background">
            <video autoPlay muted loop id="myVideo">
                <source src={video} type="video/mp4" />
            </video>
            <div className="video-background__news">
                <h1>{languageState.introduce.title}</h1>
                <div>
                    <p>{languageState.introduce.content1}</p>
                    <p>{languageState.introduce.content2}</p>
                </div>
            </div>
            <div className="video-background__link">
                {list.map((item, index) => {
                    return <NewsCard item={item} key={index} />
                })}
            </div>
        </div>
    )
}

let MostLoved = (props) => {

    let [topLoved, setTopLoved] = useState([])
    let history = useHistory()
    let url = process.env.REACT_APP_SERVER_URL + songApi.getTopLoved + "?slice=6"
    let [apiData, serverError] = useFetch(url, "GET", null)

    useEffect(() => {
        apiData && setTopLoved([...apiData.data])
        serverError && console.log(serverError)
    }, [apiData, serverError])

    let goTo = () => {
        history.push({
            pathname: "/top-loved"
        })
    }
    return (
        <div>
            <div data-aos="fade-out" style={{ backgroundImage: "url(" + bg + ")" }} className="title">
                <h1 style={{ textAlign: "center" }}>{props.languageState.mostLoved}</h1>
            </div>
            <div className="main-home">
                {topLoved.map((item, index) => {
                    return <VideoCard key={index} propsSongData={item} />
                })}
                {props.loader ? <Loading /> : null}
                {!props.loader && topLoved.length === 0 ? <h1>{props.languageState.noResult}</h1> : null}
            </div>
            <button onClick={goTo} className="my-button">{props.languageState.seeMore}</button>
        </div>
    )
}

export default Home;