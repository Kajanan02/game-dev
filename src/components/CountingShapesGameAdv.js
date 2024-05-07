import React, { useState, useEffect } from 'react';

import Six from '../images/CountingGameL2/6.png';
import Seven_two from '../images/CountingGameL2/7-2.png';
import Seven from '../images/CountingGameL2/7.png';
import Eleven from '../images/CountingGameL2/11.png';
import Thirteen from '../images/CountingGameL2/13.png';
import {useLocation, useNavigate} from "react-router-dom";

function CountingShapesGameAdv() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [showHints, setShowHints] = useState(false);
  const [time, setTime] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const navigateTo = useNavigate();
  const [feedBackMode, setFeedBackMode] = useState(false);
  const [feedBackAnswers, setFeedBackAnswers] = useState([]);
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const para = params.get('from')

  // Sample questions with image paths
  const sampleQuestions = [
    { id: 3, image: Six, answerNumber: '6',answerLetter:"six" },
    { id: 1, image: Eleven, answerNumber: '11',answerLetter:"eleven" },
    { id: 5, image: Seven_two, answerNumber: '7' ,answerLetter:"seven"},
    { id: 4, image: Thirteen, answerNumber: '13',answerLetter:"thirteen" },
    { id: 2, image: Seven, answerNumber: '7',answerLetter:"seven" },
  ];

  useEffect(() => {
    if(!para){
      return
    }
    console.log(para)
    const answers = JSON.parse(localStorage.getItem("answers"))
    console.log(answers)

    setFeedBackMode(true)
    let ansData = sampleQuestions.map((e,i)=>{
      let data={}
      data["answerNumber"]=e.answerNumber
      data["answerLetter"]=e.answerLetter
      data["answerNumberColor"] = answers[i].number === e.answerNumber ? "color-green" : "color-red"
      data["answerLetterColor"] = answers[i].letter === e.answerLetter ? "color-green" : "color-red"
      return data

    })
    console.log(ansData)
    setFeedBackAnswers(ansData)

  }, [para]);
  console.log(feedBackAnswers,feedBackMode)

  useEffect(() => {
    setQuestions(sampleQuestions);
    setAnswers(new Array(sampleQuestions.length).fill(''));
    startTimer();
  }, []);

  useEffect(() => {
    if (timerRunning) {
      const intervalId = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [timerRunning]);

  const startTimer = () => {
    setTimerRunning(true);
  };

  const handleAnswerChange = (e, index,type) => {
    const newAnswers = [...answers];
    if (typeof newAnswers[index] !== 'object') {
      newAnswers[index] = {};
    }
    newAnswers[index][type] = e.target.value;
    setAnswers(newAnswers);
  };

  const handleHintClick = () => {
    localStorage.setItem('isHint', true);
    setShowHints(!showHints);
  };

  const checkAnswer = () => {
    localStorage.setItem("answers",JSON.stringify(answers))
    let marks = 0;
    questions.forEach((q, index) => {
      if (String(answers[index]["number"]) === String(questions[index].answerNumber)) {
        marks += 1;
      }
      if (String(answers[index]["letter"]) === String(questions[index].answerLetter)) {
        marks += 1;
      }
    });
    terminate(marks);
  };     

  const endGame = () => {
    if(feedBackMode){
      navigateTo('/category-selection')
      return
    }
    let filled = false
    answers.map((answer) => {
      if (answer.number === "" || answer.letter === "" || answer.number === undefined || answer.letter === undefined) {
        filled = true;
      }
    })
    if(filled) {
        alert("Please fill all the answers");
        return;
    }

    localStorage.setItem('GameType', 'finished');
    setTimerRunning(false);
    checkAnswer();
  };

  const terminate = (marks) => {
    marks = Math.round(marks / 2)
    localStorage.setItem('correctAnswers', marks);
    let points = 0
    points = Math.floor((marks * 10) - (time / 6));
    if (points < 0) {
      points = 0;
    }
    localStorage.setItem('points', points);
    localStorage.setItem('time', time);
    localStorage.setItem('try-again', '/counting-shapes-adv')
    navigateTo('/feedback-screen');
  };

  const buttonStyle = {
    fontSize: '20px',
    backgroundColor: '#2C4B06',
    color: '#fff',
    padding: '7px 30px',
    borderRadius: '5px',
    cursor: 'pointer',
    marginLeft: '10px',
    marginTop: '20px',
    border: 'none',
    outline: 'none',
    fontWeight: 600,
    fontFamily: 'sans-serif'
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    padding: '10px',
    margin: 'auto',
    width: 'calc(100vw - 800px)',
    height: 'calc(100vh - 140px)',
    overflow: 'auto',
    fontFamily: 'Comic Sans MS, cursive',
    borderRadius: '10px',
    background: '#F0FAFC',
  };
  
  const innerDivStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    justifyContent: 'center',
    flexDirection: 'column',
  };

  const inputStyle = {
    height: 'calc(1.8vw)',
    width: 'calc(4.2vw)',
    fontWeight: 600,
    marginRight: '10px',
    marginLeft: '30px',
    background: 'transparent',
    border: '1.5px solid #72A146',
    borderRadius: '3px',
    boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  };
  const hintButtonStyle = {
    fontSize: '20px',
    fontWeight: 600,
    padding: '5px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    backgroundColor: 'transparent',
    border: '2px solid #2C4B06',
    color: '#2C4B06',
  };

  const imageStyle = {
    width: '180px',
    height: '160px',
    marginRight: '10px',
    marginBottom: '5px'
  };

  console.log(answers)

  return (
      <div style={containerStyle}>
			{/*<h2 style={{color: '#2C4B06', fontSize: 30, alignSelf: 'center', marginTop: '10px',fontFamily:"sans-serif"}}>Counting Shapes Game - Level 2</h2>*/}
			<div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '20px',width:"97%",justifyContent:"space-between"}}>
          <p style={{fontSize: 26, fontWeight: 900, marginLeft: '20px',color:"#2C4B06",fontFamily:"sans-serif",marginTop:"40px"}}>Write the count in numbers and letters</p>
              {!feedBackMode && <button onClick={() => handleHintClick()} style={hintButtonStyle}>Hint !</button>}
      </div>
        <div style={innerDivStyle}>
          {questions.map((question, index) => (
              <div key={question.id} style={{display: 'flex', alignItems: 'center', marginLeft: '60px'}}>
                <img src={question.image} alt={`Question ${index + 1}`} style={imageStyle}/>
                <input placeholder={"In number"} disabled={feedBackMode}  type="text" value={feedBackMode ? feedBackAnswers[index]["answerNumber"] : answers[index]["number"]} className={feedBackMode ? feedBackAnswers[index]["answerNumberColor"] : ""} onChange={(e) => handleAnswerChange(e, index,"number")}
                       style={inputStyle}/>
                <input placeholder={"In words"}  disabled={feedBackMode} type="text" value={feedBackMode ? feedBackAnswers[index]["answerLetter"] : answers[index]["letter"]} className={feedBackMode ? feedBackAnswers[index]["answerLetterColor"] : ""} onChange={(e) => handleAnswerChange(e, index,"letter")}
                       style={{...inputStyle,width:"200px"}}/>
                {showHints && !feedBackMode && index === 0 && <p>{question.answer}</p>}
              </div>
          ))}
        </div>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px'}}>
          <button onClick={endGame} style={buttonStyle} onMouseEnter={(e) => e.target.style.backgroundColor = '#FFC107'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#2C4B06'}>{feedBackMode ? "Back":"Done"}</button>
          <p>Time: {time} seconds</p>
        </div>
      </div>
  );
}

export default CountingShapesGameAdv;
