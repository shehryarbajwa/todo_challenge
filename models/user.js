const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 5,
    unique: true
  },
  name: String,
  email: {
    type: String,
    required: true
  },
  passwordHash: {
      type: String,
      required: true
  },
  role: String,
  todos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Todos",
      default: []
    }
  ],
  subTasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubTasks",
      default: []
    }
  ]
});
userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

userSchema.plugin(uniqueValidator)
const User = mongoose.model("User", userSchema);

module.exports = User;