import axios from 'axios'
axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
const request=axios.create({
    baseURL:'http://localhost:3000',
    withCredentials: true,
    timeout: 5000
})
request.interceptors.request.use(function(config){
    return config
},function(err){
    return Promise.reject(err);
})
// request.interceptors.response.use(function(config){

// },function(err){
//     return Promise.reject(err);
// })
export default request;