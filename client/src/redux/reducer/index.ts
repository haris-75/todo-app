import { combineReducers } from 'redux';
import { ReduxAction } from '../actions/types';

const todoList = (data = [], action: ReduxAction) =>
  action.type === 'TODO_LIST' ? action.payload : data;

const todoListModalFlag = (data = false, action: ReduxAction) =>
  action.type === 'TODO_MODAL_FLAG' ? action.payload : data;

const todoListModalData = (data = '', action: ReduxAction) =>
  action.type === 'TODO_MODAL_DATA' ? action.payload : data;

const rootReducer = combineReducers({
  todoList,
  todoListModalFlag,
  todoListModalData,
});
export default rootReducer;
