import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {'response': 'none', 'value': ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getUppercase = this.getUppercase.bind(this);
  }
  getUppercase(input) {
    var quoted = '"' + input + '"';
    axios.post('https://txsca3462b.execute-api.us-west-2.amazonaws.com/deployed/mydemoresource', quoted)
      .then(response => {
        console.log(response);
        this.setState({'response': response.data});
      })
      .catch(exception => {
        console.log('Connection error')
      });
  }
  handleChange(event) {
    this.setState({'value': event.target.value});
  }
  handleSubmit(event) {
    event.preventDefault();
    this.getUppercase(this.state.value);
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Test Lambda App</h2>
        </div>
          <form onSubmit={this.handleSubmit}>
            <label>
              Input string
              </label>
              <br/>
                    <input type="text" value={this.state.value} onChange={this.handleChange} />
            
            <input type="submit" value="Submit" />
          </form>
          <br/>
          <div>
            <h4>Lambda Response: {this.state.response}</h4>
          </div>
      </div>
    );
  }
}

export default App;
