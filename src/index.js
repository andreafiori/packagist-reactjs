import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
/* IE Polyfills */
import 'core-js/es6/map';
import 'core-js/es6/set';
import 'raf/polyfill';
import 'core-js/es6/promise';
/* Styles */
import 'bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
