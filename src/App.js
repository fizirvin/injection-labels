import React, { Component } from 'react';
import {BrowserRouter, Switch, Route, Link } from 'react-router-dom';

import NewLabel from './pages/NewLabel'
import Labels from './pages/Labels'
import Label from './pages/Label'
import EditLabel from './pages/EditLabel'
import modifyLabel from './pages/modifyLabel.js'

import './app.css';

class App extends Component {
  state={
    server: 'https://injection-labels-server.adrian-injection.vercel.app/graph',
    labels:[],
    plastics: [],
    labelMessage: '',
    plasticMessage: ''

  }

  async componentDidMount(){
    const query = `query{
      labels {
        _id
        header
        intRef
        clientRef
        certification
        pieces
        color
        text
        machine
      }
      plastics {
        _id
        header
        intRef
        pieces
        color
        text
        machine
      }
    }`

    const url = this.state.server;
    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query })
    };
    const res = await fetch(url, opts);
    const data = await res.json();
    
    this.setState({labels: data.data.labels, plastics: data.data.plastics })
  }

  newLabel = async (item) =>{
    const query = `mutation{newLabel(input:{
      header: "${item.header}"
      intRef: "${item.intRef}"
      clientRef: "${item.clientRef}"
      color: "${item.color}"
      certification: "${item.certification}"
      text: "${item.text}"
      pieces: "${item.pieces}"
      machine: "${item.machine}"
    }) {
      _id
      header
      intRef
      clientRef
      color
      certification
      text
      pieces
      machine
    }}`;

    const url = this.state.server;
    const opts = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query })
    };

    const res = await fetch(url, opts);
    const data = await res.json();
    
    if(data.errors){
    
    this.setState({labelMessage: 'error'})
    } else{
      
      const labels = [...this.state.labels, data.data.newLabel];
      this.setState({labels, labelMessage: 'sucess'});
    }
  }

  newPlastic = async (item) =>{
    const query = `mutation{newPlastic(input:{
      header: "${item.header}"
      intRef: "${item.intRef}"
      color: "${item.color}"
      text: "${item.text}"
      pieces: "${item.pieces}"
      machine: "${item.machine}"
    }) {
      _id
      header
      intRef
      color
      text
      pieces
      machine
    }}`;

    const url = this.state.server;
    const opts = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query })
    };

    const res = await fetch(url, opts);
    const data = await res.json();
    
    if(data.errors){
      
    this.setState({plasticMessage: 'error'})
    } else{
      
      const plastics = [...this.state.plastics, data.data.newPlastic];
      this.setState({plastics, plasticMessage: 'sucess'});
    }
  }

  updatePlastic = async ({_id, header, intRef, color, text, pieces, machine}) =>{
    const input = { header, intRef, color, text, pieces, machine }
    console.log(input)
    modifyLabel.variables = { _id, input }

    const url = this.state.server;
    const opts = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(modifyLabel)
    };

    const res = await fetch(url, opts);
    const data = await res.json();
    
    if(data.errors){
      console.log(data.errors)
    this.setState({plasticMessage: 'error'})
    } else{

      const  plastic = data.data.updatePlastic;
      let plastics = [...this.state.plastics];
      plastics[plastics.findIndex(el => el._id === plastic._id)] = plastic;
      return this.setState({ plastics, plasticMessage: 'sucess'});
    }
  }

  onClose = ( ) =>{
    return this.setState({plasticMessage: ''})
  }



  render(){
    return (
      <BrowserRouter>
        <div className='app'>
          <div className="content">
            <Switch>
              <Route path="/" exact component={ props => ( <Labels {...props} 
                labels={this.state.labels} plastics={this.state.plastics}/> )} 
              />
              <Route path="/new" exact component={ props => ( <NewLabel {...props} 
              labels={this.state.labels} newLabel={this.newLabel} newPlastic={this.newPlastic} onClose={this.onClose} message={this.state.plasticMessage}/> )} 
              />
              <Route path="/label/:id" exact component={ props => ( <Label {...props} 
              labels={this.state.labels} plastics={this.state.plastics}/> )} 
              />
              <Route path="/label/edit/:id" exact component={ props => ( <EditLabel {...props} 
              plastics={this.state.plastics} updatePlastic={this.updatePlastic} onClose={this.onClose} message={this.state.plasticMessage}/> )} 
              />
            </Switch>
          </div>
          <div className='footer'>
           
          </div>
        </div>
      </BrowserRouter>
  );
  }
}

export default App;
