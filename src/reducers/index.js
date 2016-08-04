import {combineReducers} from 'redux';
import todoReducer from './redux-actions/todo-reducer';

module.exports = combineReducers({todo: todoReducer});