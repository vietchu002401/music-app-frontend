import React from 'react';
import { useHistory } from 'react-router-dom';
import "./mp3Card.scss"

const Mp3Card = (props) => {
    let history = useHistory()
    let goTo=()=>{
        history.push({
            pathname : "/mp3/" + props.data.folder,
            state : props.data.id
        })
    }
    return (
        <div onClick={goTo} className='mp3-card'>
            <div className='mp3-card__img'>
                <img className='card__img' alt='' src={props.data.image} />
            </div>
            <p>{props.data.folder}</p>
        </div>
    );
};

export default Mp3Card;