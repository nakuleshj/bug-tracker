import React from 'react';
import {BrowserRouter as Router,Route, Redirect} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import LandingPage from './components/landing.component';
import LoginPage from './components/login.component';
import ProjectPage from './components/projects.component';
import UserPage from './components/userpage.component';
function App() {
  return (
    <Router>
    <Route path='/' exact component={()=>{
      if(localStorage.getItem('token'))
      return <LandingPage/>;
      else
        return <LoginPage />;}}/>
        <Route path='/projects' exact component={()=>{
      if(localStorage.getItem('token') && localStorage.getItem('role')==='0')
      return <ProjectPage/>;
      else
        return <Redirect to='/'/>;}}/>
        <Route path='/users' exact component={()=>{
      if(localStorage.getItem('token') && localStorage.getItem('role')==='0')
      return <UserPage/>;
      else
        return <Redirect to='/'/>;}}/>
    </Router>
  );
}
export default App;
