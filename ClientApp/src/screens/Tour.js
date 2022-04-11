import React, { Component } from 'react';
import { NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
export class Tour extends Component {
    static displayName = Tour.name;

    constructor(props) {
        super(props);
        this.state = { apidata: [], loading: true, photos: [] };
    }

    componentDidMount() {
        this.populateApiData();
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
                    </tr>
                </thead>
                <tbody>
                    {apidata.map((apifetch, key) => {

                        return (
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
                                <td>{apifetch.description}</td>
                            </tr>
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
            <div>
                {this.loading ? (
                    <em>loading..</em>
                ) : (this.renderTable(this.state.apidata))}
            </div>
        )
    }
    async populateApiData() {
        const response = await fetch('tour');
        const data = await response.json();
        this.setState({ apidata: data[0].result, loading: false });
    }
}