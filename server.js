/*********************************************************************
******************************project name****************************
******************************author*********************************/

'use strict';

/*  =============================================================================
    Dependencies
    ============================================================================= */
require('dotenv').config({
    path : 'config/.env'
});

const express = require('express'),
      mysql = require('mysql'),
      bodyParser = require('body-parser'),
      cookieParser = require('cookie-parser'),
      app = express(),
      path = require('path');

/*  =============================================================================
    App config
    ============================================================================= */
app.disable('x-powered-by');
app.use(express.static(path.join(__dirname, '/src/assets')));
app.use(express.static(path.join(__dirname, '/src/build')));
// app.use(express.static(path.join(__dirname, '/src/dist')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

/*  =============================================================================
    Configure routes
    ============================================================================= */

app.get('/', (req,res,next)=>{
  res.sendFile('index.html', {root: path.join(__dirname, '/src') })
})


/*  =============================================================================
    Start server
    ============================================================================= */

const port = process.env.PORT;
app.listen(port, ()=>{
  console.log('===============================')
  console.log('serveur lancé sur le port ' + port)
  console.log('===============================')
});
