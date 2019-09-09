import React from 'react';

class ListItem extends React.Component{

  constructor(props){
    super(props)
  }

  componentDidMount(){
    console.log(this.props, 'sfdsf')
  }

  render(){
    return(
      <p>{this.props.item}</p>
    )
  }

}

export default ListItem
