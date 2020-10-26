import React from 'react'
import { Route,withRouter,Redirect } from 'react-router-dom'
import {connect} from 'react-redux';
const RouteGuard = ({component:Component,loginState,...rest}) => {  
    console.log(loginState);
    return  (
        //如果已经登录,就直接跳转到对应页面 ,否则重定向到登录页面
        <Route {...rest} render={props =>  (
                loginState ? <Component {...props}/>
                // 将前一页的路径信息存到状态当中
                :<Redirect to={{ pathname: '/login', state: { from: props.location } }}/>
            )
        }/>
    )
}
const mapStateToProps = state =>{
    return {
        loginState:state.user.loginState
    }
}
export default connect(mapStateToProps)(withRouter(RouteGuard))
