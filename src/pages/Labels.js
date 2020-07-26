import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import {getDayOfYear}  from 'date-fns'
import {format} from 'date-fns'

import RowLabel from './rowLabel.js'

class Labels extends Component {
  state={
    plastics: [...this.props.plastics],
    button: false,
    checked: '',
    edit: true
  }

  

  formatDate(format){
    let formatDate
    const date = new Date(format);
    const y = date.getFullYear()
    const d = date.getDate();
    const m = date.getMonth()+1

    function M(){
      if(m < 10){
        return '0'+ m
      } else { return m } 
    }
    
    function D(){
      if(d < 10){
        return '0'+ d
      } else { return d }
    }
  
    const formatD = D();
    const formatM = M();
    formatDate = y + '-'+ formatM + '-'+ formatD
    return formatDate
  }

  setLot = (id, type) =>{
    const label = this.state[type].find( item => item._id === id)
    if(!label){return null}
    else{ 
      const { machine } = label
      const date = new Date();
      const y = format(new Date(), 'yy')
      const h = date.getHours();
      const day = getDayOfYear(date);
      const shift = this.shift(h);
      const lot = String(y)+String(day)+String(machine)+shift
      
      return lot
    }
  }

  shift = (h) =>{
    return h >= 6 && h <= 17? 'M' : 'T'
  }

 renderLabels = ( ) =>{
  if(this.props.team === 'amealco'){
    return this.renderAmealcoLabels()
  }
  else{
    return this.renderVariasLabels()
  }
 }

 onCheck = (_id) =>{
    const checked = _id
    if(checked === this.state.checked){
      return this.setState({checked: '', edit: true})
    }
    return this.setState({checked, edit: false})
 }

  renderAmealcoLabels = () =>{
    return this.state.plastics.map( ({_id, header, color, text, intRef, pieces, machine}, index) =>{

      const ins = this.props.setAmealcoInspector.find( item => item._id === _id  && item.inspector )
      const inspector = ins ? ins.inspector : '';
      const op = this.props.setAmealcoOperator.find( item => item._id === _id  && item.operator )
      const operator = op ? op.operator : '';
      const check = this.state.checked === _id ? true : false
      return <RowLabel
        key={_id}
        _id={_id} 
        header={header} 
        color={color}
        text={text} 
        intRef={intRef} 
        pieces={pieces}
        machine={machine} 
        index={index+1}
        profiles={this.props.amealco}
        newInspector={this.props.newAmealcoInspector}
        resetInspector={this.props.resetAmealcoInspector}
        newOperator={this.props.newAmealcoOperator} 
        resetOperator={this.props.resetAmealcoInspector}
        inspector={inspector}
        operator={operator}
        lot={this.setLot(_id, 'plastics')}
        onCheck={this.onCheck}
        check={check}
        
        >
      </RowLabel>
    })
  }

  renderVariasLabels = () =>{
    return this.state.plastics.map( ({_id, header, color, text, intRef, pieces, machine}, index) =>{

      const ins = this.props.setVariasInspector.find( item => item._id === _id  && item.inspector )
      const inspector = ins ? ins.inspector : '';
      const op = this.props.setVariasOperator.find( item => item._id === _id  && item.operator )
      const operator = op ? op.operator : '';
      const check = this.state.checked === _id ? true : false
      return <RowLabel
        key={_id}
        _id={_id} 
        header={header} 
        color={color} 
        text={text} 
        intRef={intRef} 
        pieces={pieces}
        machine={machine} 
        index={index+1}
        profiles={this.props.varias}
        newInspector={this.props.newVariasInspector}
        resetInspector={this.props.resetVariasInspector}
        newOperator={this.props.newVariasOperator} 
        resetOperator={this.props.resetVariasOperator}
        inspector={inspector}
        operator={operator}
        lot={this.setLot(_id, 'plastics')}
        onCheck={this.onCheck}
        check={check}
        
        >
      </RowLabel>
    })
  }

  onTeam = (e) =>{
    const team = e.target.name
    return this.props.changeTeam(team)
  }

  saveConfig = (e) =>{
    e.preventDefault();
    this.setState({button: true})
    return this.props.updateConfig();
  }
  
  onReset = (e) =>{
    e.preventDefault();
    const _id = this.state.checked
    if(this.props.team === 'varias'){
      const ins = this.props.setVariasInspector.find( item => item._id === _id  && item.inspector )
      const op = this.props.setVariasOperator.find( item => item._id === _id  && item.operator )
      if(ins || op){
        return this.props.resetVarias(_id)
      }
      else { return console.log('nada que resetear')}
    }
    else {
      const ins = this.props.setAmealcoInspector.find( item => item._id === _id  && item.inspector )
      const op = this.props.setAmealcoOperator.find( item => item._id === _id  && item.operator )
      if(ins || op){
        return this.props.resetAmealco(_id)
      }
      else { return console.log('nada que resetear')}
    }
  }

  onResetAll = (e) =>{
    e.preventDefault();
    const _id = this.state.checked
    if(this.props.team === 'varias'){
      const ins = this.props.setVariasInspector.length > 0
      const op = this.props.setVariasOperator.length > 0
      if(ins || op){
        return this.props.resetAllVarias()
      }
      else { return console.log('nada que resetear')}
    }
    else {
      const ins = this.props.setAmealcoInspector.length > 0
      const op = this.props.setAmealcoOperator.length > 0
      if(ins || op){
        return this.props.resetAllAmealco()
      }
      else { return console.log('nada que resetear')}
    }
  }
 
  renderButton = ( ) =>{
    if(this.props.team === 'varias'){ 
      return <div>
          <button name='varias' onClick={this.onTeam} className='red'>R Varias</button>
          <button name='amealco' onClick={this.onTeam}>Amealco</button>
        </div> 
      }
    else { return <div>
      <button name='varias' onClick={this.onTeam}>R Varias</button>
      <button name='amealco' onClick={this.onTeam} className='red'>Amealco</button>
    </div>  }
  }

    render(){
      return <div>
        <div className='controls'> 
          <h3 className='table_title'>Labels Table</h3>
          {this.renderButton()}
          <button onClick={this.saveConfig} disabled={this.state.button}>Save configuration</button>
          <div>
            <button onClick={this.onReset} disabled={this.state.edit}>Reset One</button>
            <button onClick={this.onResetAll}>Reset All</button>
          </div>
          <div>
            <Link to="/new"><button>New Label</button></Link>
            <Link to={`/label/edit/${this.state.checked}`}><button disabled={this.state.edit}>Edit</button></Link>
          </div>
        </div>
        <table className='labels_table'>
          <thead className='table_header'>
            <tr>
            <th className='table_header_row'></th>
              <th className='table_header_row'>#</th>
              <th className='table_header_row'>Header</th>
              <th className='table_header_row'>Part Num</th>
              <th className='table_header_row'>Pieces</th>
              <th className='table_header_row'>Machine</th>
              <th className='table_header_row'>Lot Num</th>
              <th className='table_header_row'>Inspector</th>
              <th className='table_header_row'>Operator</th>
              <th className='table_header_row'></th>
            </tr>
          </thead>
          <tbody>
            {this.renderLabels()}
          </tbody>
        </table>
      </div>
    }
}

export default Labels;