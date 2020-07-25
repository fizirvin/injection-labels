import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import {getDayOfYear}  from 'date-fns'
import {format} from 'date-fns'

class RowLabel extends Component {
  state={
    operator: '',
    inspector: ''
  }

  

  async componentDidMount(){
    
    return this.setState({...this.props })
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

  renderOperatorOption = () =>{
    return this.props.profiles
    .sort( (a,b) => {
      if (a.position > b.position) return -1;
      if (a.firstname < b.firstname) return -1;
      return 0;
    })
    .map( item => {
      const position = item.position === 'Inspector' ? 'inspector' : item.position === 'Operator' ? 'operator' : 'leader';

      return <option key={item._id} value={item.number} className={position}>{item.position + ' -' + ' ' + item.firstname + ' ' + item.lastname}</option>} )
  }

  renderInspectorOption = () =>{
    return this.props.profiles
    .sort( (a,b) => {
      if (a.position < b.position) return -1;
      if (a.firstname < b.firstname) return -1;
      return 0;
    })
    .map( item => {
      const position = item.position === 'Inspector' ? 'inspector' : item.position === 'Operator' ? 'operator' : 'leader';

      return <option key={item._id} value={item.number} className={position}>{item.position + ' -' + ' ' + item.firstname + ' ' + item.lastname}</option>} )
  }

  onOperator = (e) =>{
    const _id = e.target.name;
    const operator = e.target.value;
    const newOp = { _id, operator }
    return this.props.newOperator(newOp)
    
  }

  onInspector = (e) =>{
    const _id = e.target.name;
    const inspector = e.target.value;
    const newIns = { _id, inspector }
    return this.props.newInspector(newIns)
    
  }



  renderRowLabel = ({index, _id, header, color, text, intRef }) =>{
    return (
      <tr key={_id} className='row_label_selected'>
        <td className='table_body_row'>{index}</td>
        <td className='table_body_row' style={{backgroundColor: `${color}`, color: `${text}`}}>{header}</td>
        <td className='table_body_row'>{intRef}</td>
        <td className='table_body_row'>{<input type='number' min='10' max='500' name={'pieces'} className='input_pieces' onChange={this.onInputChange} value={this.state.pieces}></input>}</td>
        <td className='table_body_row'>{<input type='text' size="5" maxLength='3' name={'machine'} onChange={this.onMachine} value={this.state.machine}></input>}</td>
        <td className='table_body_row'><input type='text' size="10" maxLength='9' name={'lot'} onChange={this.onInputChange} value={this.state.lot}></input></td>
        <td className='table_body_row'>
          <select id='inspector' name={_id} value={this.props.inspector} onChange={this.onInspector}>
            <option value='' disabled>select</option>
            {this.renderInspectorOption()}
          </select>
        </td>
        <td className='table_body_row'>
          <select id='operator' name={_id} value={this.props.operator} onChange={this.onOperator}>
            <option value='' disabled>select</option>
            {this.renderOperatorOption()}
          </select>
        </td>
        <td className='table_body_row'><Link to={`/label/${_id}/${this.state.lot}/${this.state.pieces}/${this.props.inspector}/${this.props.operator}`}><button disabled={this.renderView()}>View</button></Link><Link to={`/label/edit/${_id}`}><button>Edit</button></Link></td>
      </tr>
    )
  }

  renderView = () =>{
    return !this.props.operator || !this.props.inspector ? true : false 
  }

    render(){
      return this.renderRowLabel(this.state)
    }
}

export default RowLabel;