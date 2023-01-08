import { ModalDataItem } from '../../Components/TodoItemModal/types';
import { ModalData } from '../../Components/TodoListModal/types';

export const setTodoList = (data = []) => {
  return {
    type: 'TODO_LIST',
    payload: data,
  };
};

export const setTodoListModalFlag = (data = false) => {
  return {
    type: 'TODO_MODAL_FLAG',
    payload: data,
  };
};

export const setTodoListModalData = (data: ModalData) => {
  return {
    type: 'TODO_MODAL_DATA',
    payload: data,
  };
};

export const setSelectedTodoListID = (data: number) => {
  return {
    type: 'SELECTED_TODO_LIST_ID',
    payload: data,
  };
};

export const setTodoItems = (data = []) => {
  return {
    type: 'TODO_ITEMS',
    payload: data,
  };
};

export const setTodoItemModalFlag = (data = false) => {
  return {
    type: 'TODO_ITEM_MODAL_FLAG',
    payload: data,
  };
};

export const setTodoItemModalData = (data: ModalDataItem) => {
  return {
    type: 'TODO_ITEM_MODAL_DATA',
    payload: data,
  };
};
