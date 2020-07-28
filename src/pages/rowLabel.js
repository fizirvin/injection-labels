import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import {getDayOfYear}  from 'date-fns'
import {format} from 'date-fns'

class RowLabel extends Component {
  state={
    operator: '',
    inspector: '',
    quantity: '16',
    start: '1'
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
      // if (a.firstname < b.firstname) return -1;
      
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
      return <option key={item._id} value={item.number} className={position}>{item.position + ' -' + ' ' + item.firstname + ' ' + item.lastname}</option>
    })
  }

  onOperator = (e) =>{
    const operator = e.target.value;
    const _id = e.target.name;
    if(!operator){
      return this.props.resetOperator(_id)
    } else{
      const newOp = { _id, operator }
      return this.props.newOperator(newOp)
    }
  }

  onInspector = (e) =>{
    const inspector = e.target.value;
    const _id = e.target.name;
    if(!inspector){
      return this.props.resetInspector(_id)
    }
    else{
      const newIns = { _id, inspector }
      return this.props.newInspector(newIns)
    }
  }

  onCheckBox = (e) =>{
    const checked = e.target.value
    return this.props.onCheck(checked)
  }

  // onQuantity = (e) =>{
  //   const quantity = e.target.value;
  //   const _id = e.target.name;
  //   if(!quantity){
  //     return this.props.resetQuantity(_id)
  //   }
  //   else{
  //     const newQuantity = { _id, quantity }
  //     return this.props.newQuantity(newQuantity)
  //   }
  // }

  onQuantity = (e) =>{
    const quantity = e.target.value;
    return this.setState({quantity})
  }

  onStart = (e) =>{
    const start = e.target.value
    return this.setState({start})
  }

  renderInspectorSelect = (_id ) =>{
    if(this.state.header === 'GEN AL5' || this.state.header === 'GEN AL6'){
      return null
    } 
    else {
      return (
        <select id='inspector' name={_id} value={this.props.inspector} onChange={this.onInspector}>
          <option value='' >select</option>
          {this.renderInspectorOption()}
        </select>
      )
    }
  }

  renderRowLabel = ({index, _id, header, color, text, intRef }) =>{
    return (
      <tr key={_id} className='row_label_selected'>
        <td className='table_body_row check'><input type='checkbox' value={_id} onChange={this.onCheckBox} checked={this.props.check}></input></td>
        <td className='table_body_row number'>{index}</td>
        <td className='table_body_row text_row' style={{backgroundColor: `${color}`, color: `${text}`}}>{header}</td>
        <td className='table_body_row text_row'>{intRef}</td>
        <td className='table_body_row'>{<input type='number' min='10' max='500' name={'pieces'} className='input_pieces' onChange={this.onInputChange} value={this.state.pieces}></input>}</td>
        <td className='table_body_row'>{<input type='text' size="5" maxLength='3' name={'machine'} className='input_machine' onChange={this.onMachine} value={this.state.machine}></input>}</td>
        <td className='table_body_row'><input type='text' size="10" maxLength='9' name={'lot'} className='input_lot' onChange={this.onInputChange} value={this.state.lot}></input></td>
        <td className='table_body_row'>
          {this.renderInspectorSelect(_id)}
        </td>
        <td className='table_body_row'>
          <select id='operator' name={_id} value={this.props.operator} onChange={this.onOperator}>
            <option value='' >select</option>
            {this.renderOperatorOption()}
          </select>
        </td>
        <td className='table_body_row'>
          <input type='number' step='1' max='32' min='1' className='quantity' name={_id} onChange={this.onQuantity} value={this.state.quantity}></input>
        </td>
        <td className='table_body_row'>
          <input type='number' step='1' max='36' min='1' className='start' onChange={this.onStart} value={this.state.start}></input>
        </td>
        <td className='table_body_row'>
          <Link to={`/label/${_id}/${this.state.lot}/${this.state.pieces}/${this.props.inspector || 'AL'}/${this.props.operator}/${this.state.quantity}/${this.state.start}`}>
            <button disabled={this.renderView()}>View</button>
          </Link>
          </td>
      </tr>
    )
  }

  renderView = () =>{
    if(this.state.header === 'GEN AL5' || this.state.header === 'GEN AL6')
    { 
      return !this.props.operator ? true : false
    }
    else {
      return !this.props.operator || !this.props.inspector ? true : false 
    }
  }

    render(){
      return this.renderRowLabel(this.state)
    }
}

export default RowLabel;