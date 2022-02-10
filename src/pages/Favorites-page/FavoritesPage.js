import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import "../search-page/searchPage.scss"
import userApi from "../../api/userApi"
import VideoCard from '../../components/videoCard/VideoCard';
import { useHistory } from 'react-router';
import PageLoading from '../page-loading/PageLoading';
import BackgroundEffect from '../../components/background-effect/BackgroundEffect';
import { setTitle } from '../../custom-function/setTittle';
import { useFetch } from '../../custom-function/useFetch';

const FavoritesPage = () => {

    let [list, setList] = useState([])

    let userState = useSelector(state => state.userReducer)
    let history = useHistory()

    const body = {
        liked: userState.userData.liked ? [...userState.userData.liked] : []
    }
    let url = process.env.REACT_APP_SERVER_URL + userApi.getFavorites

    let [apiData, serverError, loading] = useFetch(url, "post", {...body})

    useEffect(() => {
        let setState = () => {
            if (apiData.status) {
                setList([...apiData.data])
            }
        }
        apiData && setState()
        serverError && console.log(serverError)
    }, [apiData, serverError])

    useEffect(() => {
        if (!userState.status) {
            history.push({
                pathname: "/"
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userState])

    useEffect(() => {
        setTitle("Favorites | My Music")
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
                <p> / Favorites</p>
            </div>
            <h1>Favorites list</h1>
            <div className="search-page__main">
                {list.map((item, index) => {
                    return <VideoCard key={index} propsSongData={item} />
                })}
                {loading ? <div className="loader"></div> : null}
                {list.length === 0 && !loading ? <h1>List Empty</h1> : null}
            </div>
            <PageLoading loader={loading} />
            <BackgroundEffect />
        </div>
    );
};

export default FavoritesPage;