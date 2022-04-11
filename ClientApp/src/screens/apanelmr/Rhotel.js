import React, { Component } from 'react';
import { NavLink, Button, Modal, ModalBody, ModalFooter } from 'reactstrap';
import { Link } from 'react-router-dom'
export class Rhotel extends Component {
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
              <th>شماره کاربر</th>
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
                    <td>{apifetch.uid}</td>
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
    
        const response = await fetch('hreserve');
        const data = await response.json();
        this.setState({ apidata: data[0].result, loading: false });
        
      }
}