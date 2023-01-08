import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import {
  completeTodoItem,
  getAllTodoItems,
  uncompleteTodoItem,
} from '../../api/api_handlers';

import { useSelector, useDispatch } from 'react-redux';
import { ReduxState } from '../../redux/reducer/types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  setSelectedTodoListID,
  setTodoItemModalData,
  setTodoItemModalFlag,
} from '../../redux/actions';

export default function TodoItemContainer({
  todoListID,
}: {
  todoListID: number;
}) {
  const dispatch = useDispatch();
  const [todoItems, setTodoItems] = useState([]);
  const { todoItemModalFlag } = useSelector((state: ReduxState) => state);
  useEffect(() => {
    getAllTodoItemsHandler();
    // eslint-disable-next-line
  }, [todoItemModalFlag]);
  const getAllTodoItemsHandler = () =>
    getAllTodoItems(todoListID)
      .then(({ data: { all_items } }) => {
        setTodoItems(all_items);
      })
      .catch(() => {});
  const updateTodoItemHandler = (
    list_id: number,
    item_id: number,
    title: string
  ) => {
    dispatch(setSelectedTodoListID(list_id));
    dispatch(setTodoItemModalData({ list_id, item_id, text: title }));
    dispatch(setTodoItemModalFlag(true));
  };
  const completeTodoItemHandler = (
    list_id: number,
    item_id: number,
    completed: boolean
  ) => {
    if (completed)
      uncompleteTodoItem(list_id, item_id)
        .then(() => {
          getAllTodoItemsHandler();
          toast.success('successfully uncompleted todo list');
        })
        .catch((err) => {
          toast.error('failed to uncomplete todo list');
          console.error('failed to uncomplete todo list: ', err);
        });
    else
      completeTodoItem(list_id, item_id)
        .then(() => {
          getAllTodoItemsHandler();
          toast.success('successfully completed todo list');
        })
        .catch((err) => {
          toast.error('failed to complete todo list');
          console.error('failed to complete todo list: ', err);
        });
  };
  return (
    <div>
      <div className="d-flex justify-content-between pt-3 pb-3">
        <span>
          <i>{todoItems?.length < 1 ? '' : 'Items for selected list'}</i>
        </span>
        <Button
          size="sm"
          onClick={() => {
            dispatch(setTodoItemModalFlag(true));
            dispatch(setSelectedTodoListID(todoListID));
          }}
        >
          Add Item
        </Button>
      </div>
      {todoItems?.length < 1 ? (
        <p>No items for selected list.</p>
      ) : (
        <ul className="list-group">
          {todoItems?.map(
            ({ list_id, item_id, description, completed, last_updated }) => (
              <li
                key={`${item_id}+${last_updated}+${list_id}`}
                className="list-group-item"
              >
                <div className="d-flex p-2 justify-content-between">
                  <p>{description}</p>
                  <div>
                    <Button
                      size="sm"
                      className={completed ? 'd-none mr-2' : 'mr-2'}
                      variant="success"
                      onClick={() =>
                        updateTodoItemHandler(list_id, item_id, description)
                      }
                    >
                      Edit
                    </Button>
                    <Button
                      className="mr-2"
                      size="sm"
                      variant={completed ? 'warning' : 'secondary'}
                      onClick={() =>
                        completeTodoItemHandler(list_id, item_id, completed)
                      }
                    >
                      {completed ? 'Uncomplete' : 'complete'}
                    </Button>
                  </div>
                </div>
              </li>
            )
          )}
        </ul>
      )}
    </div>
  );
}
