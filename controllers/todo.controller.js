const { isEmpty } = require('lodash');
const ToDo = require('../models/todo.model');
const { CatchAsyncErrors } = require('../utils/catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler.util');

exports.createTodo = CatchAsyncErrors(async (req, res, next) => {
  const { name, description } = req.body;

  const todoNameExists = await ToDo.find({
    name: name,
  });

  if (!isEmpty(todoNameExists)) {
    return next(new ErrorHandler(`ToDo ${name} already exists`, 400));
  }

  if (isEmpty(description)) {
    return next(new ErrorHandler('Description cannot be empty.', 400));
  }
  await ToDo.create({
    name: name,
    description: description,
  });

  return res.status(200).json({
    success: true,
    message: `Todo ${name} created successfully.`,
  });
});

exports.getAllTodos = CatchAsyncErrors(async (req, res, next) => {
  const allToDos = await ToDo.find();

  return res.status(200).json({
    success: true,
    message: allToDos,
  });
});

exports.deleteTodo = CatchAsyncErrors(async (req, res, next) => {
  const todoId = req.params['todoId'];

  if (isEmpty(todoId)) {
    return next(new ErrorHandler('ToDo Id is required', 400));
  }

  const todoExists = await ToDo.findById(todoId);

  if (isEmpty(todoExists)) {
    return next(new ErrorHandler(`ToDo By Id ${todoId} not found`, 400));
  }

  await todoExists.deleteOne({ _id: todoId });

  return res.status(200).json({
    success: true,
    message: `ToDo By Id ${todoId} deleted successfully.`,
  });
});

exports.updateTodo = CatchAsyncErrors(async (req, res, next) => {
  const todoId = req.params['todoId'];
  const { name, description } = req.body;

  if (isEmpty(todoId)) {
    return next(new ErrorHandler('ToDo Id is required', 400));
  }

  const todoExists = await ToDo.findById(todoId);

  if (isEmpty(todoExists)) {
    return next(new ErrorHandler(`ToDo By Id ${todoId} not found`, 404));
  }

  todoExists.name = name;
  todoExists.description = description;

  await todoExists.save();

  return res.status(200).json({
    success: true,
    message: 'Todo Updated successfully',
  });
});

exports.getToDoById = CatchAsyncErrors(async (req, res, next) => {
  const todoId = req.params['todoId'];

  if (isEmpty(todoId)) {
    return res.status(400).json({
      success: false,
      message: 'ToDo Id is required',
    });
  }

  const todoExists = await ToDo.findById(todoId);

  if (isEmpty(todoExists)) {
    return next(new ErrorHandler(`ToDo By Id ${todoId} not found`, 404));
  }

  return res.status(200).json({
    success: true,
    message: todoExists,
  });
});
