import React, { useEffect, useState } from 'react';
import "./backToTop.scss"

const BackToTop = () => {
    let [show, setShow] = useState(false)

    useEffect(()=>{
        let scrollEvent = ()=>{
            if(window.scrollY > 0){
                setShow(true)
            }else{
                setShow(false)
            }
        }
        window.addEventListener("scroll",scrollEvent)
        return ()=> window.removeEventListener("scroll",scrollEvent)
    },[])

    let backToTop=()=>{
        window.scrollTo({
            top : 0,
            behavior : "smooth"
        })
    }
    return (
        <div onClick={backToTop} style={{opacity : show ? "1" : "0"}} className="back-to-top">
        </div>
    );
};

export default BackToTop;