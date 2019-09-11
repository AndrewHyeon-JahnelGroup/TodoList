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
      itemlist: [],
      modalIsOpen: false,
    }
    this.addItem = this.addItem.bind(this)
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.fetchData = this.fetchData.bind(this)
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
    return(
      <div class='todolist'>
        <div id="chooseList">

        </div>
        <div id="list">
          <TaskList
            itemlist={this.state.itemlist}
            fetch={this.fetchData}
          />
        </div>
        <div id = "buttons">
          <Button id="addbutton" variant="primary" onClick={this.openModal}>Add Item</Button>
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
    )
  }




}

export default Home
