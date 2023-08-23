import React, { useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import {useNavigate} from 'react-router-dom';

export const Auth = () => {
    return (
        <div>
            <Register />
            <Login />
        </div>
    );
};

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [_, setCookie] = useCookies(['access_token']);
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();

        const user = {
            username,
            password
        };

        try{
            const response=await axios.post('http://localhost:3001/auth/login', user);
            setCookie('access_token', response.data.token);
            window.localStorage.setItem('userId', response.data.userId);
            navigate('/');
        }
        catch(error){
            console.log(error);
        }

        setUsername('');
        setPassword('');
    };

    return (
        <div className="auth-container">
            <form onSubmit={handleSubmit}>   
                <h2>Login</h2>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = async (event) => {
        event.preventDefault();

        const user = {
            username,
            password
        };

        try{
            await axios.post('http://localhost:3001/auth/register', user);
        }
        catch(error){
            console.log(error);
        }

        setUsername('');
        setPassword('');
    };
    return (
        <div className="auth-container">
            <form onSubmit={handleSubmit}>
                <h2>Register</h2>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};