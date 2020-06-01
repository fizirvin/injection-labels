import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import {getDayOfYear}  from 'date-fns'
import {format} from 'date-fns'

import RowLabel from './rowLabel.js'

class Labels extends Component {
  state={
    plastics: [...this.props.plastics],
    labels: this.props.labels
  }

  // days_of_a_year(year) {
  //   return isLeapYear(year) ? 366 : 365;
  // }

  // isLeapYear(year) {
  //   return year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0);
  // }

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

  renderLabels = () =>{
    return this.state.labels.map( ({_id, header, color, text, intRef, clientRef, pieces, machine}, index) =>
      <RowLabel
      key={_id}
      _id={_id} 
      header={header} 
      color={color} 
      text={text} 
      intRef={intRef} 
      clientRef={clientRef}
      pieces={pieces}
      machine={machine} 
      index={index+1} 
      lot={this.setLot(_id, 'labels')}></RowLabel>
    )
  }

    render(){
      return <div>
        <h3 className='table_title'>Labels Table</h3>
        <table className='labels_table'>
          <thead className='table_header'>
            <tr>
              <th className='table_header_row'>#</th>
              <th className='table_header_row'>header</th>
              <th className='table_header_row'>Ref</th>
              <th className='table_header_row'>Client Ref</th>
              <th className='table_header_row'>Pieces</th>
              <th className='table_header_row'>Machine</th>
              <th className='table_header_row'>Lot Number</th>
              <th className='table_header_row'><Link to="/new"><button>New Label</button></Link></th>
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