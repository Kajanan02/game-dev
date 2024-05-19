import React, { useState, useEffect } from 'react';

import Eleven from '../images/CountingGame/11.png';
import Fourteen from '../images/CountingGame/14.png';
import Sixteen from '../images/CountingGame/16.png';
import Seventeen from '../images/CountingGame/17.png';
import Nineteen from '../images/CountingGame/19.png';
import {useLocation, useNavigate} from "react-router-dom";

function CountingShapesGame() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [showHints, setShowHints] = useState(false);
  const [time, setTime] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [feedBackMode, setFeedBackMode] = useState(false);
  const [feedBackAnswers, setFeedBackAnswers] = useState([]);
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const para = params.get('from')

  const navigateTo = useNavigate();

  // Sample questions with image paths
  const sampleQuestions = [
    { id: 3, image: Sixteen, answer: '16' },
    { id: 1, image: Eleven, answer: '11' },
    { id: 5, image: Nineteen, answer: '19' },
    { id: 4, image: Seventeen, answer: '14' },
    { id: 2, image: Fourteen, answer: '12' },
  ];

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

  const handleAnswerChange = (e, index) => {
    const newAnswers = [...answers];
    newAnswers[index] = e.target.value;
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
      if (String(answers[index]) === String(questions[index].answer)) {
        marks += 1;
      }
    });
    terminate(marks);
  };     

  const endGame = () => {
    if(feedBackMode){
      navigateTo('/feedback-screen')
      return
    }
    let filled =false
    answers.map((answer) => {
      if(answer === "") {
        filled = true;
      }
    });
    if(filled) {
      alert("Please fill all the answers");
      return;
    }
    setTimerRunning(false);
    checkAnswer();
  };

  const terminate = (marks) => {
    localStorage.setItem('correctAnswers', marks);
    let points = 0
    points = Math.floor((marks * 10) - (time / 6));
    if (points < 0) {
      points = 0;
    }
    localStorage.setItem('points', points);
    localStorage.setItem('time', time);
    localStorage.setItem('try-again', '/counting-shapes')
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
    overflow: 'auto',
    height: 'calc(100vh - 180px)',
    fontFamily: 'Comic Sans MS, cursive',
    borderRadius: '10px',
    background: '#F0FAFC',
  };
  
  const innerDivStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap:"20px",
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
    width: '150px',
    height: '150px',
    marginRight: '40px',
    marginBottom: '5px'
  };

  useEffect(() => {
    if(!para){
      return
    }
    const answers = JSON.parse(localStorage.getItem("answers"))
    console.log(answers)
    setFeedBackMode(true)
    let ansData = sampleQuestions.map((e,i)=>{
      let data={}
      data["answer"]=e.answer
      data["color"] = answers[i] === e.answer ? "color-green" : "color-red"
      return data

    })
    console.log(ansData)
    setFeedBackAnswers(ansData)

  }, [para]);

  return (
      <div style={containerStyle}>
			{/*<h2 style={{color: '#2C4B06', fontSize: 30, alignSelf: 'center', marginTop: '10px',fontFamily:"sans-serif"}}>Counting Shapes Game - Level 1</h2>*/}
			<div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '20px',justifyContent:"space-between"}}>
          <p style={{fontSize: 26, fontWeight: 900, marginLeft: '20px',color:"#2C4B06",fontFamily:"sans-serif",marginTop:"40px"}}>Write the numbers in the boxes</p>
              {!feedBackMode && <button onClick={() => handleHintClick()} style={hintButtonStyle}>Hint !</button>}
      </div>
        <div style={innerDivStyle}>
          {questions.map((question, index) => (
            <div key={question.id} style={{ display: 'flex', alignItems: 'center', marginLeft: '60px' }}>
              <img src={question.image} alt={`Question ${index + 1}`} style={imageStyle} />
              <input disabled={feedBackMode}  type="text" value={feedBackMode ? feedBackAnswers[index]?.answer: answers[index]} onChange={(e) => handleAnswerChange(e, index)} style={inputStyle} className={feedBackMode ? feedBackAnswers[index]?.color:""} />
              {showHints && !feedBackMode && index ===0 && <p>{question.answer}</p>}
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

export default CountingShapesGame;
