const bodyParser = require("body-parser");
const express = require("express");
const db = require('../db')

const router = express.Router();

router.use(bodyParser.json());

// 6 - you are restricting access to some routes
const restrictAccess = (req, res, next) => {
  console.log('in restrict', req.isAuthenticated())
  if (req.isAuthenticated()){

    return next();
  }else{
    // return res.redirect('/login');

    return next()
  }
};


router.get("/tasklist/username", restrictAccess, (req, res) => {
  console.log(req.query, '@@@@@@@@@@@@@@@2')
  db.getTaskLists(req.query.username, (err, data) => {
    if(err){
      console.log('errorinrouter')
    }else{
      console.log(data, 'tasklist')
      res.send(data)
    }
  })
});

router.post("/tasklist/add", restrictAccess, (req, res) => {
  console.log(req.body, 'in post route')
  var info = {
    user: req.user.displayName,
    name: req.body.name,
  }
  db.saveTaskList( info , (err, res) => {
    if(err){
      console.log('error')
    }else{
      console.log('addlist works')
    }
  })
  res.send(200)
})

router.post('/tasklist/delete', restrictAccess, (req, res) => {
  console.log(req.body, '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')
  const data = {
    user: req.user.displayName,
    list: req.body.list
  }
  db.deleteTaskList(data, (err)=> {
    if(err){throw err}
    res.send(200)
  })
})

router.get('/task', restrictAccess, (req, res) => {
  console.log(req.query, 'in task get')
  const info = {
    user: req.user.displayName,
    list: req.query.list
  }
  db.getTasks(info, (err, data) => {
    if(err){
      console.log('get task error')
    }else{
      console.log(data, 'gotten tasks')
      res.send(data)
    }
  })
})

router.get('/task/get', restrictAccess, (req, res) => {
  console.log(req.query, 'in task get')
  const info = {
    user: req.user.displayName,
    list: req.query.list
  }
  db.getTasks(info, (err, data) => {
    if(err){
      console.log('get task error')
    }else{
      console.log(data, 'gotten tasks')
      res.send(data)
    }
  })
})

router.post("/task/add", restrictAccess, (req, res) => {
  var info = {
    user: req.user.displayName,
    name: req.body.name,
    list: req.body.list
  }
  console.log(info)
  db.saveTask( info)
  res.send(200)
})

router.post('/task/delete', restrictAccess, (req, res) => {
  db.deleteTask(req.body, (err) => {
    if(err){
      throw err
    }else{
      res.send(200)
    }
  })
})

router.post("/edit", restrictAccess, (req, res) => {
  console.log(req.body, 'EDIT!!!')
  db.editTask(req.body, (err) => {
    if(err){
      throw err
    }else{
      res.status(200).send()
    }
  })
})

router.post("/edit/completed", restrictAccess, (req, res) => {
  console.log(req.body, 'edit completed')
  db.editTaskComp(req.body, (err) => {
    if(err){
      console.log('edit error')
    }else{
      res.status(200).send()
    }

  })
})

router.post("/thoughts", (req, res) => {
  const { message } = req.body;
  const newThought = {
    _id: new Date().getTime(),
    message,
    author: "unknown"
  };
  thoughts.push(newThought);
  res.send({ message: "Thanks!" });
});

module.exports = router;
