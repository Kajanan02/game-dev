import React, {useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";

const Login = () => {
    const [studentName, setStudentName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigateTo = useNavigate();

    const handleSignup = (event) => {
        event.preventDefault();
        // Handle the signup logic here
         console.log('Username:', username);
        console.log('Password:', password);

        axios.post('http://localhost:5000/api/users/login', {
            name: studentName,
            username: username,
            password: password
        }).then((response) => {
            console.log(response.data);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user_name', response.data.name);
            localStorage.setItem('username', response.data.username);
            localStorage.setItem('userId', response.data._id);
            alert("Login successful..");
            navigateTo('/');
        }).catch((error) => {
            console.error(error);
            alert('Username or password is incorrect');
        })
    };

    return (
        <div>
            <h1>Maths Games for Grade 2 Students</h1>
            <div className={"signup-form"}>
                <div className={"signup-heading"}>
                    <h4>Login</h4>
                </div>
                <div>
                    <form onSubmit={handleSignup} style={{padding:"20px"}}>
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
                                Create a new account ? <a href="/sign-up"> Sign up</a>
                            </p>
                            <button type="submit">Login</button>
                        </div>
                    </form>
                </div>

            </div>
        </div>

    );
};

export default Login;
