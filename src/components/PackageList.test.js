import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import PackageList from './PackageList';

describe('PackageList', () => {
  const props = {
    results: [
      {
        name: 'package 1',
        url: 'http://packagist.example.org/',
        description: 'package 1 description',
        download: 'download',
      }
    ]
  };

  const packageList = shallow(<PackageList {...props} />);

  // Snapshots tests fail on Travis!
  /* it('renders correctly', () => {
    expect(packageList).toMatchSnapshot();
  }); */

  it('renders with one or more packages', () => {
    packageList.find('h3').contains('' + props.results.name);
    packageList.find('p').contains('' + props.results.description);
  });

  // A second approach of testin using ReactDOM.render
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<PackageList />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders with one or more packages', () => {
    const div = document.createElement('div');
    ReactDOM.render(<PackageList packages={props} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

});
