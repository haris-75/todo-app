const { client } = require('../db/config');

// get all todo_list records
const getTodoItem = async (req, res) => {
  try {
    const { list_id } = req.params;
    console.log('req.params: ' + req.params);
    console.log('list_id', list_id);
    const allTodoItem = await client.query(
      'SELECT * FROM todo_item WHERE list_id = $1',
      [list_id]
    );
    console.log('allTodoItem', allTodoItem);
    if (allTodoItem.rowCount > 0) {
      res.json({ status: 200, list: allTodoItem.rows });
    } else throw new Error('no record found');
  } catch (err) {
    console.error(err.message);
    res.status(404).send({ status: 404, message: err.message });
  }
};

// get a todo_list with a specific ID
const getTodoItemWithID = async (req, res) => {
  try {
    const { list_id, id } = req.params;
    const todo = await client.query(
      'SELECT * FROM todo_item WHERE list_id = $1 AND item_id = $2',
      [id, list_id]
    );
    if (todo.rowCount > 0) {
      res.json({ status: 200, todo_list: todo.rows[0] });
    } else throw new Error('Record not found or archived');
  } catch (err) {
    console.error(err.message);
    res.status(404).send({ status: 404, message: err.message });
  }
};

// add a todo_list
const addTodoItem = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title)
      throw new Error(
        'The request had invalid inputs or otherwise cannot be served'
      );
    const newTodo = await client.query(
      'INSERT INTO todo_list (title) VALUES($1) RETURNING *',
      [title]
    );

    if (newTodo.rowCount > 0) {
      res.json({ status: 200, new_todo: newTodo.rows[0] });
    } else throw new Error('Failed to add record');
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ status: 500, message: err.message });
  }
};

// update a todo_list with ID
const updateTodoItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;
    if (!title)
      throw new Error(
        'The request had invalid inputs or otherwise cannot be served'
      );

    const newTodo = await client.query(
      'UPDATE todo_list SET title=$1  WHERE list_id =$2 AND archived=FALSE',
      [title, id]
    );
    if (newTodo.rowCount > 0) {
      res.json({
        status: 200,
        message: `successfully updated todo list with id ${id}`,
      });
    } else throw new Error('Record not found or archived');
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ status: 500, message: err.message });
  }
};

//complete a todo_list with ID
const completeTodoItem = async (req, res) => {
  try {
    const { id } = req.params;
    const newTodo = await client.query(
      'UPDATE todo_list SET archived=TRUE  WHERE list_id =$1 AND archived=FALSE',
      [id]
    );

    if (newTodo.rowCount > 0) {
      res.json({
        status: 200,
        message: `successfully archived todo list with id ${id}`,
      });
    } else throw new Error('Record not found or already archived');
  } catch (err) {
    console.error(err.message);
    res.status(404).send({ status: 404, message: err.message });
  }
};

// uncomplete a todo_list with ID
const uncompleteTodoItem = async (req, res) => {
  try {
    const { id } = req.params;
    const newTodo = await client.query(
      'UPDATE todo_list SET archived=FALSE  WHERE list_id =$1 AND archived=TRUE',
      [id]
    );

    if (newTodo.rowCount > 0) {
      res.json({
        status: 200,
        message: `successfully unarchived todo list with id ${id}`,
      });
    } else throw new Error('Record not found or already not archived');
  } catch (err) {
    console.error(err.message);
    res.status(404).send({ status: 404, message: err.message });
  }
};

module.exports = {
  getTodoItem,
  getTodoItemWithID,
  addTodoItem,
  completeTodoItem,
  uncompleteTodoItem,
  updateTodoItem,
};
