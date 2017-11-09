'use strict';

const express = require('express');

/*  =============================================================================
    Models & Services
    ============================================================================= */
const userModel = require('../models/userModel.js');

const authService = require('../services/authService.js')

/*  =============================================================================
  Rroutes
    ============================================================================= */

module.exports = function(app){
  app.post('/api/auth/login', authService.authenticate);
  app.get('/api/auth/isloggedin', authService.isLoggedIn);
  app.get('/api/auth/logout', authService.logout);

  app.post('/api/users/add', userModel.registerValidate, userModel.register);
  app.get('/api/users/me', userModel.getCurrentUser);

};
