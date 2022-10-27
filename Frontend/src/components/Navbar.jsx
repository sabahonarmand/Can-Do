import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import './Navbar.css';
import { logout, reset } from '../features/auth/authSlice';
import moment from 'moment';
import { useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const [today, setToday] = useState("")

    function onLogout() {
        dispatch(logout());
        dispatch(reset());

        navigate('/');
    };

    return (
        <div className="navbar">
            <div className="logoimageContent">
                <img src="logo.png" alt="login" style={{ width: "inherit" }} />
                <p className="CanDo">Can Do</p>
            </div>
            <div className="menuNav">
                <a className="menuLink" href="/AllGoals">All Goals</a>
                <a className="menuLink" href="/SetGoals">Set Goals</a>
                <a className="menuLink" href="/AllTasks">All Tasks</a>
                <a className="menuLink" href="/WeekTasks">In Week</a>
                <a className="menuLink" href="/TodayTasks">Today</a>
                <a className="menuLink" href="/CreateTask">Create Task</a>
                <h2 className="logout">
                    <a onClick={onLogout}>Logout</a>
                    <img src="logout.png" alt="logout" className="logoutImage" />
                </h2>
            </div>
        </div >
    );
};
export default Navbar;
