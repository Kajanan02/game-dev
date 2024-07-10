import React, {useEffect, useState} from 'react';
import ProfileIMG from "../images/profile.svg";
import CUP from "../images/img.png";
import LOGO from "../images/Mask group.png"
import USER from "../images/logo-no-background 1.svg"
import axios from "axios";
import eye from "../images/eye (2) 1.svg"
import ARROE from "../images/img_1.png"

function Profile(props) {

    const [gameData, setGameData] = useState([]);

    const [equations, setEquations] = useState([]);
    const [numberSense, setNumberSense] = useState([]);
    const [counting, setCounting] = useState([]);

    const dates1 = ["01", "02", "03", "04", "05", "06", "07"];
    const dates2 = ["08", "09", "10", "11", "12", "13", "14"];
    const dates3 = ["15", "16", "17", "18", "19", "20", "21"];
    const dates4 = ["22", "23", "24", "25", "26", "27", "28"];
    const dates5 = ["29", "30", "31"];

    useEffect(() => {
        ///:id/gamesData
        axios.get('http://localhost:5000/api/users/'+localStorage.getItem("userId")+'/gamesData')
            .then(res => {
                setGameData(res.data);
                const createdAtDates = res.data.map(item => item.createdAt?.slice(0,10));
               setEquations(res.data.filter(item => item.gameType === "Equations"));
                setNumberSense(res.data.filter(item => item.gameType === "Number Sense"));
                setCounting(res.data.filter(item => item.gameType === "Counting Shape Game"));
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    console.log(gameData.map(item => item.createdAt?.slice(5,7)) )


    return (
        <div>
            <header className="profile-header">
                <div className="logo-container">
                    <img src={USER} alt="Maths Adventures Logo" className="logo"/>
                </div>
                <div className="user-info">
                    <span className="user-info-text">{localStorage.getItem("user_name")}</span>
                    <img src={LOGO} alt="User Avatar" className="avatar"/>
                </div>
            </header>
            <div className="back-link" style={{marginLeft:"30px"}}>
                <a href="/"><img src={ARROE} alt="Back Arrow"/> Back to Games</a>
            </div>
            <div style={{padding: "16px"}}>
                <div style={{display: "flex", justifyContent: "space-between", gap: "16px"}}>
                    <div style={{display: "flex", background: "rgba(114,161,70,0.12)", padding: "20px", width: "50%"}}>
                        <div style={{width: "100%"}}>
                            <div style={{display: "flex"}}>
                                <img src={ProfileIMG} style={{height: "min-content"}}/>
                                <div style={{marginLeft: "20px"}}>
                                    <h2 style={{color: "#2C4B06"}}>{localStorage.getItem("user_name")}</h2>
                                    <p>Username: {localStorage.getItem("username")}</p>

                                    <div>
                                        <div style={{
                                            display: "flex",
                                            background: "#F89F9F",
                                            padding: "20px",
                                            gap: "10px",
                                            alignItems: "center",
                                            borderRadius: "16px"
                                        }}>
                                            <div style={{fontSize: "25px", color: "#2C4B06", fontWeight: 600}}>Rewards
                                                taken {gameData.reduce((accumulator, current) => accumulator + parseInt(current.score), 0)}
                                            </div>
                                            <img src={CUP} style={{width: "40px"}}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div style={{
                                marginTop: "32px",
                                display: "flex",
                                justifyContent: "space-between",
                                gap: "20px"
                            }}>
                                <div style={{
                                    background: "rgba(32,93,118,0.5)",
                                    fontWeight: "600",
                                    borderRadius: "20px",
                                    padding: "16px",
                                    width: "30%",
                                    paddingBottom: "16px"
                                }}>
                                    <div style={{fontWeight: 500, color: "#2C4B06", textAlign: "center"}}>Equations
                                    </div>
                                    <p style={{color: "#2C4B06"}}>Last Attempt <span
                                        style={{fontWeight: "600"}}>{equations.reduce((latest, current) => {
                                        return new Date(current.createdAt) > new Date(latest.createdAt) ? current : latest;
                                    }, equations[0])?.createdAt?.slice(0, 10)}</span></p>
                                    <p style={{color: "#2C4B06"}}>Highest score <span
                                        style={{fontWeight: "600"}}>{equations.reduce((max, current) => (current.score > max.score ? current : max), equations[0])?.score}</span>
                                    </p>
                                </div>
                                <div style={{
                                    background: "rgba(0,216,0,0.5)",
                                    fontWeight: "600",
                                    borderRadius: "20px",
                                    padding: "16px",
                                    width: "30%",
                                    paddingBottom: "16px"
                                }}>
                                    <div style={{fontWeight: 500, color: "#2C4B06", textAlign: "center"}}>Number sense
                                    </div>
                                    <p style={{color: "#2C4B06"}}>Last Attempt <span
                                        style={{fontWeight: "600"}}>{numberSense.reduce((latest, current) => {
                                        return new Date(current.createdAt) > new Date(latest.createdAt) ? current : latest;
                                    }, numberSense[0])?.createdAt?.slice(0, 10)}</span></p>
                                    <p style={{color: "#2C4B06"}}>Highest score <span
                                        style={{fontWeight: "600"}}>{numberSense.reduce((max, current) => (current.score > max.score ? current : max), numberSense[0])?.score}</span>
                                    </p>
                                </div>
                                <div style={{
                                    background: "rgba(0,180,255,0.5)",
                                    fontWeight: "600",
                                    borderRadius: "20px",
                                    padding: "16px",
                                    width: "30%",
                                    paddingBottom: "16px"
                                }}>
                                    <div style={{fontWeight: 500, color: "#2C4B06", textAlign: "center"}}>Counting
                                    </div>
                                    <p style={{color: "#2C4B06"}}>Last Attempt <span
                                        style={{fontWeight: "600"}}>{counting.reduce((latest, current) => {
                                        return new Date(current.createdAt) > new Date(latest.createdAt) ? current : latest;
                                    }, counting[0])?.createdAt?.slice(0, 10)}</span></p>
                                    <p style={{color: "#2C4B06"}}>Highest score <span
                                        style={{fontWeight: "600"}}>{counting.reduce((max, current) => (current.score > max.score ? current : max), counting[0])?.score}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div></div>
                    </div>
                    <div style={{background: "rgba(114,161,70,0.12)", padding: "20px", width: "50%"}}>
                        <h2 style={{color: "#2C4B06"}}>Activity during the month</h2>
                        <div style={{display: "flex", justifyContent: "space-between"}}>
                            <div>Mon</div>
                            <div>Tue</div>
                            <div>Wed</div>
                            <div>Thu</div>
                            <div>Fri</div>
                            <div>Sat</div>
                            <div>Sun</div>
                        </div>
                        <div style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginBottom: "16px",
                            marginTop: "16px"
                        }}>
                            {dates1.map((date, index) => (<div
                                className={gameData.map(item => item.createdAt?.slice(5, 7)).includes(date) && "select-date"}
                                style={{color: "#6a6a6a"}}>{date}</div>))}
                        </div>
                        <div style={{display: "flex", justifyContent: "space-between", marginBottom: "16px"}}>
                            {dates2.map((date, index) => (<div
                                className={gameData.map(item => item.createdAt?.slice(5, 7)).includes(date) && "select-date"}
                                style={{color: "#6a6a6a"}}>{date}</div>))}
                        </div>
                        <div style={{display: "flex", justifyContent: "space-between", marginBottom: "16px"}}>
                            {dates3.map((date, index) => (<div
                                className={gameData.map(item => item.createdAt?.slice(5, 7)).includes(date) && "select-date"}
                                style={{color: "#6a6a6a"}}>{date}</div>))}
                        </div>
                        <div style={{display: "flex", justifyContent: "space-between", marginBottom: "16px"}}>
                            {dates4.map((date, index) => (<div
                                className={gameData.map(item => item.createdAt?.slice(5, 7)).includes(date) && "select-date"}
                                style={{color: "#6a6a6a"}}>{date}</div>))}
                        </div>
                        <div style={{display: "flex", marginBottom: "16px", gap: "107px"}}>
                            {dates5.map((date, index) => (<div
                                className={gameData.map(item => item.createdAt?.slice(5, 7)).includes(date) && "select-date"}
                                style={{color: "#6a6a6a"}}>{date}</div>))}
                        </div>
                    </div>
                </div>

                <div className="table-history">
                    <h3>History</h3>
                    <table>
                        <thead>
                        <tr>
                            <th>Game type</th>
                            <th>Level</th>
                            <th>Score</th>
                            <th>Time taken</th>
                            <th>Attempt Date</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>

                        {gameData.map((data) => <tr>
                            <td>{data.gameType}</td>
                            <td>{data.level}</td>
                            <td>{data.score}</td>
                            <td>{data.timeTaken} seconds</td>
                            <td>{data.createdAt?.slice(0, 10)}</td>
                            <td><a href="#"><img src={eye} alt="Back Arrow"/></a></td>
                        </tr>)}

                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
}

export default Profile;