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
      deadline:'',
      editProject:false
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
    document.title='Projects | BugTracker'
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
      
      <form className="form-inline mb-3  justify-content-lg-center justify-content-start" onSubmit={this.submitNewProject}>
        
          <input type='text' className='form-control' placeholder='Project Name' id="pn" onChange={this.onChangedProjectName} style={{ borderRadius: '0px', borderTopRightRadius: '0px' }} required />
          <select className='form-control mt-sm-0 mt-1' placeholder='Select Manager' onChange={this.onChangedProjectManager} style={{ borderRadius: '0px'}} required>
          <option value="" disabled selected hidden>Select Project Manager</option>
            {
              this.state.users.map((user)=>{
                return user.name!==' '?<option value={user._id}>{user.name}</option>:null;
              })
              }
          </select>
          <button type='submit' className='btn btn-primary mx-0 mt-sm-0 mt-1' style={{ backgroundColor: '#5B68F7', border: '1px solid #5B68F7', borderBottomLeftRadius: '0px', borderRadius: '0px' }}>Create Project</button>
          {/* <button type='submit' className='btn btn-primary  btn-block submit-btn mx-0' style={{ backgroundColor: '#5B68F7', border: '1px solid #5B68F7', borderBottomLeftRadius: '0px', borderRadius: '0px' }}>Create Project</button> */}
        </form>
        <div className='row'>
          <div className='col-md-8 mx-auto'>
       <div className='table-responsive'>
         <table className='table'>
           <thead>
             <tr>
               <th className='text-center'>Project Title</th>
                 <th className='text-center'>Project Manager</th>
                 <th></th>
             </tr>
           </thead>
           <tbody>
             {this.state.projects.map((project)=>{
             return <tr>
               <td className='text-center'>{false?<input value={project.projectName} className="form-control"/>:project.projectName}</td>
             <td className='text-center'>{this.state.editProject?<select className='form-control mt-sm-0 mt-1' placeholder='Select Manager' onChange={this.onChangedProjectManager} style={{ borderRadius: '0px'}} required>
          <option value="" disabled selected hidden>Select Project Manager</option>
            {
              this.state.users.map((user)=>{
                return user.name!==' '?<option value={user._id}>{user.name}</option>:null;
              })
              }
          </select>:project.manager.name}</td><td>lol</td>
             </tr>})}
           </tbody>
         </table>
       </div>
              </div>
              </div>
      </div>
    );
  };
}