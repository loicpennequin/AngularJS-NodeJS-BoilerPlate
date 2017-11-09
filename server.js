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
      passport = require('passport'),
      bodyParser = require('body-parser'),
      cookieParser = require('cookie-parser'),
      bcrypt = require('bcrypt'),
      path = require('path'),
      app = express();

/*  =============================================================================
  Configure session
  ============================================================================= */
const session = require('express-session'),
    MySQLStore = require('express-mysql-session')(session),
    sessionStore = new MySQLStore({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    }),
    sessionParams = session({
        secret: process.env.SESSION_SECRET,
        name: 'sessionId',
        resave : false,
        store: sessionStore,
        saveUninitialized : false,
        cookie :  {httpOnly : false}
    });


/*  =============================================================================
    Configure passport
    ============================================================================= */
require(path.join(__dirname, '/app/middlewares/passport/auth.js'))();

/*  =============================================================================
    App config
    ============================================================================= */
app.disable('x-powered-by');
// app.use(express.static(path.join(__dirname, '/src/dist')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(sessionParams);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, '/src/assets')));
app.use(express.static(path.join(__dirname, '/src/build')));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
/*  =============================================================================
    Configure routes
    ============================================================================= */

    require(path.join(__dirname, '/app/routes/router.js'))(app);

    app.all('/*', function(req,res,next){
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
