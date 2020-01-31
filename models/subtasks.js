const mongoose = require("mongoose");

const subTasksSchema = new mongoose.Schema({
  title: {
    type: String,
    maxlength: 100,
    required: true
  },
  description: {
    required: true,
    type: String
  },
  completed: Boolean,
  todos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Todos"
  }],
  user: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }]
});

subTasksSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

const subTasks = mongoose.model('Subtasks', subTasksSchema);

module.exports = subTasks;