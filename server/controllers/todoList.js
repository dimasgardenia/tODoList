const db = require('../models/todo')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10)
const hash = bcrypt.hashSync("B4c0/\/", salt)
require('dotenv').config()


let viewTodo = (req,res)=>{
  // console.log(tokvery._id)
  db.find({author: req._id})
  .populate('author')
  .exec(function(err,result){
    if(!err){
      res.send(result)
    }else {
      res.send(err)
    }
  })
}

// let viewTodo = (req,res)=>{
//   if(req.headers.token == null){
//     res.send('login first')
//   }else{
//     db.find({author: req.headers._id},(err,result)=>{
//       if(!err){
//         res.send(result)
//       }else{
//         res.send(err)
//       }
//     })
//   }
// }

let createTodo = (req,res)=>{
  let tokvery = jwt.verify(req.headers.token, process.env.KEY)
  // console.log(tokvery)
  db.create({
    task: req.body.task,
    author: tokvery
  },function(err,result){
    if(!err){
      res.send(result)
    }
    else{
      res.send(err)
    }
  })
}

// let updateTodo = (req,res)=>{
//   // let tokvery = jwt.verify(req.headers.token, process.env.KEY)
//   console.log("masuk ipdat")
//   console.log(req._id);
//   db.update({_id:req.params._id},{
//     task: req.body.task,
//   },function(err,result){
//     if(!err){
//       // console.log(result);
//       res.send(result)
//     }
//     else{
//       res.send(err)
//     }
//   })
// }

let updateTodo = (req,res)=>{
  db.update({
    _id:req.params.id
  },{
    task : req.body.task
  },function(err,result){
    if(!err){
      res.send(result)
    }else{
      res.send(err)
    }
  })
}

let removeTodo=(req,res)=>{
  db.remove({_id:req.params.id},function(err,result){
    if(!err){
      res.send(result)
    }
    else{
      res.send(err)
    }
  })
}

module.exports = {
  viewTodo,
  createTodo,
  updateTodo,
  removeTodo
}
