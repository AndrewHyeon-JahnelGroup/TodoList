import React from 'react';
import li from '@material-ui/core/ListItem'
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

class ListItem extends React.Component{

  constructor(props){
    super(props)
  }

  componentDidMount(){
    console.log(this.props, 'sfdsf')
  }

  render(){
    return(
      <div id="listitem">
        <p>{this.props.item}
        <IconButton onClick={this.props.deleteItem} aria-label="delete">
          <DeleteIcon fontSize="small" />
        </IconButton>
        </p>
      </div>
    )
  }

}

export default ListItem
