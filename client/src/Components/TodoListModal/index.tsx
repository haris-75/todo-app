import { Modal, Button, FormControl } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { setTodoList, setTodoListModalFlag } from '../../redux/actions';
import { ReduxState } from '../../redux/reducer/types';
import { setTodoListModalData } from '../../redux/actions/index';
import {
  addTodoList,
  getAllTodoLists,
  updateTodoList,
} from '../../api/api_handlers';
import { toast } from 'react-toastify';

export default function TodoListModal() {
  const dispatch = useDispatch();
  const { todoListModalFlag, todoListModalData } = useSelector(
    (state: ReduxState) => state
  );
  const modalDataHandler = () => {
    // if modal data has id which means we need to update todo list
    if (todoListModalData.id) {
      updateTodoList(todoListModalData.id, todoListModalData.text)
        .then(() => {
          toast.success('Successfully updated new todo list');
          getAllTodoLists()
            .then(({ data: { list } }) => {
              dispatch(setTodoList(list));
              closeModalHandler();
            })
            .catch((err) => {
              console.error('Failed to fetch todo list: ', err);
              closeModalHandler();
            });
        })
        .catch(() => {
          toast.error('Failed to update todo list');
          closeModalHandler();
        });
    } else
      addTodoList(todoListModalData.text)
        .then(() => {
          toast.success('Successfully add new todo list');
          getAllTodoLists()
            .then(({ data: { list } }) => {
              dispatch(setTodoList(list));
              closeModalHandler();
            })
            .catch((err) => {
              console.error('Failed to fetch todo list: ', err);
              closeModalHandler();
            });
        })
        .catch(() => {
          toast.error('Failed to add todo list');
          closeModalHandler();
        });
  };
  const closeModalHandler = () => {
    dispatch(setTodoListModalFlag(false));
    dispatch(setTodoListModalData({ id: null, text: '' }));
  };
  return (
    <Modal show={todoListModalFlag} onHide={() => closeModalHandler()}>
      <Modal.Header closeButton>
        <Modal.Title>
          {`${todoListModalData.id ? 'Update' : 'Add'}`} todo list
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormControl
          type="text"
          value={todoListModalData?.text}
          placeholder="any title for todo list"
          onChange={({ target: { value } }) =>
            dispatch(
              setTodoListModalData({ ...todoListModalData, text: value })
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
          disabled={!todoListModalData.text}
          variant="primary"
          onClick={() => modalDataHandler()}
        >
          {`${todoListModalData.id ? 'Update' : 'Add'}`} list
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
