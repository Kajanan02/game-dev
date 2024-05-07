// NumberSenseDetails.js
import React, { useState, useEffect } from 'react';
import {useNavigate} from "react-router-dom";

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '30px',
  margin: 'auto',
  width: 'calc(100vw - 1000px)',
  height: 'calc(100vh - 400px)',
  fontFamily: 'Comic Sans MS, cursive',
  borderRadius: '10px',
  background: 'transparent',
};

const headingStyle = {
  fontSize: 'calc(7vmin)',
  color: '#000',
  fontFamily: 'sans-serif',
};

const descriptionStyle = {
  fontSize: 'calc(1vmin + 10px)', // Adjusted font size
  marginBottom: '30px',
  fontFamily: 'sans-serif',
  fontWeight:500
};

const buttonStyle = {
  fontSize: '20px',
  backgroundColor: '#2C4B06',
  color: '#fff',
  padding: '12px 30px',
  borderRadius: '5px',
  cursor: 'pointer',
  marginLeft: '10px',
  marginTop: '20px',
  border: 'none',
  outline: 'none',
  fontWeight: 600,
  fontFamily: 'sans-serif'
};

const hoverButtonStyle = {
  backgroundColor: '#FFC107',
};

const pageStyle = {
  backgroundColor: '#205d76',
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

function NumberSenseDetails() {

  const navigateTo = useNavigate()

  useEffect(() => {
    const GameType = localStorage.getItem('GameType');
    localStorage.setItem("isHint", false);
    // console.log(GameType);
  }, []);

  const Descriptions = {
    "number-sense" :'This game helps you improve your number sense skills!',
    "counting-shapes": 'This game helps you improve your counting skills!',
    "equations": 'This game helps you improve your equations skills!'
  };

  const gameType = {
    "number-sense" :'Number Sense',
    "counting-shapes": 'Counting Shapes',
    "equations": 'Equations'
  }

  return (
      <div style={containerStyle}>
        <h2 style={headingStyle}>{gameType[localStorage.getItem('GameType')]} Game</h2>
        <p style={descriptionStyle}>Description: {Descriptions[localStorage.getItem('GameType')]}</p>
        <button
          onClick={() => navigateTo("/"+localStorage.getItem('GameType'))}
          style={buttonStyle}
          onMouseEnter={(e) => (e.target.style.backgroundColor = hoverButtonStyle.backgroundColor)}
          onMouseLeave={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
        >
          Let's Play
        </button>
      </div>
  );

}

export default NumberSenseDetails;
