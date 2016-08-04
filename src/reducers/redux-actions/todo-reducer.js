import {combineReducers} from 'redux';
import {handleAction, handleActions} from 'redux-actions';
import {retrieveTodos, createTodo, retrieveTodo, modifyTodo, destroyTodo} from '../../actions/redux-actions/todo-action'
import _ from 'lodash';

// Helpers
const findAndModify = (arr, item) => {
  arr = [...arr];
  const index = arr.indexOf(item);
  if (index < 0) return arr;
  arr.splice(index, 1, item);
  return arr;
}
const findAndDestroy = (arr, itemId) => {
  arr = [...arr];
  const index = arr.findIndex((item) => item._id === itemId);
  if (index < 0) return arr;
  arr.splice(index, 1);
  return arr;
}

// Reducers
const arrReducer = handleActions({
  [retrieveTodos]: (state, {payload}) =>
    payload ? payload : state,
  [createTodo]: (state, {payload}) =>
    payload ? [...state, payload] : state,
  [retrieveTodo]: (state, {payload}) =>
    payload ? findAndModify(state, payload) : state,
  [modifyTodo]: (state, {payload}) =>
    payload ? findAndModify(state, payload) : state,
  [destroyTodo]: (state, {payload}) =>
    payload ? findAndDestroy(state, payload) : state
}, []);
const errorReducer = handleActions({
  [retrieveTodos]: {throw(state, {payload}) {
    return `Retrieve Todos Failed: ${payload}`;
  }},
  [createTodo]: {throw(state, {payload}) {
    return `Create Todo Failed: ${payload}`;
  }},
  [retrieveTodo]: {throw(state, {payload}) {
    return `Retrieve Todo Failed: ${payload}`;
  }},
  [modifyTodo]: {throw(state, {payload}) {
    return `Modify Todo Failed: ${payload}`;
  }},
  [destroyTodo]: {throw(state, {payload}) {
    return `Destroy Todo Failed: ${payload}`;
  }}
}, false);
const metaReducer = combineReducers({
  isRetrievingTodos: handleAction(retrieveTodos,
    (state, {meta: {isRetrievingTodos}}) =>
      _.isUndefined(isRetrievingTodos) ? state : isRetrievingTodos, false),
  isCreating: handleAction(createTodo,
    (state, {meta: {isCreating}}) =>
      _.isUndefined(isCreating) ? state : isCreating, false),
  retrievingArr: handleAction(retrieveTodo,
    (state, {meta: {isRetrieving, retrievingTodoId}}) =>
      _.isUndefined(retrievingTodoId) ? state[retrievingTodoId] = state : isRetrieving, {}),
  modifyingArr: handleAction(modifyTodo,
    (state, {meta: {isModifying, modifyingTodoId}}) =>
      _.isUndefined(modifyingTodoId) ? state[modifyingTodoId] = state : isModifying, {}),
  destroyingArr: handleAction(destroyTodo,
    (state, {meta: {isDestroying, destroyingTodoId}}) =>
      _.isUndefined(destroyingTodoId) ? state[destroyingTodoId] = state : isDestroying, {})
})

export default combineReducers({
  arr: arrReducer,
  error: errorReducer,
  meta: metaReducer
});