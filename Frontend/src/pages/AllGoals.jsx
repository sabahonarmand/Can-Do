import React, { useState, useEffect } from "react";
import './AllGoals.css';
import 'animate.css';
import Navbar from "../components/Navbar";
import DeleteIcon from '@mui/icons-material/Delete';
import Waiting from "../components/Waiting";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import axios from "axios";
import { deleteGoal, getGoal, reset, updateTask, updatePercent } from "../features/goals/goalSlice";

function AllGoals() {
    const [goals, setGoals] = useState([]);
    const [del, setdel] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [Inx, setInx] = useState("");
    function handleDeleteGoal(id) {
        axios.delete('http://localhost:8800/api/goals/' + id);
        const userid = localStorage.getItem('userid');
        axios.get('http://localhost:8800/api/goals/', userid)
            .then(res => {
                console.log(res.data, "gola")
                setGoals(res.data)
            })
            .catch(err => {
                console.log(err);
            })
    };
    useEffect(() => {
        const userid = localStorage.getItem('userid');
        axios.get('http://localhost:8800/api/goals/', userid)
            .then(res => {
                console.log(res.data, "gola")
                setGoals(res.data)
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    return (
        <div className="today">
            <Navbar />
            <hr className="borderAllGoalsPage" />
            {goals.length === 0 ?
                <div className="todayTask">
                    <img src="EmptyState.gif" alt="EmptyState" className="emptyStateImage" />
                    <p className="emptyError">NOTHING!!!</p>
                    <p className="emptyError">It's empty in here.</p>
                </div>
                :
                <div className="todaytask">
                    <ul className="taskItems">
                        {goals.map((goal) => (
                            <li key={goal._id} className="item animate__animated animate__flipInX">
                                <div className="itemContent">
                                    <div className="itemHeader">
                                        <p style={{ gridColumn: "first" }}>{goal.startTime}</p>
                                        <p style={{ gridColumn: "line2" }}>{goal.endTime}</p>
                                        <h1>{goal.title}</h1>
                                    </div>
                                    <div className="itemDescription">
                                        {goal._id === Inx ?
                                            <div className="descGoal">
                                                <sapn className="descText">{goal.description}</sapn>
                                                <div className="imageGoalBox">
                                                    <img
                                                        className="imageGoal"
                                                        src={`/uploads/${goal.goalImg}`} />
                                                </div>
                                                <div className="closeBttn">
                                                    <button key={goal._id}
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
                                                        setInx(goal._id);
                                                    }
                                                }>Description</button>
                                        }

                                        <img
                                            src="delete.png"
                                            alt="deleteImage"
                                            className="deleteIcon"
                                            onClick={() => handleDeleteGoal(goal._id)} />
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="AllGoalsImageContent">
                        <img src="AllGoals.png" alt="AllGoals" className="AllGoalsImage" />
                    </div>
                </div>
            }

        </div>
    );
};
export default AllGoals;
