import axios from "axios";

const API_URL = 'http://localhost:8800/api/users/'

//Register user
const register = async (userData) => {
    const response = await axios.post(API_URL, userData);

    if (response.data) {
        localStorage.setItem('token', JSON.stringify(response.data));
        localStorage.setItem('userid', JSON.stringify(response.data));
    }

    return response.data;
};

//Login user
const login = async (userData) => {
    const response = await axios.post(API_URL + 'login', userData);

    if (response.data) {
        localStorage.setItem('token', JSON.stringify(response.data));
        localStorage.setItem('userid', JSON.stringify(response.data.user_id));
    }

    return response.data;
};

//Logout user
const logout = () => {
    localStorage.removeItem('token');
}

const authService = {
    register,
    logout,
    login
}
export default authService;