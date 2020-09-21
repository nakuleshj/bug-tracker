import React from 'react';
import {BrowserRouter as Router,Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import Landing from './components/landing.component';
import LoginPage from './components/login.component';
import ProtectedRoute from './components/protectedRoute.component';
function App() {
  return (
    <Router>
    
    <Route path='/' exact component={()=>{
      return <Landing/>;}}/>
    <Route path='/login' exact component={LoginPage}/>
    </Router>
  );
}
export default App;
