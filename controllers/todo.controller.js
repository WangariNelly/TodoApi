const { isEmpty } = require('lodash');
const ToDo = require('../models/todo.model');

exports.createTodo = async (req, res, next) => {
  try {
    const { name, description } = req.body;

    /**
     * check if we have data
     * validate that data is as required
     */
    if (isEmpty(name) && isEmpty(description)) {
      return res.status(400).json({
        success: false,
        message: 'Name and Description cannot be empty.',
      });
    }
    if (isEmpty(name)) {
      return res.status(400).json({
        success: false,
        message: 'Name cannot be empty.',
      });
    }

    const todoNameExists = await ToDo.find({
      name: name,
    });

    if (!isEmpty(todoNameExists)) {
      return res.status(400).json({
        success: false,
        message: `ToDo ${name} already exists`,
      });
    }

    if (isEmpty(description)) {
      return res.status(400).json({
        success: false,
        message: 'Description cannot be empty.',
      });
    }

    const todo = await ToDo.create({
      name: name,
      description: description,
    });

    return res.status(200).json({
      success: true,
      message: `Todo ${name} created successfully.`,
    });
  } catch (err) {
    return res.status(200).json({
      success: false,
      message: `Failed to create Todo ${name}`,
    });
  }
};

exports.getAllTodos = async (req, res, next) => {
  try {
    const allToDos = await ToDo.find();

    return res.status(200).json({
      success: true,
      message: allToDos,
    });
  } catch (err) {}
};

exports.deleteTodo = async (req, res, next) => {
  try {
    const todoId = req.params['todoId'];

    if (isEmpty(todoId)) {
      return res.status(400).json({
        success: false,
        message: 'ToDo Id is required',
      });
    }

    const todoExists = await ToDo.findById(todoId);

    if (isEmpty(todoExists)) {
      return res.status(404).json({
        success: false,
        message: `ToDo By Id ${todoId} not found`,
      });
    }

    await todoExists.deleteOne({ _id: todoId });

    return res.status(200).json({
      success: true,
      message: `ToDo By Id ${todoId} deleted successfully.`,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: `Failed to delete ToDo`,
    });
  }
};

exports.updateTodo = async (req, res, next) => {
  try {
    const todoId = req.params['todoId'];
    const { name, description } = req.body;

    if (isEmpty(todoId)) {
      return res.status(400).json({
        success: false,
        message: 'ToDo Id is required',
      });
    }

    const todoExists = await ToDo.findById(todoId);

    if (isEmpty(todoExists)) {
      return res.status(404).json({
        success: false,
        message: `ToDo By Id ${todoId} not found`,
      });
    }

    todoExists.name = name;
    todoExists.description = description;

    await todoExists.save();

    return res.status(200).json({
      success: true,
      message: 'Todo Updated successfully',
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Failed to update ToDo',
    });
  }
};
exports.getToDoById = async (req, res, next) => {
  try {
    const todoId = req.params['todoId'];

    if (isEmpty(todoId)) {
      return res.status(400).json({
        success: false,
        message: 'ToDo Id is required',
      });
    }

    const todoExists = await ToDo.findById(todoId);

    if (isEmpty(todoExists)) {
      return res.status(404).json({
        success: false,
        message: `ToDo By Id ${todoId} not found`,
      });
    }

    return res.status(200).json({
      success: true,
      message: todoExists,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: `Failed to retrieve ToDo`,
    });
  }
};
