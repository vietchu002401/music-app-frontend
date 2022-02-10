import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import "./pageLoading.scss"

const PageLoading = (props) => {
    let languageState = useSelector(state => state.languageReducer)
    let [display, setDisplay] = useState("flex")
    let [count, setCount] = useState(0)
    useEffect(() => {
        if (!props.loader) {
            setTimeout(() => {
                setDisplay("none")
            }, 3000)
            return
        }
        let interval = setInterval(() => {
            setCount(count + 1)
        }, 1000)
        if(count > 4){
            clearInterval(interval)
        }
        setDisplay("flex")
        return ()=> clearInterval(interval)
    }, [props.loader, count])
    return (
        <div style={{ display: display }} className={!props.loader ? "background-page" : "background-page-loading"}>
            {props.loader ? <h1>{languageState.loading}</h1> : null}
            {count > 4 &&
                <div className='taisho__message'>
                    <div className='taisho__talk'>
                        <strong>In the first load it maybe take a few time, please wait. Reload page is <strong style={{ color: "red" }}>not</strong> recommend.</strong>
                    </div>
                </div>}
        </div>
    );
};

export default PageLoading;