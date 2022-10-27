import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import './Login.css';
import Spinner from "../components/Waiting";
import { register, reset } from '../features/auth/authSlice';

function SignUp() {

    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: ""
    });
    const { name, email, password } = userData
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    );
    useEffect(() => {
        if (isError) {
            toast.error(message);
        };
        if (isSuccess || user) {
            navigate('/CreateTask');
        }
        dispatch(reset());
    }, [user, isError, isSuccess, message, navigate, dispatch])

    //function handleChange({ currentTarget: input }) {
    //  setUserData({ ...userData, [input.name]: input.value });
    //};
    function handleChange(e) {
        setUserData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userDetail = {
            name,
            email,
            password
        };
        console.log(userDetail);
        dispatch(register(userDetail));

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
                        <h1 className="welcome" style={{ marginTop: "4rem" }}>Sign up</h1>
                        <p className="signInParagragh">Create your Account</p>
                        <input
                            className="usernameInput"
                            type="text"
                            name="name"
                            placeholder='Name'
                            required
                            onChange={handleChange}
                        />
                        <input
                            className="usernameInput"
                            style={{ marginTop: "35px" }}
                            type="email"
                            name="email"
                            autoComplete="off"
                            placeholder='Enter your email'
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
                        <button className="loginButton"
                            onClick={handleSubmit}
                            type="submit">Sign up</button>
                        <div className="Forgetpswd">
                            <div className="notHaveAccount">
                                Already signed up?
                                <a href="/"> Go to login</a>
                            </div>
                        </div>
                    </div>
                    {error && <div>{error}</div>}
                    <div className="loginImageContent">
                        <img src="signup.png" alt="login" className="loginImage" />
                    </div>
                </div>
            </div>
        </div >
    );
}
export default SignUp;