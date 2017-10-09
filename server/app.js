const express =  require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
// mongoose.connect('mongodb://dimasgardenia:dimas1990@todolist-shard-00-00-ottox.mongodb.net:27017,todolist-shard-00-01-ottox.mongodb.net:27017,todolist-shard-00-02-ottox.mongodb.net:27017/test?ssl=true&replicaSet=todoList-shard-0&authSource=admin')
mongoose.connect('mongodb://localhost/todo')
const logger = require('morgan')
const cors = require('cors')
require('dotenv').config()
const todos = require('./routers/todoroute')
const login = require('./routers/loginroute')

app.use(cors())
app.use(logger('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/',login)
app.use('/api',todos)

app.listen(process.env.Port || 3000, ()=>{
  console.log('i am running at port 3000');
})
