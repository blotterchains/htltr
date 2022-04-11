import React, { Component } from 'react';
import { NavLink, Button, Modal, ModalBody, ModalFooter } from 'reactstrap';
import { Link } from 'react-router-dom'
import { Timeline, Tween } from 'react-gsap';
import DatePicker from "react-datepicker";

export class AllTour extends Component {
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
            start: new Date(),
            end: new Date(),
            price: 0,
            loc:"",
            name: "",
            modal: false,
            mdDs: null
        };
    }
    deleteTour = (e) => {
        fetch("tour?id=" + e.target.value, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(res => {

                this.populateApiData();

            })
    }
    toggle = () => {
        this.setState({ modal: !this.state.modal });
        this.clearStateg();
    }
    componentDidMount() {
        this.populateApiData();
    }
    clearStateg = () => {
        this.setState({
            name: "",
            description: "",
            start: new Date(),
            end: new Date(),
            price: "",
            loc: "",
        })
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
                                        style={{ width: "30%", height: "20%" }}
                                        src={require(`../../../../Uploads/${item.filename}`).default} />
                                    <br />
                                    <Button
                                        onClick={() => {
                                            fetch("tphoto?id=" + item.id, {
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
    fetchAndShow = (e) => {
        fetch("tphoto?tid=" + e.target.value)
            .then(res => res.json())
            .then(res => {

                this.setState({
                    photoedit: res[0].result,
                    editphotoShow: !this.state.editphotoShow,
                    pubid: e.target.value
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
                formData.append('tid', this.state.pubid);
                formData.append('filename', filename)
                fetch('tphoto', {
                    method: "POST",
                    body: formData
                })
                    .then(res => res.json())
                    .then(res => {
                        this.setState({ photoedit: res[0].result })
                    })
            })



    }
    renderTable(apidata) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>نام</th>
                        <th>ادرس</th>
                        <th>شروع تور</th>
                        <th>پایان تور</th>
                        <th>توضیحات</th>
                        <th>قیمت</th>
                        <th>عملیات</th>
                    </tr>
                </thead>
                <tbody>
                    {apidata.map((apifetch, key) => {
                        const idd = apifetch.id
                        return (
                            <>
                                <tr key={key}>

                                    <td>
                                        <button class="btn btn-light" >
                                            <NavLink tag={Link} to={`/showtour/${apifetch.id}`}>
                                                {apifetch.name}
                                            </NavLink>

                                        </button>
                                    </td>
                                    <td>{apifetch.loc}</td>
                                    <td>{apifetch.start}</td>
                                    <td>{apifetch.end}</td>
                                    
                                    <td>{apifetch.description.slice(0, 15)}...</td>
                                    <td>{apifetch.price}</td>
                                    <td>
                                        <Button
                                            value={idd}
                                            onClick={this.deleteTour}
                                            color="danger">حذف</Button>
                                        <br />
                                        <Button
                                            value={idd}
                                            onClick={this.fetchAndShow}
                                            color="primary">عکس</Button>
                                        <br />
                                        <Button
                                            value={idd}
                                            onClick={(e) => {
                                                this.setState({ pubid: e.target.value })
                                                this.toggle();
                                                console.log(this.state.pubid, apifetch.id)
                                            }}
                                            color="success">ادیت</Button>
                                    </td>

                                </tr>
                                {
                                    this.state.editphotoShow && this.state.pubid.toString() === apifetch.id.toString() ? (
                                        <this.EditPics />
                                    ) : (
                                        <></>
                                    )
                                }
                                <Modal isOpen={this.state.modal && this.state.pubid.toString() === apifetch.id.toString()} toggle={this.toggle} className={this.props.className}>
                                    <ModalBody>
                                        <input
                                            class="form-control input"
                                            type="text"
                                            placeholder={` قیمت:${apifetch.price}`}
                                            onChange={(e) => this.setState({ price: e.target.value })}
                                        />

                                        <br />

                                        <input
                                            class="form-control input"
                                            type="text"
                                            placeholder={`توضیحات:${apifetch.description}`}
                                            onChange={(e) => { this.setState({ description: e.target.value }) }}
                                        />
                                        <input
                                            class="form-control input"
                                            type="text"
                                            placeholder={`آدرس:${apifetch.loc}`}
                                            onChange={(e) => { this.setState({ loc: e.target.value }) }}
                                        />
                                        <br />



                                    </ModalBody>
                                    <ModalFooter>
                                        <Button

                                            onClick={(e) => {
                                                let formData = new FormData();
                                                if (this.state.description !== "") {
                                                    formData.append("description", this.state.description)
                                                }
                                                if (this.state.price !== "") {
                                                    formData.append("price", this.state.price)
                                                }
                                                if (this.state.loc !== "") {
                                                    formData.append("loc", this.state.loc)
                                                }
                                                fetch("/tour?id=" + apifetch.id, {
                                                    method: "PUT",
                                                    body: formData
                                                })
                                                    .then(res => res.json())
                                                    .then(res => {
                                                        fetch("tour?tid=" + apifetch.tid)
                                                            .then(res => res.json())
                                                            .then(res => {

                                                                this.setState({

                                                                    apidata: res[0].result,
                                                                    
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
                            </>
                        )
                    }
                    )
                    }
                </tbody>
            </table>
        )
    }
    render() {
        return (
            <Timeline
                target={
                    <div style={{ minHeight: "50vh" }}>
                        {this.loading ? (
                            <em>loading..</em>
                        ) : (this.renderTable(this.state.apidata))}
                    </div>
                }
            >
                <Tween from={{ opacity: 0 }} to={{ opacity: 1 }} duration={1} />
            </Timeline>

        )
    }
    async populateApiData() {
        const response = await fetch('tour');
        const data = await response.json();
        this.setState({ apidata: data[0].result, loading: false });
    }
}