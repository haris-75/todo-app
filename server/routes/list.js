const router = require('express').Router();
const {
  getTodoList,
  getTodoListWithID,
  addTodoList,
  archiveTodoList,
  unarchiveTodoList,
  updateTodoList,
} = require('../controllers/list');

router.get('/', getTodoList);
router.post('/', addTodoList);
router.get('/:id', getTodoListWithID);
router.patch('/:id', updateTodoList);
router.patch('/archive/:id', archiveTodoList);
router.patch('/unarchive/:id', unarchiveTodoList);

module.exports = router;
