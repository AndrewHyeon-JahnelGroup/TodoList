import IndexMock from './index'


jest.mock('./index', function() {
  var tasks = []
  var lists = []
  var currentList = ''
  var currentTasks = []

  return class Index{

    addList(list){
      return lists.push(list)
    }

    deleteList(list){
      return lists.splice(lists.indexOf(list), 1)
    }

    changelist(list){
      currentList = list
      currentTasks = []
      var temp = []
      for(var i = 0; i < tasks.length; i++){
        if(tasks[i].user === list.user && tasks[i].list === list){
          currentTasks.push(tasks[i])
        }
      }
      return currentTasks
    }

    getCurrentList(){
      return currentList
    }

    getCurrentTasks(){
      return currentTasks
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

    getLists(){
      return lists
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
      index.deleteTask(task1)
      index.deleteTask(task2)
      expect(index.countTasks()).toBe(0)
      expect(index.countLists()).toBe(0)
    })
  })
  describe('correctly switches tasklists', () => {
    it('Correctly changes current tasklist', () => {
      var lists = [
        {user: 'user1', list:'list1'},
        {user: 'user1', list:'list2'},
        {user: 'user2', list:'list1'},
        {user: 'user2', list:'list2'},
      ]
      lists.forEach( (x) => {
        index.addList(x)
      })
      expect(index.getLists().length).toBe(lists.length)
      index.changelist({user:'user1', name:'list1'})
      expect(index.getCurrentList()).toStrictEqual({user: 'user1', name: 'list1'})
    })
    it('Correctly changes tasks in current tasks when list is changed', () => {
      var tasks = [
        {user: 'user1',list: 'list1',name: 'task1'},
        {user: 'user1',list: 'list1',name: 'task2'},
        {user: 'user1',list: 'list1',name: 'task3'},
        {user: 'user1',list: 'list2',name: 'task4'},
        {user: 'user1',list: 'list2',name: 'task5'},
        {user: 'user1',list: 'list2',name: 'task6'},
        {user: 'user2',list: 'list1',name: 'task7'},
        {user: 'user2',list: 'list1',name: 'task8'},
        {user: 'user2',list: 'list1',name: 'task10'},
        {user: 'user2',list: 'list2',name: 'task10'},
        {user: 'user2',list: 'list2',name: 'task11'},
        {user: 'user2',list: 'list2',name: 'task12'},
      ]
      var user1list1 = [tasks[0], tasks[1], tasks[2]]
      var user1list2 = [tasks[3], tasks[4], tasks[5]]
      var user2list1 = [tasks[6], tasks[7], tasks[8]]
      var user2list2 = [tasks[9], tasks[10], tasks[11]]
      tasks.forEach( (x) => {
        index.addTask(x)
      })
      expect(index.getTasks().length).toBe(tasks.length)
      expect( index.changelist({user: 'user1', list: 'list2'})).toBe(user1list2)



    })
  })

})
