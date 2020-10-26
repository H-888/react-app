import React, { Component } from 'react'
import { Route,  Switch } from 'react-router-dom'
import Layout from './layout/Layout'
import Home from './views/Home/Home';
import Category from './views/Category/Category';
import Cart from './views/Cart/Cart';
import User from './views/User/User';
import SearchField from './views/Home/SearchField/SearchField';
import SearchGoods from './views/Home/SearchGoods/SearchGoods';
import Detail from './views/Detail/Detail'
import Error from './views/Error/Error'
import Login from './views/User/Login/Login'
import RouteGuard from './guard/RouteGuard'
import NoLoginUser from './views/User/NoLoginUser/NoLoginUser';
import Reg from './views/User/Reg/Reg';
export default class App extends Component {
    render() {
        return (
            <Switch>
                <Route exact path={"/"} render={props => (<Layout {...props}><Home></Home></Layout>)} />
                <Route path={"/category"} render={props => (<Layout {...props}><Category></Category></Layout>)} />
                <Route path={'/cart'} render={props => <Layout {...props}><RouteGuard path="/cart" component={Cart}></RouteGuard></Layout>}></Route>
                <Route path={'/login'}render={props => <Layout {...props}><Login></Login></Layout>}></Route>
                <Route path={"/noLoginUser"} render={props => (<Layout {...props}><NoLoginUser></NoLoginUser></Layout>)} />
                <Route path={"/user"} render={props => (<Layout {...props}><RouteGuard component={User}></RouteGuard></Layout>)} />
                <Route path={"/reg"} render={props => (<Layout {...props}><Reg></Reg></Layout>)} />
                <Route path={"/searchfield"} render={props => (<SearchField {...props}></SearchField>)} />
                <Route path='/searchgoods/:goodsValue' render={props => <SearchGoods {...props}></SearchGoods>}></Route>
                <Route path={"/goodsdetail/:id"} render={props => (<Detail {...props}></Detail>)}></Route>
                <Route component={Error}/>
            </Switch>
        )
    }
}
