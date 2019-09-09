import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Nav from '../components/nav'
import ListItem from '../components/ListItem'
import AddItemModal from '../components/AddItemModal'
import { Button } from 'react-bootstrap'
import $ from 'jquery'
import fetch from 'isomorphic-fetch'
class Home extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      itemlist: [1,2,3,4,5,6],
      modalIsOpen: false,
      editModalIsOpen: false
    }

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
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

  componentDidUpdate(){
    this.render()
  }

  componentDidMount(){

    fetch('http://localhost:3000/list', {method:'GET'})
      .then( (res) => {

        return res.json()
      }).then( (data) => {
        this.setState({
          itemlist: ['asfdsf', '1234554','grq3tr']
        })
      })
      .catch( (err) => {
        console.log(err)
      })

  }

  render(){
    return(
      <div>
        <div id="list">
          <h3>todo list</h3>
              {this.state.itemlist.map( (item) =>   (
                <ListItem item={item} />
              ))}
        </div>
        <div id = "buttons">
          <Button variant="primary" onClick={this.openModal}>Add Item</Button>
          <AddItemModal openModal={this.openModal} closeModal={this.closeModal} modalIsOpen={this.state.modalIsOpen} />
        </div>
      </div>
    )
  }




}

export default Home
