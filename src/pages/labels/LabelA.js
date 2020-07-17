import React, { Component } from 'react';
import QRCode from 'qrcode.react';


// const width = 236; //315
// const height = 180; //240
// const header = 40
// const body = 140




class LabelA extends Component {
  
  state = {
    
    
  };

  


  componentDidMount (){
    
  

  }

  

  componentDidUpdate() {
    
  }

  render() {
    const lot = String(this.props.lot) || '';
    

    return (
      <div className='model_label_A'>
        
        <div className='label_A_header' style={{backgroundColor: `${this.props.color}`, color: `${this.props.text}` }} >
          {this.props.header}
        </div>
        <div>
          <table className='labelA_table'>
            <tbody>
            <tr>
              <td colSpan='2' className='row_labelA'>Nº DE REFERENCIA:</td><td colSpan='3' className='row_labelA_ref'>{this.props.intRef}</td>
            </tr>
            <tr>
              <td colSpan='2' className='row_labelA'>Nº DE LOTE:</td><td colSpan='3' className='row_labelA_ref'>{this.props.lot}</td>
            </tr>
            <tr>
              <td colSpan='2' className='row_labelA'>CANTIDAD / N. CAJA</td><td colSpan='3' className='row_labelA_pieces'>{this.props.pieces} pzs</td>
            </tr>
            <tr>
              <td colSpan='2' className='row_labelA'>Inyección plástico</td><td colSpan='1' className='row_labelA_side'></td>
              <td colSpan='2'></td>
            </tr>
            <tr>
              <td colSpan='2' className='row_labelA'>Hora de salida </td><td colSpan='1' className='row_labelA_side'></td>
              <td colSpan='2'></td>
            </tr>
            <tr>
              <td colSpan='2' className='row_labelA'>Inyección Rubber</td><td colSpan='1' className='row_labelA_side'></td>
              <td colSpan='2'></td>
            </tr>
            <tr>
              <td colSpan='2' className='row_labelA'>Hora de salida</td><td colSpan='1' className='row_labelA_side'></td>
              <td colSpan='2'></td>
            </tr>
            </tbody>
          </table>
          <div className='QRcode'>
            <QRCode value={lot} size={60}></QRCode>
          </div>
        </div>
      </div>
    );
  }
}

export default LabelA;