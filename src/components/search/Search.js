import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MyInput from '../my-input/MyInput';
import "./search.scss"
import { closeSearchAction } from '../../store/actions';
import { useHistory } from 'react-router';
import qs from "query-string"
const Search = () => {
    let searchState = useSelector(state => state.searchReducer)
    let languageState = useSelector(state => state.languageReducer)
    let dispatch = useDispatch()
    let dispatchCloseSearch = ()=>dispatch(closeSearchAction())
    let history = useHistory()

    let [content, setContent] = useState("")
    let changeContent=(e)=>{
        setContent(e.target.value)
    }
    let submitSearch=(e)=>{
        e.preventDefault()
        let data = {
            key : content
        }
        let queryString = qs.stringify(data)
        setContent("")
        dispatchCloseSearch()
        history.push({
            pathname : "/search",
            search : "?" + queryString
        })
    }
    return (
        <div className={searchState.isSearch ? "search search-fade-in" : "search search-fade-out"}>
            <form onSubmit={submitSearch}>
                <h1>{languageState.taskbar.search}:</h1>
                <MyInput placeHolder="Search" onChange={changeContent} value={content}/>
            </form>
            <svg onClick={dispatchCloseSearch} style={{color : "white", cursor : "pointer"}} xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-chevron-double-up" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M7.646 2.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 3.707 2.354 9.354a.5.5 0 1 1-.708-.708l6-6z" />
                <path fillRule="evenodd" d="M7.646 6.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 7.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z" />
            </svg>
        </div>
    );
};

export default Search;