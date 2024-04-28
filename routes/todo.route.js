const express = require('express');
const {
  createTodo,
  getAllTodos,
  deleteTodo,
  getToDoById,
  updateTodo,
} = require('../controllers/todo.controller');

const todo = express.Router();

todo.post('/', createTodo);
todo.get('/', getAllTodos);
todo.get('/:todoId', getToDoById);
todo.delete('/:todoId', deleteTodo);
todo.patch('/:todoId', updateTodo);

module.exports = todo;
