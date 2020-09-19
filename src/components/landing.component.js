import React,{Component} from 'react';
import Navbar from './navbar.component';
import axios from 'axios';
import $ from 'jquery';
import Modal from 'react-bootstrap/Modal';
export default class Landing extends Component{
    constructor(props){
        super(props);
        this.state={
            issues:[]
        }
    }
    componentDidMount(){
        axios.get('http://localhost:5000/bug').then(
            response => {
                if (response.data.length > 0) {
                  this.setState({
                    // users: response.data.map(user => user.username),
                    isOpen:false,
                    issues: response.data
                  });}}
        );
        

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
      <form>
        <Modal.Header>
          <Modal.Title>Report an Issue</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            
            <label for='titleInput' style={{marginBottom:'-1px'}}>Title:</label>
            <input className='form-control mb-1 mt-0' type='text' width='100%' id='titleInput'/>
            <label for='descriptionInput' style={{marginBottom:'-1px'}}>Description:</label>
            <input  className='form-control' id='descriptionInput' type='text'/>
            
        </Modal.Body>
        <Modal.Footer>
          <button className='btn btn-secondary' onClick={hideModal}>Cancel</button>
          <button type='submit' className='btn btn-primary' style={{backgroundColor:'#434DB5', border:'1px solid #434DB5'}}>Submit</button>
        </Modal.Footer>
        </form>
      </Modal>
            <div className='row'>
            <div className='col-sm-8 ml-auto mr-auto'>
                <div className='row'>
                <h1 className='mr-auto'>Issues</h1>
                <h1><i className="fa fa-plus my-auto" style={{color:'#434DB5',cursor:'pointer'}} onClick={showModal} ></i></h1></div>
            </div>
            </div>
                <div className='row table-responsive'>

            <div className='col-sm-8 ml-auto mr-auto' ><table className="table">
  <thead>
    <tr>
      
      <th scope="col" className='text-center'>Title</th>
      <th scope="col" className='text-center'>Description</th>
      <th scope="col" className='text-center'>Created By</th>
      <th scope="col" className='text-center'>Fixed</th>
      
    </tr>
  </thead>
  <tbody>
      {
          this.state.issues.map((issue)=>{
            return <tr>
      <td className='text-center'>{issue.title}</td>
      <td className='text-center'>{issue.description}</td>
      <td className='text-center'>Nakulesh</td>
      <td className='text-center'><h3><i className={issue.isFixed?'fa fa-check':'fa fa-times'} style={{color:issue.isFixed?'green':'red'}}></i></h3></td>
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