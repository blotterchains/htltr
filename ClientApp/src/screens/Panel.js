import React, { Component } from 'react';
import {Button,NavLink,Modal,ModalBody,ModalFooter} from 'reactstrap';
import { Link } from 'react-router-dom';
class UHotel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login:false,
      pubid:0, 
      apidata: [], 
      loading: true, 
      modal: false,
      hid:"",
      price:0,
      description:"",
      star:0
      };
  }
  toggle=()=>{
    this.setState({modal:!this.state.modal})
  }
  fetchAndShow=async (e)=>{
    const response = await fetch('htype?id='+e.target.value);
        const data = await response.json();
        this.setState({ 
          pubid: data[0].result[0].id, 
          hid: data[0].result[0].hid,
          price:data[0].result[0].price,
          description:data[0].result[0].description,
          star:data[0].result[0].star,
          modal:true
        });
  }
  renderTable=(apidata)=> {
    return (
      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>شماره سرویس هتل</th>
            <th>شروع رزرو</th>
            <th>پایان رزرو</th>
            <th>تاریخ ثبت</th>
          </tr>
        </thead>
        <tbody>
          {apidata.map( (apifetch,key) =>
            {
                
                return (
                  <>
                <tr key={key}>
                
              <td>
                  <button 
                  value={apifetch.htid}
                  onClick={this.fetchAndShow}
                  class="btn btn-light" >
                      دیدن سرویس شماره{apifetch.htid}                  
                  </button>
            </td>
              <td>{apifetch.start.split('T')[0]}</td>
              <td>{apifetch.end.split('T')[0]}</td>
              <td>{apifetch.submitdate.split('T')[0]}<br/>{apifetch.submitdate.split('T')[1]}</td>
            </tr>
            <Modal isOpen={this.state.modal && this.state.pubid.toString() === apifetch.htid.toString()} toggle={this.toggle} className={this.props.className}>
                      <ModalBody>
                      
                       
                        <NavLink tag={Link} to={`/showhotel/${this.state.hid}`}>
                        <Button
                        
                        >
                          دیدن پروفایل هتل
                        </Button>
                        </NavLink>
                        {
                           `قیمت به ازای هر روز:${this.state.price}`
                        }<br/>
                        {
                           `توضیحات:${this.state.description}`
                        }<br/>
                        {
                           `ستاره:${this.state.star}`
                        }
                      </ModalBody>
                      <ModalFooter>
                       
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                      </ModalFooter>
                    </Modal>
            </>
            )}
          )
          }
        </tbody>
      </table>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      :this.renderTable(this.state.apidata);

    return (
      <div>
        <h1 id="tabelLabel" >{this.datas}</h1>
        {contents}
        
      </div>
    );
  }
  componentDidMount() {
    this.populateApiData();
    
  }

  async populateApiData() {

    const response = await fetch('hreserve?uid=' +localStorage.getItem("uid"));
    const data = await response.json();
    this.setState({ apidata: data[0].result, loading: false });
    
  }
} 
class UTour extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login:false,
      pubid:0, 
      apidata: [], 
      loading: true, 
      modal: false,
      hid:"",
      price:0,
      description:"",
      star:0
      };
  }
  toggle=()=>{
    this.setState({modal:!this.state.modal})
  }
  fetchAndShow=async (e)=>{
    const response = await fetch('tour?id='+e.target.value);
        const data = await response.json();
        this.setState({ 
          pubid: data[0].result[0].id, 
          name:data[0].result[0].name, loc:data[0].result[0].loc, start:data[0].result[0].start,
           end:data[0].result[0].end, price :data[0].result[0].price, description :data[0].result[0].description,
          modal:true
        });
  }
  renderTable=(apidata)=> {
    return (
      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>شماره سرویس تور</th>
            <th>تعداد</th>
            <th>تاریخ ثبت</th>
          </tr>
        </thead>
        <tbody>
          {apidata.map( (apifetch,key) =>
            {
                
                return (
                  <>
                <tr key={key}>
                
              <td>
                  <button 
                  value={apifetch.tid}
                  onClick={this.fetchAndShow}
                  class="btn btn-light" >
                      دیدن تور شماره{apifetch.id}                  
                  </button>
            </td>
              <td>{apifetch.no}</td>
              {/* <td>{apifetch.submitdate.split('T')[0]}</td> */}
              <td></td>
            </tr>
            <Modal isOpen={this.state.modal && this.state.pubid.toString() === apifetch.tid.toString()} toggle={this.toggle} className={this.props.className}>
                      <ModalBody>
                      
                       
                        <NavLink tag={Link} to={`/showtour/${apifetch.tid}`}>
                        <Button
                        
                        >
                          دیدن پروفایل تور
                        </Button>
                        </NavLink>
                        {
                           `قیمت به ازای هر روز:${this.state.price}`
                        }<br/>
                        {
                           `توضیحات:${this.state.description}`
                        }<br/>
                        {
                           `ستاره:${this.state.star}`
                        }
                      </ModalBody>
                      <ModalFooter>
                       
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                      </ModalFooter>
                    </Modal>
            </>
            )}
          )
          }
        </tbody>
      </table>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      :this.renderTable(this.state.apidata);

    return (
      <div>
        <h1 id="tabelLabel" >{this.datas}</h1>
        {contents}
        
      </div>
    );
  }
  componentDidMount() {
    this.populateApiData();
    
  }

  async populateApiData() {

    const response = await fetch('treserve?uid=' +localStorage.getItem("uid"));
    const data = await response.json();
    this.setState({ apidata: data[0].result, loading: false });
    
  }
} 
export class Panel extends Component {
  static displayName = Panel.name;

  constructor(props) {
    super(props);
    this.state = { apidata: [], loading: true ,photos:[]};
  }
  render(){
      return (

        <div>
            <div class="container">
                <div class="row align-items-start">
                    <div 
                    class="w-25 bg-dark text-light p-2 rounded">
                      <NavLink tag={Link} to="#home">
                    <Button color="light m-2">
                         هتل های رزرو شده
                    </Button>
                    </NavLink>
                    <br/>
                    <NavLink tag={Link} to="#tour">

                    <Button color="light m-2">
                         تور های رزرو شده
                    </Button></NavLink>
                    
                    </div> 
                    <div class="w-75 col bg-secondary border border-1 border-danger">
                    {
                                    window.location.hash.substr(1) === "home" ? (<UHotel/>) : (<></>)
                                }
                      {
                                    window.location.hash.substr(1) === "tour" ? (<UTour />) : (<></>)
                                }
                        
                    </div>
                </div>
               
            </div>
        </div>
      )
  }
}