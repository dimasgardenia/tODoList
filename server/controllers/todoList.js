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
    status: false,
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

let switchStatus = (req,res)=>{
  console.log('masuk ke switch')
  console.log('ini req params', req.params.id)
  db.findOne({
    _id:req.params.id
  },function(err,result){
    if(!err){
      console.log("masuk")
      if(result.status == false){
        db.update({
          _id: result._id}, {
          status: true,
          task: result.task,
          author: result.author
        }, function (err, result){
          if (!err) {
            res.send(result)
          } else {
            res.send(err)
          }
        })
      } else {
        db.update({
          _id: result._id,
          status: false,
          task: result.task,
          author: result.author
        })
      }
    }else{
      res.send(err)
    }
  })
}
// let blogEdit = (req,res)=>{
//   Blog.updateOne({_id:req.params.id},{
//     author : req.body.author,
//     title : req.body.title,
//     content: req.body.content
//   },function(err,result){
//     if(!err){
//       res.send(result)
//     }else{
//       res.send(err)
//     }
//   })
// }


let removeTodo=(req,res)=>{
  db.remove({_id:req.params._id},function(err,result){
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
  switchStatus,
  removeTodo
}
