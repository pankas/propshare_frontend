import React from 'react';
import { Route, Redirect } from 'react-router-dom';


const authenticate = () => {
    let  token = localStorage.getItem('token');
    if(token!==null)
        return true;
    return false;
}

const AuthRoute = (props) => {
    let newProps = JSON.parse(JSON.stringify(props)), Component = props.component;
    return (
        <Route {...newProps} render={props => (
            authenticate() ?
                <Component {...props} /> :
                <Redirect to={{
                    pathname: "/"
                }} />
        )}
        />
    )
}

export default AuthRoute