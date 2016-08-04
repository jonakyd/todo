require('normalize.css/normalize.css');
require('styles/App.css');

import React, {Component} from 'react';
import Cycle from 'cycle-react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as todoActions from '../actions/redux-actions/todo-action';
import {TodoAPI} from '../rx/api.rx';

export default connect(
  (state) => ({state}),
  (dispatch) => ({actions: bindActionCreators(todoActions, dispatch)})
)(Cycle.component('AppComponent', (interactions$, props$) => {


  return (
    <div>
      <form
        onSubmit={(e) => {
        interactions$.listener('OnFormSubmit')(e);
        e.preventDefault();
      }}>
        <input
          className="form-control todo-input"
          type="text"
          placeholder="Enter..."/>
      </form>
      <ol>
        <li>Hello {name}</li>
      </ol>
    </div>
  );

  return interactions$.get('OnFormSubmit')
    .map(ev => $(ev.target).find('input').val())
    .startWith('')
    .map(name =>
    );
}));