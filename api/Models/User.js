const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    min: 3,
    max: 50,
  },
  lastName: {
    type: String,
    required: true,
    min: 3,
    max: 50,
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 1024,
  },
  friends: {
    type: [Schema.Types.ObjectId],
    required: false,
  },
  posts: {
    type: [Schema.Types.ObjectId],
    required: false,
  },
});

module.exports = model("User", userSchema);
