import React,{Component} from 'react';
import {Link} from 'react-router-dom';


export default class Navbar extends Component{
    
    
    render() {
        function handleLogout() {
            localStorage.removeItem('token');
            window.location.replace('/');
        }
        
        return (
           
            
            <nav  className="navbar navbar-expand-sm" id='mainNav' style={{backgroundColor:'rgba(0,0,0,.0)',color:'grey'}}>
                <Link to="/" className="navbar-brand mr-auto" style={{color:'#5B68F7'}}><h1><b>BugTracker</b></h1></Link>
                
                <ul className="navbar-nav ml-auto " id="nav-items" >
                <li className='navbar-item'>
                        <Link className='nav-link btn btn-link mr-2' style={{color:'#5B68F7'}} to='/'>Issues</Link>
                    </li>
                    {
                        localStorage.getItem('role')==='0'?
                        <>
                        <li className='navbar-item'>
                        <Link className='nav-link btn btn-link mr-2' style={{color:'#5B68F7'}} to='/users'>Users</Link>
                    </li>
                        <li className='navbar-item'>
                        <Link className='nav-link btn btn-link mr-2' style={{color:'#5B68F7'}} to='/projects'>Projects</Link>
                    </li></>:null}
                    <li className='navbar-item'>
                        <button className='nav-link btn btn-link mr-2' style={{color:'#5B68F7'}} onClick={handleLogout}>Logout</button>
                    </li>
                    
                </ul>
                <button type='button' id='menuIcon' className='btn btn-link'> <h3><i className="fa fa-bars"></i></h3></button>
            </nav>
            
        );
    }
}