import React, {useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";

const SignupForm = () => {
    const [studentName, setStudentName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigateTo = useNavigate();

    const handleSignup = (event) => {
        event.preventDefault();
        // Handle the signup logic here
        console.log('Student Name:', studentName);
        console.log('Username:', username);
        console.log('Password:', password);

        axios.post('http://localhost:5000/api/users/register', {
            name: studentName,
            username: username,
            password: password
        }).then((response) => {
            console.log(response.data);
            alert("Signup successful. Please login to continue.");
            navigateTo('/login');
        }).catch((error) => {
            console.error(error);
            alert('An error occurred. Please try again later.');
        })
    };

    return (
        <div>
            <h1>Maths Games for Grade 2 Students</h1>
            <div className={"signup-form"}>
                <div className={"signup-heading"}>
                    <h4>Sign Up</h4>
                </div>
                <div>
                        <form onSubmit={handleSignup} style={{padding:"20px"}}>
                            <div className="form-group">
                                <label htmlFor="studentName">Student Name</label>
                                <input
                                    type="text"
                                    id="studentName"
                                    value={studentName}
                                    onChange={(e) => setStudentName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <input
                                    type="text"
                                    id="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div style={{display:"flex",justifyContent:"space-between"}}>
                                <p>
                                    Already have an account? <a href="/login">Login</a>
                                </p>
                                <button type="submit">Signup</button>
                            </div>
                        </form>
                </div>

            </div>
            {/*<div className="signup-form">*/}
            {/*    <form onSubmit={handleSignup}>*/}
            {/*        <div className="form-group">*/}
            {/*            <label htmlFor="studentName">Student Name</label>*/}
            {/*            <input*/}
            {/*                type="text"*/}
            {/*                id="studentName"*/}
            {/*                value={studentName}*/}
            {/*                onChange={(e) => setStudentName(e.target.value)}*/}
            {/*                required*/}
            {/*            />*/}
            {/*        </div>*/}
            {/*        <div className="form-group">*/}
            {/*            <label htmlFor="username">Username</label>*/}
            {/*            <input*/}
            {/*                type="text"*/}
            {/*                id="username"*/}
            {/*                value={username}*/}
            {/*                onChange={(e) => setUsername(e.target.value)}*/}
            {/*                required*/}
            {/*            />*/}
            {/*        </div>*/}
            {/*        <div className="form-group">*/}
            {/*            <label htmlFor="password">Password</label>*/}
            {/*            <input*/}
            {/*                type="password"*/}
            {/*                id="password"*/}
            {/*                value={password}*/}
            {/*                onChange={(e) => setPassword(e.target.value)}*/}
            {/*                required*/}
            {/*            />*/}
            {/*        </div>*/}
            {/*        <button type="submit">Signup</button>*/}
            {/*    </form>*/}
            {/*    <p>*/}
            {/*        Already have an account? <a href="/login">Login</a>*/}
            {/*    </p>*/}
            {/*</div>*/}
        </div>

    );
};

export default SignupForm;
