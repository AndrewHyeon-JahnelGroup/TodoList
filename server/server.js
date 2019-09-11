const express = require('express')
const next = require('next')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
const PORT = process.env.PORT || 3000
const dev = process.env.NODE_DEV !== 'production' //true false
const app = next({ dev })
const handle = app.getRequestHandler() //part of next config
const mongoose = require('mongoose')
const routes = require('./routes')
const db = require('./db/index.js')
// const db = mongoose.connect('___________PUT MONGOURLHERE__________')

app.prepare()
  .then(() => {
    const app = express()
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cookieParser())
    app.use(passport.initialize())
    app.use(passport.session())
    app.use('/list', routes.list)
    app.get('*', (req,res) => {
      return handle(req,res)
    })

    app.listen(PORT, err => {
        if (err) throw err;
        console.log(`ready at http://localhost:${PORT}`)
    })

  })
  .catch((ex)=>{
    console.error(ex.stack)
    process.exit(1)
  })

module.exports = app
