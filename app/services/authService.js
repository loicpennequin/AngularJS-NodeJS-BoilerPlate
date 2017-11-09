'use strict';

const passport = require('passport');
const db = require('../../config/database.js');

module.exports.authenticate = function(req, res, next){
  passport.authenticate('local', function(err,user,info){
    let error = err || info;
    if (error) return res.status(401).json(error);
    if (user) {
      req.login(user, function(err){
        if (err) throw err;
        return res.json({id : user.id, username : user.username, email : user.email});
      })
    }
  })(req, res, next)
};

module.exports.isLoggedIn = function(req, res, next){
  if (!req.isAuthenticated()){
    res.status(401).json({loggedIn: false});
  }else{
    let sql = `SELECT id, username, email
              FROM users
              WHERE id="${req.session.passport.user.id}" `;
    let query = db.query(sql, (err, result)=>{
      if (err) throw err;
      res.json({loggedIn: true, user: result[0]})
    });
  }
};

module.exports.logout = function(req,res){
  req.logout();
  req.session.destroy();
  res.send("successfully logged out.")
};
