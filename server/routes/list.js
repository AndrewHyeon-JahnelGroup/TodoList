const express = require('express')
const router = express.Router()
const db = require('../db/index.js')
// const Items = require('../models/itemModel')

router.route('/')
  .get((req,res) => {
    db.getTasks( (data) => {
      res.send(data)
    })

  })
  .post((req,res) => {
    const task = {
      name: req.body.taskName,
      description: req.body.taskDescription
    }
    console.log(task, 'asfdd')
    db.saveTask(task)
    res.status(200).send()
  })


module.exports = router
