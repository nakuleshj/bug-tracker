import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

export default function AuthRoute({component: Component, ...rest }){
    return(
    <Route {...rest} render={
        props => {
        if(localStorage.getItem('token'))
        return <Component {...rest} {...props} />
            else
            return <Redirect to={
                {
                  pathname: '/login',
                  state: {
                    from: props.location
                  }
                }
              } />
    }
      } />)
}