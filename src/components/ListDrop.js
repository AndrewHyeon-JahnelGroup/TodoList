import React from 'react'
import $ from 'axios'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

class ListDrop extends React.Component{
  constructor(props){
    super(props)

  }

  render(){
    return (
      <Select onClick={this.props.changeList}>
        {(this.props.list).map( (list) => {
          return(
            <MenuItem value={list.name} />
          )
        })}
      </Select>
    )
  }
}

export default ListDrop
