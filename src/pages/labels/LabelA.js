import React, { Component } from 'react';



const width = 236; //315
const height = 180; //240
const header = 40
const body = 140
const margin = {top: 10, right: 5, bottom: 150, left: 35};
const red = '#eb6a5b';
const blue = '#52b6ca';


class LabelA extends Component {
  
  state = {
    
    
  };

  


  componentDidMount (){
    console.log(this.props)
  

  }

  

  componentDidUpdate() {
    
  }

  render() {
    
    return (
      <div className='model_label_A'>
        <div className='label_A_header' style={{backgroundColor: `${this.props.color}`, color: `${this.props.text}` }} >
          {this.props.header}
        </div>
        <div>
          <table className='labelA_table'>
            <tr>
              <td className='row_labelA'>Nº DE REFERENCIA:</td><td className='row_labelA_ref'>{this.props.intRef}</td>
            </tr>
            <tr>
              <td className='row_labelA'>Nº DE LOTE:</td><td></td>
            </tr>
            <tr>
              <td className='row_labelA'>CANTIDAD / N. CAJA</td><td className='row_labelA_side'></td>
            </tr>
            <tr>
              <td className='row_labelA'>Inyección plástico</td><td className='row_labelA_side'></td>
            </tr>
            <tr>
              <td className='row_labelA'>Hora de salida </td><td className='row_labelA_side'></td>
            </tr>
            <tr>
              <td className='row_labelA'>Inyección Rubber</td><td className='row_labelA_side'></td>
            </tr>
            <tr>
              <td className='row_labelA'>Hora de salida</td><td className='row_labelA_side'></td>
            </tr>
          </table>
        </div>
      </div>
    );
  }
}

export default LabelA;