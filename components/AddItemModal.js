import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import $ from 'axios'

const customContentStyle = {
  backgroundColor: '#1a1aff',
  width: '60%',
  maxWidth: 'none',
  fontFamily: 'Roboto, sans-serif',
};

const customTitleStyle = {
  // backgroundColor:'#50B6C2',
  backgroundImage: '-webkit-gradient(linear, left top, left bottom, from(#3D8DB5),to(#5583B5))',
  backgroundImage: '-webkit-linear-gradient(top, #3D8DB5 0%,#5583B5 100%)',
  backgroundImage: '-o-linear-gradient(top, #3D8DB5 0%,#5583B5 100%)',
  backgroundImage: 'linear-gradient(to bottom, #3D8DB5 0%,#5583B5 100%)',

};

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    display: 'flex',
    flexWrap: 'nowrap',
    overflowX: 'auto',
    width: '100%',
    height: '100%'
  },
  titleStyle: {
    color: 'rgb(0, 188, 212)',
  },
};


class AddItemModal extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      modalIsOpen: false
    }
  }

  componentDidUpdate(){
    console.log('updated', this.props)
  }

  render(){

    return(
      <div>
        <Dialog
          title='Add new todo item'
          modal={true}
          open={this.props.modalIsOpen}
          onRequestClose={this.props.closeModal}
          contentStyle={customContentStyle}
          autoScrollBodyContent={true}
          contentClassName='dialog'
        >
          <DialogTitle>{"Add New Task"}</DialogTitle>
          <DialogContent>
            <TextField
              id="taskname"
              label="Task Name"
              margin="normal"
            />
            <TextField
              id="taskdesc"
              label="Task Description"
              margin="normal"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.closeModal} color="primary">
              Close
            </Button>
            <Button onClick={this.props.addItem} color="primary">
              Add Item
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

export default AddItemModal
