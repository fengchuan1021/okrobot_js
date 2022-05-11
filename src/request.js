import axios from 'axios'
const request = axios.create(
    //{
    // 因为项目前端和后台是放在一起的，所以这里直接用 VUE_APP_CONTEXT_PATH 即可，如果分开部署用 VUE_APP_BASE_API
   // baseURL: process.env.NODE_ENV === 'development' ? '' : process.env.VUE_APP_CONTEXT_PATH, // url = base url + request url
   // withCredentials: true, // 是否携带cookie
    //timeout: 5000 // 请求超时时间
//}
)



request.interceptors.response.use(
    response => {
            console.log("filter??")
            return response.data;

    }, error => {

        return Promise.reject(error.response.data)
    }
)
export default request
