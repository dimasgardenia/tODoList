const express = require('express')
const router = express.Router()
const todo = require('../controllers/todoList')
const loginhelp = require('../helpers/jwt')
const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10)
const hash = bcrypt.hashSync("B4c0/\/", salt)
require('dotenv').config()


// router.get('/',loginhelp.haslogin,todo.viewTodo)
router.get('/',loginhelp.haslogin,todo.viewTodo)
router.post('/',loginhelp.haslogin,todo.createTodo)
router.put('/:id',loginhelp.haslogin,todo.switchStatus)
// router.put('/:id',todo.updateTodo)
router.delete('/:id',loginhelp.haslogin,todo.removeTodo)

module.exports = router
