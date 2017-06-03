import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import App from './components/app';
import { merge } from 'lodash';

document.addEventListener('DOMContentLoaded', () => {
  const store = configureStore();
  const banner = document.getElementById('banner');
  ReactDOM.render(<App store={store}/>, banner);
});
