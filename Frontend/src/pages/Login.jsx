import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import Spinner from "../components/Waiting";
import { login, reset } from '../features/auth/authSlice';
import { toast } from 'react-toastify';
import './Login.css';

function Login() {
    const [userData, setUserData] = useState({
        email: "",
        password: ""
    });

    const { email, password } = userData

    const navigate = useNavigate()
    const dispatch = useDispatch()

    function handleChange(e) {
        setUserData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    };

    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        if (isSuccess || user) {
            navigate('/CreateTask');
        }

        dispatch(reset())
    }, [user, isError, isSuccess, message, navigate, dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userDetail = {
            email,
            password,
        }

        dispatch(login(userDetail))
    }

    if (isLoading) {
        return <Spinner />
    }

    return (
        <div className="app">
            <span className="shape"></span>
            <span className="shape"></span>
            <span className="shape"></span>
            <div className="login">
                <div className="loginBox">
                    <div className="loginContent">
                        <h1 className="welcome" style={{ marginTop: "6rem" }}>Welcome!</h1>
                        <p className="signInParagragh">Sign in to your Account</p>
                        <input
                            className="usernameInput"
                            type="email"
                            name="email"
                            autoComplete="off"
                            placeholder='Enter your username'
                            required
                            onChange={handleChange}
                        />
                        <input
                            className="usernameInput"
                            style={{ marginTop: "35px" }}
                            type="password"
                            name="password"
                            autoComplete="off"
                            placeholder='Enter your password'
                            required
                            onChange={handleChange}
                        />
                        <button className="loginButton" onClick={handleSubmit}>Sign in</button>
                        <div className="Forgetpswd">
                            <a className="fpswd" href="/ForgetPassword">Forget your password?</a>
                            <div className="notHaveAccount">
                                Don't have an account?
                                <a href="/signup"> Sign up</a>
                            </div>
                        </div>
                    </div>
                    <div className="loginImageContent">
                        <img src="login.png" alt="login" className="loginImage" />
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Login;