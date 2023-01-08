import { combineReducers } from 'redux';
import { ReduxAction } from '../actions/types';

const todoList = (data = [], action: ReduxAction) =>
  action.type === 'TODO_LIST' ? action.payload : data;

const todoListModalFlag = (data = false, action: ReduxAction) =>
  action.type === 'TODO_MODAL_FLAG' ? action.payload : data;

const todoListModalData = (data = '', action: ReduxAction) =>
  action.type === 'TODO_MODAL_DATA' ? action.payload : data;

const selectedTodoListID = (data = -1, action: ReduxAction) =>
  action.type === 'SELECTED_TODO_LIST_ID' ? action.payload : data;

const todoItems = (data = [], action: ReduxAction) =>
  action.type === 'TODO_ITEMS' ? action.payload : data;

const todoItemModalFlag = (data = false, action: ReduxAction) =>
  action.type === 'TODO_ITEM_MODAL_FLAG' ? action.payload : data;

const todoItemModalData = (data = '', action: ReduxAction) =>
  action.type === 'TODO_ITEM_MODAL_DATA' ? action.payload : data;

const rootReducer = combineReducers({
  todoList,
  todoListModalFlag,
  todoListModalData,
  selectedTodoListID,
  todoItems,
  todoItemModalFlag,
  todoItemModalData,
});
export default rootReducer;
