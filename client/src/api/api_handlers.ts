import axios from 'axios';
import { TODO_LIST, TODO_LIST_ARCHIVE, TODO_LIST_ID } from './api_urls';

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
