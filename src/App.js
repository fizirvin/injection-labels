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
    profiles: [],
    labelMessage: '',
    plasticMessage: '',
    setInspector: [{_id: '5f10a119fd2b160008388f77', inspector: 'B005'}],
    setOperator: [{_id: '5f10a119fd2b160008388f77', operator: 'B005'}]
  }

  async componentDidMount(){
   
    opts.body = JSON.stringify(initialQuery)
    const res = await fetch(url, opts);
    const data = await res.json();

    
    workersQuery.variables = { team: 'amealco' }
    hr_opts.body = JSON.stringify(workersQuery)
    const hr_res = await fetch(hr_server, hr_opts);
    const hr_data = await hr_res.json();
    
    return this.setState({labels: data.data.labels, plastics: data.data.plastics, profiles: hr_data.data.profilesLabels })
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

  
  newInspector = ({_id, inspector}) =>{
    const ins = this.state.setInspector.filter( item => item._id !== _id )
    const setInspector = [...ins, {_id, inspector}]
    return this.setState({setInspector})
  }

  newOperator = ({_id, operator }) =>{
    const op = this.state.setOperator.filter( item => item._id !== _id )
    const setOperator = [...op, {_id, operator}]
    
    return this.setState({setOperator})
  }


  render(){
    return (
      <BrowserRouter>
        <div className='app'>
          <div className="content">
            <Switch>
              <Route path="/" exact component={ props => ( <Labels {...props} 
                profiles={this.state.profiles} plastics={this.state.plastics} 
                newInspector={this.newInspector}
                newOperator={this.newOperator}
                setInspector={this.state.setInspector}
                setOperator={this.state.setOperator}
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
