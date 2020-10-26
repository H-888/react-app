import React from 'react'
import axios from 'axios'
// import { BrowserRouter as Router } from 'react-router-dom'
// import { baseUrl } from '../api'

// 添加一个axios的拦截器
axios.interceptors.request.use(config=>{
    console.log("axios请求的拦截",config);

    // 抓取本地token,携带token在请求头里
    let user = window.localStorage.getItem("user");
    user = user ? JSON.parse(user) : '';
    config.headers={
        "token":user.token
    }
    return config
},err=>Promise.reject(err)) //请求错误时做点事

// 添加一个响应的拦截
axios.interceptors.response.use(response=>{
    console.log("axios的响应拦截",response);
    // let router = new Router(); // {history,default:组件本身xxx}

    //token过期 跳转登录页
    return response;
})

React.axios = axios; // axios绑到对象包上 组件.axios | React.axios
React.Component.prototype.axios =axios; // axios绑定到Component类原型上
export default axios;