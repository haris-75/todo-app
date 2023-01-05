const router = require('express').Router();
const {
  getTodoItem,
  getTodoItemWithID,
  addTodoItem,
  updateTodoItem,
  completeTodoItem,
  uncompleteTodoItem,
} = require('../controllers/item');

router.get('/', getTodoItem);
router.post('/', addTodoItem);
router.get('/:id', getTodoItemWithID);
router.patch('/:id', updateTodoItem);
router.patch('/complete/:id', completeTodoItem);
router.patch('/uncomplete/:id', uncompleteTodoItem);

module.exports = router;
