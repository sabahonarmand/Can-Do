import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { TimePicker } from 'antd';
import 'antd/dist/antd.min.css';
import moment from 'moment';
import './CreateTask.css';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { alignProperty } from "@mui/material/styles/cssUtils";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createTask } from "../features/tasks/taskSlice";
import Waiting from "../components/Waiting";

function CreateTask() {
    const [date, setDate] = useState("");
    const [check, setCheck] = useState(false);
    const [firstTime, setFirstTime] = useState("00:00");
    const [lastTime, setLastTime] = useState("00:00");
    const [task, setTask] = useState({
        title: "",
        description: "",
        date: "",
        dateNumber: "",
        startTime: "",
        endTime: "",
        // done: false
    });

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
        const q = new Date(date).toLocaleDateString()
        const a = q.split("/");
        const b = parseInt(a[1]);
        setTask({ ...task, date: d, dateNumber: b });
        // setTask({ ...task, dateNumber: a[1] });
    }

    function handleChange(e) {
        setTask((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    function handleSubmit(e) {
        e.preventDefault();
        console.log(task);
        const { title, description, date, dateNumber, startTime, endTime } = task
        console.log(typeof ({ title }), "kharrrrrrrr");
        dispatch(createTask({
            title,
            description,
            date,
            dateNumber,
            startTime,
            endTime
        }));
        setTask({
            title: "",
            description: "",
            date: "",
            dateNumber: "",
            startTime: "",
            endTime: "",
        })
    };

    return (
        <div className="app">
            <Navbar />
            <hr className="borderCurrentPage" />
            <div className="createTask">
                <div className="createTaskBox">
                    <div className="CreateTaskImageContent">
                        <img src="createTask.png" alt="login" className="CreateTaskImage" />
                    </div>
                    <div className="task">
                        <input type="text"
                            placeholder="Title"
                            style={{ width: "14rem", fontWeight: "500" }}
                            required
                            name="title"
                            value={task.title}
                            onChange={handleChange}
                            className="taskTitle" />
                        <input type="text"
                            placeholder="Description"
                            style={{ marginTop: "3rem", marginBottom: "3rem", width: "25rem" }}
                            required
                            name="description"
                            value={task.description}
                            onChange={handleChange}
                            className="taskTitle" />
                        <div className="calendar">
                            <DatePicker
                                dateFormat="dd/MM/yyyy"
                                placeholderText="Select Date"
                                onChange={(date) => handleDate(date)}
                                selected={date}
                                className="datePicker"
                            />
                            <TimePicker
                                format="HH:mm"
                                showNow={false}
                                name="startTime"
                                onSelect={(value) => {
                                    const timeString = moment(value).format("HH:mm");
                                    setTask({ ...task, startTime: timeString });
                                    setFirstTime(timeString);
                                }} />
                            <TimePicker
                                format="HH:mm"
                                showNow={false}
                                onSelect={(value) => {
                                    const timeString = moment(value).format("HH:mm");
                                    setTask({ ...task, endTime: timeString });
                                    setLastTime(timeString);
                                }} />
                        </div>
                        {/* <div className="routin">
                            {check === true ?
                                <CheckBoxIcon className="checkIcon"
                                    onClick={() => setCheck(false)} />
                                :
                                <CheckBoxOutlineBlankIcon className="checkIcon"
                                    onClick={() => setCheck(true)} />
                            }
                            <p style={{ marginTop: "3rem", fontSize: "20px" }}>
                                I want this task to be added to the weekly routine.</p>
                        </div> */}
                        <button className="submitButton" type="Submit"
                            onClick={handleSubmit}>Submit</button>
                    </div>

                </div>
            </div>
        </div>
    );
};
export default CreateTask;
