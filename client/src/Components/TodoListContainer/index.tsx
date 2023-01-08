import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import {
  archiveTodoList,
  getAllTodoLists,
  unarchiveTodoList,
} from '../../api/api_handlers';
import {
  setTodoList,
  setTodoListModalData,
  setTodoListModalFlag,
} from '../../redux/actions/index';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxState } from '../../redux/reducer/types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TodoItemContainer from '../TodoItemContainer';

function TodoListContainer() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [openedItemsList, setOpenedItemsList] = useState<number[]>([]);
  const { todoList } = useSelector((state: ReduxState) => state);
  useEffect(() => {
    getAllTodoListHandler();
    // eslint-disable-next-line
  }, []);
  const getAllTodoListHandler = () =>
    getAllTodoLists()
      .then(({ data: { list } }) => {
        dispatch(setTodoList(list));
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch todo list: ', err);
        setLoading(false);
      });
  const updateTodoListHandler = (id: number, title: string) => {
    dispatch(setTodoListModalData({ id, text: title }));
    dispatch(setTodoListModalFlag(true));
  };
  const archiveTodoListHandler = (id: number, archived: boolean) => {
    setLoading(true);
    if (archived)
      unarchiveTodoList(id)
        .then(() => {
          getAllTodoListHandler();
          toast.success('successfully unarchived todo list');
        })
        .catch((err) => {
          toast.error('failed to unarchive todo list');
          console.error('failed to unarchive todo list: ', err);
        });
    else
      archiveTodoList(id)
        .then(() => {
          getAllTodoListHandler();
          setOpenedItemsList(openedItemsList.filter((itemId) => itemId !== id));

          toast.success('successfully archived todo list');
        })
        .catch((err) => {
          toast.error('failed to archive todo list');
          console.error('failed to archive todo list: ', err);
        });
  };
  const viewItemsHandler = (id: number) => {
    if (openedItemsList?.includes(id))
      setOpenedItemsList(openedItemsList.filter((itemId) => itemId !== id));
    else setOpenedItemsList([...openedItemsList, id]);
  };
  return (
    <div>
      {loading ? (
        <div className="spinner-border text-primary" role="status"></div>
      ) : todoList.length < 1 ? (
        <center>
          <p>No list added so far</p>
        </center>
      ) : (
        <>
          <ul className="list-group">
            {todoList?.map(({ list_id, title, archived, last_updated }) => (
              <li
                key={`${list_id}+${last_updated}`}
                className={`list-group-item ${
                  openedItemsList?.includes(list_id) ? 'pb-3' : 'pb-2'
                }`}
              >
                <div className="d-flex p-2 justify-content-between">
                  <h5>{title}</h5>
                  <div>
                    <Button
                      size="sm"
                      className={archived ? 'd-none mr-2' : 'mr-2'}
                      variant="success"
                      onClick={() => updateTodoListHandler(list_id, title)}
                    >
                      Edit
                    </Button>
                    <Button
                      className={archived ? '' : 'mr-2'}
                      size="sm"
                      variant={archived ? 'warning' : 'secondary'}
                      onClick={() => archiveTodoListHandler(list_id, archived)}
                    >
                      {archived ? 'Unarchive' : 'Archive'}
                    </Button>
                    <Button
                      size="sm"
                      className={archived ? 'd-none ' : ''}
                      onClick={() => viewItemsHandler(list_id)}
                      variant="info"
                    >
                      {openedItemsList?.includes(list_id) ? 'Hide' : 'View'}{' '}
                      items
                    </Button>
                  </div>
                </div>
                {openedItemsList?.includes(list_id) ? (
                  <TodoItemContainer todoListID={list_id} />
                ) : (
                  ''
                )}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default TodoListContainer;
