const jest = require('jest')

const lists = []
const tasks = []

const addList = jest.mock( (newList) => {
  list.push(newList)
})

const deleteList = jest.mock( (list) => {
  const idx = list.indexOf(list)
  lists.splice(idx, 1)
})

const addTask = jest.mock( (task) => {
  tasks.push(task)
})

const deleteTask = jest.mock( (task) => {
  const idx = tasks.indexOf(task)
  tasks.splice(idx, 1)
})

const editTask = jest.mock( (oldTask, newTask) => {
  const idx = tasks.indexOf(oldTask)
  tasks[idx] = newTask
})

const updateComp = jest.mock( (task) => {
  const idx = tasks.indexOf(oldTask)
  tasks[idx].complete = !tasks[idx].complete
})
