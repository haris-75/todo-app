import { ModalData } from '../../Components/TodoListModal/types';

export type ReduxState = {
  todoList: [];
  todoListModalFlag: boolean;
  todoListModalData: ModalData;
};
