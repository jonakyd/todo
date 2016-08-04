require('normalize.css/normalize.css');
require('styles/App.css');

import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as todoActions from '../actions/redux-actions/todo-action';
import {TodoAPI} from '../rx/api.rx';

export default connect(
  (state) => ({state}),
  (dispatch) => ({actions: bindActionCreators(todoActions, dispatch)})
)(class AppComponent extends Component {
  render() {
    const {actions: {createTodo}} = this.props;
    const {state: {todo: {
      arr,
      meta: {isCreating}
    }}} = this.props;

    return (
      <div>
        <form
          onSubmit={(e) => {
          const val = $(e.target).find('.todo-input').val();

          // Async task
          createTodo({isCreating: true})
          TodoAPI
            .createTodo$(val)
            .subscribe((response) => {
              createTodo({
                todo: response,
                isCreating: false
              });
            });
          e.preventDefault();
        }}>
          <input
            id="input"
            disabled={isCreating}
            className="form-control todo-input"
            type="text"
            placeholder="Enter..."/>
        </form>
        <ol>
          {(arr.map((item) => (
            <li>{item.text}</li>
          )))}
        </ol>
      </div>
    );
  }
});