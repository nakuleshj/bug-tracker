import React,{Component} from 'react';
import Navbar from './navbar.component';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import '../styling/landing.css';
export default class Landing extends Component{
    constructor(props){
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.onDescriptionChanged=this.onDescriptionChanged.bind(this);
        this.onTitleChanged=this.onTitleChanged.bind(this);
        this.state={
            issues:[],
            title:'',
            isOpen:false,
            desc:''
        }
    }
    componentDidMount(){
        axios.get('/bug',{
            headers: {
                'authorization': `Basic ${localStorage.getItem('token')}` 
              }
        }).then(
            response => {
                if (response.data.length > 0) {
                  this.setState({
                    // users: response.data.map(user => user.username),
                    isOpen:false,
                    issues: response.data
                  });}}
        );
        

    }
    onSubmit(e){
        e.preventDefault();
        
        const newIssue={
            title:this.state.title,
            description:this.state.desc
        };
        console.log(newIssue);
        
        axios.post('/bug/add',{
            ...newIssue
        },{
            headers: {
                'authorization': `Basic ${localStorage.getItem('token')}` 
              }
        }).then((res)=>{
            console.log(res.data.status);
            this.setState({
                isOpen:false
            });
        }).catch((e)=>{
            this.setState({
                isOpen:false
            });
        });
        window.location.reload();
    }
    onTitleChanged(e){
        this.setState({
            title: e.target.value
          });
    }
    handleIssueFix(bugID){
        axios.post('/bug/fix',{bugID:bugID}).then((res)=>console.log(res.data.status)).catch((e)=>console.log(e.toString()));
        window.location.reload();
    }
    onDescriptionChanged(e){
        this.setState({
            desc: e.target.value
          });
    }
    render(){

        const showModal = () => {
        this.setState({
            isOpen:true
        });
        };
      
        const hideModal = () => {
            this.setState({
                isOpen:false
            });
        };
        return(
            <div className='container-fluid'>
            <Navbar />
      <Modal show={this.state.isOpen} onHide={hideModal}>
      <form onSubmit={this.onSubmit} method='post'>
        <Modal.Header>
          <Modal.Title>Report an Issue</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            
            <label for='titleInput' style={{marginBottom:'-1px'}} ><b>Title:</b></label>
            <input className='form-control mb-1 mt-0' type='text' onChange={this.onTitleChanged} width='100%' id='titleInput' required/>
            <label for='descriptionInput' style={{marginBottom:'-1px'}} ><b>Description:</b></label>
            <input  className='form-control' id='descriptionInput' type='text' onChange={this.onDescriptionChanged} required/>
            
        </Modal.Body>
        <Modal.Footer>
          <button type="button" className='btn btn-secondary' onClick={hideModal}>Cancel</button>
          <button type='submit' className='btn btn-primary' style={{backgroundColor:'#5B68F7', border:'1px solid #5B68F7'}}>Submit</button>
        </Modal.Footer>
        </form>
      </Modal>
            <div className='row'>
            <div className='col-sm-8 ml-auto mr-auto'>
                <div className='row px-3 pr-4'>
                <h1 className='mr-3'><b>Issues</b></h1>
                <h1><i className="fa fa-plus my-auto" style={{color:'#5B68F7',cursor:'pointer'}} onClick={showModal} ></i></h1></div>
            </div>
            </div>
                <div className='row'>

            <div className='col-sm-8 mx-auto' ><table className=" table text-center">
  <thead>
    <tr>
      
      <th scope="col" className='text-center'>Title</th>
      <th scope="col" className='text-center extra-column'>Description</th>
      <th scope="col" className='text-center extra-column'>Created By</th>
      <th scope="col" className='text-center extra-column'>Date</th>
      <th scope="col" className='text-center'>Fixed</th>
      
    </tr>
  </thead>
  <tbody>
      {
          this.state.issues.map((issue)=>{
              let date=new Date(issue.createdAt);
            return <tr key={issue._id}>
      <td className='text-center'>{issue.title}</td>
      <td className='text-center extra-column'>{issue.description}</td>
      <td className='text-center extra-column'>{issue.reportedBy.name}</td>
      <td className='text-center extra-column'>{date.getDate()+'/'+date.getMonth()+'/'+date.getFullYear()}</td>
      <td className='text-center'><h3><i className={issue.isFixed?'fa fa-check':'fa fa-times'} style={{color:issue.isFixed?'green':'red',cursor:issue.isFixed?'default':'pointer'}} onClick={()=>issue.isFixed?{}:this.handleIssueFix(issue._id)}></i></h3></td>
      </tr>;
          })
          }
  </tbody>
  </table></div>
                    
                </div>
                </div>
        );
    }
}