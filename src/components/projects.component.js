import React, { Component } from 'react';
import Navbar from './navbar.component';
import Axios from 'axios';

 
import "react-datepicker/dist/react-datepicker.css";
export default class Project extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      projectName: '',
      users:[],
      projectManager:'',
      deadline:''
    };
    this.submitNewProject = this.submitNewProject.bind(this);
    this.onChangedProjectName = this.onChangedProjectName.bind(this);
    this.onChangedProjectManager=this.onChangedProjectManager.bind(this);
  }
  submitNewProject(e) {
    e.preventDefault();
    Axios.post('/project/create', {
      projectName: this.state.projectName,
      manager:this.state.projectManager
    }, {
      headers: {
        'authorization': `Basic ${localStorage.getItem('token')}`
      }
    })
      .then((res) => {
        console.log(res.data);
        window.location.reload();
      })
      .catch((e) => { console.log(e.toString()) });
  }
  onChangedProjectManager(e){
    this.setState({
      projectManager:e.target.value
    });
  }
  onChangedProjectName(e) {
    this.setState({
      projectName: e.target.value
    });
  }
  componentDidMount() {
    Axios.get('/project')
      .then((res) => {
        this.setState({ projects: res.data });
        console.log(this.state.projects[0]._id);
      })
      .catch((e) => console.log(e.toString()));
      Axios.get('/authenticate',{
        headers: {
            'authorization': `Basic ${localStorage.getItem('token')}` 
          }
    }).then(
        response => {
            if (response.data.length > 0) {
              this.setState({
                users: response.data
              });}}
    );
  }
  render() {
    return (<div className='container-fluid'>
      <Navbar />
      
      <form className="form-inline mb-3 text-center  justify-content-center" onSubmit={this.submitNewProject}>
          <input type='text' className='form-control' placeholder='Project Name' id="pn" onChange={this.onChangedProjectName} style={{ borderRadius: '0px', borderTopRightRadius: '0px' }} required />
          <div class="form-group"><select className='form-control' placeholder='Select Manager' onChange={this.onChangedProjectManager} style={{ borderRadius: '0px'}} required>
          <option value="" disabled selected hidden>Select Project Manager</option>
            {
              this.state.users.map((user)=>{
                return user.name!==' '?<option value={user._id}>{user.name}</option>:null;
              })
              }
          </select></div>
          <button type='submit' className='btn btn-primary  submit-btn mx-0' style={{ backgroundColor: '#5B68F7', border: '1px solid #5B68F7', borderBottomLeftRadius: '0px', borderRadius: '0px' }}>Create Project</button>
             
        </form>
       
      <ul class="list-group">
        {this.state.projects.map((project) => {
          return <li className="list-group-item text-center mx-4">{project.projectName}</li>
        })}
      </ul>
      </div>
    );
  };
}