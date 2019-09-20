import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import EditItemModal from '../components/EditItemModal';
import Divider from '@material-ui/core/Divider';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import Checkbox from '@material-ui/core/Checkbox';
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography'
import $ from 'axios'


const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

class TaskListItem extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      editModalIsOpen: false,
      strike: this.props.completed
    }
    this.editItem = this.editItem.bind(this)
    this.deleteItem = this.deleteItem.bind(this)
    this.openEditModal = this.openEditModal.bind(this)
    this.closeEditModal = this.closeEditModal.bind(this)
    this.toggleComplete = this.toggleComplete.bind(this)
  }

  toggleComplete(){
    var current = this.props.completed
    current = !current

    $.post('/user/edit/completed', {
      name:this.props.itemName,
      user: this.props.user,
      list: this.props.list,
      completed: current
    })
    .then( (res) => {
      this.setState({
        strike: !this.state.strike
      })
      this.props.fetch()
    })
    .catch( (err) => {
      console.log('error in toggle compelte')
    })
  }

  editItem() {
    var newName = document.getElementById('edittaskname').value

    var path = '/user/edit'
    $.post(path, {
      oldName: this.props.itemName,
      newName: newName,
      user: this.props.user,
      list: this.props.list
    })
    .then( (res) => {
      this.props.fetch()
    })
    .catch( (err) => {
      console.log('update error')
    })
  }

  deleteItem() {
    var data = {
      name: this.props.itemName,
      user: this.props.user,
      list: this.props.list
    }
    $.post('/user/task/delete', data)
    .then( (res) => {
      this.props.fetch()
    })
    .catch( (err) => {
      console.log('delete broken')
    })
  }

  openEditModal() {
    this.setState({editModalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  closeEditModal() {
    this.setState({editModalIsOpen: false});
  }

  render(){
    let style = {
      checked: {
        textDecorationLine: '',

      },
      head: {
        fontSize:'20px'
      },
      list:{
        width:'100%'
      },
      edit: {
        paddingRight: '20px',
        marginRight: '0px'
      },
      delete: {
        paddingRight: '5px',
        marginRight: '0px'
      },
    }
    if(this.state.strike){
      style.checked.textDecorationLine = 'line-through'

    }
    return(


        <TableRow key={this.props.number}>
          <TableCell align="right" component="th" scope="row">
              {this.props.number}
          </TableCell>

          <TableCell style={style.checked} align="left">
            <div style={style.checked}>
              {this.props.itemName}
            </div>
          </TableCell>

          <TableCell align="right">
            <Checkbox checked={this.state.strike} onClick={this.toggleComplete} />
          </TableCell>

          <TableCell style={style.edit} align="right">
            <IconButton onClick={this.openEditModal} aria-label="delete">
              <EditIcon fontSize="small" />
            </IconButton>
          </TableCell>

          <TableCell style={style.delete} align="right">
            <IconButton align="right" onClick={this.deleteItem} aria-label="delete">
              <DeleteIcon fontSize="small" />
            </IconButton>
          </TableCell>
        <Divider/>
        <EditItemModal
          openModal={this.openEditModal}
          closeModal={this.closeEditModal}
          editModalIsOpen={this.state.editModalIsOpen}
          editItem={this.editItem}
          name={this.props.itemName}
        />
        </TableRow>


    )
  }

}

export default TaskListItem
