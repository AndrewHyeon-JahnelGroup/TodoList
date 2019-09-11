import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Nav from '../components/nav'
import AddItemModal from '../components/AddItemModal'
import TaskList from '../components/TaskList'
import Login from '../components/Login'
import Button from '@material-ui/core/Button';
import $ from 'axios'
import fetch from 'isomorphic-fetch'

class Home extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      tasklists: [],
      currentlist: '',
      itemlist: [],
      modalIsOpen: false,
    }
    this.addItem = this.addItem.bind(this)
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.fetchData = this.fetchData.bind(this)
  }

  signIn(){
    $.post('/list/signin')
  }

  openModal() {
    console.log('openclicked')
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  fetchData(){
    fetch('http://localhost:3000/list', {method:'GET'})
      .then( (res) => {

        return res.json()
      }).then( (data) => {
        console.log('dataupdate', data)
        this.setState({
          itemlist: data,
        })
      })
      .catch( (err) => {
        console.log(err)
      })
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  addItem(){
    var taskName = document.getElementById('taskname').value
    var taskDesc = document.getElementById('taskdesc').value
    // var taskName = document.getElementById('taskname')
    console.log(taskName, taskDesc)
    $.post('/list', {
      taskName: taskName,
      taskDescription: taskDesc
    })
    .then( (res) => {
      fetch('http://localhost:3000/list', {method:'GET'})
        .then( (res) => {

          return res.json()
        }).then( (data) => {
          console.log('dataupdate', data)
          this.setState({
            itemlist: data,
            modalIsOpen: false
          })
        })
        .catch( (err) => {
          console.log(err)
        })

      console.log(res, 'post success')
    })
    .catch( (err) => {
      console.log(err, 'post failed')
    })
  }

  componentDidMount(){
    fetch('http://localhost:3000/list', {method:'GET'})
      .then( (res) => {

        return res.json()
      }).then( (data) => {
        console.log('data', data)
        this.setState({
          itemlist: data
        })
      })
      .catch( (err) => {
        console.log(err)
      })

  }

  render(){
    var style = {
      top:{

      },
      list:{
        width:'50%',
        margin: '100px',
        borderStyle:'solid',
        borderWidth:'3px',

      },
      button: {
        marginRight: '0px'
      },
      title:{
        textAlign:'center'
      }
    }
    return(
      <div class='top'>
        <div class='todolist' style={style.list}>
          <h3 class='title' style={style.title}>JG Forward Motion Project</h3>
          <div id="chooseList">
            <Link href='/login'>
              <Button onClick={this.signIn}>Sign In</Button>
            </Link>
          </div>

          <div id="list">
            <TaskList
              itemlist={this.state.itemlist}
              fetch={this.fetchData}
            />
          </div>
          <div id = "buttons">
            <Button
              id="addbutton"
              variant="contained"
              color="primary"
              onClick={this.openModal}
            >Add Item</Button>
            <AddItemModal
              id="addmodal"
              openModal={this.openModal}
              closeModal={this.closeModal}
              modalIsOpen={this.state.modalIsOpen}
              addItem={this.addItem}
              itemlist={this.state.itemlist}
            />
          </div>
        </div>
      </div>
    )
  }




}

export default Home
