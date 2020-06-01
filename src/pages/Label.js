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
              <table className='label_view_table'>
                <tbody>
                  <tr><td className='td_label_view'><LabelA></LabelA></td><td className='td_label_view'><LabelA></LabelA></td><td className='td_label_view'><LabelA></LabelA></td></tr>
                  <tr><td className='td_label_view'><LabelA></LabelA></td><td className='td_label_view'><LabelA></LabelA></td><td className='td_label_view'><LabelA></LabelA></td></tr>
                  <tr><td className='td_label_view'><LabelA></LabelA></td><td className='td_label_view'><LabelA></LabelA></td><td className='td_label_view'><LabelA></LabelA></td></tr>
                </tbody>
              </table>
          </div>
        </div>,document.querySelector('#modal')
      );
  }
}

export default Label;