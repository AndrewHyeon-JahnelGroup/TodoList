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


class EditItemModal extends React.Component{
  constructor(props){
    super(props)

  }

  componentDidUpdate(){
    console.log('updated', this.props)
  }

  closeAndEdit(){
    props.editItem()
    this.props.closeModal()
  }

  render(){

    return(
      <div>
        <Dialog
          title='Edit todo item'
          modal={true}
          open={this.props.editModalIsOpen}
          onRequestClose={this.props.closeModal}
          contentStyle={customContentStyle}
          autoScrollBodyContent={true}
          contentClassName='dialog'
        >
          <DialogTitle>{"Edit Task"}</DialogTitle>
          <DialogContent>
            <TextField
              id="taskname"
              label={this.props.name}
              margin="normal"
            />
            <TextField
              id="taskdesc"
              label={this.props.desc}
              margin="normal"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.closeModal} color="primary">
              Close
            </Button>
            <Button onClick={this.editItem} color="primary">
              Edit Item
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

export default EditItemModal
