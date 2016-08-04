import {createAction} from 'redux-actions';

export const retrieveTodos = createAction('RETRIEVE_TODOS',
  ({todos}) => todos,
  ({isRetrievingTodos}) => ({isRetrievingTodos}));
export const createTodo = createAction('CREATE_TODO',
  ({todo}) => todo,
  ({isCreating}) => ({isCreating}));
export const retrieveTodo = createAction('RETRIEVE_TODO',
  ({todo}) => todo,
  ({isRetrieving, retrievingTodoId}) => ({isRetrieving, retrievingTodoId}));
export const modifyTodo = createAction('MODIFY_TODO',
  ({todo}) => todo,
  ({isModifying, modifyingTodoId}) => ({isModifying, modifyingTodoId}));
export const destroyTodo = createAction('DESTROY_TODO',
  ({todoId}) => todoId,
  ({isDestroying, destroyingTodoId}) => ({isDestroying, destroyingTodoId}));