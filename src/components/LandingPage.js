// LandingPage.js
import React from 'react';
import landingImage from '../images/landing.png'
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

const headerStyle = {
  fontSize: 'calc(5vmin)',
  color: '#563A0B',
};

const buttonStyle = {
  fontSize: '30px',
  color: '#fff',
    width: '200px',
  backgroundColor: '#3E3105',
  padding: '16px',
  borderRadius: '8px',
  cursor: 'pointer',
  border: 'none',
  fontsize: '30px',
  transition: 'background-color 0.3s ease',
  fontFamily: 'sans-serif',
  fontWeight: 'bold',
};

const hoverButtonStyle = {
  backgroundColor: '#FFC107',
};

function LandingPage(props) {

  let navigate = useNavigate();
  return (
      <div style={containerStyle}>
        <h1 style={headerStyle}>Maths Games for Grade 2 Students</h1>
        <button
          onClick={() => navigate('category-selection')}
          style={buttonStyle}
          onMouseEnter={(e) => e.target.style.backgroundColor = hoverButtonStyle.backgroundColor}
          onMouseLeave={(e) => e.target.style.backgroundColor = buttonStyle.backgroundColor}
        >
          Let's Start
        </button>
        <img src={landingImage} alt="Landing Image" style={{ width: 'calc(36vw)', marginTop: '20px', marginBottom: '20px' }} />
      </div>
  );
}

export default LandingPage;
