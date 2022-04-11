import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Button, Modal, ModalBody, ModalFooter,NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export class STour extends Component {
  static displayName = STour.name;

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
  formData.append("tid", this.state.buyid);
  formData.append("uid",localStorage.getItem("uid"));
  formData.append("no",this.state.days);
  fetch('treserve', {
      method: "POST",
      body: formData
  })
      .then(res => res.json)
      .then(res => {
          window.open("panel#tour","_self")
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
              شروع:{apidata[0].start.split('T')[0]}
            </p>
            <p>
              پایان:{apidata[0].end.split('T')[0]}
            </p>
            
                    
                        
                        <div

                          class="col">
                          {this.state.login ? (<Button
                            style={{
                              alignSelf: "right"
                            }}
                            value={apidata[0].id}
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
                    <Modal isOpen={this.state.modal && this.state.buyid.toString() === apidata[0].id.toString()} toggle={this.toggle} className={this.props.className}>
                      <ModalBody>
                      رزرو این تور با قیمت:{apidata[0].price}
                      <br/>لطفا محدوده تاریخی را مشخص کنید.

                        <input text="text"
                        class="form"
                        placeholder="تعداد"
                        onChange={(e)=>{
                            this.setState({days:e.target.value})
                        }}
                        />
                        <Button
                        onClick={()=>{
                          this.setState({
                            price:this.state.days*apidata[0].price
                          })
                        }}
                        >
                          محاسبه
                        </Button>
                        محاسبه قیمت:{`${this.state.days}*${apidata[0].price}=${this.state.price}`}
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

    const response = await fetch('tour?id=' + this.props.match.params.id);
    const data = await response.json();
    this.setState({ apidata: data[0].result, loading: false });
    const responsep = await fetch('tphoto?tid=' + this.props.match.params.id);
    const datap = await responsep.json();
    this.setState({ photos: datap[0].result });
   
  }
}
