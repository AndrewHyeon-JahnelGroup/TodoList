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
import Link from "@material-ui/core/Link"
import Fab from "@material-ui/core/Fab"
import $ from 'axios';

import NavBar from '../components/Navbar'
import TaskList from '../components/TaskList'
import AddItemModal from '../components/AddItemModal'

import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

class Index extends React.Component{

  static async getInitialProps({req, res}){
    if(req.user){

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
    super(props)

    this.state = {
      tasklists: this.props.tasklists,
      listname: '',
      tasks: [],
      modalIsOpen: false,
      deleteOpen: false,
      inputError: false,
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
    this.ifList = this.ifList.bind(this)

  }

  openModal() {
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
    var name = document.getElementById('newlistname').value
    if(name.length === 0){
      alert('Error: New list needs a name')
      return
    }
    var listnames = []
    for(var i = 0; i < this.state.tasklists.length; i++){
      if(this.state.tasklists[i].name === name){
        alert('Error: You tried to add a duplicate list')
        return
      }
    }
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

  addTask(event){
    var name = document.getElementById('newtaskname').value
    if(name.length === 0){
      alert('Error: You tried to add an empty task')
      return
    }
    for(var i = 0; i < this.state.tasks.length; i++){
      if(this.state.tasks[i].name === name){
        alert('Error: You tried to add a duplicate task')
        return
      }
    }

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
    $.get('/user/task/get', {params: {list: this.state.listname}})
    .then( (data) => {
      this.setState({
        tasks: data.data
      })

    })
    .catch( (err) => {
      console.log(err, 'get task error')
      throw err
    })
  }

  ifList(){
    const styles = {
      input:{
        marginTop: '20px',
        width: '100%',
        background: '#D5CAFA'
      },
      add:{
        width: '100%',
      },
      delete:{
        marginTop: '20px',
        width: '100%',

      }
    }
    if(this.state.listname === ''){
      return(<div />)
    }
    return (
      <div>
      <TextField id='newtaskname' placeholder="New Task Name" style={styles.input}/>
      <Button color="primary" variant="contained" onClick={this.addTask} style={styles.add}>Add New Task</Button>
      <Button color="primary" variant="contained" style={styles.delete} onClick={this.openDeleteModal}> Delete List </Button>
      </div>
    )
  }

  render(){

    const styles = {
      title: {
        color: 'black',
        fontFamily: 'Palatino,Palatino Linotype,Palatino LT STD,Book Antiqua,Georgia,serif'
      },
      toprow: {
        width: '750px'
      },
      listTitle: {
        textAlign: 'center',
        fontFamily: 'Palatino,Palatino Linotype,Palatino LT STD,Book Antiqua,Georgia,serif'

      },
      root: {
        width: '100%',
      },
      inputMenu: {
        background: '#9170BA',
        padding: '5px',
        paddingLeft: '20px',
        paddingRight: '20px',
        paddingBottom: '20px',
        marginTop: '50px',
        marginRight: '50px',
        textAlign: 'center',
        border: '1px solid black',
        borderRadius: '10px',
        maxHeight: '350px',
        WebkitBoxShadow: '5px 5px 5px 0px rgba(0,0,0,0.75)',
        MozBoxShadow: '5px 5px 5px 0px rgba(0,0,0,0.75)',
        boxShadow: '5px 5px 5px 0px rgba(0,0,0,0.75)'
      },
      top:{
        marginTop: '50px'
      },
      input:{
        marginTop: '20px',
        background: '#D5CAFA',
        width: '100%'

      },
      select: {
        height: '80%',
        marginBottom:'20px',
        background: '#D5CAFA'
      },
      deleteModal: {
        position: 'absolute',
        width: 400,
        border: '2px solid #000',
      },
      form:{
        width: '100%',
        marginTop: '20px'
      },
      logout:{
        color: 'white',
        height: '80%'

      },
      add:{
        width: '100%',
      },
      loButt: {
        WebkitBoxShadow: '5px 5px 5px 0px rgba(0,0,0,0.75)',
        MozBoxShadow: '5px 5px 5px 0px rgba(0,0,0,0.75)',
        boxShadow: '5px 5px 5px 0px rgba(0,0,0,0.75)',
        padding: '0px 10px 0px 10px'
      },
      div: {
        width: '100%'
      }
    }

    return(
      <Container style={styles.title}>
        <div class='row'>
          <div class="col-md-10">
            <h2 style={styles.title} class="display-6 center-align">Forward Motion Project: Todo list</h2>
            <Divider />
          </div>
          <div class="col-md-2">
            <Fab style={styles.loButt} color="primary" variant="contained">
              <Link style={styles.logout} href="/logout">Log Out</Link>
            </Fab>
          </div>
        </div>
        <Divider />
        <div class="row" style={styles.top}>
          <div class="col-md-3" style={styles.inputMenu}>
            <FormControl style={styles.form} variant='filled'>
              <InputLabel htmlFor="age-label-placeholder">
                Choose a Tasklist
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
                  name: 'choose list',
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


            <TextField id='newlistname' placeholder="New List Name" style={styles.input}/>
            <Button style={styles.add} color="primary" variant="contained" onClick={this.addList}>Add New List</Button>

              {this.ifList()}
            <Container>
              <Dialog
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
                TransitionComponent={Transition}
                open={this.state.deleteOpen}
                onRequestClose={this.closeDeleteModal}
              >
              <DialogTitle id="alert-dialog-slide-title">{"There are still tasks in this list."}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                  This will delete all tasks in the list. Are you sure you want to continue?
                </DialogContentText>
              </DialogContent>
              <Divider/>
              <DialogActions>
                <Button onClick={this.deleteList} color="primary">
                  Yes
                </Button>
                <Button onClick={this.closeDeleteModal} color="secondary">
                  No
                </Button>
              </DialogActions>

            </Dialog>
          </Container>
        </div>
        <div id="list" class="col-md-8">
          <div class="row">
            <div>
              <h3>{this.state.listname === '' ? 'Choose a tasklist' : 'Tasks in ' + this.state.listname}</h3>
            </div>
          </div>

          <TaskList
            listname={this.state.listname}
            itemlist={this.state.tasks}
            fetch={this.getTask}
            style={styles.root}
          />
        </div>
      </div>
    </Container>
  )}
}


export default Index;
