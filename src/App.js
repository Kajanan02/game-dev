// App.js
import React, {useEffect, useState} from 'react';
import LandingPage from './components/LandingPage';
import CategorySelection from './components/CategorySelection';
import NumberSenseDetails from './components/NumberSenseDetails';
import NumberSenseGame from './components/NumberSenseGame';
import NumberSenseGameAdv from './components/NumberSenseGameAdv';
import FeedbackScreen from './components/FeedbackScreen';
import CountingShapesGame from './components/CountingShapesGame';
import CountingShapesGameAdv from './components/CountingShapesGameAdv';
import Equations from './components/EquationsGame';
import EquationsAdv from './components/EquationsGameAdv';
import Logo from './images/logo.png';
import Arrow from './images/arrow.png';

import BG1 from './images/bgs/1.png';
import BG2 from './images/bgs/2.png';
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";

function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [name, setName] = useState('');
  const [arr, setArr] = useState(false);
  const navigate = useNavigate();
  let location = useLocation();

  console.log(location.pathname)

  useEffect(() => {

    if(["/category-selection","/game-details"].includes(location.pathname) || location.pathname === "/"){
        setArr(false)
    }else {
        setArr(true)
    }

    if(location.pathname === "/"){
      setCurrentPage('landing')
    }else {
        setCurrentPage(location.pathname.replace('/', ''))
    }

   setName(localStorage.getItem('name') || 'number-sense');

  }, [location.pathname]);

  const navigateTo = (page) => {
    console.log(page)
    setCurrentPage(page);
  };

  const pageComponents = {
    'landing': LandingPage,
    'category-selection': CategorySelection,
    'Game Details': NumberSenseDetails,
    'NumberSense': NumberSenseGame,
    'NumberSense-Adv': NumberSenseGameAdv,
    'CountingShapes': CountingShapesGame,
    'CountingShapes-Adv': CountingShapesGameAdv,
    'Equations': Equations,
    'Equations-Adv': EquationsAdv,
    'feedback-screen': FeedbackScreen
  };

  const backgroundsStyle = {
    backgroundImage: currentPage === 'landing' ? `url(${BG2})` : `url(${BG1})`,

  }

  const pageStyle = {
    backgroundSize: 'cover',
    height: '89vh',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 0,
    padding: 0,
  };


  useEffect(() => {
    console.log(currentPage)
  }, [currentPage]);

  const PageComponent = pageComponents[currentPage] || LandingPage;

  return (
      <div style={backgroundsStyle}>
        <div style={{marginLeft:"100px",paddingTop:"20px"}}>
          <div className={"mb-5"}>
            <img className={"cursor-pointer"} onClick={()=> navigate("/")} src={Logo} width={"200px"}/>
          </div>
          {arr &&
              <div style={{display:"flex",alignItems:"center"}}>
                <img onClick={() => navigate(-1)} className={"cursor-pointer"} src={Arrow} width={"50px"}/>
                <span className={"name-tag"}>{name}</span>
              </div>}
        </div>
        <div style={pageStyle}>
          <div>

          </div>
          {/*<PageComponent navigateTo={navigateTo} />*/}
          <Routes>
            <Route path="/" element={<LandingPage/>}/>
            <Route path="/category-selection" element={<CategorySelection/>}/>
            <Route path="/game-details" element={<NumberSenseDetails/>}/>
            <Route path="/number-sense" element={<NumberSenseGame/>}/>
            <Route path="/number-sense-adv" element={<NumberSenseGameAdv/>}/>
            <Route path="/counting-shapes" element={<CountingShapesGame/>}/>
            <Route path="/counting-shapes-adv" element={<CountingShapesGameAdv/>}/>
            <Route path="/equations" element={<Equations/>}/>
            <Route path="/equations-adv" element={<EquationsAdv/>}/>
            <Route path="/feedback-screen" element={<FeedbackScreen/>}/>
          </Routes>
        </div>
      </div>
  );
}

export default App;
