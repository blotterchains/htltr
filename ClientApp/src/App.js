import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Hotel} from './screens/Hotel';
import { SHotel} from './screens/Shotel';
import {Tour} from './screens/Tour';
import {STour} from './screens/Stour';
import {Login,Logout,Signup} from './screens/Login';
import {AdminLogin,AdminPanel} from './screens/AdminPanel';
import {Panel} from './screens/Panel';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <div
      
      >
        
        <div 
        style={{
          height:"100vh",
          background: "linear-gradient(90deg, rgba(19,105,63,1) 0%, rgba(29,182,253,0.8617646887856705) 48%, rgba(19,37,105,1) 100%)",
          backgroundRepeat:"no-repeat",
          overflowY:"scroll"
        }}
        >
      <Layout>
        <Route exact path='/' component={Hotel} />
        <Route path='/counter' component={Counter} />
        <Route path='/fetch-data' component={FetchData} />
        <Route path='/showhotel/:id' component={SHotel}/>
        <Route path='/tour' component={Tour}/>
        <Route path='/showtour/:id' component={STour}/>
        <Route path='/login' component={Login}/>
        <Route path='/signup' component={Signup}/>
        <Route path='/logout' component={Logout}/>
        <Route path='/panel' component={Panel}/>
        <Route path='/adminpanel' component={AdminLogin}/>
        <Route path='/apanel' component={AdminPanel}/>
      </Layout>
      </div>
      </div>
    );
  }
}
