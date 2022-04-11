import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Button, Modal, ModalBody, ModalFooter,NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export class SHotel extends Component {
  static displayName = SHotel.name;

  constructor(props) {
    super(props);
    this.state = {login:false,days:0, price: 0, apidata: [], loading: true, photos: [], htype: [], modal: false, buyid: 0, startDate: new Date(), endDate: new Date() };
  }

  componentDidMount() {
    this.populateApiData();
    if(localStorage.getItem("uid")){
      this.setState({login:true})
    }else{
      this.setState({login:false})
    }
  }
  clearStateg = () => {
    this.setState({
      startDate: new Date(), endDate: new Date()
        
    })
}
submitNewg = () => {
  let formData = new FormData();
  formData.append("htid", this.state.buyid);
  formData.append("start", this.state.startDate.toISOString().split('T')[0]);
  formData.append("end", this.state.endDate.toISOString().split('T')[0]);
  formData.append("uid",localStorage.getItem("uid"))
  fetch('hreserve', {
      method: "POST",
      body: formData
  })
      .then(res => res.json)
      .then(res => {
          

                  window.open("panel#home","_self")
              
      })
}
  toggle = () => {
    this.setState({ modal: !this.state.modal });
  }
  calcDate = (date1, date2) => {
    var Difference_In_Time = date2.getTime() - date1.getTime();
  
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
  
    return Difference_In_Days;
  }
  renderTable = (apidata, photos, htype) => {
    return (
      <div class="container">
        <div class="row align-items-start">
          <div class="col">
            <div style={{ overflowX: 'scroll', height: "50vh" }}>
              <div class="container">

                {
                  photos.map((fetchData, key) => {
                    return (
                      <div class="row mb-2">

                        <img
                          style={{ width: "80%", height: "60%" }}
                          src={require(`../../../Uploads/${fetchData.filename}`).default} />
                      </div>
                    )
                  })
                }

              </div>
            </div>
          </div>
          <div class="col border border border-dark rounded-3 m-2">
            <h1>
              {apidata[0].name}
            </h1>
            <p classname="text-md-left">
              موقعیت:{apidata[0].loc}
            </p>
            <p>
              ستاره:{apidata[0].star}
            </p>
            {
              htype.map((fetchData, key) => {
                return (


                  <>
                    <div class="container bg-secondary border border-2 border-danger rounded-3 m-2 p-2">
                      <div class="row align-items-start ">
                        <div class="col">

                          <h1>قیمت:{fetchData.price}</h1>
                          <p>توضیحات:{fetchData.description}</p>
                          <p>ستاره:{fetchData.star}</p>

                        </div>
                        <div

                          class="col">
                          {this.state.login ? (<Button
                            style={{
                              alignSelf: "right"
                            }}
                            value={fetchData.id}
                            onClick={(e) => {
                              this.setState({ 
                                buyid: e.target.value });
                              this.toggle();
                            }}
                            color="success">
                            انتخاب
                          </Button>):(

                            <NavLink tag={Link} to="/login">
                              <Button
                            
                            color="success">
                            ورود
                          </Button>
                            </NavLink>
                          )}
                        </div>
                      </div>
                    </div>
                    <Modal isOpen={this.state.modal && this.state.buyid.toString() === fetchData.id.toString()} toggle={this.toggle} className={this.props.className}>
                      <ModalBody>
                      رزرو این هتل با قیمت:{fetchData.price}
                      <br/>لطفا محدوده تاریخی را مشخص کنید.

                        <DatePicker selected={this.state.startDate} onChange={(date) => {
                          this.setState({ startDate: date })
                          
                        }}

                        />
                        <DatePicker selected={this.state.endDate} onChange={(date) => {
                          
                          this.setState({ 
                            endDate: date 
                          });
                          
                        }}

                        />
                        <Button
                        onClick={()=>{
                          this.setState({
                            price:this.calcDate(this.state.startDate, this.state.endDate)*fetchData.price,
                            days:this.calcDate(this.state.startDate, this.state.endDate)
                          })
                        }}
                        >
                          محاسبه
                        </Button>
                        محاسبه قیمت:{`${this.state.days}*${fetchData.price}=${this.state.price}`}
                      </ModalBody>
                      <ModalFooter>
                        <Button
                        onClick={this.submitNewg}
                        >
                          ثبت
                        </Button>
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                      </ModalFooter>
                    </Modal>
                  </>

                )
              })
            }

          </div>
        </div>


      </div>
    );
  }
  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : this.renderTable(this.state.apidata, this.state.photos, this.state.htype);

    return (
      <div
      //   style={{width:"100%",backgroundColor:"red"}}
      >
        <h1 id="tabelLabel" >{this.datas}</h1>
        {contents}
      </div>
    );
  }
  async populateApiData() {

    const response = await fetch('hotel?id=' + this.props.match.params.id);
    const data = await response.json();
    this.setState({ apidata: data[0].result, loading: false });
    const responsep = await fetch('hphoto?hid=' + this.props.match.params.id);
    const datap = await responsep.json();
    this.setState({ photos: datap[0].result });
    const responseht = await fetch('htype?hid=' + this.props.match.params.id);
    const dataht = await responseht.json();
    this.setState({ htype: dataht[0].result, loading: false });
  }
}
