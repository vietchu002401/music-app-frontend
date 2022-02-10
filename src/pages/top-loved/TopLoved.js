import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import songApi from '../../api/songApi';
import BackgroundEffect from '../../components/background-effect/BackgroundEffect';
import Loading from '../../components/loading/Loading';
import VideoCard from '../../components/videoCard/VideoCard';
import { setTitle } from '../../custom-function/setTittle';
import { useFetch } from '../../custom-function/useFetch';
import PageLoading from '../page-loading/PageLoading';
import "../search-page/searchPage.scss"


const TopLoved = () => {

    let history = useHistory()

    let [topLoved, setTopLoved] = useState([])
    let [loader, setLoader] = useState(true)
    let [slice, setSlice] = useState(9)

    let url = process.env.REACT_APP_SERVER_URL + songApi.getTopLoved + "?slice=" + String(slice)
    let [apiData, serverError, loadMore] = useFetch(url, "GET", null, slice)

    useEffect(() => {
        let setState = () => {
            if (serverError) {
                console.log(serverError)
                setLoader(false)
                return
            }
            setTopLoved([...apiData.data])
            setLoader(false)
        }
        !loadMore && setState()
    }, [apiData, serverError, loadMore])

    useEffect(() => {
        setTitle("Top Loved | My Music")
    }, [])

    let goTo = () => {
        history.push({
            pathname: "/"
        })
    }
    return (
        <div className="search-page">
            <div className="search-page__route">
                <svg onClick={goTo} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-house-door-fill home-icon" viewBox="0 0 16 16">
                    <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5z" />
                </svg>
                <p> / Top Loved</p>
            </div>
            <h1>Top Loved list</h1>
            <div className="search-page__main">
                {topLoved.map((item, index) => {
                    return <VideoCard key={index} propsSongData={item} />
                })}
                {loadMore ? <Loading/> : null}
                {topLoved.length === 0 && !loader ? <h1>List Empty</h1> : null}
            </div>
            <button onClick={() => setSlice(slice + 9)} style={{ display: slice > topLoved.length ? "none" : "block" }} className="my-button">Load More</button>
            <PageLoading loader={loader} />
            <BackgroundEffect />
        </div>
    );
};

export default TopLoved;