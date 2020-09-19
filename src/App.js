import React from 'react';
import './App.css';
import {BrowserRouter as Router,Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Landing from './components/landing.component';
function App() {
  return (
    <Router>
    
    <Route path='/' exact component={()=>{
      
      return false?<Landing name='Nakulesh'/>:<Landing name='Nakul'/>;}}/>
    {/* <Route path='/bug/create' exact component={}/> */}
    </Router>
  );
}
export default App;
