import React, { Component } from 'react';
import { Container } from 'reactstrap';
import PackageList from './PackageList.js';
import LoadingSpinner from './LoadingSpinner.js';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      pack: '',
      items: null,
      loading: false
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
    this.setState({ loading: true, error: null, items: null }, () => {
      axios.get('https://packagist.org/search.json', { params: { q: this.state.pack } })
        .then(function (response) {
          // console.log(response.data);
          self.setState({loading: false, error: null, items: response.data});
        })
        .catch(function (error) {
          // console.log(error);
          self.setState({loading: false, items: null, error: error});
        });
    });

  }

  onReset() {
    this.setState({loading: false, pack: '', items: null, error: null});
  }

  canDisableButton() {
    return (this.state.pack === '' && this.state.items === null) ? true : false;
  }

  render() {
    const { loading, error, items } = this.state;
    return (
      <Container>
        <h1>Search PHP package using the Packagist APIs</h1>
        <p>Packagist is the main Composer repository. It aggregates public PHP packages installable with Composer.</p>
        <form className="form-inline" onSubmit={this.handleSubmit}>
          <div className="form-group mr-2 mb-2">
            <label htmlFor="pack" className="sr-only">Package</label>
            <input className="form-control" required="required" id="pack" type="text" placeholder="Package..." value={this.state.pack} onChange={this.handleChange} title="Type the package to search" />
          </div>
          <button type="submit" className="btn btn-primary" title="Start a research">Search</button>
          <button type="button" className="btn btn-danger ml-2" title="Reset form and result" disabled={this.canDisableButton()} onClick={this.onReset.bind(this)}>Reset</button>
        </form>

        {error != null &&
          <div className="alert alert-danger">
            <h3>Error calling the API</h3>
            <p>The API from packagist.org did not answered correctly. Please report this error.</p>
          </div>
        }

        { loading &&
          <LoadingSpinner />
        }

        {items != null &&
          <div><PackageList packages={items} /></div>
        }
      </Container>
    );
  }
}

export default App;
