import TodoListModal from './Components/TodoListModal';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TodoListContainer from './Components/TodoListContainer';
import './App.css';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { setTodoListModalFlag } from './redux/actions';
import TodoItemModal from './Components/TodoItemModal';

function App() {
  const dispatch = useDispatch();
  return (
    <div className="col-md-8 col-lg-6 col-sm-12 container pt-4">
      <div className="text-end m-3">
        <h2 className="d-flex flex-column align-items-center text-center">
          A simple todo app
          <span>
            <h5>where you can create your own personalized todo list</h5>
          </span>
        </h2>
        <div className="add-todo-list">
          <Button
            size="sm"
            type="button"
            onClick={() => dispatch(setTodoListModalFlag(true))}
          >
            Add Todo List
          </Button>
        </div>
      </div>
      <div>
        <TodoListContainer />
      </div>
      <TodoListModal />
      <TodoItemModal />
      <ToastContainer />
    </div>
  );
}

export default App;
