import axios from "axios";
import store from '@/store/index.js'

axios.interceptors.request.use(
    config=>{
        const token=store.getters['auth/getToken']
        if(token){
            config.headers.Authorization=`Bearer ${token}`
        }
        return config
    },
    error=>{
        return Promise.reject(error)
    }
)


axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://localhost:3000/xampp/htdocs/web_personnel/public/api/'
axios.defaults.headers.common['Content-Type']='application/json'
axios.defaults.headers.common['Accept']='application/json'
export default axios