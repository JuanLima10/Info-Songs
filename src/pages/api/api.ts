import axios from 'axios'

const api = axios.create({
    baseURL: 'https://api.vagalume.com.br/'
})

export default api