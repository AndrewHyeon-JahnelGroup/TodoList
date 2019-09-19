import React from 'react'
import TaskListItem from './TaskListItem'
import ListItem from '@material-ui/core/ListItem'
import List from '@material-ui/core/List'
import ListSubheader from '@material-ui/core/ListSubheader';
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

class TaskList extends React.Component{
  constructor(props){
    super(props)
  }

  render(){

    var i = 0
    var style = {
      head: {
        textSize:'10px',
        color:'primary'
      },
      listitem: {
        minWidth: '650'
      },
      list:{
        WebkitBoxShadow: '5px 5px 5px 0px rgba(0,0,0,0.75)',
        MozBoxShadow: '5px 5px 5px 0px rgba(0,0,0,0.75)',
        boxShadow: '5px 5px 5px 0px rgba(0,0,0,0.75)'
      }
    }

    if(this.props.listname === ''){
      return <div></div>
    }
    return(
      <Paper style={style.list}>
        <Table style={style.listitem}>
          <TableHead>
            <TableRow>
              <TableCell align="right"><em>#</em></TableCell>
              <TableCell align="right">Task</TableCell>
              <TableCell align="right">Completed</TableCell>
              <TableCell align="right">Edit</TableCell>
              <TableCell align="right">Delete</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
          {(this.props.itemlist).map( (item) => {
            i++

            return(

                <TaskListItem
                  id={item._id}
                  style={style.listitem}
                  number={i}
                  user={item.user}
                  list={item.list}
                  itemName={item.name}
                  completed={item.completed}
                  editItem={this.props.editItem}
                  deleteItem={this.props.deleteItem}
                  fetch={this.props.fetch}
                  />

            )
          })}
          </TableBody>
        </Table>
      </Paper>

    )
  }
}

export default TaskList
