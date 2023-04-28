import React, { memo, useEffect, useState } from 'react';
import SlickSlider from "../slickSlider/SlickSlider"
import "./listVideoCard.scss"
import songApi from "../../api/songApi"
import bg from "../../assets/backgroundImage/texture-old-faded-vintage-paper-beige-retro-background-grunge-paper-with-spots-streaks_213524-157.jpg"
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import { useFetch } from '../../custom-function/useFetch';
import api from '../../custom-function/axios';

const ListVideoCard = (props) => {

    let [allSongs, setAllSongs] = useState([])
    let [mostView, setMostView] = useState([])
    let [slide, setSlide] = useState([])

    let url = process.env.REACT_APP_SERVER_URL + songApi.getAll + "999999999"
    let [apiData, serverError, loading] = useFetch(url, "GET", null)

    useEffect(()=>{
        apiData && setAllSongs([...apiData.data])
        serverError && console.log(serverError)
    },[apiData, serverError])

    useEffect(() => {
        let fetchData = async (item) => {
            await api.get(process.env.REACT_APP_API_URL + "&part=snippet,statistics&id=" + item.code)
                .then(res => {
                    let arrange = props.percent ? Number(res.data.items[0].statistics.likeCount) / Number(res.data.items[0].statistics.viewCount) : Number(res.data.items[0].statistics.viewCount)
                    let newData = {
                        id: item.id,
                        code: item.code,
                        name: item.name,
                        singer: item.singer,
                        arrange: arrange,
                        imageUrl : res.data.items[0].snippet.thumbnails.maxres ? res.data.items[0].snippet.thumbnails.maxres.url : res.data.items[0].snippet.thumbnails.high.url
                    }
                    let arr = mostView
                    arr.push(newData)
                    setMostView([...arr])
                    let arrSort = arr.sort((a, b) => {
                        return (-a.arrange + b.arrange)
                    }).map((item, index) => {
                        return <VideoInfo key={index} url={item.imageUrl} id={item.id}/>
                    })

                    setSlide([...arrSort])
                }).catch(err => {
                    console.log(err)
                })
        }
        allSongs.forEach((item) => {
            fetchData(item)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [allSongs])
    
    return (
        <div style={{position : "relative"}}>
            <div data-aos="fade-out" style={{ backgroundImage: "url(" + bg + ")" }} className="title">
                <h1 style={{ textAlign: "center" }}>{props.title}</h1>
            </div>
            <SlickSlider slideToShow={3} content={[...slide.slice(0,6)]} />
            {serverError ? <h1>{props.languageState.noResult}</h1> : null}
            {loading ? <div className="loader"></div> : null}
        </div>
    );
};

let VideoInfo = (props) => {
    let [show, setShow] = useState(false)
    let history = useHistory()

    let languageState = useSelector(state => state.languageReducer)
  
    let goTo=()=>{
        history.push({
            pathname : "/detail/" + props.id
        })
    }
    return (
        <div
            onMouseOver={() => setShow(true)}
            onMouseOut={() => setShow(false)}
            className="video-info"
        >
            <img alt="" src={props.url} />
            <button style={{ opacity: show ? "1" : "0" }} className="my-button"  onClick={goTo}>{languageState.information}</button>
        </div>
    )
  }

export default memo(ListVideoCard);