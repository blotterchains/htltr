import React, { Component } from 'react';
import { NavLink, Button, Modal, ModalBody, ModalFooter } from 'reactstrap';
import { Link } from 'react-router-dom'
import { Timeline, Tween } from 'react-gsap';
import DatePicker from "react-datepicker";

export class AllUsers extends Component {
    constructor(props, sts) {
        super(props);

        this.state = {
            apidata: [],
            loading: true,
            
        };
    }
    deleteUser = (e) => {
        fetch("user?id=" + e.target.value, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(res => {

                this.populateApiData();

            })
    }
    
    componentDidMount() {
        this.populateApiData();
    }
    
    renderTable(apidata) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>شماره کاربری</th>
                        <th>نام</th>
                        <th>ایمیل</th>
                        <th>عملیات</th>
                    </tr>
                </thead>
                <tbody>
                    {apidata.map((apifetch, key) => {
                        const idd = apifetch.id
                        return (
                            <>
                                <tr key={key}>
                                <td>{apifetch.id}</td>
                                    <td>{apifetch.name}</td>
                                            
                                    <td>{apifetch.email}</td>
                                    <td>
                                        <Button
                                            value={idd}
                                            onClick={this.deleteUser}
                                            color="danger">حذف</Button>                                        
                                    </td>

                                </tr>
                                
                                
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
        const response = await fetch('user');
        const data = await response.json();
        this.setState({ apidata: data[0].result, loading: false });
    }
}