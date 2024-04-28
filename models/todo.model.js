const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
      },
    },
    timestamps: true,
  },
);

const ToDo = mongoose.model('ToDo', todoSchema);

module.exports = ToDo;
