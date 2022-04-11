import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Button,Modal,ModalHeader,ModalBody,ModalFooter,NavLink } from 'reactstrap';
import { Link,useHistory } from 'react-router-dom';
export class Logout extends Component {
  constructor(props) {
    super(props);
    this.state = {modal:false,mdDs:null};
  }
  toggle=()=>{
    this.setState({ modal:!this.state.modal});
  }
  componentDidMount() {
    // this.populateApiData();
    if(localStorage.getItem("uid")){
      this.setState({mdDs:"درحال خارج شدن"});
      localStorage.removeItem("uid");
      this.toggle();
      setTimeout(()=>window.open("login","_self"),3000)
    }
  }
  render() {
    return(
      <div>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
          <ModalBody>
                {this.state.mdDs}
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}
export class Signup  extends Component {
  static displayName = Signup.name;

  constructor(props) {
    super(props);
    this.state = {name:null, email: null,password:null, loading: true, modal:false,mdDs:null};
  }
  toggle=()=>{
    this.setState({ modal:!this.state.modal});
  }
  signup=()=>{
    let formdata=new FormData();
    formdata.append("name",this.state.name);
    formdata.append("pass",this.state.password);
    formdata.append("email",this.state.email);
    fetch("user",{
      method:"POST",
      body:formdata
    })
    .then(res=>res.json())
    .then(res=>{
      if(res[0].result.length===0){
        this.setState({mdDs:"رمز عبور یا ایمیل اشتباه است"});
        this.toggle();
        
      }else{
        this.setState({mdDs:"وارد شدید لطفا کمی صبر کنید"});
        localStorage.setItem("uid",res[0].result[0].id)
        this.toggle();
        setTimeout(()=>window.open("panel#home","_self"),3000)
      }
    })
  };
  render(){
    return(
      <>
      <center>
          <form 
          // style={{ width: "50%" }} 
          className="w-50 bg-dark p-2 text-lg-left text-white">
            <div class="form-group">
              <label for="email">ایمیل </label>
              <input 
              type="email" 
              onChange={(e)=>this.setState({email:e.target.value})}
              class="form-control" 
              id="exampleInputEmail1"
               aria-describedby="emailHelp" 
               placeholder="ایمیل شما" 
               name="email"
               />
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">نام</label>
              <input 
              type="text" 
              onChange={(e)=>this.setState({name:e.target.value})}
              class="form-control" 
              placeholder="نام شما" 
              name="password"
              />
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">کلمه عبور</label>
              <input 
              type="password" 
              onChange={(e)=>this.setState({password:e.target.value})}
              class="form-control" 
              id="exampleInputPassword1" 
              placeholder="رمز عبور شما" 
              name="password"
              />
            </div>
          </form>
          
          <button onClick={this.signup} class="btn btn-success w-50">
            <NavLink className="text-dark">ثبت نام</NavLink>
          </button>
          <br/>
          <button class="btn btn-primary w-50">
            
            <NavLink tag={Link} className="text-dark" to="/Login">ورود</NavLink>
          </button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
          <ModalBody>
                {this.state.mdDs}
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
        </center>
      </>
    )
  }
}
export class Login extends Component {
  static displayName = Login.name;

  constructor(props) {
    super(props);
    this.state = { email: null,password:null, loading: true, modal:false,mdDs:null};
  }
  toggle=()=>{
    this.setState({ modal:!this.state.modal});
  }
  login=()=>{
    fetch("user?email="+this.state.email+"&pass="+this.state.password)
    .then(res=>res.json())
    .then(res=>{
      if(res[0].result.length===0){
        this.setState({mdDs:"رمز عبور یا ایمیل اشتباه است"});
        this.toggle();
        
      }else{
        this.setState({mdDs:"وارد شدید لطفا کمی صبر کنید"});
        localStorage.setItem("uid",res[0].result[0].id)
        this.toggle();
        setTimeout(()=>window.open("panel#home","_self"),3000)
      }
    })
  };
  componentDidMount() {
    // this.populateApiData();
    if(localStorage.getItem("uid")){
      window.open("panel#home","_self");
    }
  }
  render() {
    return (
      <>
        <center>
          <form 
          // style={{ width: "50%" }} 
          className="w-50 bg-dark p-2 text-lg-left text-white">
            <div class="form-group">
              <label for="email">ایمیل </label>
              <input 
              type="email" 
              onChange={(e)=>this.setState({email:e.target.value})}
              class="form-control" 
              id="exampleInputEmail1"
               aria-describedby="emailHelp" 
               placeholder="ایمیل شما" 
               name="email"
               />
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">کلمه عبور</label>
              <input 
              type="password" 
              onChange={(e)=>this.setState({password:e.target.value})}
              class="form-control" 
              id="exampleInputPassword1" 
              placeholder="رمز عبور شما" 
              name="password"
              />
            </div>
            
          </form>
          <button onClick={this.login} class="btn btn-primary w-50">
          <NavLink  className="text-dark" >ورود</NavLink>
          </button>
          <br/>
          <button class="btn btn-success w-50">
            <NavLink tag={Link} className="text-dark" to="/Signup">ثبت نام</NavLink>
          </button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
          <ModalBody>
                {this.state.mdDs}
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
        </center>
      </>
    )

  }
}