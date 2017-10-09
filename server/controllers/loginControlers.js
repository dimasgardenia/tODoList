const modelUser = require('../models/users')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
var FB = require('fb');
require('dotenv').config()

const register = (req,res)=>{
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(`${req.body.password}`, salt)
  modelUser.create({
    username : req.body.username,
    password: hash,
    email: req.body.email
  },function(err,response){
    if(!err){
      res.send(response)
    }else{
      res.send(err)
    }
  })
}

const login = (req,res)=>{
  modelUser.findOne({
    username: req.body.username
  })
  .then(result=>{
    if(result == null){
      res.send("invalid username")
    }else{
      if(bcrypt.compareSync(req.body.password, result.password)){
        let token = jwt.sign({
          _id: result._id,
          username: result.username,
          email: result.email
        },process.env.KEY)
        res.send(token)
      }else {
        res.send('invalid password')
      }
    }
  })
  .catch(err=>{
    res.send(err)
  })
}

let getUser = (req,res)=>{
  modelUser.find({},function(err,result){
    if(!err){
      res.send(result)
    }
    else{
      res.send(err)
    }
  })
}

let fblogin = (req,res,next)=>{
  console.log('masuk fb login');
  FB.setAccessToken(req.headers.fbaccesstoken)
  next()
}

let fbaccespass = (req,res)=>{
  console.log('mask fb accesepass');
  FB.api('/me',{fields: ['id','name','email']},function(response){
    console.log(response)
    modelUser.find({
        fb_id: response.id
      })
      .then(dataUser => {
        if (dataUser.length == 0) {
          modelUser.create({
            fb_id: response.id,
            name: response.name,
            email: response.email
          })
          .then(userCreated => {
            console.log('ini hasil user create: ', userCreated);

            let token = jwt.sign({
              id: userCreated._id,
              fb_id: userCreated.fb_id,
              name: userCreated.name,
              email: userCreated.email
            }, 'satekambing')

            res.send({
              message: 'login success',
              token: token
            })
          })
          .catch(err => {
            res.send(err)
          })
        } else {
          console.log('ini hasil find user:', dataUser);
          let token = jwt.sign({
            id: dataUser[0]._id,
            fb_id: dataUser[0].fb_id,
            name: dataUser[0].name,
            email: dataUser[0].email
          }, 'dimas')

          res.send({
            message: 'login success',
            token: token
          })
        }
      })
      .catch(err => {
        res.send(err)
      })
  })
}



module.exports = {
  register,
  login,
  getUser,
  fblogin,
  fbaccespass
}
