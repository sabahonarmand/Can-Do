import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import './WeekTasks.css';
import 'animate.css';
import DeleteIcon from '@mui/icons-material/Delete';
import Waiting from "../components/Waiting";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask, getTasks, reset, updateTask, updatePercent } from "../features/tasks/taskSlice";
import { toast } from 'react-toastify';
import {
    Tooltip,
    BarChart,
    XAxis,
    YAxis,
    Legend,
    CartesianGrid,
    Bar,
} from "recharts";


function WeekTasks({ startDayOfWeek, lastDayOfWeek, startDay, lastDay }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [percentInput, setPercentInput] = useState("");
    const [Inx, setInx] = useState("");
    const [average, setaverage] = useState("");
    const [showD, setShowD] = useState(false);
    const [data, setData] = useState([{ name: " ", Development: 0 }]);
    let f = []
    // function showDiagram() {

    // }
    const { user } = useSelector((state) => state.auth);
    const { isLoading, isError, message } = useSelector(
        (state) => state.tasks
    );
    const tasks = useSelector(
        (state) => state.tasks.tasks.filter(r => startDay <= r.dateNumber && r.dateNumber <= lastDay
        ));

    function handlePercentInput(e) {
        const temp = e.target.value;
        if (temp > 100 || temp < 0) {
            alert("Please enter the correct value");
        }
    };
    function handleDiagram() {
        setShowD(true);
        let a = 0;
        let c = 0;
        for (var i = 0; i < tasks.length; i++) {
            c = parseInt(tasks[i].percentage);
            a = c + a
            const e = { name: tasks[i].title, Development: tasks[i].percentage }
            f.push(e)
        }
        const w = Math.floor(a / tasks.length)
        setaverage(w)
        setData(f);
    }
    function handlePercentBttn(task) {
        dispatch(updatePercent({
            percentage: percentInput,
            id: task._id
        }));
        console.log(tasks);
    };
    function handleDoneTask(task) {
        dispatch(updateTask(task._id));

    };

    function handleDeleteTask(id) {
        dispatch(deleteTask(id));
        console.log(id, "id");
    };
    function handlePercentInput(e) {
        const temp = e.target.value;
        if (temp > 100 || temp < 0) {
            alert("Please enter the correct value");
        }
        else {
            const a = temp.toString();
            setPercentInput(a);
        }
    };
    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        if (!user) {
            navigate('/');
        }
        dispatch(getTasks());

        // tasks = [...new Set(tasks)];
        return () => {
            dispatch(reset())
        }
    }, [user, navigate, isError, message, dispatch])

    if (isLoading) {
        return <Waiting />
    }
    return (
        <div className="today">
            <Navbar />
            <hr className="borderWeekPage" />
            {tasks.length > 0 && showD === true ?
                <div className="chartpage">
                    <BarChart
                        width={700}
                        height={500}
                        className="chart"
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 80,
                            bottom: 5,
                        }}
                        barSize={20}
                    >
                        <XAxis
                            dataKey="name"
                            scale="point"
                            padding={{ left: 10, right: 10 }}
                        />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Bar dataKey="Development" fill="#3f2b96" background={{ fill: "#eee" }} />
                    </BarChart>
                    <div className="averagebox">
                        <p className="average">Your average performance: </p>
                        <p>  {average}%</p>
                    </div>
                    <div className="TaskChartImageContent">
                        <img src="TaskChart.png" alt="TaskChart" className="TaskChartImage" />
                    </div>
                </div>
                :
                <div>
                    <button className="diagramBttn" onClick={() => handleDiagram()}>
                        Chart of Progress
                    </button>
                    {tasks.length === 0 ?
                        <div className="todayTask">
                            <img src="EmptyState.gif" alt="EmptyState" className="emptyStateImage" />
                            <p className="emptyError">NOTHING!!!</p>
                            <p className="emptyError">It's empty in here.</p>
                        </div>
                        :
                        <div className="todaytask">
                            <div className="header">
                                <span className="day">In This Week<p className="date">From {startDayOfWeek}
                                    <br />To {lastDayOfWeek}</p></span>
                            </div>
                            <ul className="taskItems">
                                {tasks.map((task) => (
                                    <li key={task._id} className="item animate__animated animate__flipInX">
                                        <div className="itemContent">
                                            <div className="itemHeader">
                                                <p style={{ gridColumn: "first" }}>{task.startTime}</p>
                                                <p style={{ gridColumn: "line2" }}>{task.endTime}</p>
                                                <h1>{task.title}</h1>
                                            </div>
                                            <div className="itemDescription">
                                                {task._id === Inx ?
                                                    <div className="desc">
                                                        <sapn className="descText">{task.description}</sapn>
                                                        <div className="closeBttn">
                                                            <button key={task._id}
                                                                className="BttnDes"
                                                                onClick={
                                                                    () => {
                                                                        setInx("");
                                                                    }
                                                                }>Close</button>
                                                        </div>
                                                    </div>
                                                    :
                                                    <button
                                                        className="BttnDes"
                                                        onClick={
                                                            () => {
                                                                setInx(task._id);
                                                            }
                                                        }>Description</button>
                                                }
                                                <div className="withoutPercentage">
                                                    <img
                                                        src="delete.png"
                                                        alt="deleteImage"
                                                        className="deleteIcon"
                                                        onClick={() => handleDeleteTask(task._id)} />
                                                    {task.percentage !== " " ?
                                                        <div className="donepercenbox">
                                                            <p className="DoneT">Done</p>
                                                            <div className="donepercen">
                                                                <p className="percen">{task.percentage}</p>
                                                            </div>
                                                        </div>
                                                        :
                                                        <img
                                                            src="logo.png"
                                                            alt="doneImage"
                                                            className="doneImage"
                                                            onClick={() => handleDoneTask(task)} />
                                                    }
                                                    <p className="dateTask">{task.date}</p>

                                                </div>
                                                {task.done === true && task.percentage === " " ?
                                                    <div className="percentbox">
                                                        <p>
                                                            What percentage were you able to do?
                                                        </p>
                                                        <div className="percent">
                                                            <input
                                                                type="number"
                                                                // value={task.percentage}
                                                                onChange={handlePercentInput} />
                                                            <p>%</p>
                                                        </div>
                                                        <button
                                                            className="okBttn"
                                                            onClick={() => handlePercentBttn(task)}>
                                                            OK</button>
                                                    </div>
                                                    : ""}

                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <div className="weekTasksImageContent">
                                <img src="weekTasks.png" alt="WeekTasks" className="WeekTasksImage" />
                            </div>
                        </div>
                    }
                </div>
            }
        </div>

    )
};
export default WeekTasks;
