import React, { useState, useEffect } from 'react';
import {useLocation, useNavigate} from "react-router-dom";

function Equations() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [showHints, setShowHints] = useState();
  const [time, setTime] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);

  const [feedBackMode, setFeedBackMode] = useState(false);
  const [feedBackAnswers, setFeedBackAnswers] = useState([]);
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const para = params.get('from')

  const navigateTo = useNavigate()

  // Sample equations
  const sampleQuestions = [
    { id: 1, equation: '2 + 3 =', answer: '5' },
    { id: 2, equation: '4 + 5 =', answer: '9' },
    { id: 3, equation: '4 - 3 =', answer: '1' },
    { id: 4, equation: '9 - 6 =', answer: '3' },
    { id: 5, equation: '7 + 5 =', answer: '12' }
  ];

  useEffect(() => {
    setQuestions(sampleQuestions);
    setAnswers(new Array(sampleQuestions.length).fill(''));
    startTimer();
  }, []);

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
    console.log(answers)
  };

  const handleHintClick = () => {
    localStorage.setItem('isHint', true);
    setShowHints(!showHints);
  };

  const checkAnswer = () => {
    localStorage.setItem("answers",JSON.stringify(answers))
    let marks = 0;
    questions.map((q, index) => {
      if (String(answers[index]) === String(questions[index].answer)) {
        marks+=1;
      }
    });
    terminate(marks);
  };     

  const endGame = () => {
    if(feedBackMode){
      navigateTo('/category-selection')
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
    localStorage.setItem('time', time)
    localStorage.setItem('try-again', '/equations')
    navigateTo('/feedback-screen');
  }

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
    height: 'calc(100vh - 200px)',
    fontFamily: 'Comic Sans MS, cursive',
    borderRadius: '10px',
    background: '#F0FAFC',
  };
  
  const innerDivStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'left', 
  };

  const inputStyle = {
    height: 'calc(1.8vw)',
    width: 'calc(4.2vw)',
    marginRight: '10px',
    fontWeight: 600,
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
    marginLeft: '300px',
    border: '2px solid #2C4B06',
    color: '#2C4B06',
  };

  return (
      <div style={containerStyle}>
        {/*<h2 style={{color: '#2C4B06', fontSize: 30, alignSelf: 'center', marginTop: '10px',fontFamily:"sans-serif"}}>Number Sense Game - Level 1</h2>*/}
        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '30px',}}>
          <p style={{fontSize: 26, fontWeight: 900, marginLeft: '20px',color:"#2C4B06",fontFamily:"sans-serif"}}>Write the numbers in the boxes</p>
          {!feedBackMode && <button onClick={() => handleHintClick()} style={hintButtonStyle}>Hint !</button>}
        </div>
        
        <div style={innerDivStyle}>
          {questions.map((question, index) => (
            <div key={question.id} style={{ display: 'flex', alignItems: 'center', marginLeft: '60px' }}>
              <p style={{fontWeight:600, color: '#2C4B06', fontSize: 24, alignSelf: 'center',fontFamily:"sans-serif"}}>{index+1}. {question.equation}</p>
              <input disabled={feedBackMode} type="text" value={feedBackMode ? feedBackAnswers[index]?.answer: answers[index]} className={feedBackMode ? feedBackAnswers[index]?.color:""}  onChange={(e) => handleAnswerChange(e, index)} style={inputStyle} />
              {/* <button onClick={() => checkAnswer(index)} style={buttonStyle}>Done</button> */}
              {showHints &&  !feedBackMode && index ===0 && <p>{question.answer}</p>}
            </div>
          ))}
        </div>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center',}}>
          <button onClick={endGame} style={buttonStyle} onMouseEnter={(e) => e.target.style.backgroundColor = '#FFC107'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#060c42'}>{feedBackMode ? "Back":"Done"}</button>
          <p>Time: {time} seconds</p>
        </div>
      </div>
  );
}

export default Equations;
