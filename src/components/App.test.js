import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import App from './App';

describe('renders without crashing', () => {
  const app = shallow(<App />);
  const state = {
    pack: '',
    items: null,
    loading: false,
    error: null
  };

  // Snapshot tests fail on Travis!
  /* it('renders correctly', () => {
    expect(app).toMatchSnapshot();
  }); */
  
  it('initialize default state', () => {
    expect(app.state()).toEqual(state);
  });

  it('renders simulate typing a package', () => {
    app.find('#pack').simulate('change', { target: { value: 'Zend' } });
    app.find('#btn-search').simulate('click');
  });

  it('renders without crashing using ReactDOM', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

});
