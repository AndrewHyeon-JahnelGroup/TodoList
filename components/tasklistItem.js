import React from 'react';
import EditItemModal from '../components/EditItemModal';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import Checkbox from '@material-ui/core/Checkbox';
import $ from 'axios'
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

    $.post('/list/edit/completed', {
      id:this.props.id,
      taskName: this.props.itemName,
      taskDescription: this.props.itemDescription,
      completed: current
    })
    .then( (res) => {
      console.log('toggleworks')
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
    var newDesc = document.getElementById('edittaskdesc').value

    var path = '/list/edit'
    $.post(path, {
      id: this.props.id,
      taskName: newName,
      taskDescription: newDesc
    })
    .then( (res) => {
      console.log('update works')
      this.props.fetch()
    })
    .catch( (err) => {
      console.log('update error')
    })
  }

  deleteItem() {
    $.post('/list/delete', {id:this.props.id})
    .then( (res) => {
      this.props.fetch()
      console.log('delete works')
    })
    .catch( (err) => {
      console.log('delete broken')
    })
  }

  openEditModal() {
    console.log('openclicked')
    this.setState({editModalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  closeEditModal() {
    console.log('closing')
    this.setState({editModalIsOpen: false});
  }

  render(){
    let style = {
      textDecorationLine: '',
      head: {
        fontSize:'20px'
      },
      item:{
        width:'100R%'
      }
    }
    if(this.state.strike){
      style.textDecorationLine = 'line-through'
    }
    console.log(style)
    return(
      <div id="listitem">
        <ListItem style={style.item}>
          <ListItemIcon>
            <p>{this.props.number}</p>
          </ListItemIcon>
          <ListItemText
            style={style}
            class='listitemtext'
            primary={this.props.itemName}
            secondary={this.props.itemDescription}
          />
          <ListItemIcon>
            <p>Completed</p>
            <Checkbox checked={this.state.strike} onClick={this.toggleComplete} />
          </ListItemIcon>
          <ListItemIcon>
            <IconButton onClick={this.openEditModal} aria-label="delete">
              <EditIcon fontSize="small" />
            </IconButton>
          </ListItemIcon>
          <ListItemIcon class="deletebutton">
            <IconButton onClick={this.deleteItem} aria-label="delete">
              <DeleteIcon fontSize="small" />
            </IconButton>
          </ListItemIcon>
        </ListItem>
        <Divider />
        <EditItemModal
          openModal={this.openEditModal}
          closeModal={this.closeEditModal}
          editModalIsOpen={this.state.editModalIsOpen}
          editItem={this.editItem}
          name={this.props.itemName}
          desc={this.props.itemDescription}
        />
      </div>
    )
  }

}

export default TaskListItem
