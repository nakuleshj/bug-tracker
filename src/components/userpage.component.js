import React, { Component } from 'react';
import Navbar from './navbar.component';
import Axios from 'axios';
import Modal from 'react-bootstrap/Modal'
export default class UserPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showResetPasswordModal:false,
            registerName: '',
            registerPassword: '',
            registerEmail: '',
            userRole: '0',
            resetPassword:false,
            newPassword:'',
            newPasswordUserID:'',
            users: []
        };
        this.onRegistrationSubmit = this.onRegistrationSubmit.bind(this);
        this.onRegisterEmailChanged = this.onRegisterEmailChanged.bind(this);
        this.onRegisterNameChanged = this.onRegisterNameChanged.bind(this);
        this.onRegisterPasswordChanged = this.onRegisterPasswordChanged.bind(this);
        this.onRoleSelect = this.onRoleSelect.bind(this);
        this.onNewPasswordChanged=this.onNewPasswordChanged.bind(this);
        this.resetPassword=this.resetPassword.bind(this);
    }
    componentDidMount() {
        document.title = 'Users | BugTracker'
        Axios.get('/authenticate', {
            headers: {
                'authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then((res) => { this.setState({ users: res.data }) })
            .catch((e) => console.log(e.toString()));
    }
    onRoleSelect(e) {
        this.setState({
            userRole: e.target.value
        });
    }
    onRegistrationSubmit(e) {
        e.preventDefault();
        Axios.post('/authenticate/register', { email: this.state.registerEmail, password: this.state.registerPassword, name: this.state.registerName, userRole: this.state.userRole }).then((res) => {
            this.setState({
                isModalOpen: false
            });
            window.location.reload();
        }).catch((e) => {
            this.setState({
                isModalOpen: false
            });
            console.log(e.toString);
        });
    }
    onRegisterNameChanged(e) {
        this.setState({
            registerName: e.target.value
        });
    }
    onRegisterEmailChanged(e) {
        this.setState({
            registerEmail: e.target.value
        });
    }
    onRegisterPasswordChanged(e) {
        this.setState({
            registerPassword: e.target.value
        });
    }
    onNewPasswordChanged(e){
        this.setState({
            newPassword: e.target.value
        });
    }
    resetPassword(){
        Axios.post('/authenticate/resetPassword/'+this.state.newPasswordUserID,{
            newPassword:this.state.newPassword
        }).then((res)=>{
            window.location.reload();})
    }
    render() {
        return (
            <div className="container-fluid">
                <Modal show={this.state.resetPassword} onHide={()=>this.setState({resetPassword:false})}>
                    <Modal.Header closeButton>
                        <Modal.Title>Reset Password</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <input id='newPassword' className='form-control' placeholder='Enter New Password' onChange={this.onNewPasswordChanged}/>

                    </Modal.Body>
                    <Modal.Footer>
                        <button type='button' className='btn btn-primary btn-block' style={{backgroundColor:'#5B68F7', border: '1px solid #5B68F7', borderRadius: '0px',}} onClick={this.resetPassword}>Reset Password</button>
                    </Modal.Footer>
                    </Modal>
                <Navbar />
                <div className='row mx-auto'>
                    <div className='col-md-10 mx-auto'>

                        <form className='form-inline justify-content-lg-center justify-content-start mb-3' onSubmit={this.onRegistrationSubmit}>

                            <input type='text' className='form-control mb-0' placeholder='Name' style={{ borderRadius: '0px' }} onChange={this.onRegisterNameChanged} />
                            <input type='email' className='form-control mb-0 mt-sm-0 mt-1' placeholder='Email Address' style={{ borderRadius: '0px' }} onChange={this.onRegisterEmailChanged} />
                            <input type='password' className='form-control mb-0 mt-sm-0 mt-1' placeholder='Password' style={{ borderRadius: '0px' }} onChange={this.onRegisterPasswordChanged} />

                            <select className="form-control mt-sm-0 mt-1" id="role" name="sellist1" style={{ borderRadius: '0px', margin: '0px' }} onChange={this.onRoleSelect} placeholder='Select Role' required>
                                <option value='' disabled hidden selected>Select Role</option>
                                <option value='0'>Administrator</option>
                                <option value='1'>Developer</option>
                                <option value='2'>Tester</option>
                            </select>
                            <button type='submit' className='btn btn-primary submit-btn mx-0 mt-sm-0 mt-1' style={{ backgroundColor: '#5B68F7', border: '1px solid #5B68F7', borderRadius: '0px' }}>Add User</button>
                        </form>

                        <div className='table-responsive'>
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th className='text-center'>Name</th>
                                        <th className='text-center'>Email</th>
                                        <th className='text-center'>Role</th>
                                      
                                        <th className='text-center'>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.users.map((user) => {
                                            return <tr key={user._id}><td className='text-center'>{user.name}</td>
                                                <td className='text-center'>{user.email}</td><td className='text-center'>{user.userRole === '0' ? 'Administrator' : (user.userRole === '1' ? 'Developer' : 'Tester')}</td>
    
                                                <td className='text-center'><button className='btn btn-link py-0' onClick={()=>this.setState({resetPassword:true,newPasswordUserID:user._id})}>Reset Password</button></td>
                                            </tr>;
                                        })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}