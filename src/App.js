import React, { Component } from 'react';
import {BrowserRouter, Switch, Route, Link } from 'react-router-dom';

import NewLabel from './pages/NewLabel'

import './app.css';

class App extends Component {
  state={
    server: 'https://injection-labels-server.irvinfiz.now.sh/graph',
    labels:[],
    plastics: [],
    labelMessage: '',
    plasticMessage: ''

  }

  async componentDidMount(){
    const query = `query{
      labels {
        _id
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
    console.log(data.data.labels)
    this.setState({labels: data.data.labels })
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
    }) {
      _id
      header
      intRef
      clientRef
      color
      certification
      text
      pieces
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
    console.log(data)
    this.setState({labelMessage: 'error'})
    } else{
      console.log(data)
      let labels = [...this.state.labels];
      labels.push(data.data.newLabel);
      this.setState({labels: labels, labelMessage: 'sucess'});
    }
  }

  newPlastic = async (item) =>{
    const query = `mutation{newPlastic(input:{
      header: "${item.header}"
      intRef: "${item.intRef}"
      color: "${item.color}"
      text: "${item.text}"
      pieces: "${item.pieces}"
    }) {
      _id
      header
      intRef
      color
      text
      pieces
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
      console.log(data)
    this.setState({plasticMessage: 'error'})
    } else{
      console.log(data)
      let plastics = [...this.state.plastics];
      plastics.push(data.data.newPlastic);
      this.setState({plastics: plastics, plasticMessage: 'sucess'});
    }
  }



  render(){
    return (
      <BrowserRouter>
        <div className='app'>
          <div className="content">
          <Link to="/labels/new"><button>New Label</button></Link>
            <Switch>

              <Route path="/labels/new" exact component={ props => ( <NewLabel {...props} 
              labels={this.state.labels} newLabel={this.newLabel} newPlastic={this.newPlastic}/> )} 
              />
            </Switch>
          </div>
          <div className='options'>
           
          </div>
          <div className='footer'>
           
          </div>
        </div>
      
      </BrowserRouter>
  );
  }
}

export default App;
