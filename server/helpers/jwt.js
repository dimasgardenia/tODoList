const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10)
const hash = bcrypt.hashSync("B4c0/\/", salt)
require('dotenv').config()

let haslogin = (req,res,next)=>{
  console.log('masuk has login');
  // console.log('body : ', req.body);
  // console.log('body : ', req.headers.token);
  // console.log('body : ', req.);
  jwt.verify(req.headers.token, process.env.KEY,function(err,decoded){
    if(err){
      // console.log('>>>>>masuk haslogin');
      res.send("you must login first")
    }else{
      // console.log("ini req id",req._id);
      // req._userid = req.params._id
      // req.headers._id = req._id
      req._id = decoded._id
      next()
    }
  })
}

module.exports = {
  haslogin
}
