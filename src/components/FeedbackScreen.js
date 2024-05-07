import React, { useEffect, useState } from 'react';
import REWARDS from '../images/bgs/reward.png';
import {useNavigate} from "react-router-dom";

function FeedbackScreen() {


  const [isNextLevel, setIsNextLevel] = useState(false);
  const [nextLevel, setNextLevel] = useState(null);
  const [isHinted, setIsHinted] = useState(false);
  const answersGame = localStorage.getItem('correctAnswers');
  const tryAgain = localStorage.getItem('try-again');
  const [youtubeVideo, setYoutubeVideo] = useState(null);

  const navigateTo = useNavigate()

  useEffect(() => {
    const gameType = localStorage.getItem('GameType');
    const isHint = localStorage.getItem('isHint');
    const ssore = localStorage.getItem('correctAnswers');

    console.log(isHint);
    setIsHinted(isHint);

    if(gameType === 'number-sense'){
      setIsNextLevel(true);
      setNextLevel('/number-sense-adv');
    }else if(gameType === 'counting-shapes'){
      setIsNextLevel(true);
      setNextLevel('/counting-shapes-adv');
    }else if(gameType === 'equations'){
      setIsNextLevel(true);
      setNextLevel('/equations-adv')
    }
    const correctAnswers = localStorage.getItem('correctAnswers');
    const timeTaken = localStorage.getItem('time');
    console.log(correctAnswers, timeTaken);
  }, []);

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '30px',
    margin: 'auto',
    width: 'calc(100vw - 800px)',
    height:  'calc(100vh - 200px)',
    fontFamily: 'Comic Sans MS, cursive',
    borderRadius: '10px',
    background: '#F0FAFC',
  };
  
  const buttonStyle = {
    fontSize: 'calc(1vw)',
    color: '#2C4B06',
    fontWeight: 900,
    marginBottom: '10px',
    backgroundColor: 'transparent',
    padding: '10px 20px',
    borderRadius: '8px',
    cursor: 'pointer',
    border: '2px solid #2C4B06',
    transition: 'background-color 0.3s ease',
    fontFamily: 'sans-serif',
    marginTop: '50px',
    fontsize: '26px',
  };

  const inlineContainerStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    width: '80%',
    marginTop: '-10px',
    boxSizing: 'border-box',
    alignItems: 'center',
  };

  const videoContainerStyle = {
    width: '50%',
    height: '100px',
    marginBottom: '30px',
    marginTop: '10px',
  };

  function feedBackTittle(hint, score) {
    if(!hint && score == 5) {
      return 'Congratulations!'
    } else {
        return 'Good Job!'
    }
  }


  useEffect(() => {
    const isHinting = localStorage.getItem('isHint');
    const scoring = localStorage.getItem('correctAnswers');

    if(!isHinting && scoring >2) {
      setYoutubeVideo("https://www.youtube.com/embed/xzZLdYd78_8?si=DOpNaWAeWFSu1En3")
    }else if(scoring ===5 && isHinting) {
      setYoutubeVideo("https://www.youtube.com/embed/upRDLVueGB4?si=gMseL8XNNdPwMNZs")
    }else if(isHinting && scoring >2) {
        setYoutubeVideo("https://www.youtube.com/embed/Qt1WyNpWhJA?si=RvS0LYuUzYVp-6gd")
    }else {
      setYoutubeVideo(null)
    }



  }, []);

  function feedBackFeed(hint, score) {
    if(!hint && score >2) {
      return 'You haven’t used the Hint!'
    }else if(!hint && score <3) {
      // setTryAgain(true)
        return 'You can try again!'
    }else if(hint && score ==5) {
        return 'All the answers are correct!'
    } else if(hint && score >2) {
      if(!isNextLevel){
        return "Great Job!"
      }
        return 'Try the next level!'
    }else {
      // setTryAgain(false)
        return 'You can try again!'
    }

  }

  return (
    <div>
    {isNextLevel && <div style={containerStyle}>
      <h2 style={{color:'#2C4B06',fontSize:30,fontFamily:"sans-serif",fontWeight:700}}>{feedBackTittle(isHinted,answersGame)}</h2>
      {/* Add feedback details and rewards here */}
      <div style={inlineContainerStyle}>
        <p style={{color:'#2C4B06',fontSize:24,fontFamily:"sans-serif",fontWeight:700}}>Score: {localStorage.getItem('correctAnswers')}/5</p>
        {/*<p>Overall Points: {localStorage.getItem('points')}</p>*/}
        <p style={{color:'#2C4B06',fontSize:24,fontFamily:"sans-serif",fontWeight:700}}>Time taken: {localStorage.getItem('time')} sec</p>
      </div>
      <div style={inlineContainerStyle}>
        <img src={REWARDS} alt="Rewards" style={{ width: '60px', height: '60px', marginTop:'20px' }} />
        {
          <p style={{ width: '300px', fontSize: '22px', fontWeight: 400,marginTop:'40px', textAlign: 'center',color:'#2C4B06',fontFamily:"sans-serif"}}>{feedBackFeed(isHinted,answersGame)}</p>
        }
        <img src={REWARDS} alt="Rewards" style={{ width: '60px', height: '60px', marginTop:'20px' }} />
      </div>
      <div style={inlineContainerStyle}>
        {youtubeVideo &&<p style={{color: '#2C4B06', fontFamily: "sans-serif", marginTop: '30px'}}>Watch this video as a reward</p>}
      </div>
      {/* Embed YouTube video */}
      {youtubeVideo && <div style={videoContainerStyle}>
        <iframe
            width="100%"
            height="auto"
            src={youtubeVideo} // autoplay
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
        ></iframe>
      </div>}
      <div style={inlineContainerStyle}>
        {isNextLevel && <button onClick={() => {
          console.log(feedBackFeed(isHinted,answersGame))
          console.log(nextLevel)
          if(feedBackFeed(isHinted,answersGame) === 'You can try again!'){
            navigateTo(tryAgain)
          }else {
            navigateTo(nextLevel)
          }
        }} style={buttonStyle} onMouseEnter={(e) => e.target.style.backgroundColor = 'none'}
          onMouseLeave={(e) => e.target.style.backgroundColor = 'none'}>{feedBackFeed(isHinted,answersGame) === 'You can try again!' ? "Try again" :"Next Level" }</button>}
        {feedBackFeed(isHinted, answersGame) === 'You can try again!' &&
            <button onClick={() => {
              navigateTo(tryAgain+"?from=feedback")
            }} style={buttonStyle}
            >{"Feed Back"}</button>}
        <button onClick={() => navigateTo('/category-selection')} style={buttonStyle} onMouseEnter={(e) => e.target.style.backgroundColor = 'none'}
          onMouseLeave={(e) => e.target.style.backgroundColor = 'none'}>{isNextLevel ? 'Go Back' : 'End Game'}</button>

      </div>
    </div>}

    {!isNextLevel && <div style={containerStyle}>
      <h2 style={{
        color: '#2C4B06',
        fontSize: 30,
        fontFamily: "sans-serif",
        fontWeight: 700
      }}>{feedBackTittle(isHinted, answersGame)}</h2>


      <div style={inlineContainerStyle}>
        <p style={{
          color: '#2C4B06',
          fontSize: 24,
          fontFamily: "sans-serif",
          fontWeight: 700
        }}>Score: {localStorage.getItem('correctAnswers')}/5</p>
        {/*<p>Overall Points: {localStorage.getItem('points')}</p>*/}
        <p style={{color: '#2C4B06', fontSize: 24, fontFamily: "sans-serif", fontWeight: 700}}>Time
          taken: {localStorage.getItem('time')} sec</p>
      </div>

      {/* Add feedback details and rewards here */}
      <div style={inlineContainerStyle}>
        <img src={REWARDS} alt="Rewards" style={{width: '60px', height: '60px', marginTop: '20px'}}/>
        {

          <p style={{
            width: '300px',
            fontSize: '22px',
            fontWeight: 400,
            marginTop: '40px',
            textAlign: 'center',
            color: '#2C4B06',
            fontFamily: "sans-serif"
          }}>{feedBackFeed(isHinted, answersGame)}</p>

        }
        <img src={REWARDS} alt="Rewards" style={{width: '60px', height: '60px', marginTop: '20px'}}/>
      </div>

      <div style={inlineContainerStyle}>
        {youtubeVideo &&<p style={{color: '#2C4B06', fontFamily: "sans-serif", marginTop: '30px'}}>Watch this video as a reward</p>}
      </div>
      {/* Embed YouTube video */}
      {youtubeVideo &&<div style={videoContainerStyle}>
        <iframe
            width="100%"
            height="auto"
            src={youtubeVideo}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
        ></iframe>
      </div>}
      {/*<p>Your score: {localStorage.getItem('correctAnswers')}/5</p>*/}
      {/*<p>Time taken for {isNextLevel ? 'Level 1' : 'Level 2'}: {localStorage.getItem('time')} sec</p>*/}
      {/*<p>Overall Points: {localStorage.getItem('points')}</p>*/}

      <div style={{display:"flex",justifyContent:(isNextLevel || feedBackFeed(isHinted, answersGame) === 'You can try again!') ? "space-between" : "center",width:"79%"}}>

        {feedBackFeed(isHinted, answersGame) === 'You can try again!' &&
            <button onClick={() => {
              navigateTo(tryAgain)
            }} style={buttonStyle}
            >{"Try again"}</button>}
        {feedBackFeed(isHinted, answersGame) === 'You can try again!' &&
            <button onClick={() => {
              navigateTo(tryAgain+"?from=feedback")
            }} style={buttonStyle}
            >{"Feed Back"}</button>}
        {isNextLevel && <button onClick={() => navigateTo(nextLevel)} style={buttonStyle}
                                onMouseEnter={(e) => e.target.style.backgroundColor = '#FFC107'}
                                onMouseLeave={(e) => e.target.style.backgroundColor = 'none'}>Next Level</button>}
        <button onClick={() => navigateTo('/category-selection')} style={buttonStyle}
        >{isNextLevel ? 'Go Back' : 'End Game'}</button>
      </div>


    </div>}
    </div>
  );
}

export default FeedbackScreen;
