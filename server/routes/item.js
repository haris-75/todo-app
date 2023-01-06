const router = require('express').Router();
const {
  getTodoItem,
  getTodoItemWithID,
  addTodoItem,
  updateTodoItem,
  completeTodoItem,
  uncompleteTodoItem,
} = require('../controllers/item');

router.get('/:list_id', getTodoItem);
router.post('/:list_id', addTodoItem);
router.get('/:list_id/:id', getTodoItemWithID);
router.patch('/:list_id/:id', updateTodoItem);
router.patch('/:list_id/complete/:id', completeTodoItem);
router.patch('/:list_id/uncomplete/:id', uncompleteTodoItem);

module.exports = router;
