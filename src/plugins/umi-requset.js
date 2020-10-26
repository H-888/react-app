import React from 'react'
import request from 'umi-request'
import store from 'store'
// import { baseUrl } from '../api'

// requset拦截器 ,改变url  或者 options

request.interceptors.request.use((url,options)=>{
    console.log("umi-requset请求拦截",url,options);
    // 抓取状态管理中的token 携带在请求头中
    let user = store.getState().user;
    // console.log("requset",user.token);
    options.headers = {
      "Authorization":user.token,
  };
    return (
        {
            url,
            options
        }
    )
});


// 提前对响应做异常处理

request.interceptors.response.use(async(response)=>{
    
  const codeMaps = {
    200: '服务器成功返回请求的数据。',
    201: '新建或修改数据成功。',
    202: '一个请求已经进入后台排队（异步任务）。',
    204: '删除数据成功。',
    400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
    401: '用户没有权限（令牌、用户名、密码错误）。',
    403: '用户得到授权，但是访问是被禁止的。',
    404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
    406: '请求的格式不可得。',
    410: '请求的资源被永久删除，且不会再得到的。',
    422: '当创建一个对象时，发生一个验证错误。',
    500: '服务器发生错误，请检查服务器。',
    502: '网关错误。',
    503: '服务不可用，服务器暂时过载或维护。',
    504: '网关超时。',
  };
  // console.log(response.status,codeMaps[response.status]);
  // console.log("umi-request响应拦截",response);
  // const data = await response.clone.json(); //克隆响应对象做解析处理

  return response;
})

React.request = request; // request绑到对象包上
React.Component.prototype.request = request; // request绑定到Component类的原型 
export default request;