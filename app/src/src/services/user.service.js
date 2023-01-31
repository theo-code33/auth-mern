import instance from './api.service'
import TokenService from './token.service'

const API_URL = `${process.env.REACT_APP_API_URL}/user`

const update = async (credentials) => {
    const userToken = await TokenService.getTokenFromLocalStorage()
    console.log(userToken);
    const response = await instance.put(`${API_URL}/update`, credentials)
    return response.data
}

const UserService = {
    update
}

export default UserService