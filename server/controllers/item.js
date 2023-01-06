const { client } = require('../db/config');

// utility function to check if list is archived
const checkListIsArchived = async (id) => {
  const list = await client.query(
    'SELECT * FROM todo_list WHERE list_id = $1 AND archived = FALSE',
    [id]
  );
  console.log('list', list);
  return list.rowCount < 1 ? true : false;
};

// get all todo_item records of a list
const getTodoItem = async (req, res) => {
  try {
    const { list_id } = req.params;
    if (await checkListIsArchived(list_id)) {
      throw new Error('list not found or archived');
    }

    const allTodoItem = await client.query(
      'SELECT * FROM todo_item WHERE list_id = $1',
      [list_id]
    );
    if (allTodoItem.rowCount > 0) {
      res.json({ status: 200, all_items: allTodoItem.rows });
    } else throw new Error('no record found');
  } catch (err) {
    console.error(err.message);
    res.status(404).send({ status: 404, message: err.message });
  }
};

// get a todo_item with a specific ID for a list
const getTodoItemWithID = async (req, res) => {
  try {
    const { list_id, id } = req.params;
    if (await checkListIsArchived(list_id)) {
      throw new Error('list not found or archived');
    }

    const item = await client.query(
      'SELECT * FROM todo_item WHERE list_id = $1 AND item_id = $2',
      [list_id, id]
    );
    console.log('list_id', list_id);
    console.log('id', id);
    if (item.rowCount > 0) {
      res.json({ status: 200, todo_item: item.rows[0] });
    } else throw new Error('Record not found');
  } catch (err) {
    console.error(err.message);
    res.status(404).send({ status: 404, message: err.message });
  }
};

// add a todo_list
const addTodoItem = async (req, res) => {
  try {
    const { description } = req.body;
    const { list_id } = req.params;
    if (!description)
      throw new Error(
        'The request had invalid inputs or otherwise cannot be served'
      );

    if (await checkListIsArchived(list_id)) {
      throw new Error('list not found or archived');
    }

    const newItem = await client.query(
      'INSERT INTO todo_item (description, list_id) VALUES($1,$2) RETURNING *',
      [description, list_id]
    );

    if (newItem.rowCount > 0) {
      res.json({ status: 200, new_todo: newItem.rows[0] });
    } else throw new Error('Failed to add record');
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ status: 500, message: err.message });
  }
};

// update a todo_list with ID
const updateTodoItem = async (req, res) => {
  try {
    const { list_id, id } = req.params;
    const { description } = req.body;
    if (!description)
      throw new Error(
        'The request had invalid inputs or otherwise cannot be served'
      );

    if (await checkListIsArchived(list_id)) {
      throw new Error('list not found or archived');
    }

    const item = await client.query(
      'UPDATE todo_item SET description = $1 WHERE item_id = $2 AND list_id = $3 AND completed = FALSE',
      [description, id, list_id]
    );
    if (item.rowCount > 0) {
      res.json({
        status: 200,
        message: `successfully updated todo item with id ${id}`,
      });
    } else throw new Error('Record not found or completed');
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ status: 500, message: err.message });
  }
};

//complete a todo_list with ID
const completeTodoItem = async (req, res) => {
  try {
    const { list_id, id } = req.params;
    if (await checkListIsArchived(list_id)) {
      throw new Error('list not found or archived');
    }

    const item = await client.query(
      'UPDATE todo_item SET completed = TRUE  WHERE list_id = $1 AND item_id = $2 AND completed = FALSE',
      [list_id, id]
    );

    if (item.rowCount > 0) {
      res.json({
        status: 200,
        message: `successfully completed todo item with id ${id}`,
      });
    } else throw new Error('Record not found or already completed');
  } catch (err) {
    console.error(err.message);
    res.status(404).send({ status: 404, message: err.message });
  }
};

// uncomplete a todo_list with ID
const uncompleteTodoItem = async (req, res) => {
  try {
    const { list_id, id } = req.params;
    if (await checkListIsArchived(list_id)) {
      throw new Error('list not found or archived');
    }

    const item = await client.query(
      'UPDATE todo_item SET completed = FALSE  WHERE list_id = $1 AND item_id = $2 AND  completed = TRUE',
      [list_id, id]
    );

    if (item.rowCount > 0) {
      res.json({
        status: 200,
        message: `successfully uncompleted todo list with id ${id}`,
      });
    } else throw new Error('Record not found or already not completed');
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
