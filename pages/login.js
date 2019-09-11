import React from 'react'
import SignIn from '../components/Login'

class Login extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    return(
      <div>
        <SignIn />
      </div>
    )
  }
}

export default Login
