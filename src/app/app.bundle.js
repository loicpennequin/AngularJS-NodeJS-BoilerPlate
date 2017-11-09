'use strict';

//libs
var jquery = require('jquery');
global.$ = global.jQuery = jquery;
require('angular');
require('angular-messages');
require('angular-resource');
require('angular-animate');
require('angular-cookies');
require('@uirouter/angularjs');

//main module
require('./app.js');
require('./app.routes.js');
require('./app.config.js');

//modules
require('./modules/auth/auth.js');
require('./modules/auth/services/AuthFactory/AuthFactory.js')
require('./modules/auth/auth.templates.js');
require('./modules/auth/components/loginForm/loginForm.component.js')
require('./modules/auth/components/registerForm/registerForm.component.js')
