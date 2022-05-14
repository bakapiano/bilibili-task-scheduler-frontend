import axios from 'axios'

const service = axios.create({
    baseURL: 'http://127.0.0.1:8000/', // 所有的请求地址前缀部分
    timeout: 60000, // 请求超时时间毫秒
    withCredentials: true, // 异步请求携带cookie
    headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    },
})

service.interceptors.request.use(config => {
    // 在请求头中添加token
    config.headers.Authorization = window.localStorage.getItem("token")
    return config
})

export default service
