import React from 'react';
import EditItemModal from '../components/EditItemModal'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import Checkbox from '@material-ui/core/Checkbox';
class TaskListItem extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      editModalIsOpen: false,
    }

    this.openEditModal = this.openEditModal.bind(this)
    this.closeEditModal = this.closeEditModal.bind(this)
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

  componentDidUpdate(){
    if(this.props.completed){
      console.log('complete check')
    }
    this.render()
  }


  render(){
    return(
      <div id="listitem">
        <ListItem>
        <ListItemIcon>
          <p>{this.props.number}</p>
        </ListItemIcon>
          <ListItemText
            primary={this.props.itemName}
            secondary={this.props.itemDescription}
          />
          <ListItemIcon>
            <p>Completed</p>
            <Checkbox  />
          </ListItemIcon>
          <ListItemIcon>
            <IconButton onClick={this.openEditModal} aria-label="delete">
              <EditIcon fontSize="small" />
            </IconButton>
          </ListItemIcon>
          <ListItemIcon>
            <IconButton onClick={this.props.deleteItem} aria-label="delete">
              <DeleteIcon fontSize="small" />
            </IconButton>
          </ListItemIcon>
        </ListItem>
        <Divider />
        <EditItemModal
          openModal={this.openEditModal}
          closeModal={this.closeEditModal}
          editModalIsOpen={this.state.editModalIsOpen}
          editItem={this.props.editItem}
          name={this.props.itemName}
          desc={this.props.itemDescription}
        />
      </div>
    )
  }

}

export default TaskListItem
