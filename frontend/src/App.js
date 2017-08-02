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
  }
  getUppercase(input) {
    axios.post('https://txsca3462b.execute-api.us-west-2.amazonaws.com/deployed/mydemoresource', input)
      .then(response => {
        return response.data;
      })
      .catch(exception => {
        return 'error';
      });
  }
  handleChange(event) {
    this.setState({'value': event.target.value});
  }
  handleSubmit(event) {
    event.preventDefault();
    var uc = this.getUppercase(this.state.value);
    this.setState({'response': uc});
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
                    <input type="text" value={this.state.value} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />
          </form>
          Response: {this.state.response}
      </div>
    );
  }
}

export default App;
