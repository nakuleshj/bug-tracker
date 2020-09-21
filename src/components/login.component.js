import 'bootstrap/dist/css/bootstrap.min.css';
import React,{Component} from 'react';
import '../styling/login.css';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
export default class LoginPage extends Component{
    constructor(props){
        super(props);
        this.state={
            isRegister:false,
            isModalOpen:false,
            loginEmail:'',
            loginPassword:'',
            registerName:'',
            registerEmail:'',
            registerPassword:''
        };
        this.onLoginSubmit = this.onLoginSubmit.bind(this);
        this.onLoginEmailChanged=this.onLoginEmailChanged.bind(this);
        this.onLoginPasswordChanged=this.onLoginPasswordChanged.bind(this);
        this.onRegistrationSubmit = this.onRegistrationSubmit.bind(this);
        this.onRegisterEmailChanged=this.onRegisterEmailChanged.bind(this);
        this.onRegisterNameChanged=this.onRegisterNameChanged.bind(this);
        this.onRegisterPasswordChanged=this.onRegisterPasswordChanged.bind(this);
    }
    onLoginSubmit(e){
        // const options = {
        //     headers: {'authorization': 'Bearer csdscdscscdsc'}
        //   };
        e.preventDefault();
        axios.post('/authenticate/login',{email:this.state.loginEmail,password:this.state.loginPassword}).then((res)=>{
            // this.setState({
            //     isModalOpen:false
            // });
            localStorage.setItem('token',res.data.token)
            localStorage.getItem('token')?console.log('true'):console.log('false');
        }).catch((e)=>{
            // this.setState({
            //     isModalOpen:false
            // });
            console.log(e.toString);
        })
    }
    onRegistrationSubmit(e){
        e.preventDefault();
        axios.post('/authenticate/register',{email:this.state.registerEmail,password:this.state.registerPassword,name:this.state.registerName}).then((res)=>{
            this.setState({
                isModalOpen:false
            });
            console.log('User registered');
        }).catch((e)=>{
            this.setState({
                isModalOpen:false
            });
            console.log(e.toString);
        })
    }
    onRegisterEmailChanged(e){
        this.setState({
            registerEmail:e.target.value
        });
    }
    onRegisterPasswordChanged(e){
        this.setState({
            registerPassword:e.target.value
        });
    }
    onRegisterNameChanged(e){
        this.setState({
            registerName:e.target.value
        });
    }
    onLoginEmailChanged(e){
        this.setState({
            loginEmail:e.target.value
        });
    }
    onLoginPasswordChanged(e){
        this.setState({
            loginPassword:e.target.value
        });
    }
    render(){
        return (
            <div className='container-fluid login-container' >
                <Modal show={this.state.isModalOpen} onHide={()=>{
                    this.setState({
                        isModalOpen:false
                    });
                }}>
                    <form onSubmit={this.onRegistrationSubmit}>
                    <Modal.Header closeButton>
                    
          <Modal.Title style={{color:'#5B68F7'}}><strong>Create Account</strong></Modal.Title>

        </Modal.Header>
        <Modal.Body>
            
            <input type='text' className='form-control' placeholder='Name' style={{borderBottomLeftRadius:'0px',borderRadius:'0px',marginBottom:'-1px'}} onChange={this.onRegisterNameChanged}/>
            <input type='email' className='form-control' placeholder='Email Address' style={{borderRadius:'0px'}} onChange={this.onRegisterEmailChanged}/>
            <input type='password' className='form-control' placeholder='Password'  onChange={this.onRegisterPasswordChanged}/>
            
        </Modal.Body>
        <Modal.Footer>
        <button type='submit' className='btn btn-primary btn-block  mx-0' style={{backgroundColor:'#5B68F7', border:'1px solid #5B68F7'}}>CREATE ACCOUNT</button>
            </Modal.Footer>
        </form>
                </Modal>
                <div className='row h-100'>
                    {/* <div className='col'>
                        <img src='../../icon.png' alt='bugtrackr icon' className='img-fluid mx-auto mt-5 d-block'/>
                        <h1 className='text-center text-brand mt-3 mx-auto d-block'>BugTracker</h1>
                    </div> */}
                    <div className='col my-auto'>
                        <div className='login-panel mx-auto px-3 py-4 d-block text-center'>
                        <img src='../../icon.png' alt='bugtrackr icon' className='img-fluid mb-3' style={{height:'100px'}}/>
                            <h1 className='mb-4  bugtracker-brand-login'><strong>BugTracker</strong></h1>
                            <form onSubmit={this.onLoginSubmit}>
                            <input type='email' className='form-control' placeholder='Email Address' id='emailInput' onChange={this.onLoginEmailChanged}/>
                            <input type='password' className='form-control' placeholder='Password' id='pwdInput' onChange={this.onLoginPasswordChanged}/>
                            <button type='submit' className='btn btn-primary btn-block  mx-0 auth-submit-buttom' style={{backgroundColor:'#5B68F7', border:'1px solid #5B68F7'}}>LOGIN</button>
                            </form>
                            
                                
                                <button type='button' className='btn btn-outline-primary btn-block reg-button mt-3' onClick={()=>{
                                    this.setState({
                                        isModalOpen:true
                                    });
                                }}>CREATE ACCOUNT</button>
                            </div>
                    </div>
                </div>
            </div>
        );
    }
}