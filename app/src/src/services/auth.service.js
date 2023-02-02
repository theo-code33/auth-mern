import instance from "./api.service";

const API_URL = `${process.env.REACT_APP_API_URL}/auth`;

const signup = async (credentials) => {
    const response = await instance.post(`${API_URL}/signup`, credentials);
    return response.data;
}

const signin = async (credentials) => {
    const response = await instance.post(`${API_URL}/signin`, credentials);
    return response.data;
}
const forgotPassword = async (credentials) => {
    const response = await instance.post(`${API_URL}/forgot-password`, credentials);
    return response.data;
}

const resetPassword = async (credentials) => {
    const response = await instance.post(`${API_URL}/reset-password`, credentials);
    return response.data;
}


const AuthService = {
    signup,
    signin,
    forgotPassword,
    resetPassword
}

export default AuthService;