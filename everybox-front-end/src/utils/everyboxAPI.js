import axios from 'axios'

const everyboxAPI = axios.create({
    baseURL: 'http://localhost:8080/api/',
    auth: { 
        username: 'admin',
        password: 'everybox!'
    }
})

export default everyboxAPI