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

router.route('/edit')
  .post((req,res) => {
    console.log(req.body, 'edit request body')
    db.editTask(req.body, (err) => {
      if(err){
        console.log('edit error')
      }else{

        res.status(200).send()
      }

    })
  })

  router.route('/edit/completed')
    .post((req,res) => {
      console.log(req.body, 'edit request body')
      db.editTaskComp(req.body, (err) => {
        if(err){
          console.log('edit error')
        }else{

          res.status(200).send()
        }

      })
    })

router.route('/delete')
  .post((req,res) => {
    console.log(req.body, 'delete route')
    db.deleteTask({id:req.body.id}, (err) => {
      if(err) {
        console.log('delete error in routess')
      }else{
        res.status(200).send()
      }
    })
  })

module.exports = router
