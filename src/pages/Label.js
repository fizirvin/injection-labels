import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom'

import LabelA from './labels/LabelA'

class Label extends Component {
  state={
    
  }

    async componentDidMount(){
      const label = this.props.match.params.id
      
      const getLabel = await this.props.plastics.find( item => item._id === label)
      console.log(this.props.match, 'hola')
      if(!getLabel){
        return
      }
      else{
        const { header, color, intRef, machine, text } = getLabel
        const lot = this.props.match.params.lot
        const pieces = this.props.match.params.pieces
        return this.setState({header, color, intRef, machine, pieces, text, lot})
      }
    
    }

    printLabel = () =>{
      console.log('hola')
      // var css = '@page { size: landscape; margin: 0; }',
      // head = document.head || document.getElementsByTagName('head')[0],
      // style = document.createElement('style');

      // style.type = 'text/css';
      // style.media = 'print';

      // if (style.styleSheet){
      //   style.styleSheet.cssText = css;
      // } else {
      //   style.appendChild(document.createTextNode(css));
      // }

      // head.appendChild(style);

      window.print();
    }

  render(){
    return ReactDOM.createPortal(
        <div className="Modal_view">
          <div className="modal-content-view">
          <Link to="/" className='close_button_view'></Link>
          <div className='print_button_view' onClick={this.printLabel}></div>
              <table className='label_view_table'>
                <tbody>
                  <tr><td className='td_label_view'><LabelA header={this.state.header} intRef={this.state.intRef} lot={this.state.lot} pieces={this.state.pieces} color={this.state.color} text={this.state.text}></LabelA></td><td className='td_label_view'><LabelA header={this.state.header} intRef={this.state.intRef} lot={this.state.lot} pieces={this.state.pieces} color={this.state.color} text={this.state.text}></LabelA></td><td className='td_label_view'><LabelA header={this.state.header} intRef={this.state.intRef} lot={this.state.lot} pieces={this.state.pieces} color={this.state.color} text={this.state.text}></LabelA></td><td className='td_label_view'><LabelA header={this.state.header} intRef={this.state.intRef} lot={this.state.lot} pieces={this.state.pieces} color={this.state.color} text={this.state.text}></LabelA></td></tr>
                  <tr><td className='td_label_view'><LabelA header={this.state.header} intRef={this.state.intRef} lot={this.state.lot} pieces={this.state.pieces} color={this.state.color} text={this.state.text}></LabelA></td><td className='td_label_view'><LabelA header={this.state.header} intRef={this.state.intRef} lot={this.state.lot} pieces={this.state.pieces} color={this.state.color} text={this.state.text}></LabelA></td><td className='td_label_view'><LabelA header={this.state.header} intRef={this.state.intRef} lot={this.state.lot} pieces={this.state.pieces} color={this.state.color} text={this.state.text}></LabelA></td><td className='td_label_view'><LabelA header={this.state.header} intRef={this.state.intRef} lot={this.state.lot} pieces={this.state.pieces} color={this.state.color} text={this.state.text}></LabelA></td></tr>
                  <tr><td className='td_label_view'><LabelA header={this.state.header} intRef={this.state.intRef} lot={this.state.lot} pieces={this.state.pieces} color={this.state.color} text={this.state.text}></LabelA></td><td className='td_label_view'><LabelA header={this.state.header} intRef={this.state.intRef} lot={this.state.lot} pieces={this.state.pieces} color={this.state.color} text={this.state.text}></LabelA></td><td className='td_label_view'><LabelA header={this.state.header} intRef={this.state.intRef} lot={this.state.lot} pieces={this.state.pieces} color={this.state.color} text={this.state.text}></LabelA></td><td className='td_label_view'><LabelA header={this.state.header} intRef={this.state.intRef} lot={this.state.lot} pieces={this.state.pieces} color={this.state.color} text={this.state.text}></LabelA></td></tr>
                  <tr><td className='td_label_view'><LabelA header={this.state.header} intRef={this.state.intRef} lot={this.state.lot} pieces={this.state.pieces} color={this.state.color} text={this.state.text}></LabelA></td><td className='td_label_view'><LabelA header={this.state.header} intRef={this.state.intRef} lot={this.state.lot} pieces={this.state.pieces} color={this.state.color} text={this.state.text}></LabelA></td><td className='td_label_view'><LabelA header={this.state.header} intRef={this.state.intRef} lot={this.state.lot} pieces={this.state.pieces} color={this.state.color} text={this.state.text}></LabelA></td><td className='td_label_view'><LabelA header={this.state.header} intRef={this.state.intRef} lot={this.state.lot} pieces={this.state.pieces} color={this.state.color} text={this.state.text}></LabelA></td></tr>
                </tbody>
              </table>
          </div>
        </div>,document.querySelector('#modal')
      );
  }
}

export default Label;