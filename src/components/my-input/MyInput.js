import React from 'react';
import "./myInput.scss"

const MyInput = (props) => {
    return (
        <div className="group">
            <input onChange={(e)=>props.onChange(e)} type="text" required value={props.value}/>
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>{props.placeHolder}</label>
        </div>
    );
};

export default MyInput;