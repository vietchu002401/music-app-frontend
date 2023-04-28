import React from "react"
import { useHistory } from "react-router-dom"
import "./newsCard.scss"
let NewsCard = (props) => {
    let history = useHistory()
    let goTo = () => {
        history.push({
            pathname: "/news/" + props.item.id
        })
    }
    return (
        <div onClick={goTo} data-aos="fade-up" className="news-card">
            <p>{props.item.header ? props.item.header : null}</p>
        </div>
    )
}

export default NewsCard