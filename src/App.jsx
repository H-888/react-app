import React, { Component } from 'react'
import {  Route, Switch } from 'react-router-dom'
import Layout from './layout/Layout'
import Home from './views/Home/Home';
import Category from './views/Category/Category';
import Cart from './views/Cart/Cart';
import User from './views/User/User';

export default class App extends Component {
    render() {
        return (
           <Switch>
               <Route exact path={"/"} render={props=>(<Layout {...props}><Home></Home></Layout>)}/>
               <Route path={"/category"} render={props=>(<Layout {...props}><Category></Category></Layout>)}/>
               <Route path={"/cart"} render={props=>(<Layout {...props}><Cart></Cart></Layout>)}/>
               <Route path={"/user"} render={props=>(<Layout {...props}><User></User></Layout>)}/>
           </Switch>
        )
    }
}
