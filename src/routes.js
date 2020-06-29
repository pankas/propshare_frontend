import React from 'react';
import { Route } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Dashboard from './components/Dashboard';
import AuthRoute from "./authRoute";


const BaseRouter = ()=>{
    return(
    <div>   
            <Route exact path="/" component={Login}/>
            <Route exact path="/signup" component={SignUp}/>
            <AuthRoute exact path="/details" component={Dashboard}/>            
            <AuthRoute exact path="/user-list" component={Dashboard}/>      
            <AuthRoute exact path="/item-list" component={Dashboard}/>            


    </div>)
}

export default BaseRouter