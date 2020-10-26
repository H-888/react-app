import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom'
import store from './store'
import { Provider } from 'react-redux'
import userTypes from './store/actionTypes/user'
//引入数据交互拦截
import './plugins/axios'
import "./plugins/umi-requset"

//引入全局样式
import "./index.scss"
import qs from 'qs'
import FastClick from 'fastclick';
//同步sessionStorage 和redux中数据 
const sess = window.sessionStorage.getItem("user")
if(sess){
  let user = qs.parse(sess)
  store.dispatch({type:userTypes.CHANGE_LOGIN_STATE,payload:user})
}

//处理移动端点击事件 

FastClick.attach(document.body)
/*
移动设备上的浏览器默认会在用户点击屏幕大约延迟300毫秒后才会触发点击事件，
这是为了检查用户是否在做双击。为了能够立即响应用户的点击事件，才有了FastClick。
*/
ReactDOM.render(
  <Provider store={store}>
      <Router>
        <App />
      </Router>
  </Provider>
  , document.getElementById('root')
);

