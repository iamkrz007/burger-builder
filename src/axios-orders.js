import axios from 'axios';


const instance = axios.create({
    // baseURL:'https://react-burger-b01a5-default-rtdb.firebaseio.com/'
    baseURL:'https://burger-3530e-default-rtdb.firebaseio.com/'
})

export default instance;