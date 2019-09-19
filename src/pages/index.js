import { makeStyles } from '@material-ui/core/styles';
import Container from "react-bootstrap/Container";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid"
import fetch from "isomorphic-fetch";
import Router from "next/router"
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Modal from '@material-ui/core/Modal'
import Dialog from '@material-ui/core/Dialog'
import Divider from "@material-ui/core/Divider"
import $ from 'axios';

import TaskList from '../components/TaskList'
import AddItemModal from '../components/AddItemModal'

class Index extends React.Component{

  static async getInitialProps({req, res}){
    if(req.user){
      console.log('here343')
      const username = req.user._json.name
      const baseURL = req ? `${req.protocol}://${req.get("Host")}` : "";
      const res = await fetch(`${baseURL}/user/tasklist/username/?username=${username}`, {method:'GET'})
      // console.log(await res.json(), '@@@@@@@@@@@@@@@2')
      return {tasklists: await res.json()}
    }else{
      res.redirect('/login')
    }

  }

  constructor(props){
    console.log(props, 'PROPSSSS')
    super(props)

    this.state = {
      tasklists: this.props.tasklists,
      listname: '',
      tasks: [],
      modalIsOpen: false,
      deleteOpen: false
    }
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.openDeleteModal = this.openDeleteModal.bind(this)
    this.closeDeleteModal = this.closeDeleteModal.bind(this)
    this.addList = this.addList.bind(this)
    this.deleteList = this.deleteList.bind(this)
    this.changeList = this.changeList.bind(this)
    this.addTask = this.addTask.bind(this)
    this.getTask = this.getTask.bind(this)

  }

  openModal() {
    console.log('openclicked')
    this.setState({modalIsOpen: true});
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  openDeleteModal() {
    if(this.state.tasks.length > 0){
      this.setState({deleteOpen: true})
    }else{
      this.deleteList()
    }
  }

  closeDeleteModal() {
    this.setState({deleteOpen: false})
  }

  addList(){
    console.log(this.props,  {
      user: this.props.user.displayName,
      name: document.getElementById('newlistname').value
    })
    $.post('/user/tasklist/add', {
      user: this.props.user.displayName,
      name: document.getElementById('newlistname').value
    })
    .then(() => {
      fetch(`/user/tasklist/username/?username=${this.props.user.displayName}`, {method:'GET'})
        .then( (res) => {
          return res.json()
        })
        .then( (data) => {

          this.setState({
            listname: document.getElementById('newlistname').value,
            tasklists: data
          })

          document.getElementById('newlistname').value = ''
        })

    })

  }

  deleteList(){
    const data = {
      list: this.state.listname,
    }
    $.post('/user/tasklist/delete', data)
      .then( () => {
        fetch(`/user/tasklist/username/?username=${this.props.user.displayName}`, {method:'GET'})
          .then( (res) => {
            return res.json()
          })
          .then( (data) => {

            this.setState({
              listname: '',
              tasklists: data,
              tasks: []
            })
            this.closeDeleteModal()
          })

      })
  }

  changeList(event){

    $.get('/user/task', {params: {list: event.target.value}})
    .then( (data) => {
      console.log(data, event.target.value, 'changelist res')
      this.setState({
        listname: event.target.value,
        tasks: data.data
      })
      return
    })
    .then( (data) => {
      console.log(this.state, 'changelist')
    })
    .catch( (err) => {
      throw err
    })
  }

  addTask(){

    $.post('/user/task/add', {
      user: this.props.user.displayName,
      list: this.state.listname,
      name: document.getElementById('newtaskname').value
    })
    .then( () => {
      this.getTask()
      document.getElementById('newtaskname').value = ''
    })


  }

  getTask(){
    console.log(this.state.listname, 'LISTNAME IN GETTASK')
    $.get('/user/task/get', {params: {list: this.state.listname}})
    .then( (data) => {
      console.log(data, this.state, 'client data log')
      this.setState({
        tasks: data.data
      })

    })
    .catch( (err) => {
      console.log(err, 'get task error')
      throw err
    })
  }

  render(){

    const styles = {
      title: {
        color: 'black'
      },
      toprow: {
        width: '750px'
      },
      listTitle: {
        textAlign: 'center'
      },
      root: {
        width: '100%',
      },
      inputMenu: {
        padding: '5px',
        paddingLeft: '20px',
        paddingRight: '20px',
        paddingBottom: '20px',
        marginRight: '50px',
        textAlign: 'center',
        border: '1px solid black',
        borderRadius: '10px'
      },
      top:{
        marginTop: '50px'
      },
      input:{
        marginTop: '20px',

      },
      select: {
        marginTop: '20px'
      },
      deleteModal: {

        position: 'absolute',
        width: 400,
        border: '2px solid #000',
      },
      form:{
        width: '100%'
      }
    }

    return(
      <Container style={styles.title}>
        <h2 style={styles.title} class="display-6 center-align">Forward Motion Project: Todo list</h2>
        <Divider />
          <div class="row" style={styles.top}>
            <div class="col-md-3" style={styles.inputMenu}>
              <FormControl style={styles.form} variant='filled'>
                <InputLabel htmlFor="age-label-placeholder">
                Current Task List
                </InputLabel>
                <Select
                  id="filled-select"
                  label="Select"
                  style={styles.select}
                  class="toprow"
                  onChange={this.changeList}
                  margin="normal"
                  variant="filled"
                  inputProps={{
                    name: 'Choose List',
                    id: 'age-native-simple',
                  }}
                >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                  {(this.state.tasklists).map ( (list) => {
                    return (  <MenuItem style={styles.menuItem} value={list.name}> {list.name} </MenuItem>)
                  })}
                </Select>
              </FormControl>


                <TextField variant="filled" id='newlistname' style={styles.input}/>
                <Button variant="primary" onClick={this.addList}>Add New List</Button>


                <TextField variant="filled" id='newtaskname' style={styles.input}/>
                <Button variant="primary" onClick={this.addTask}>Add New Task</Button>

                <Button style={styles.input} onClick={this.openDeleteModal}> Delete List </Button>
                <Container>
                <Dialog
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                  open={this.state.deleteOpen}
                  onRequestClose={this.closeDeleteModal}
                >
                  <div>
                    <h4 id="simple-modal-title">There are still tasks in this list.<br /> Do you still want to delete?</h4>
                    <Button onClick={this.deleteList}>Yes</Button>
                    <Button onClick={this.closeDeleteModal}>No</Button>

                  </div>
                </Dialog>
                </Container>
            </div>
            <div id="list" class="col-md-8">
              <div class="row">
                <div>
                  <h3>{this.state.listname === '' ? 'Choose a tasklist' : 'Tasks in ' + this.state.listname}</h3>
                </div>
              </div>
              <div class="row">

                <TaskList
                  itemlist={this.state.tasks}
                  fetch={this.getTask}
                  style={styles.root}
                />

              </div>
            </div>


        </div>
      </Container>
    )
  }
}


export default Index;
