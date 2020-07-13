import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import {getDayOfYear}  from 'date-fns'
import {format} from 'date-fns'

class RowLabel extends Component {
  state={
    
  }

  

  async componentDidMount(){
    return this.setState({...this.props})
  }

  onInputChange = (e) =>{
    return this.setState({[e.target.name]: e.target.value})
  }

  

  setLot = (machine) =>{
      const date = new Date();
      const y = format(new Date(), 'yy')
      const h = date.getHours();
      const day = getDayOfYear(date);
      const shift = this.shift(h);
      const lot = String(y)+String(day)+String(machine)+shift
      
      return lot
  }
  


  shift = (h) =>{
    return h >= 6 && h <= 17? 'M' : 'T'
  }

  onMachine = (e) =>{
    const machine = e.target.value
    const lot = this.setLot(machine)
    return this.setState({machine, lot})
  }

  renderRowLabel = ({index, _id, header, color, text, intRef }) =>{
    return (
      <tr key={_id}>
        <td className='table_body_row'>{index}</td>
        <td className='table_body_row' style={{backgroundColor: `${color}`, color: `${text}`}}>{header}</td>
        <td className='table_body_row'>{intRef}</td>
        <td className='table_body_row'>{<input type='number' min='10' max='500' name={'pieces'} className='input_pieces' onChange={this.onInputChange} value={this.state.pieces}></input>}</td>
        <td className='table_body_row'>{<input type='text' size="5" maxLength='3' name={'machine'} onChange={this.onMachine} value={this.state.machine}></input>}</td>
        <td className='table_body_row'><input type='text' size="10" maxLength='9' name={'lot'} onChange={this.onInputChange} value={this.state.lot}></input></td>
        <td className='table_body_row'><Link to={`/label/${_id}/${this.state.lot}/${this.state.pieces}`}><button>View</button></Link><Link to={`/label/edit/${_id}`}><button>Edit</button></Link></td>
      </tr>
    )
  }

    render(){
      return this.renderRowLabel(this.state)
    }
}

export default RowLabel;