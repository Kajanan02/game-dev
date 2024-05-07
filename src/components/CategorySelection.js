// CategorySelection.js
import React from 'react';
import NSImage from '../images/selectionPage/NS.png';
import CSImage from '../images/selectionPage/CS.png';
import EQImage from '../images/selectionPage/EQ.png';
import {useNavigate} from "react-router-dom";

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '30px',
  margin: 'auto',
  width: 'calc(100vw - 300px)',
  height: 'calc(100vh - 300px)',
  fontFamily: 'Comic Sans MS, cursive',
  borderRadius: '10px',
};

const headingStyle = {
  fontSize: 'calc(7vmin)',
  color: '#3E3105',
  fontFamily: 'sans-serif',
};

const buttonColors = ['#FFA07A', '#87CEEB', '#98FB98'];

const images = {
  NS: NSImage,
  CS: CSImage,
  EQ: EQImage,
};

const names = ["number-sense", "counting-shapes", "equations"]
const disNames = ["Number Sense", "Counting Shapes", "Equations"]

const rowStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  width: '70%',
};

function CategorySelection() {

  const navigate = useNavigate();

  const buttonStyle = {
    marginLeft: '30px',
    width: '200px',
    height: '200px',
    position: 'relative',
    cursor: 'pointer',
    border: 'none',
    background: 'transparent',
    boxShadow: '0px 15px 30px rgba(0, 0, 0, 0.8)',
  };

  const pageSelected = (index) => {
    console.log(names[index])
    localStorage.setItem('GameType', names[index]);
    localStorage.setItem('points', 0);
    localStorage.setItem('isHint', false);
    localStorage.setItem('name', disNames[index])
    navigate('/game-details');
  };

  return (
      <div style={containerStyle}>
        <h2 style={headingStyle}>Choose the game category you want to play</h2>
        <div style={rowStyle}>
          {Object.keys(images).map((key, index) => (
            <div key={index} style={{ position: 'relative',background:'#F0FAFC' }}>
              <button
                onClick={() => pageSelected(index) }
                style={{
                  ...buttonStyle,
                  backgroundImage: `url(${images[key]})`,
                  borderRadius: '8px',
                  cursor: 'pointer',
                  display: 'inline-block',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  boxShadow:"none",
                  margin: '20px',
                }}
              ></button>
              <div style={{ textAlign: 'center', marginTop: '10px', color: '#2C4B06', fontSize: 22, fontWeight: 800,marginBottom:"12px",fontFamily:"sans-serif" }}>
                {disNames[index]}
              </div>
            </div>
          ))}
        </div>
      </div>
  );
}

export default CategorySelection;
