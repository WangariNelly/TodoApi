const express = require('express');
const {
  createTodo,
  getAllTodos,
  deleteTodo,
  getToDoById,
  updateTodo,
} = require('../controllers/todo.controller');

const PayloadValidationErrorsUtil = require('../utils/payloadValidationErrors.util');
const todoValidations = require('../validations/todo.validation');

const todo = express.Router();

todo.post(
  '/',
  todoValidations['createTodo'],
  PayloadValidationErrorsUtil,
  createTodo,
);
todo.get('/', getAllTodos);
todo.get('/:todoId', getToDoById);
todo.delete('/:todoId', deleteTodo);
todo.patch('/:todoId', updateTodo);

module.exports = todo;
