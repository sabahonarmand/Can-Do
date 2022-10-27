import axios from 'axios';

const API_URL = 'http://localhost:8800/api/tasks/';
const API_URL_UPDATE = 'http://localhost:8800/api/tasks/update/';
const API_URL_UPDATE_PERCENT = 'http://localhost:8800/api/tasks/updatePercent/';
//Create new task
const createTask = async (taskData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const response = await axios.post(API_URL, taskData, config);
    return response.data;
};

//Get user Task
const getTasks = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const response = await axios.get(API_URL, config);
    return response.data;
};
//Update user Task
const updateTask = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const response = await axios.post(API_URL_UPDATE + id, config);
    return response.data;
};

const updatePercent = async (percentage, id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    // console.log(typeof (percentage), "ggg")
    // const {percentage,id} = payload
    const response = await axios.post(API_URL_UPDATE_PERCENT + id,
        { percentage: percentage || "0" }, config);
    return response.data;
};
// Delete user task
const deleteTask = async (taskId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.delete(API_URL + taskId, config)

    return response.data
}

const taskService = {
    createTask,
    getTasks,
    updateTask,
    updatePercent,
    deleteTask
};

export default taskService;