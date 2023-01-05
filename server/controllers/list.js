const { client } = require('../db/config');

// get all todo_list records
const getTodoList = async (req, res) => {
  try {
    const allTodos = await client.query('SELECT * FROM todo_list');
    if (allTodos.rowCount > 0) {
      res.json({ status: 200, list: allTodos.rows });
    } else throw new Error('no record found');
  } catch (err) {
    console.error(err.message);
    res.status(404).send({ status: 404, message: err.message });
  }
};

// get a todo_list with a specific ID
const getTodoListWithID = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await client.query(
      'SELECT * FROM todo_list WHERE list_id = $1',
      [id]
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
const addTodoList = async (req, res) => {
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
const updateTodoList = async (req, res) => {
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

//archive a todo_list with ID
const archiveTodoList = async (req, res) => {
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

// unarchive a todo_list with ID
const unarchiveTodoList = async (req, res) => {
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
  getTodoList,
  getTodoListWithID,
  addTodoList,
  archiveTodoList,
  unarchiveTodoList,
  updateTodoList,
};
