import React, { Component } from 'react';
import {NavLink} from 'reactstrap';
import { Link } from 'react-router-dom';

export class Hotel extends Component {
  static displayName = Hotel.name;

  constructor(props) {
    super(props);
    this.state = { apidata: [], loading: true ,photos:[]};
  }

  componentDidMount() {
    this.populateApiData();
  }

  static renderTable(apidata) {
    return (
      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>نام</th>
            <th>ادرس</th>
            <th>توضیحات</th>
            <th>ستاره</th>
          </tr>
        </thead>
        <tbody>
          {apidata.map( (apifetch,key) =>
            {
                
                return (
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
            </tr>
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
      : Hotel.renderTable(this.state.apidata);

    return (
      <div>
        <h1 id="tabelLabel" >{this.datas}</h1>
        {contents}
      </div>
    );
  }

  async populateApiData() {
    const response = await fetch('hotel');
    const data = await response.json();
    this.setState({ apidata: data[0].result,loading:false});
  }
}
