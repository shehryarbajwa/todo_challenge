const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    maxlength: 15,
    required: true
  },
  description: {
    required: true,
    type: String
  },
  completed: Boolean,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

//Convert ID object of mongoose to a string.
//Mongoose inbuilt transform method converts objects to string, or string to objects
//Delete id and v for passing easier looking UI to front-end

todoSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

const todoTasks = mongoose.model('Todos', todoSchema);

module.exports = todoTasks;