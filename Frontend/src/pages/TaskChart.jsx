import React, { useEffect, useState } from "react";
import {
    Tooltip,
    BarChart,
    XAxis,
    YAxis,
    Legend,
    CartesianGrid,
    Bar,
} from "recharts";
import { useSelector, useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import { deleteTask, getTasks, reset, updateTask, updatePercent } from "../features/tasks/taskSlice";
import Waiting from "../components/Waiting";
import { useNavigate } from "react-router-dom";

function TaskChart({ startDayOfWeek, lastDayOfWeek, startDay, lastDay }) {
    const { isLoading, isError, message } = useSelector(
        (state) => state.tasks
    );
    const tasks = useSelector(
        (state) => state.tasks.tasks.filter(r => startDay <= r.dateNumber && r.dateNumber <= lastDay
        ));
    const dispatch = useDispatch();
    const [showD, setShowD] = useState(false);
    const [data, setData] = useState([{ name: " ", Development: 0 }]);
    let f = []
    function showDiagram() {
        setShowD(true);
        for (var i = 0; i < tasks.length; i++) {
            console.log(tasks[i].title)
            const e = { name: tasks[i].title, Development: tasks[i].percentage }
            f.push(e)
        }
        setData(f);
    }
    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        dispatch(getTasks());
        // const titleArray = [];
        console.log({ data })
        return () => {
            dispatch(reset())
        }
    }, [isError, message, dispatch])

    if (isLoading) {
        return <Waiting />
    }
    return (
        <div>
            {showD === true ?
                <BarChart
                    width={500}
                    height={300}
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
                    <Bar dataKey="Development" fill="#8884d8" background={{ fill: "#eee" }} />

                </BarChart>
                : " "}
            <button onClick={() => showDiagram()}>show</button>
            <button onClick={() => console.log({ data })}></button>
        </div>
    )
};
export default TaskChart;
