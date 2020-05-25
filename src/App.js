import React, { Component } from 'react';
import {BrowserRouter, Switch, Route, Link } from 'react-router-dom';

import NewLabel from './pages/NewLabel'
import Labels from './pages/Labels'

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
        header
        intRef
        clientRef
        certification
        pieces
        color
        text
      }
      plastics {
        _id
        header
        intRef
        pieces
        color
        text
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
    console.log(data.data)
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
      const plastics = [...this.state.plastics, data.data.newPlastic];
      this.setState({plastics, plasticMessage: 'sucess'});
    }
  }



  render(){
    return (
      <BrowserRouter>
        <div className='app'>
          <nav className='options'>
          <Link to="/labels/new"><button>New Label</button></Link>
          <Link to="/labels"><button>Labels</button></Link>
          </nav>
          <div className="content">
            <Switch>
              <Route path="/labels" exact component={ props => ( <Labels {...props} 
                labels={this.state.labels} plastics={this.state.plastics}/> )} 
              />
              <Route path="/labels/new" exact component={ props => ( <NewLabel {...props} 
              labels={this.state.labels} newLabel={this.newLabel} newPlastic={this.newPlastic}/> )} 
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
