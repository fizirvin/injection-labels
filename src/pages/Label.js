import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom'

import LabelA from './labels/LabelA'

class Label extends Component {
  state={
    box: []
    
  }

    async componentDidMount(){
      const label = this.props.match.params.id
      
      const getLabel = await this.props.plastics.find( item => item._id === label)
     
      if(!getLabel){
        return
      }
      else{
        const { header, color, intRef, text } = getLabel

        const lot = this.props.match.params.lot
        const pieces = this.props.match.params.pieces
        const operator = this.props.match.params.operator
        const inspector = this.props.match.params.inspector
        const quantity = parseInt(this.props.match.params.quantity)
        const start = this.props.match.params.start
        
        var startNum = parseInt(start)
        const cero = '0';
        var box = [ ]

        var i

        for (i = 0; i < quantity; i++) {
          
          if( String(startNum).length === 1){
            
            const boxNum = cero+String(startNum);
            startNum++
            box = [...box, boxNum]
          }
          else{
            const boxNum = String(startNum);
            startNum++
            box = [...box, boxNum]
          }

        };
        
        return this.setState({header, color, intRef, pieces, text, lot, box, operator, inspector})
      }
    
    }

    printLabel = () =>{
      
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

  renderLabels = () =>{
    return this.state.box.map( item => {
      const inspector = this.state.inspector === 'AL' ? '' : this.state.inspector
      const qr = `${this.state.lot}${this.state.pieces}${inspector}${this.state.operator}${item}`
      return <LabelA key={item} qr={qr} header={this.state.header} box={item} intRef={this.state.intRef} lot={this.state.lot} pieces={this.state.pieces} color={this.state.color} text={this.state.text}></LabelA>
    })
  }  

  render(){
    const inspector = this.state.inspector === 'AL' ? '' : this.state.inspector
    return ReactDOM.createPortal(
        <div className="Modal_view">
          <div className="modal-content-view">
            <div className='buttons'>
              <div>
                {`operator: ${this.state.operator || ''} inspector: ${inspector || ''}`}
              </div>
              <div className={'button_view'}>
                <Link to="/"><div className='close_button_view'></div></Link>
                <div className='print_button_view' onClick={this.printLabel}></div>
              </div>
            </div>
            <div className='labels_div'>
              {this.renderLabels()}
            </div>
              {/* <table className='label_view_table'>
                <tbody>
                  <tr><td className='td_label_view'><LabelA header={this.state.header} intRef={this.state.intRef} lot={this.state.lot} pieces={this.state.pieces} color={this.state.color} text={this.state.text}></LabelA></td><td className='td_label_view'><LabelA header={this.state.header} intRef={this.state.intRef} lot={this.state.lot} pieces={this.state.pieces} color={this.state.color} text={this.state.text}></LabelA></td><td className='td_label_view'><LabelA header={this.state.header} intRef={this.state.intRef} lot={this.state.lot} pieces={this.state.pieces} color={this.state.color} text={this.state.text}></LabelA></td><td className='td_label_view'><LabelA header={this.state.header} intRef={this.state.intRef} lot={this.state.lot} pieces={this.state.pieces} color={this.state.color} text={this.state.text}></LabelA></td></tr>
                  <tr><td className='td_label_view'><LabelA header={this.state.header} intRef={this.state.intRef} lot={this.state.lot} pieces={this.state.pieces} color={this.state.color} text={this.state.text}></LabelA></td><td className='td_label_view'><LabelA header={this.state.header} intRef={this.state.intRef} lot={this.state.lot} pieces={this.state.pieces} color={this.state.color} text={this.state.text}></LabelA></td><td className='td_label_view'><LabelA header={this.state.header} intRef={this.state.intRef} lot={this.state.lot} pieces={this.state.pieces} color={this.state.color} text={this.state.text}></LabelA></td><td className='td_label_view'><LabelA header={this.state.header} intRef={this.state.intRef} lot={this.state.lot} pieces={this.state.pieces} color={this.state.color} text={this.state.text}></LabelA></td></tr>
                  <tr><td className='td_label_view'><LabelA header={this.state.header} intRef={this.state.intRef} lot={this.state.lot} pieces={this.state.pieces} color={this.state.color} text={this.state.text}></LabelA></td><td className='td_label_view'><LabelA header={this.state.header} intRef={this.state.intRef} lot={this.state.lot} pieces={this.state.pieces} color={this.state.color} text={this.state.text}></LabelA></td><td className='td_label_view'><LabelA header={this.state.header} intRef={this.state.intRef} lot={this.state.lot} pieces={this.state.pieces} color={this.state.color} text={this.state.text}></LabelA></td><td className='td_label_view'><LabelA header={this.state.header} intRef={this.state.intRef} lot={this.state.lot} pieces={this.state.pieces} color={this.state.color} text={this.state.text}></LabelA></td></tr>
                  <tr><td className='td_label_view'><LabelA header={this.state.header} intRef={this.state.intRef} lot={this.state.lot} pieces={this.state.pieces} color={this.state.color} text={this.state.text}></LabelA></td><td className='td_label_view'><LabelA header={this.state.header} intRef={this.state.intRef} lot={this.state.lot} pieces={this.state.pieces} color={this.state.color} text={this.state.text}></LabelA></td><td className='td_label_view'><LabelA header={this.state.header} intRef={this.state.intRef} lot={this.state.lot} pieces={this.state.pieces} color={this.state.color} text={this.state.text}></LabelA></td><td className='td_label_view'><LabelA header={this.state.header} intRef={this.state.intRef} lot={this.state.lot} pieces={this.state.pieces} color={this.state.color} text={this.state.text}></LabelA></td></tr>
                </tbody>
              </table> */}
          </div>
        </div>,document.querySelector('#modal')
      );
  }
}

export default Label;