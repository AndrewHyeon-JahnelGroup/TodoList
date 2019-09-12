const express = require('express')
const router = express.Router()
const db = require('../db/index.js')

router.route('/exit')
  .post( (req,res) => {
    res.redirect('*')
  })

module.exports = router
