import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import configureStore from './stores';
import App from './containers/app';

render(
  <Provider store={configureStore()}>
    <App />
  </Provider>,
  document.getElementById('app')
);
