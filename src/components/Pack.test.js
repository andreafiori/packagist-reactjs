import React from 'react';
import ReactDOM from 'react-dom';
import Pack from './Pack';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Pack />, div);
  ReactDOM.unmountComponentAtNode(div);
});
