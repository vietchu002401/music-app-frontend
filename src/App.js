import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import Aos from "aos"

import "./styles/App.scss"
import "./styles/Button.scss"
import "./styles/title.scss"
import "aos/dist/aos.css"
import 'react-toastify/dist/ReactToastify.css';

import AllRouter from './components/Router/AllRouter';

import Taskbar from './components/taskbar/Taskbar';
import BackToTop from './components/back-to-top/BackToTop';
import Toolbar from './components/tool-bar/Toolbar';
import Search from './components/search/Search';
import { useSelector } from 'react-redux';


const App = () => {
  let fontState = useSelector(state => state.fontReducer)
  useEffect(() => {
    Aos.init({
        duration: 1000,
        offset : 100,
        easing : "linear",
        once : true
    })
}, [])
  useEffect(()=>{
    if(fontState.harryPotterFont){
      document.body.style.fontFamily = "'Harry Potter', sans-serif"
    }else{
      document.body.style.fontFamily = "'Times New Roman', Times, serif"
    }
    return ()=> document.body.style.fontFamily = null
  },[fontState])
  return (
    <Router>
      <AllRouter />
      <Taskbar/>
      <BackToTop/>
      <Toolbar/>
      <Search/>
    </Router>
  );
};

export default App;
