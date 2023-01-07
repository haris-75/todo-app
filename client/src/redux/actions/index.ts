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
