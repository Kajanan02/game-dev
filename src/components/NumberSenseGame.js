import React, { useState, useEffect } from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import addGameDataFun from "../addGameDataFun";

function NumberSenseGame() {
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

  const navigateTo = useNavigate()
  // Sample questions
  const sampleQuestions = [
    { id: 1, question: 'Twenty two', answer: '22' },
    { id: 2, question: 'Nineteen', answer: '19' },
    { id: 3, question: 'Thirty five', answer: '35' },
    { id: 4, question: 'Forty nine', answer: '49' },
    { id: 5, question: 'Twenty eight', answer: '28' }
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
    console.log(answers)
  };

  const handleHintClick = () => {
    localStorage.setItem('isHint', true);
    setShowHints(!showHints);
  };



  console.log(para)

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

  const checkAnswer = () => {
    let marks = 0;
    localStorage.setItem("answers",JSON.stringify(answers))
    questions.map((q, index) => {
      if (String(answers[index]) === String(questions[index].answer)) {
        marks+=1;
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
   localStorage.setItem('time', time)
    localStorage.setItem('try-again',"/number-sense");
   addGameDataFun({gameType: 'Number Sense', level: '1', score: marks, timeTaken: time})
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
    marginLeft: '30px',
    fontWeight: 600,
    background: 'transparent',
    border: '1.5px solid #72A146',
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

  return (
      <div style={containerStyle}>
        {/*<h2 style={{color: '#2C4B06', fontSize: 30, alignSelf: 'center', marginTop: '10px',fontFamily:"sans-serif"}}>Number Sense Game - Level 1</h2>*/}
        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '20px',justifyContent:"space-between"}}>
          <p style={{fontSize: 26, fontWeight: 900, marginLeft: '20px',color:"#2C4B06",fontFamily:"sans-serif"}}>Write the numbers in the boxes</p>
          {!feedBackMode &&<button onClick={() => handleHintClick()} style={hintButtonStyle}>Hint !</button>}
        </div>

        <div style={innerDivStyle}>
          {questions.map((question, index) => (
            <div key={question.id} style={{ display: 'flex', alignItems: 'center', marginLeft: '60px' }}>
              <p style={{fontSize: 20, fontWeight: 900,fontFamily:"sans-serif",color: '#2C4B06',width:"150px"}}>{index+1}. {question.question}</p>
              <input disabled={feedBackMode} type="text" value={feedBackMode ? feedBackAnswers[index]?.answer: answers[index]} onChange={(e) => handleAnswerChange(e, index)} style={inputStyle} className={feedBackMode ? feedBackAnswers[index]?.color:""} required={true} />
              {/* <button onClick={() => checkAnswer(index)} style={buttonStyle}>Done</button> */}
              {showHints && !feedBackMode && index ===0 && <p>{question.answer}</p>}
            </div>
          ))}
        </div>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center',}}>
          <button onClick={endGame} style={buttonStyle} onMouseEnter={(e) => e.target.style.backgroundColor = '#FFC107'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#2C4B06'}>{feedBackMode ? "Back":"Done"}</button>
          {!feedBackMode && <p>Time: {time} seconds</p>}
        </div>
      </div>
  );
}

export default NumberSenseGame;
