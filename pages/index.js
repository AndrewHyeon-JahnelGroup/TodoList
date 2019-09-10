import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Nav from '../components/nav'
import AddItemModal from '../components/AddItemModal'
import TaskList from '../components/TaskList'
import { Button } from 'react-bootstrap'
import $ from 'jquery'
import fetch from 'isomorphic-fetch'

class Home extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      tasklists: [],
      currentlist: '',
      itemlist: [1,2,3,4,5,6],
      modalIsOpen: false,
    }

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.editItem = this.editItem.bind(this)
    this.deleteItem = this.deleteItem.bind(this)
  }

  openModal() {
    console.log('openclicked')
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
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
      console.log(res, 'post success')
    })
    .catch( (err) => {
      console.log(err, 'post failed')
    })
  }

  deleteItem(){
    console.log('delete working')
  }

  editItem(){
    console.log('edit working')
  }

  componentDidUpdate(){
    console.log('update')
    this.render()
  }

  componentDidMount(){

    fetch('http://localhost:3000/list', {method:'GET'})
      .then( (res) => {

        return res.json()
      }).then( (data) => {
        console.log('data', data)
        this.setState({
          itemlist: [
            {
              taskName: 'todo1',
              taskDescription: 'todo1 description',
              completed: false,
              tasklist: 'urgent tasks'
            },
            {
              taskName: 'todo2',
              taskDescription: 'todo2 description',
              completed: false,
              tasklist: 'urgent tasks'
            }

          ]
        })
      })
      .catch( (err) => {
        console.log(err)
      })

  }

  render(){
    return(
      <div>
        <div id="chooseList">

        </div>
        <div id="list">
          <TaskList
            editItem={this.editItem}
            deleteItem={this.deleteItem}
            itemlist={this.state.itemlist}
          />
        </div>
        <div id = "buttons">
          <Button variant="primary" onClick={this.openModal}>Add Item</Button>
          <AddItemModal
            openModal={this.openModal}
            closeModal={this.closeModal}
            modalIsOpen={this.state.modalIsOpen}
            addItem={this.addItem}
          />
        </div>
      </div>
    )
  }




}

export default Home
