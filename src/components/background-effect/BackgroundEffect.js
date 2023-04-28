import React, { useEffect } from 'react';
import "./backgroundEffect.scss"

const BackgroundEffect = () => {
    let scrollEvent = () => {
        let div = document.getElementById("1")
        let div2 = document.getElementById("2")
        div.style.top = String(window.scrollY / 5) + "px"
        div2.style.top = String(-window.scrollY / 5) + "px"
    }
    useEffect(() => {
        window.addEventListener("scroll", scrollEvent)
        return () => window.removeEventListener("scroll", scrollEvent)
    }, [])
    return (
        <div className="background-effect">
            <p id="1"></p>
            <p id="2"></p>
        </div>
    )
};

export default BackgroundEffect;