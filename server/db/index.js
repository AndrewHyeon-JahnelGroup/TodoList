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

// const userSchema = mongoose.Schema({
//   id: {type:Number, unique: true},
//   name: String,
//   tasklists: [List]
// })
//
// const listSchema = mongoose.Schema({
//   id: {type: Number, unique: true},
//   tasks: [Task]
// })

const taskSchema = mongoose.Schema({
  name: String,
  description: String,
  completed: Boolean
})

// const User = mongoose.model('User', userSchema, 'users')
// const List = mongoose.model('List', listSchema, 'lists')
const Task = mongoose.model('Task', taskSchema, 'tasks')

const editTask = (data, cb) => {
  console.log(data, 'data in edittask')
  var name = data.taskName
  var desc = data.taskDescription
  Task.findOneAndUpdate({_id: data.id}, {$set:{name:name, description:desc}},(err, task) => {
    cb()
  })

}

const deleteTask = (id, cb) => {
  console.log(id, 'id in db')
  Task.findById(id.id, (err, task) => {
    if(err){
      console.log('deletetaskerrorindb')
    }else{
      if(task){
        task.remove(cb())
      }else{
        cb()
      }
    }
  })
  // Task.remove({_id: id}, (err, data) => {
  //   if(err){
  //     console.log('delete task error in db')
  //   }
  //   cb(data)
  // })
}

const getTasks = (cb) => {
  Task.find((err,data) => {
    if(err){
      console.log('cant get tasks')
    }
    cb(data)
  })
}

const saveUser = (user, cb) => {

}

const saveTask = (task, cb) => {
  const newTask = new Task({
    name: task.name,
    description: task.description,
    completed: false
  })

  newTask.save( (err) => {
    if(err){
      console.log(err, 'error saving task')
    }
  })
}

module.exports.deleteTask = deleteTask
module.exports.editTask = editTask
module.exports.getTasks = getTasks
module.exports.saveTask = saveTask
module.exports.db = db
