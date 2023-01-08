import axios from 'axios';
import {
  TODO_ITEM,
  TODO_ITEM_COMPLETE,
  TODO_ITEM_ID,
  TODO_LIST,
  TODO_LIST_ARCHIVE,
  TODO_LIST_ID,
} from './api_urls';

export const getAllTodoLists = () =>
  axios.request({
    method: 'GET',
    url: TODO_LIST(),
  });

export const addTodoList = (todoListTitle: string) =>
  axios.request({
    method: 'POST',
    url: TODO_LIST(),
    data: { title: todoListTitle },
  });

export const updateTodoList = (id: number, todoListTitle: string) =>
  axios.request({
    method: 'PATCH',
    url: TODO_LIST_ID(id),
    data: { title: todoListTitle },
  });

export const archiveTodoList = (id: number) =>
  axios.request({
    method: 'PATCH',
    url: TODO_LIST_ARCHIVE(id, 'archive'),
  });

export const unarchiveTodoList = (id: number) =>
  axios.request({
    method: 'PATCH',
    url: TODO_LIST_ARCHIVE(id, 'unarchive'),
  });

export const getAllTodoItems = (id: number) =>
  axios.request({
    method: 'GET',
    url: TODO_ITEM(id),
  });

export const addTodoItem = (todoItemDescription: string, id: number) =>
  axios.request({
    method: 'POST',
    url: TODO_ITEM(id),
    data: { description: todoItemDescription },
  });

export const updateTodoItem = (
  list_id: number,
  item_id: number,
  todoItemDescription: string
) =>
  axios.request({
    method: 'PATCH',
    url: TODO_ITEM_ID(list_id, item_id),
    data: { description: todoItemDescription },
  });

export const completeTodoItem = (list_id: number, item_id: number) =>
  axios.request({
    method: 'PATCH',
    url: TODO_ITEM_COMPLETE(list_id, item_id, 'complete'),
  });

export const uncompleteTodoItem = (list_id: number, item_id: number) =>
  axios.request({
    method: 'PATCH',
    url: TODO_ITEM_COMPLETE(list_id, item_id, 'uncomplete'),
  });
