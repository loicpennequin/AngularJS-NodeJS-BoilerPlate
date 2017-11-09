'use strict';

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const db = require("../../../config/database.js");

module.exports = function(){
  passport.use('local', new LocalStrategy({
      usernameField: 'username',
      passwordField: 'password'
    },
    authentication
  ));

  passport.serializeUser(function(id, done) {
    done(null, id);
  });

  passport.deserializeUser(function(user, done) {
    let sql = `SELECT id, username, email
              FROM users
              WHERE id=${user.id}`;
    let query = db.query(sql, (err, result)=>{
      let user = result[0];
      done(err, {user: user});
    });
  });
};

let authentication = function(username, password, done){
  let sql = `SELECT * FROM users WHERE username = '${username}'`;
  let query = db.query(sql, (err, result)=>{
    if (err) return done(err) ;
    let user = result[0];

    if (!user) return done(null, false, { message: 'Incorrect username.' });

    bcrypt.compare(password, user.password, function(err, res) {
      if(res !== true) return done(null, false, { message: 'Incorrect password.' });
      else return done(null, user);
    });
  });
};
