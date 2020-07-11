import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import {getDayOfYear}  from 'date-fns'

class RowLabel extends Component {
  state={
    
  }

  // days_of_a_year(year) {
  //   return isLeapYear(year) ? 366 : 365;
  // }

  // isLeapYear(year) {
  //   return year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0);
  // }

  async componentDidMount(){
    return this.setState({...this.props})
  }

  onInputChange = (e) =>{
    return this.setState({[e.target.name]: e.target.value})
  }
  renderRowLabel = ({index, _id, header, color, text, intRef }) =>{
    return (
      <tr key={_id}>
        <td className='table_body_row'>{index}</td>
        <td className='table_body_row' style={{backgroundColor: `${color}`, color: `${text}`}}>{header}</td>
        <td className='table_body_row'>{intRef}</td>
        <td className='table_body_row'>{<input type='number' min='10' max='500' name={'pieces'} className='input_pieces' onChange={this.onInputChange} value={this.state.pieces}></input>}</td>
        <td className='table_body_row'>{<input type='text' size="5" maxLength='3' name={'machine'} onChange={this.onInputChange} value={this.state.machine}></input>}</td>
        <td className='table_body_row'><input type='text' size="10" maxLength='9' name={'lot'} onChange={this.onInputChange} value={this.state.lot}></input></td>
        <td className='table_body_row'><Link to={`/label/${_id}`}><button>View</button></Link><Link to={`/label/edit/${_id}`}><button>Edit</button></Link></td>
      </tr>
    )
  }

    render(){
      return this.renderRowLabel(this.state)
    }
}

export default RowLabel;