import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'antd/dist/antd.min.css';
import './SetGoals.css';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from 'moment';
import { createGoal } from '../features/goals/goalSlice';
import axios from "axios";
function SetGoals() {
    const [date, setDate] = useState("");
    const [goal, setGoal] = useState({
        title: "",
        description: "",
        date: "",
        goalImg: ""
    });
    const [userInfo, setuserInfo] = useState({
        file: [],
        filepreview: null,
    });
    const [fileName, setFileName] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        if (!user) {
            navigate('/');
        }
    }, [user, navigate])

    function handleDate(date) {
        setDate(date);
        const d = moment(date).format('MMM Do YYYY')
        setGoal({ ...goal, date: d });
    }
    const handleInputChange = (event) => {
        setFileName(event.target.files[0]);
        setuserInfo({
            ...userInfo,
            file: event.target.files[0],
            filepreview: URL.createObjectURL(event.target.files[0]),
        });

    };
    function handleChange(e) {
        setGoal((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };
    function handleFormSubmit(e) {
        e.preventDefault();

        const { title, description, date, goalImg } = goal
        const formdata = new FormData();
        const userid = localStorage.getItem('userid');
        formdata.append("goalImg", fileName);
        formdata.append("title", title);
        formdata.append("description", description);
        formdata.append("date", date);
        formdata.append("userid", userid);
        console.log({ formdata })
        axios.post('http://localhost:8800/api/goals/', formdata)
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err);
            })
    };

    return (
        <div className="setGoals">
            <Navbar />
            <hr className="borderSetGoalsPage" />
            <div className="setGoal">
                <div className="setGoalsBox">
                    <div className="task" style={{ marginTop: "4rem" }}>
                        <form className="goal" onSubmit={(e) => handleFormSubmit(e)} encType="multipart/form-data">
                            <input type="text"
                                placeholder="Title"
                                style={{ width: "14rem", fontWeight: "500" }}
                                required
                                name="title"
                                className="taskTitle"
                                onChange={handleChange} />
                            <input type="text" placeholder="Description"
                                style={{ marginTop: "2rem", width: "25rem" }}
                                required
                                name="description"
                                className="taskTitle"
                                onChange={handleChange} />
                            <div className="calendarsetGoals">
                                <DatePicker
                                    dateFormat="dd/MM/yyyy"
                                    placeholderText="Select Date"
                                    onChange={(date) => handleDate(date)}
                                    selected={date}
                                    className="datePicker"
                                />
                            </div>
                            <div className={`${userInfo.filepreview === null ?
                                "beforeUpload" : "afterUpload"}`}>
                                <label className="labelUpload">
                                    <input type="file"
                                        name="goalImg"
                                        accept="image/*"
                                        onChange={handleInputChange} />
                                    Upload Image
                                </label>
                                {userInfo.filepreview !== null ?
                                    <img className="previewimg" src={userInfo.filepreview} alt="UploadImage" />
                                    : null}
                            </div>
                            <button className="submitButton"
                                type="Submit"
                            >Submit</button>
                        </form>
                    </div>
                    <div className="setGoalsImageBox">
                        <img src="setGoals.png" alt="setGoals" className="setGoalsImage" />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default SetGoals;
