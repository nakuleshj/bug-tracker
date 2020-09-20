import React,{Component} from 'react';
import {Link} from 'react-router-dom';

export default class Navbar extends Component{
    
    render() {
        function handleClick() {
        
        }
        return (
            <nav  className="navbar navbar-expand-sm" id='mainNav' style={{backgroundColor:'rgba(0,0,0,.0)',color:'grey'}}>
                <Link to="/" className="navbar-brand" style={{color:'#5B68F7'}}><h1><b>BugTrackr</b></h1></Link>
                
                <ul className="navbar-nav ml-auto">
                    <li className='navbar-item'>
                        <Link to='/login' className='nav-link btn btn-link mr-2' style={{color:'#5B68F7'}}>Login</Link>
                    </li>
                    <li className='navbar-item'>
                        <Link to='/register' className='nav-link btn btn-primary' style={{backgroundColor:'#5B68F7', border:'1px solid #5B68F7'}}>Create Account</Link>
                    </li>
                    <button type='button' id='menuIcon' className='btn btn-link ' onClick={handleClick()} style={{display:"none"}}> <i className="fa fa-bars"></i></button>
                </ul>
            </nav>
        );
    }
}