import { useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
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
import moment from 'moment';

function TodoListContainer() {
  const dispatch = useDispatch();
  const { todoList } = useSelector((state: ReduxState) => state);
  useEffect(() => {
    getAllTodoListHandler();
  }, []);
  const getAllTodoListHandler = () =>
    getAllTodoLists()
      .then(({ data: { list } }) => {
        dispatch(setTodoList(list));
      })
      .catch((err) => {
        console.error('Failed to fetch todo list: ', err);
      });
  const updateTodoListHandler = (id: number, title: string) => {
    dispatch(setTodoListModalData({ id, text: title }));
    dispatch(setTodoListModalFlag(true));
  };
  const archiveTodoListHandler = (id: number, archived: boolean) => {
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
          toast.success('successfully archived todo list');
        })
        .catch((err) => {
          toast.error('failed to archive todo list');
          console.error('failed to archive todo list: ', err);
        });
  };
  return (
    <div>
      <div className="table-wrapper-scroll-y my-custom-scrollbar">
        <Table striped bordered style={{ padding: '1rem' }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Timestamp</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {todoList?.map(({ list_id, title, archived, last_updated }) => (
              <tr
                className={archived ? 'archived-row' : ''}
                key={`${list_id}+${last_updated}`}
              >
                <td>{list_id}</td>
                <td>{title}</td>
                <td>{moment(last_updated).format('LLL')}</td>
                <td className="d-flex justify-content-around">
                  <Button
                    variant={archived ? 'warning' : 'secondary'}
                    onClick={() => archiveTodoListHandler(list_id, archived)}
                  >
                    {archived ? 'Unarchive' : 'Archive'}
                  </Button>
                  <Button variant="info">View items</Button>

                  <Button
                    className={archived ? 'invisible' : ''}
                    variant="success"
                    onClick={() => updateTodoListHandler(list_id, title)}
                  >
                    Edit
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default TodoListContainer;
