import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

class NewLabel extends Component {
  state={
    type: '',
    header: '',
    intRef: '',
    clientRef: '',
    color: '#8080ff',
    certification: 'true',
    text: 'black',
    pieces: '300'
  }

    async componentDidMount(){
    
    }

    onSubmit = e =>{
        e.preventDefault();
        if(this.state.type === 'client') { return this.props.newLabel(this.state);}
        else if(this.state.type === 'plastic') { return this.props.newPlastic(this.state); }
      }

    onInput = e =>{
        this.setState({[e.target.name]: e.target.value})    
    }

    showState = () =>{
        console.log(this.state)
    }

    renderClient = () =>{
        return ( 
            <tbody>
                <tr>
                    <td><label htmlFor='header'>Header: </label></td>
                    <td><input type='text' id='header' name='header' value={this.state.header} onChange={this.onInput} maxLength='15' required></input></td>
                </tr>
                <tr>
                    <td><label htmlFor='color'>Color: </label></td>
                    <td><input type='color' id='color' name='color' value={this.state.color} onChange={this.onInput} required></input>
                    <label>text: </label>
                    <input type="radio" id="white" name="text" value='white' onChange={this.onInput} checked={this.state.text === 'white'? true : false} required></input>
                    <label htmlFor="white">White</label>
                    <input type="radio" id="black" name="text" value='black' onChange={this.onInput} checked={this.state.text === 'black'? true : false} required></input>
                    <label htmlFor="black">Black</label></td>
                </tr>
                <tr>
                    <td><label htmlFor='intRef'>Internal Ref: </label></td>
                    <td><input type='text' id='intRef' name='intRef' value={this.state.intRef} onChange={this.onInput} maxLength='15' required></input></td>
                </tr>
                <tr>
                    <td><label htmlFor='clientRef'>Client Ref: </label></td>
                    <td> <input type='text' id='clientRef' name='clientRef' value={this.state.clientRef} onChange={this.onInput} maxLength='15' required></input></td>
                </tr>
                <tr>
                    <td><label htmlFor='pieces'>Pieces: </label></td>
                    <td><input type='number' id='pieces' name='pieces' value={this.state.pieces} onChange={this.onInput} min="20" max="500" required></input></td>
                </tr>
                <tr>
                    <td><label>Certification: </label></td>
                    <td><input type="radio" id="true" name="certification" value={true} onChange={this.onInput} checked={this.state.certification === 'true'? true : false} required></input>
                    <label htmlFor="true">Yes</label>
                    <input type="radio" id="false" name="certification" value={false} onChange={this.onInput} checked={this.state.certification === 'false'? true : false} required></input>
                    <label htmlFor="false">No</label></td>
                </tr>
            </tbody>
        )
    }

    renderPlastic = () =>{
        return ( 
            <tbody>
                <tr>
                    <td><label htmlFor='header'>Header: </label></td>
                    <td><input type='text' id='header' name='header' value={this.state.header} onChange={this.onInput} maxLength='15' required></input></td>
                </tr>
                <tr>
                    <td><label htmlFor='color'>Color: </label></td>
                    <td>
                        <input type='color' id='color' name='color' value={this.state.color} onChange={this.onInput} required></input>
                        <label> text: </label>
                        <input type="radio" id="white" name="text" value='white' onChange={this.onInput} checked={this.state.text === 'white'? true : false} required></input>
                        <label htmlFor="white">White</label>
                        <input type="radio" id="black" name="text" value='black' onChange={this.onInput} checked={this.state.text === 'black'? true : false} required></input>
                        <label htmlFor="black">Black</label>
                    </td>
                </tr>
                <tr>
                    <td><label htmlFor='intRef'>Internal Ref: </label></td>
                    <td><input type='text' id='intRef' name='intRef' value={this.state.intRef} onChange={this.onInput} maxLength='15' required></input></td>
                </tr>
                <tr>
                    <td><label htmlFor='pieces'>Pieces: </label></td>
                    <td><input type='number' id='pieces' name='pieces' value={this.state.pieces} onChange={this.onInput} min="20" max="500" required></input></td>
                </tr>
            </tbody>
        )
    }

    renderForm(){
        if(this.state.type === 'plastic') return this.renderPlastic()
        else if( this.state.type === 'client') return this.renderClient()
        else return null
    }

  render(){
    return ReactDOM.createPortal(
        <div className="Modal">
          <div className="modal-content">
              <h2>Set New Label</h2>
          <form onSubmit={this.onSubmit}>
                <table>
                    <tbody>
                        <tr>
                            <td><label htmlFor='type'>Label type: </label></td>
                            <td><select id='type' name='type' onChange={this.onInput} defaultValue=''>
                                    <option disabled value="">select</option>
                                    <option value="plastic">Plastic</option>
                                    <option value="client">Client</option>
                                </select>
                            </td>
                        </tr>
                    </tbody>
                    {this.renderForm()}
                </table>
            <Link to="/"><button type="button">Close</button></Link>
            <button type="button" onClick={this.showState}>state</button>
            <input type="submit" value="Submit"></input>
            </form>
          </div>
        </div>,document.querySelector('#modal')
      );
  }
}

export default NewLabel;