const { Schema, model } = require('mongoose')

const postSchema = new Schema({
  email: { type: String, required: true },
  lastname: { type: String, required: true },
  firstname: { type: String, required: true },
  post: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Posts = model("Post", postSchema)

module.exports = Posts