var mongoose = require('mongoose')
const url = process.env.MONGODB_URL || 'mongodb://localhost/27017'

mongoose.connect(url)

var db = mongoose.connection

db.on('error', () => {
  console.log('mongoose connection error')
})

db.once('open', () => {
  console.log('mongoose connected succesfully')
})

const userSchema = mongoose.Schema({
  id: {type:Number, unique: true},
  name: String,
  tasklists:[{
    name: String,
    description: String,
    completed: Boolean
  }]
})
//
const listSchema = mongoose.Schema({
  user: String,
  name: String,
})

const taskSchema = mongoose.Schema({
  name: String,
  user: String,
  list: String,
  completed: Boolean
})

const User = mongoose.model('User', userSchema, 'users')
const List = mongoose.model('List', listSchema, 'lists')
const Task = mongoose.model('Task', taskSchema, 'tasks')

const editTask = (data, cb) => {

  const params = {
    name: data.oldName,
    user: data.user,
    list: data.list
  }

  Task.findOneAndUpdate(params, {$set:{name:data.newName}}, (err, task) => {

    cb()
  })

}

const editTaskComp = (data, cb) => {

  var completed = data.completed
  var info = {
    name: data.name,
    user: data.user,
    list: data.list
  }
  Task.findOneAndUpdate(info, {$set:{completed: completed}}, {upsert: false}, (err, task) => {
    if(err){
      cb(err)
    }else{
      cb()
    }

  })

}

const saveTask = (data, cb) => {

  const newTask = new Task({
    user: data.user,
    name: data.name,
    completed: false,
    list: data.list
  })

  newTask.save((err, res) => {
    if(err){
      console.log('save task failed')
    }else{
      console.log('savetask win')
    }
  })

}

const deleteTask = (data, cb) => {

  Task.find(data).remove(cb)
}

const getTasks = (info, cb) => {
  Task.find(info, (err, data) => {
    if(err){
      cb(err, null)
    }
    cb(null, data)
  })
}

const getTaskLists = (user, cb) => {
  List.find({user: user}, (err, res) => {
    if(err){
      cb(err, null)
    }else{

      cb(null, res)
    }
  })

}

const saveTaskList = (data, cb) => {
  const newList = new List({
    user: data.user,
    name: data.name,
    tasks: []
  })

  newList.save( (err) => {
    if(err){
      cb(err)
    }
  })
}

const deleteTaskList = (data, cb) => {

  Task.remove(data, (err)=> {
    if(err){
      cb(err)
    }else{
      List.remove({name: data.list, user:data.user}, (err) => {
        if(err){
          cb(err)
        }else{
          cb()

        }
      })
    }
  })
}


module.exports.deleteTaskList = deleteTaskList
module.exports.getTaskLists = getTaskLists
module.exports.deleteTask = deleteTask
module.exports.editTask = editTask
module.exports.editTaskComp = editTaskComp
module.exports.getTasks = getTasks
module.exports.saveTask = saveTask
module.exports.saveTaskList = saveTaskList
module.exports.db = db
