const express = require('express')
const router = express.Router()
// const Items = require('../models/itemModel')

router.route('/')
  .get((req,res) => {
    res.send({1:12345})
  })
  .post((req,res) => {
    res.status(200).send()
  })


module.exports = router
