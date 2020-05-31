import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Labels extends Component {
  state={
    plastics: [...this.props.plastics],
    labels: this.props.labels
  }

  renderLabels = () =>{
    return this.state.labels.map( ({_id, header, color, text, intRef, clientRef, pieces}, index) =>
      <tr key={_id}>
        <td className='table_body_row'>{index+1}</td>
        <td className='table_body_row' style={{backgroundColor: `${color}`, color: `${text}`}}>{header}</td>
        <td className='table_body_row'>{intRef}</td>
        <td className='table_body_row'>{clientRef}</td>
        <td className='table_body_row'>{<input type='number' size="5" min='10' className='input_pieces' defaultValue={pieces}></input>}</td>
        <td className='table_body_row'></td>
        <td className='table_body_row'></td>
        <td className='table_body_row'><Link to={`/label/${_id}`}><button>View</button></Link></td>
      </tr>
    )
  }

    render(){
      console.log(this.state.labels)
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