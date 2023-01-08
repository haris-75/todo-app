import { Modal, Button, FormControl } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { setTodoItemModalFlag, setTodoItems } from '../../redux/actions';
import { ReduxState } from '../../redux/reducer/types';
import { setTodoItemModalData } from '../../redux/actions/index';
import {
  addTodoItem,
  updateTodoItem,
  getAllTodoItems,
} from '../../api/api_handlers';
import { toast } from 'react-toastify';

export default function TodoItemModal() {
  const dispatch = useDispatch();
  const { todoItemModalFlag, todoItemModalData, selectedTodoListID } =
    useSelector((state: ReduxState) => state);
  const modalDataHandler = () => {
    //if modal data has id which means we need to update todo list

    if (todoItemModalData.item_id) {
      updateTodoItem(
        selectedTodoListID,
        todoItemModalData.item_id,
        todoItemModalData.text
      )
        .then(() => {
          toast.success('successfully updated new todo item');
          getAllTodoItems(selectedTodoListID)
            .then(({ data: { all_items } }) => {
              dispatch(setTodoItems(all_items));
              closeModalHandler();
            })
            .catch((err) => {
              console.error('Failed to fetch todo items: ', err);
              closeModalHandler();
            });
        })
        .catch(() => {
          toast.error('failed to update todo item');
          closeModalHandler();
        });
    } else
      addTodoItem(todoItemModalData.text, selectedTodoListID)
        .then(() => {
          toast.success('successfully add new todo item');
          getAllTodoItems(selectedTodoListID)
            .then(({ data: { all_items } }) => {
              dispatch(setTodoItems(all_items));
              closeModalHandler();
            })
            .catch((err) => {
              console.error('Failed to fetch todo items: ', err);
              closeModalHandler();
            });
        })
        .catch(() => {
          toast.error('failed to add todo item');
          closeModalHandler();
        });
  };
  const closeModalHandler = () => {
    dispatch(setTodoItemModalFlag(false));
    dispatch(setTodoItemModalData({ list_id: null, item_id: null, text: '' }));
  };
  return (
    <Modal show={todoItemModalFlag} onHide={() => closeModalHandler()}>
      <Modal.Header closeButton>
        <Modal.Title>
          {todoItemModalData.item_id ? 'Update' : 'Add'} todo item
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormControl
          type="text"
          value={todoItemModalData?.text}
          placeholder="any description for todo item"
          onChange={({ target: { value } }) =>
            dispatch(
              setTodoItemModalData({ ...todoItemModalData, text: value })
            )
          }
        />
      </Modal.Body>
      <Modal.Footer>
        <Button size="sm" variant="danger" onClick={() => closeModalHandler()}>
          Close
        </Button>

        <Button
          size="sm"
          disabled={!todoItemModalData.text}
          variant="primary"
          onClick={() => modalDataHandler()}
        >
          {todoItemModalData.item_id ? 'Edit' : 'Add'} item
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
