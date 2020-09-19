import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute=({component: Component, ...rest })=>{
    return(
    <Route {...rest} render={
        props => {
        if(false)
        return <Component {...rest} {...props} />
            else
            return <Redirect to={
                {
                  pathname: '/unauthorized',
                  state: {
                    from: props.location
                  }
                }
              } />
    }
      } />)
}