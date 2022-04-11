import React, { Component } from 'react';
import { NavLink, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import {AllTour} from './apanelmr/AllTour';
import {AllUsers} from './apanelmr/Allusers';
import {Rhotel} from './apanelmr/Rhotel';
import {RTour} from './apanelmr/Rtour';
import { Timeline, Tween } from 'react-gsap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export class AdminLogin extends Component {
    static displayName = AdminLogin.name;

    constructor(props) {
        super(props);
        this.state = { user: null, password: null, loading: true, modal: false, mdDs: null };
    }
    login = () => {
        fetch("admin?user=" + this.state.user + "&pass=" + this.state.password)
            .then(res => res.json())
            .then(res => {
                if (res[0].result.length === 0) {
                    this.setState({ mdDs: "رمز عبور یا ایمیل اشتباه است" });
                    this.toggle();

                } else {
                    this.setState({ mdDs: "وارد شدید لطفا کمی صبر کنید" });
                    localStorage.setItem("aid", res[0].result[0].id)
                    this.toggle();
                    setTimeout(() => window.open("apanel#hadd", "_self"), 3000)
                }
            })
    }
    toggle = () => {
        this.setState({ modal: !this.state.modal });
    }
    componentDidMount() {
        if (localStorage.getItem("aid")) {
            window.open("apanel#hadd", "_self");
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
                            <label for="user">نام کاربری </label>
                            <input
                                type="text"
                                onChange={(e) => this.setState({ user: e.target.value })}
                                class="form-control"
                                aria-describedby="userHelp"
                                placeholder="نام کاربری مدیر"
                                name="user"
                            />
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">کلمه عبور</label>
                            <input
                                type="password"
                                onChange={(e) => this.setState({ password: e.target.value })}
                                class="form-control"
                                placeholder="رمز عبور شما"
                                name="password"
                            />
                        </div>

                    </form>
                    <button onClick={this.login} class="btn btn-primary">ورود</button>
                    <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                        <ModalHeader toggle={this.toggle}>ورود</ModalHeader>
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

class AllHotels extends Component {
    constructor(props, sts) {
        super(props);

        this.state = {
            pubid: 0,
            apidata: [],
            loading: true,
            editphotoShow: false,
            photoedit: [],
            editHtypeShow: false,
            Htypedit: [],
            description: "",
            star: 1,
            price: 0,
            modal: false,
            mdDs: null,
            htypeid: 0
        };
    }
    toggle = () => {
        this.setState({ modal: !this.state.modal });
    }
    deleteHotel = (e) => {
        console.log(e.target.value);
        fetch("hotel?id=" + e.target.value, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(res => {

                this.setState({ mdDs: "حذف شد.لطفا صبر کنید" });
                setTimeout(() => window.open("apanel", "_self"), 3000)

            })
    }
    deleteHtype = (e) => {
        fetch("htype?id=" + e.target.value, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(res => {

                fetch("htype?hid=" + this.state.pubid)
                    .then(res => res.json())
                    .then(res => {

                        this.setState({

                            Htypedit: res[0].result,

                        });

                    })
            })

    }
    componentDidMount() {
        this.populateApiData();
    }
    fetchAndShow = (e) => {
        fetch("hphoto?hid=" + e.target.value)
            .then(res => res.json())
            .then(res => {

                this.setState({
                    photoedit: res[0].result,
                    editphotoShow: !this.state.editphotoShow,
                    editHtypeShow: false,
                    pubid: e.target.value
                });
            })
    }
    fetchAndShowg = (e) => {
        fetch("htype?hid=" + e.target.value)
            .then(res => res.json())
            .then(res => {

                this.setState({

                    Htypedit: res[0].result,
                    editphotoShow: false,
                    editHtypeShow: !this.state.editHtypeShow,
                    pubid: e.target.value,
                });

            })
    }
    uploadImage = () => {
        const files = document.getElementsByName('file')[0].files[0];
        let formData = new FormData();
        let filename = "";
        formData.append('file', files);
        fetch('upload', {
            method: 'POST',
            body: formData
        })
            .then(data => data.text())
            .then(data => {
                filename = data;
                formData = new FormData();
                formData.append('hid', this.state.pubid);
                formData.append('filename', filename)
                fetch('hphoto', {
                    method: "POST",
                    body: formData
                })
                    .then(res => res.json())
                    .then(res => {
                        this.setState({ photoedit: res[0].result })
                    })
            })



    }
    clearStateg = () => {
        this.setState({
            description: "",
            price: "",
            star: ""
        })
    }
    submitNewg = () => {
        let formData = new FormData();
        formData.append("hid", this.state.pubid);
        formData.append("price", this.state.price);
        formData.append("description", this.state.description);
        formData.append("star", this.state.star);
        fetch('htype', {
            method: "POST",
            body: formData
        })
            .then(res => res.json)
            .then(res => {
                fetch("htype?hid=" + this.state.pubid)
                    .then(res => res.json())
                    .then(res => {

                        this.setState({

                            Htypedit: res[0].result,
                        });
                    })
            })
    }
    NewHtype = () => {

        return (
            <div style={{ scrollX: "scroll", width: "100%" }}>

                <div style={{ width: "100%" }} class="container">
                    <div class="row align-items-start text-light">
                        <div class="col bg-success">


                            <div class="container ">
                                <div style={{ overflowX: "scroll" }} class="row align-items-start bg-dark text-light">
                                    {
                                        this.state.Htypedit.map((item, key) => {
                                            return (
                                                <div class="col">
                                                    {`قیمت:${item.price}`}
                                                    <br />


                                                    {`توضیحات:${item.description.slice(0,15)}...`}
                                                    <br />

                                                    {`ستاره:${item.star}`}
                                                    <br />
                                                    <Button

                                                        onClick={(e) => {
                                                            this.clearStateg();
                                                            this.setState({ htypeid: item.id })
                                                            this.toggle();
                                                        }}
                                                    >
                                                        آدیت
                                                    </Button>
                                                    <Button
                                                        color="danger"
                                                        value={item.id}
                                                        onClick={
                                                            this.deleteHtype
                                                        }
                                                    >
                                                        حذف
                                                    </Button>
                                                    <Modal isOpen={this.state.modal && this.state.htypeid.toString() === item.id.toString()} toggle={this.toggle} className={this.props.className}>
                                                        <ModalBody>
                                                            <input
                                                                class="form-control input"
                                                                type="text"
                                                                placeholder={` قیمت:${item.price}`}
                                                                onChange={(e) => this.setState({ price: e.target.value })}
                                                            />

                                                            <br />

                                                            <input
                                                                class="form-control input"
                                                                type="text"
                                                                placeholder={`توضیحات:${item.description}`}
                                                                onChange={(e) => { this.setState({ description: e.target.value }) }}
                                                            />
                                                            <br />

                                                            <input
                                                                class="form-control input"
                                                                type="text"
                                                                placeholder={` ستاره:${item.star}`}
                                                                onChange={(e) => { this.setState({ star: e.target.value }) }}
                                                            />



                                                        </ModalBody>
                                                        <ModalFooter>
                                                            <Button

                                                                onClick={(e) => {
                                                                    console.log(item, this.state);
                                                                    let formData = new FormData();
                                                                    if (this.state.description !== "") {
                                                                        formData.append("description", this.state.description)
                                                                    }
                                                                    if (this.state.price !== "") {
                                                                        formData.append("price", this.state.price)
                                                                    }
                                                                    if (this.state.star !== "") {
                                                                        formData.append("star", this.state.star)
                                                                    }
                                                                    fetch("/htype?id=" + item.id, {
                                                                        method: "PUT",
                                                                        body: formData
                                                                    })
                                                                        .then(res => res.json())
                                                                        .then(res => {
                                                                            fetch("htype?hid=" + item.hid)
                                                                                .then(res => res.json())
                                                                                .then(res => {

                                                                                    this.setState({

                                                                                        Htypedit: res[0].result,
                                                                                        editphotoShow: false,
                                                                                        pubid: item.hid,
                                                                                    });
                                                                                    this.toggle();

                                                                                })
                                                                        })
                                                                }}
                                                            >
                                                                آدیت
                                                            </Button>
                                                            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                                                        </ModalFooter>
                                                    </Modal>

                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                        <div class="col bg-danger text-light">
                            <input
                                class="form-control input"
                                type="text"
                                placeholder="قیمت"
                                onChange={(e) => this.setState({ price: e.target.value })}
                            />
                            <input
                                class="form-control input "
                                type="text"
                                placeholder="توضیحات اصافی"
                                onChange={(e) => this.setState({ description: e.target.value })}
                            />
                            <input
                                class="form-control input "
                                type="text"
                                placeholder="ستاره"
                                onChange={(e) => this.setState({ star: e.target.value })}
                            />
                            <Button
                                onClick={this.submitNewg}
                                color="success">
                                ثبت
                            </Button>

                        </div>
                    </div>

                </div>

            </div>
        )
    }
    EditPics = () => {
        return (
            <>
                <div class="container">
                    <div class="row align-items-start">

                        {this.state.photoedit.map((item, key) => {
                            return (
                                <div class="col">
                                    <img
                                        style={{ width: "30%", height: "20" }}
                                        src={require(`../../../Uploads/${item.filename}`).default} />
                                    <br />
                                    <Button
                                        // value={item.hid}
                                        onClick={() => {
                                            fetch("hphoto?id=" + item.id, {
                                                method: "DELETE"
                                            })
                                                .then(res => res.json())
                                                .then(res => {
                                                    fetch("hphoto?hid=" + item.hid)
                                                        .then(res => res.json())
                                                        .then(res => {

                                                            this.setState({
                                                                photoedit: res[0].result,
                                                            });
                                                        })
                                                })
                                        }}
                                    >
                                        حذف
                                    </Button>
                                </div>

                            )
                        })}
                        <center>
                        </center>

                        <h4 >
                            اضافه کردن
                        </h4>

                        <input

                            type="file" name="file" />
                        <Button
                            onClick={this.uploadImage}
                        >
                            آپلود
                        </Button>
                    </div>
                </div>
            </>
        )
    }
    renderTable = (apidata) => {
        return (
            <>

                <table className='table table-striped' aria-labelledby="tabelLabel">


                    <thead>
                        <tr>
                            <th>نام</th>
                            <th>ادرس</th>
                            <th>توضیحات</th>
                            <th>ستاره</th>
                            <th>عملیات</th>
                        </tr>
                    </thead>
                    <tbody>
                        {apidata.map((apifetch, key) => {
                            const idd = apifetch.id;
                            return (
                                <>

                                    <tr key={key}>

                                        <td>
                                            <button class="btn btn-light" >
                                                <NavLink tag={Link} to={`/showhotel/${apifetch.id}`}>
                                                    {apifetch.name}
                                                </NavLink>

                                            </button>
                                        </td>
                                        <td>{apifetch.loc}</td>
                                        <td>{apifetch.description}</td>
                                        <td>{apifetch.star}</td>
                                        <td>
                                            <Button
                                                value={idd}
                                                onClick={this.deleteHotel}
                                                color="danger">حذف</Button>
                                            <br />
                                            <Button
                                                value={idd}
                                                onClick={this.fetchAndShow}
                                                color="primary">عکس</Button>
                                            <br />
                                            <Button
                                                value={idd}
                                                onClick={this.fetchAndShowg}
                                                color="success">جدید</Button>
                                        </td>

                                    </tr>
                                    {
                                        this.state.editphotoShow && this.state.pubid.toString() === apifetch.id.toString() ? (
                                            <this.EditPics />
                                        ) : (
                                            <></>
                                        )
                                    }
                                    {
                                        this.state.editHtypeShow && this.state.pubid.toString() === apifetch.id.toString() ? (
                                            <this.NewHtype />
                                        ) : (
                                            <></>
                                        )
                                    }
                                </>
                            )
                        }
                        )
                        }
                    </tbody>
                </table>
            </>
        );
    }
    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderTable(this.state.apidata);

        return (
            <Timeline
            target={
                <div style={{minHeight:"50vh"}}>
                <h1 id="tabelLabel" >{this.datas}</h1>
                {contents}
            </div>
            }
            >
                <Tween from={{ opacity: 0 }} to={{ opacity: 1 }} duration={1} />
            </Timeline>
           
        );
    }
    async populateApiData() {
        const response = await fetch('hotel');
        const data = await response.json();
        this.setState({ apidata: data[0].result, loading: false });
    }
}
class NewTour extends Component {
    constructor(props, sts) {
        super(props);

        this.state = { startdate: new Date(), enddate: new Date(), name: "", loc: "", description: "", star: 1, price: 0, modal: false, mdDs: null };
    }
    toggle = () => {
        this.setState({ modal: !this.state.modal });
    }
    sabt = () => {
        let formdata = new FormData();
        let st = this.state.startdate;
        let et = this.state.enddate;
        formdata.append("name", this.state.name);
        formdata.append("loc", this.state.loc);
        formdata.append("start", st.toISOString().split('T')[0]);
        formdata.append("end", et.toISOString().split('T')[0]);
        formdata.append("price", this.state.price);
        formdata.append("description", this.state.description);
        fetch("tour", {
            method: "POST",
            body: formdata
        })
            .then(res => res.json())
            .then(res => {
                if (res[0].result.length === 0) {
                    this.setState({ mdDs: "یک مشکلی رخ داده است" });
                    this.toggle();

                } else {
                    this.setState({ mdDs: "تور ثبت شد لطفا به صفحه تور ها بروید تا تغییر دهید" });
                    this.toggle();
                    setTimeout(() => window.open("apanel", "_self"), 3000)
                }
            })

    }
    render() {
        return (
            <Timeline
                target={
                    <div className="rounded-2 m-2 w-50 bg-dark p-2 text-lg-left text-white">
                        <form
                        // style={{ width: "50%" }} 
                        >
                            <div class="form-group">
                                <label >نام تور </label>
                                <input
                                    type="text"
                                    onChange={(e) => this.setState({ name: e.target.value })}
                                    class="form-control"
                                    placeholder="نام تور"
                                    name="name"
                                />
                            </div>
                            <div class="form-group">
                                <label >موقعیت</label>
                                <input
                                    type="text"
                                    onChange={(e) => this.setState({ loc: e.target.value })}
                                    class="form-control"
                                    placeholder="آدرس تور مربوط را وارد کنید"
                                    name="password"
                                />
                            </div>
                            <div class="form-group">
                                <label >توضیحات</label>
                                <input
                                    type="text"
                                    onChange={(e) => this.setState({ description: e.target.value })}
                                    class="form-control"
                                    id="exampleInputPassword1"
                                    placeholder="توضیحات اضافی در رابطه با تور"
                                    name="password"
                                />
                            </div>
                            <div class="form-group">
                                <label >قیمت</label>
                                <input
                                    type="text"
                                    onChange={(e) => this.setState({ price: e.target.value })}
                                    class="form-control"
                                    placeholder="قیمت تور"
                                />

                            </div>
                            <DatePicker selected={this.state.startdate} onChange={(date) => {
                                this.setState({ startdate: date })
                            }}

                            />
                            <DatePicker selected={this.state.enddate} onChange={(date) => {
                                this.setState({ enddate: date })
                            }}

                            />
                        </form>
                        <div class="form-group m-2 ">
                            <Button
                                onClick={this.sabt}
                                class="rounded-2" color="success">
                                ثبت
                            </Button>
                        </div>
                        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                            <ModalHeader toggle={this.toggle}>ورود</ModalHeader>
                            <ModalBody>
                                {this.state.mdDs}
                            </ModalBody>
                            <ModalFooter>
                                <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                            </ModalFooter>
                        </Modal>
                    </div>
                }
            >
                <Tween from={{ opacity: 0 }} to={{ opacity: 1 }} duration={2} />

            </Timeline>

        )
    }
}
class NewHotel extends Component {
    constructor(props, sts) {
        super(props);

        this.state = { name: "", loc: "", description: "", star: 1, modal: false, mdDs: null };
    }
    toggle = () => {
        this.setState({ modal: !this.state.modal });
    }
    sabt = () => {
        let formdata = new FormData();
        formdata.append("name", this.state.name);
        formdata.append("loc", this.state.loc);
        formdata.append("description", this.state.description);
        formdata.append("star", this.state.star);
        fetch("hotel", {
            method: "POST",
            body: formdata
        })
            .then(res => res.json())
            .then(res => {
                if (res[0].result.length === 0) {
                    this.setState({ mdDs: "یک مشکلی رخ داده است" });
                    this.toggle();

                } else {
                    this.setState({ mdDs: "هتل ثبت شد لطفا به صفحه هتل ها بروید تا تغییر دهید" });
                    this.toggle();
                    setTimeout(() => window.open("apanel", "_self"), 3000)
                }
            })
    }
    render() {
        return (

            <Timeline
                target={
                    <div className="rounded-2 m-2 w-50 bg-dark p-2 text-lg-left text-white">
                        <form
                        // style={{ width: "50%" }} 
                        >
                            <div class="form-group">
                                <label >نام هتل </label>
                                <input
                                    type="text"
                                    onChange={(e) => this.setState({ name: e.target.value })}
                                    class="form-control"
                                    placeholder="نام هتل"
                                    name="name"
                                />
                            </div>
                            <div class="form-group">
                                <label >موقعیت</label>
                                <input
                                    type="text"
                                    onChange={(e) => this.setState({ loc: e.target.value })}
                                    class="form-control"
                                    placeholder="آدرس هتل مربوط را وارد کنید"
                                    name="password"
                                />
                            </div>
                            <div class="form-group">
                                <label >توضیحات</label>
                                <input
                                    type="text"
                                    onChange={(e) => this.setState({ description: e.target.value })}
                                    class="form-control"
                                    id="exampleInputPassword1"
                                    placeholder="توضیحات اضافی در رابطه با هتل"
                                    name="password"
                                />
                            </div>
                            <div class="form-group">
                                <label >ستاره</label>
                                <input
                                    type="text"
                                    onChange={(e) => this.setState({ star: e.target.value })}
                                    class="form-control"
                                    placeholder="ستاره"
                                />
                            </div>

                        </form>
                        <div class="form-group m-2 ">
                            <Button onClick={this.sabt} class="rounded-2" color="success">
                                ثبت
                            </Button>
                        </div>
                        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                            <ModalHeader toggle={this.toggle}>ورود</ModalHeader>
                            <ModalBody>
                                {this.state.mdDs}
                            </ModalBody>
                            <ModalFooter>
                                <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                            </ModalFooter>
                        </Modal>
                    </div>
                }
            >
                <Tween from={{ opacity: 0 }} to={{ opacity: 1 }} duration={1} />
            </Timeline>


        )
    }
}
export class AdminPanel extends Component {
    static displayName = AdminPanel.name;

    constructor(props) {
        super(props);
        this.state = { apidata: [], loading: true, scr: window.location.hash.substr(1) };
    }
    scrHandl = (screv) => {
        this.setState({ scr: screv.target.name });


    }
    componentDidMount(){
        if(localStorage.getItem("aid")){

        }else{window.open("Adminpanel","_self")}
    }
    render() {
        return (

            <div>
                <div class="container"
                style={{
                    float: "left"
                }}
                >
                    <div class="row align-items-start">
                        <div
                            style={{ "background-image": "var(--bs-gradient)" }}
                            class="w-25 bg-dark text-light p-2 rounded-3 border border-primary">
                            <NavLink tag={Link} to="#hadd">
                                <Button
                                    name="hadd"
                                    onClick={this.scrHandl}
                                    color="light mb-1 w-100">
                                    هتل جدید

                                </Button>
                            </NavLink>
                            <NavLink tag={Link} to="#tadd">
                                <Button
                                    name="tadd"
                                    onClick={this.scrHandl}
                                    color="light mb-1 w-100">
                                    تور جدید
                                </Button>
                            </NavLink>
                            <NavLink tag={Link} to="#hotels">
                                <Button
                                    name="hotels"
                                    onClick={this.scrHandl}
                                    color="light mb-1 w-100">
                                    هتل های ثبت شده
                                </Button>
                            </NavLink>
                            <NavLink tag={Link} to="#tours">
                                <Button
                                    name="tours"
                                    onClick={this.scrHandl}
                                    color="light mb-1 w-100">
                                    تور های ثبت شده
                                </Button>
                            </NavLink>
                            <NavLink tag={Link} to="#usr">
                                <Button
                                    name="usr"
                                    onClick={this.scrHandl}
                                    color="light mb-1 w-100">
                                    کاربران
                                </Button>
                            </NavLink>
                            <NavLink tag={Link} to="#rhotel">
                                <Button
                                    name="rhotel"
                                    onClick={this.scrHandl}
                                    color="light mb-1 w-100">
                                    هتل رزرو شده
                                </Button>
                            </NavLink>
                            <NavLink tag={Link} to="#rtour">
                                <Button
                                    name="rtour"
                                    onClick={this.scrHandl}
                                    color="light mb-1 w-100">
                                    تور رزرو شده
                                </Button>
                            </NavLink>
                            
                        </div>
                        <div style={{ "background-image": "var(--bs-gradient)",width:"100%" }} class="w-75 col bg-secondary rounded-3 border border-danger">
                            <center>
                                {

                                    window.location.hash.substr(1) === "hadd" ? (<NewHotel sts={this.setState} />) : (<></>)
                                }
                                {
                                    window.location.hash.substr(1) === "tadd" ? (<NewTour />) : (<></>)
                                }
                                {
                                    window.location.hash.substr(1) === "hotels" ? (<AllHotels />) : (<></>)
                                }
                                
                                
                                    {window.location.hash.substr(1) === "tours" ? (
                                    <AllTour />
                                
                                    ) : (<></>)}
                                {window.location.hash.substr(1) === "usr" ? (
                                    <AllUsers />
                                
                                    ) : (<></>)}
                                    {window.location.hash.substr(1) === "rhotel" ? (
                                    <Rhotel />
                                
                                    ) : (<></>)}
                                    {window.location.hash.substr(1) === "rtour" ? (
                                    <RTour />
                                
                                    ) : (<></>)}
                            
                            </center>

                        </div>
                    </div>

                </div>
            </div>
        )
    }
}