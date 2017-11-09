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

//modules
