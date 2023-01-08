import { ModalDataItem } from '../../Components/TodoItemModal/types';
import { ModalData } from '../../Components/TodoListModal/types';

export type ReduxState = {
  todoList: [];
  todoListModalFlag: boolean;
  todoListModalData: ModalData;
  todoItems: [];
  selectedTodoListID: number;
  todoItemModalFlag: boolean;
  todoItemModalData: ModalDataItem;
};
