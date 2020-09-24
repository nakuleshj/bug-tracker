import React,{Component} from 'react';
import {Link} from 'react-router-dom';


export default class Navbar extends Component{
    constructor(props){
        super(props);
        this.state={
            isMenuOpen:false
        };
    }
    
    render() {
        function handleLogout() {
            localStorage.removeItem('token');
            window.location.replace('/');
        }
        
        return (
            <>
            <nav  className="navbar navbar-expand-sm" id='mainNav' style={{backgroundColor:'rgba(0,0,0,.0)',color:'grey'}}>
                <Link to="/" className="navbar-brand mr-auto" style={{color:'#5B68F7',fontWeight:'bold'}}><h4 className='navbar-heading'>BugTracker</h4></Link>
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
                <button type='button' id='menuIcon' className='btn btn-link' onClick={()=>{
                    this.setState({
                        isMenuOpen:!this.state.isMenuOpen
                    })
                }}> <h3><i className="fa fa-bars"></i></h3></button>
            </nav>
            <ul className={this.state.isMenuOpen?"list-group list-group-flush":"list-group list-group-flush d-none"} >
                <li className='list-group-item'>
                        <Link className='btn btn-link btn-block' style={{color:'#5B68F7'}} to='/'>Issues</Link>
                    </li>
                    {
                        localStorage.getItem('role')==='0'?
                        <>
                        <li className='list-group-item'>
                        <Link className='btn btn-link btn-block' style={{color:'#5B68F7'}} to='/users'>Users</Link>
                    </li>
                        <li className='list-group-item'>
                        <Link className=' btn btn-link btn-block text-center' style={{color:'#5B68F7'}} to='/projects'>Projects</Link>
                    </li></>:null}
                    <li className='list-group-item'>
                        <button className='btn btn-link btn-block' style={{color:'#5B68F7'}} onClick={handleLogout}>Logout</button>
                    </li>
                    
                </ul>
            </>
        );
    }
}