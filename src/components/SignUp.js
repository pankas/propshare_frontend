import React from 'react';
import {connect} from 'react-redux';
import {signup} from '../store/actions/index';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DatePicker from "react-datepicker";
 
import "react-datepicker/dist/react-datepicker.css";
class SignUp extends React.Component{
    constructor(props){
        super (props);
        this.state = {
            firstname:'',
            lastname:'',
            email:'',
            type:'admin',
            password1:'',
            password2:'',
            gender:'male',
            dob: new Date()
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        this.setState({type: event.target.value});
      }

      handleDate = date => {
        this.setState({
          dob: date
        });
      };

    handleSubmit = (e)=>{
        e.preventDefault();
        const val ={
            "data":{
                firstname: this.state.firstname,   
                lastname: this.state.lastname,  
                email: this.state.email,       
                gender: this.state.gender,    
                dateOfBirth:this.state.dob,
                password1: this.state.password1,
                password2: this.state.password2
            }
        }
        if(this.state.password1 !== this.state.password2){
            toast.error("Passwords don't match")
        }else{
            this.props.signup(val,()=>{
                let data = Object.keys(this.props.user);
                if(data[0] === 'error'){
                        toast.error("Email already exists")
                }else{
                    toast.success(`Account created successfully`)
                    let that = this
                    setTimeout(function(){
                                    that.props.history.push('/')
                    }, 6000);
                }
            })
        }
    }

    render(){
        return(
            <div className="container p-5" style={{backgroundColor:"#51bd9b",height:"100%"}}>
              <ToastContainer />
              <div className="d-flex justify-content-center">
              <form name="registration" onSubmit={this.handleSubmit}>
                            <div className="form-group flex-fill">
                                <label for="name" className="font-weight-bold text-white">What is your name?</label>
                                <div className="d-flex-column">
                                    <input type="text" className="form-control mr-1 mb-3" id="name" name="first_name"  placeholder="First Name" value={this.state.firstname} onChange={(e)=>this.setState({firstname:e.target.value})} />
                                    <input type="text" className="form-control" id="name"  placeholder="Last Name" value={this.state.lastname} onChange={(e)=>this.setState({lastname:e.target.value})}  />                            
                                </div>
                            </div>
                            <div className="form-group flex-fill">
                                <label for="gender" className="font-weight-bold text-white" >And your gender?</label>
                                <div className="row">
                                    <div className="col-6">
                                        <button className={this.state.gender === 'male'?"btn btn-custom":"btn btn-light"} onClick={()=>{this.setState({gender:'male'})}}>Male</button>
                                    </div>
                                    <div className="col-6">
                                        <button  className={this.state.gender === 'female'?"btn btn-custom":"btn btn-light"} onClick={()=>{this.setState({gender:'female'})}}>Female</button>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group flex-fill">
                                <label for="date of birth" className="font-weight-bold text-white">What's your date of birth</label>
                                <DatePicker
                                  selected={this.state.dob}
                                  onChange={this.handleDate}
                                  placeholder="select date"
                                />
                            </div>
                            <div className="form-group flex-fill">
                                <label for="email" className="font-weight-bold text-white">Email</label>
                                <input type="email" class="form-control" id="email" name="email" placeholder="Enter email" value={this.state.email} onChange={(e)=>this.setState({email:e.target.value})}  />
                            </div>
                            <div className="form-group flex-fill">
                                <label for="password" className="font-weight-bold text-white">Password</label>
                                <input type="password" className="form-control" id="password" name="password" placeholder="Password" value={this.state.password1} onChange={(e)=>this.setState({password1:e.target.value})}  />
                            </div>
                            <div className="form-group flex-fill">
                                <label for="confirm"className="font-weight-bold text-white" >Confirm Password</label>
                                <input type="password" className="form-control" id="exampleInputPassword1" name="confirm_password" placeholder="Confirm Password" value={this.state.password2} onChange={(e)=>this.setState({password2:e.target.value})}  />
                            </div>
                            <div className="d-flex justify-content-center">
                                <button type="submit" class="btn btn-custom" id="submitButton">Submit</button>
                            </div>
                        </form>
              </div>
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return{
        // signupData: state.signup,
        user: state.auth
    }
}

export default connect(mapStateToProps,{signup})(SignUp);