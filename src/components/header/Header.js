import React, { useEffect, useState } from 'react';

import "./header.scss"

import memoria from "../../assets/header-image/memoria.jpg"
import kamado from "../../assets/header-image/kamado.jpg"
import { textColorVar, backgroundVar } from '../../variables/header';
import { useSelector } from 'react-redux';

const Header = () => {
    let languageState = useSelector(state => state.languageReducer)

    let [textColor, setTextColor] = useState(textColorVar.black)
    let [background, setBackground] = useState(backgroundVar.white)

    let changeTextColor=()=>{
        if(textColor === textColorVar.black){
            setTextColor(textColorVar.white)
            setBackground(backgroundVar.black)
        }else{
            setTextColor(textColorVar.black)
            setBackground(backgroundVar.white)
        }
    }

    useEffect(()=>{
        let loop = setInterval(()=>{
            changeTextColor()
        },6000)
        return ()=> clearInterval(loop)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[textColor])

    return (
        <header style={{background: background}} className="header">
            <div className="header__preview">
                <h1 style={{color : textColor}}>{languageState.header.title}</h1>
                <h2 style={{color : textColor}}>{languageState.header.title2}</h2>
                <h2 style={{color : textColor}}>{languageState.header.title3}</h2>
            </div>
            <ImageHeader textColor={textColor}/>
        </header>
    );
};

let ImageHeader = (props) => {

    let [imageSrc, setImageSrc] = useState(memoria)
    let [display, setDisplay] = useState("block")


    useEffect(()=>{
        if(imageSrc === memoria){
            setImageSrc(kamado)
            setDisplay("block")
        }else{
            setImageSrc(memoria)
            setDisplay("block")
        }
        let loop = setInterval(()=>{
            setDisplay("none")
        },5000)
        return ()=> clearInterval(loop)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[props.textColor])

    let renderImage=(imageSrc)=>{
        return <img style={{display : display}} src={imageSrc} alt="" />
    }

    return (
        <div className="header__img">
            {renderImage(imageSrc)}
        </div>
    )
}


export default Header;