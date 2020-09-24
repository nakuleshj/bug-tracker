import React,{Component} from 'react';
import Navbar from './navbar.component';
import Axios from 'axios';
export default class UserPage extends Component{
    constructor(props){
        super(props);
        this.state={
            registerName:'',
            registerPassword:'',
            registerEmail:'',
            userRole:'0',
            users:[]
        };
        this.onRegistrationSubmit=this.onRegistrationSubmit.bind(this);
        this.onRegisterEmailChanged=this.onRegisterEmailChanged.bind(this);
        this.onRegisterNameChanged=this.onRegisterNameChanged.bind(this);
        this.onRegisterPasswordChanged=this.onRegisterPasswordChanged.bind(this);
        this.onRoleSelect=this.onRoleSelect.bind(this);
    }
    componentDidMount(){
        Axios.get('/authenticate',{
            headers:{
                'authorization':`Bearer ${localStorage.getItem('token')}`
            }
        }).then((res)=>{this.setState({users:res.data})})
        .catch((e)=>console.log(e.toString()));
    }
    onRoleSelect(e){
        this.setState({
            userRole:e.target.value
        });
    }
    onRegistrationSubmit(e){
        e.preventDefault();
        Axios.post('/authenticate/register',{email:this.state.registerEmail,password:this.state.registerPassword,name:this.state.registerName,userRole:this.state.userRole}).then((res)=>{
            this.setState({
                isModalOpen:false
            });
            window.location.reload();
        }).catch((e)=>{
            this.setState({
                isModalOpen:false
            });
            console.log(e.toString);
        });
    }
    onRegisterNameChanged(e){
        this.setState({
            registerName:e.target.value
        });
    }
    onRegisterEmailChanged(e){
        this.setState({
            registerEmail:e.target.value
        });
    }
    onRegisterPasswordChanged(e){
        this.setState({
            registerPassword:e.target.value});
    }
    render(){
        return(
            <div className="container-fluid">
                <Navbar />
                <div className='row mx-auto'>
                    <div className='col-md-8 mx-auto'>
                        
                        <form className='form-inline justify-content-center mb-3'  onSubmit={this.onRegistrationSubmit}>
                        
                        <input type='text' className='form-control mb-0' placeholder='Name' style={{borderRadius:'0px'}} onChange={this.onRegisterNameChanged}/>
                        <input type='email' className='form-control mb-0' placeholder='Email Address' style={{borderRadius:'0px'}} onChange={this.onRegisterEmailChanged}/>
                        <input type='password' className='form-control mb-0' placeholder='Password' style={{borderRadius:'0px'}}  onChange={this.onRegisterPasswordChanged}/>
            
                        <select className="form-control mb-0" id="role" name="sellist1" style={{borderRadius:'0px',margin:'0px'}} onChange={this.onRoleSelect} placeholder='Select Role' required>
                    <option value='0'>Administrator</option>
                    <option value='1'>Developer</option>
                    <option value='2'>Tester</option>
                        </select>
                        <button type='submit' className='btn btn-primary submit-btn mx-0' style={{ backgroundColor: '#5B68F7', border: '1px solid #5B68F7',borderRadius:'0px',borderTopLeftRadius:'0px' }}>Add User</button>
                        </form>
                        
                        <div className='table-responsive'>
                    <table className='table'>
                    <thead>
                        <th className='text-center'>Name</th>
                        <th className='text-center'>Email</th>
                        <th className='text-center'>Role</th>
                    </thead>
                    <tbody>
                        {
                            this.state.users.map((user)=>
                        {return <tr key={user._id}><td className='text-center'>{user.name}</td>
                        <td className='text-center'>{user.email}</td><td className='text-center'>{user.userRole==='0'?'Administrator':(user.userRole==='1'?'Developer':'Tester')}</td>
                        <td className='text-center'><h5><i class="fa fa-trash" style={{cursor:"pointer",color:'red'}} onClick={()=>{
                            Axios.delete(`authenticate/${user._id}`).then((res)=>{
                                window.location.reload();
                            }).catch((e)=>{
                                console.log(e);
                            });
                        }}></i></h5></td>
                        </tr>;})}
                    </tbody>
                </table>
                </div>
                    </div>
                </div>
                
            </div>
        );
    }
}