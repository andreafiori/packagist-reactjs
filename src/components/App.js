import React, { Component } from 'react';
import { Container } from 'reactstrap';
import Pack from './Pack.js';
import axios from 'axios';
import '../styles/App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      pack: '',
      items: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({pack: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();

    const self = this;
    axios.get('https://packagist.org/search.json', { params: { q: this.state.pack } })
      .then(function (response) {
        console.log(response.data);
        self.setState({error: null, items: response.data});
      })
      .catch(function (error) {
        console.log(error);
        self.setState({items: null, error: error});
      });
  }

  render() {
    const { error, items } = this.state;
    return (
      <Container>
        <h1>Packagist</h1>
        <p>Search PHP package repository</p>
        <form className="form-inline" onSubmit={this.handleSubmit}>
            <div className="form-group mr-2 mb-2">
                <label htmlFor="pack" className="sr-only">Package</label>
                <input className="form-control" id="pack" type="text" placeholder="Package..." value={this.state.pack} onChange={this.handleChange} title="Type the package to search" />
            </div>
            <button type="submit" className="btn btn-primary mb-2" title="Start a research">Search</button>
        </form>

        <p>Packagist is the main Composer repository. It aggregates public PHP packages installable with Composer.</p>

        {error != null &&
          <div className="alert alert-danger">
            <h3>Error calling the API</h3>
            <p>The API from packagist.org did not answered correctly. Please report this error.</p>
          </div>
        }

        {/* Render PHP packages */}
        {items != null &&
          <div><Pack packages={items} /></div>
        }
      </Container>
    );
  }
}

export default App;
