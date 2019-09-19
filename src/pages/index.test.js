import IndexMock from './index'


jest.mock('./index', function() {
  var tasks = []
  var lists = []

  return class Index{

    addList(list){
      return lists.push(list)
    }

    deleteList(list){
      return lists.splice(lists.indexOf(list), 1)
    }

    addTask(task){
      return tasks.push(task)
    }

    editTask(task, newtask){
      const idx = tasks.indexOf(task)
      tasks[idx].name = newtask.name
      return tasks
    }

    editTaskComp(task){
      const idx = tasks.indexOf(task)
      tasks[idx].complete = !tasks[idx].complete
      return tasks
    }

    deleteTask(task){
      return tasks.splice(tasks.indexOf(task), 1)
    }

    countLists(){
      return lists.length
    }

    countTasks(user, list){
      var count = 0
      for(var i = 0; i < tasks.length; i++){
        if(tasks[i].user == user && tasks[i].list == list){
          count++
        }
      }
      return count
    }

    getTasks(){
      return tasks
    }

    checkComp(task){
      for(var i = 0; i < tasks.length; i++){
        if(tasks[i].name == task.name && tasks[i].list == task.list && tasks[i].user == task.user){
          return tasks[i].complete
        }
      }
    }

  }
})

describe('ToDo', () => {
  var index = new IndexMock()
  describe('List methods', () => {
    it('adds 3 empty lists', () => {
      index.addList(1)
      index.addList(2)
      index.addList(3)
      expect(index.countLists()).toBe(3)
    })
    it('deletes the 3 previously added lists', () => {
      index.deleteList(1)
      index.deleteList(2)
      index.deleteList(3)
      expect(index.countLists()).toBe(0)
    })
  })
  describe('Task methods', () => {
    it('adds 3 empty tasks', () => {
      index.addTask(1)
      index.addTask(2)
      index.addTask(3)
      expect(index.countTasks()).toBe(3)
    })
    it('deletes the 3 previously added tasks', () => {
      index.deleteTask(1)
      index.deleteTask(2)
      index.deleteTask(3)
      expect(index.countTasks()).toBe(0)
    })
    it('edits task1 to task2', () => {
      var task1 = {
        name: 'task1',
        user: 'user',
        list: 'list'
      }
      var task2 = {
        name: 'task2',
        user: 'user',
        list: 'list'
      }
      var task3 = {
        name: 'task3',
        user: 'user',
        list: 'list'
      }
      index.addTask(task1)
      index.addTask(task3)
      index.editTask(task1, task2)
      expect(index.getTasks().length).toBe(2)
      expect(index.getTasks()[0].name).toBe('task2')
      index.deleteTask(task1)
      index.deleteTask(task2)
    })
    it('toggles complete', () => {
      var task1 = {
        name: 'task1',
        user: 'user',
        list: 'list',
        complete: false
      }
      var task2 = {
        name: 'task2',
        user: 'user',
        list: 'list',
        complete: false
      }
      index.addTask(task1)
      index.addTask(task2)
      index.editTaskComp(task1)
      expect(index.checkComp(task1)).toBe(true)
      index.editTaskComp(task1)
      expect(index.checkComp(task1)).toBe(false)
      expect(index.checkComp(task2)).toBe(false)

    })
  })
})
