import React, { Component } from 'react';
import {BrowserRouter, Switch, Route } from 'react-router-dom';

import NewLabel from './pages/NewLabel'
import Labels from './pages/Labels'
import Label from './pages/Label'
import EditLabel from './pages/EditLabel'
import modifyLabel from './pages/modifyLabel.js'

import initialQuery from './queries/initialQuery'
import workersQuery from './queries/workersQuery'
import { url, opts, hr_server, hr_opts } from './config/index'

import './app.css';

class App extends Component {
  state={
    server: 'https://injection-labels-server.irvinfiz.now.sh/graph',
    labels:[],
    plastics: [],
    amealco: [],
    varias: [],
    labelMessage: '',
    plasticMessage: '',
    setAmealcoInspector: [],
    setAmealcoOperator: [],
    setVariasInspector: [],
    setVariasOperator: [],
    team: 'varias'
  }

  async componentDidMount(){
   
    opts.body = JSON.stringify(initialQuery)
    const res = await fetch(url, opts);
    const data = await res.json();

    
    workersQuery.variables = { amealco: 'amealco', varias: 'varias' }
    hr_opts.body = JSON.stringify(workersQuery)
    const hr_res = await fetch(hr_server, hr_opts);
    const hr_data = await hr_res.json();
    
    return this.setState({labels: data.data.labels, plastics: data.data.plastics, amealco: hr_data.data.amealco, varias: hr_data.data.varias })
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

  
  newAmealcoInspector = ({_id, inspector}) =>{
    const ins = this.state.setAmealcoInspector.filter( item => item._id !== _id )
    const setAmealcoInspector = [...ins, {_id, inspector}]
    return this.setState({setAmealcoInspector})
  }

  newAmealcoOperator = ({_id, operator }) =>{
    const op = this.state.setAmealcoOperator.filter( item => item._id !== _id )
    const setAmealcoOperator = [...op, {_id, operator}]
    
    return this.setState({setAmealcoOperator})
  }

  newVariasInspector = ({_id, inspector}) =>{
    const ins = this.state.setVariasInspector.filter( item => item._id !== _id )
    const setVariasInspector = [...ins, {_id, inspector}]
    return this.setState({setVariasInspector})
  }

  newVariasOperator = ({_id, operator }) =>{
    const op = this.state.setVariasOperator.filter( item => item._id !== _id )
    const setVariasOperator = [...op, {_id, operator}]
    
    return this.setState({setVariasOperator})
  }

  changeTeam=(team)=>{
    return this.setState({team})
  }


  render(){
    return (
      <BrowserRouter>
        <div className='app'>
          <div className="content">
            <Switch>
              <Route path="/" exact component={ props => ( <Labels {...props} 
                amealco={this.state.amealco}
                varias={this.state.varias} 
                plastics={this.state.plastics} 
                newAmealcoInspector={this.newAmealcoInspector}
                newAmealcoOperator={this.newAmealcoOperator}
                setAmealcoInspector={this.state.setAmealcoInspector}
                setAmealcoOperator={this.state.setAmealcoOperator}
                newVariasInspector={this.newVariasInspector}
                newVariasOperator={this.newVariasOperator}
                setVariasInspector={this.state.setVariasInspector}
                setVariasOperator={this.state.setVariasOperator}
                changeTeam={this.changeTeam}
                team={this.state.team}
                /> )} 
              />
              <Route path="/new" exact component={ props => ( <NewLabel {...props} 
              labels={this.state.labels} newLabel={this.newLabel} newPlastic={this.newPlastic} onClose={this.onClose} message={this.state.plasticMessage}/> )} 
              />
              <Route path="/label/:id/:lot/:pieces/:inspector/:operator" exact component={ props => ( <Label {...props} 
               plastics={this.state.plastics}/> )} 
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
