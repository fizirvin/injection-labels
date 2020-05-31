import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom'

import LabelA from './labels/LabelA'

class Label extends Component {
  state={
    type: '',
  }

    async componentDidMount(){
    
    }

    

  render(){
    return ReactDOM.createPortal(
        <div className="Modal_view">
          <div className="modal-content-view">
              {/* <Link to="/"><div className='close_button_view'></div></Link> */}
              <LabelA>  </LabelA>
          </div>
        </div>,document.querySelector('#modal')
      );
  }
}

export default Label;