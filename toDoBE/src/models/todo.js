const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const todoSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
    minLength: 1,
  },

  completed: { type: Boolean, default: false },
  completedTime: { type: Date, default: null },
  creationTime: { type: Date, required: true },
});

todoSchema.set("toJSON", {
  transform(document, returnedObject) {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Todo", todoSchema);
