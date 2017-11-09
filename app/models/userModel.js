'use strict';

const db = require('../../config/database.js');
const bcrypt = require('bcrypt');
const { body, check, validationResult } = require('express-validator/check');
const { matchedData } = require('express-validator/filter');

module.exports.registerValidate = [
 body('username', 'Username is required.').exists(),
 body('username', 'Username must be between 4 and 16 characters long.').isLength({ min: 4, max: 16 }),
 body('email', 'email must be valid.').isEmail(),
 body('password', 'Password is required.').exists(),
 body('password', 'Password must be at least 6 characters long.').isLength({ min: 6}),
 body('password').custom((value,{req}) => {
     if (value !== req.body.passwordMatch) {
         throw new Error("Your passwords don't match.");
     } else {
         return value;
     }
 })
];

module.exports.register = function(req,res){
  const errors = validationResult(req);
  if (!errors.isEmpty()){
    return res.status(422).json({ errors: errors.array() });
  }
  bcrypt.hash(req.body.password, 10, function(err, hash) {
    let sql = `INSERT INTO users set ?`;
    let post = {
      username : req.body.username,
      password : hash,
      email : req.body.email
    };
    let query = db.query(sql, post, (err, result)=>{
      if (err) throw err;

      res.json({msg : 'Registration successful, you can now log in.'});
    });
  });
}

module.exports.getCurrentUser = function(req,res,next){
  let sql = `SELECT id, username, email from users WHERE id=${req.session.passport.user.id}`;
  let query = db.query(sql, (err, result)=>{
    if (err) throw err;
    res.json(result[0]);
  });
}
