const mongoose = require('mongoose')
const Schema = mongoose.Schema

let TodoSchema = new Schema({
  task : String,
  status: {
    type: String,
    default: "Undone"
  },
  author: {type: Schema.Types.ObjectId, ref: "Users"}
})

var Todo = mongoose.model('Todo', TodoSchema)

module.exports = Todo
