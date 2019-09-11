import React from 'react'
import TaskListItem from './TaskListItem'
import ListItem from '@material-ui/core/ListItem'
import List from '@material-ui/core/List'
import ListSubheader from '@material-ui/core/ListSubheader';

class TaskList extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    console.log(this.props, 'intasklist')
    var i = 0
    return(
      <div>
        <List class='list' subheader={<ListSubheader>To Do List</ListSubheader>}>
          {(this.props.itemlist).map( (item) => {
            i++
            return(
              <ListItem button>
                <TaskListItem
                  id={item._id}
                  number={i}
                  itemName={item.name}
                  itemDescription={item.description}
                  completed={item.completed}
                  editItem={this.props.editItem}
                  deleteItem={this.props.deleteItem}
                  fetch={this.props.fetch}
                  />
              </ListItem>
            )
          })}
        </List>
      </div>
    )
  }
}

export default TaskList
