import React from 'react';
import {BrowserRouter as Router,Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Redirect} from "react-router-dom";
import Landing from './components/landing.component';
import LoginPage from './components/login.component';
import ProtectedRoute from './components/protectedRoute.component';
function App() {
  return (
    <Router>
    <Redirect from="/" to="/dashboard"/>
    <ProtectedRoute path='/dashboard' exact component={()=>{
      return <Landing/>;}}/>
    <Route path='/login' exact component={()=>{
      if(localStorage.getItem('token'))
      return <Redirect to='/dashboard'/>;
      else
        return <LoginPage />;
    }}/>
    </Router>
  );
}
export default App;
