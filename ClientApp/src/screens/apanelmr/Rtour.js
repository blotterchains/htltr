import React, { Component } from 'react';
import { NavLink, Button, Modal, ModalBody, ModalFooter } from 'reactstrap';
import { Link } from 'react-router-dom'
export class RTour extends Component {
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
    
        const response = await fetch('treserve');
        const data = await response.json();
        this.setState({ apidata: data[0].result, loading: false });
        
      }
}