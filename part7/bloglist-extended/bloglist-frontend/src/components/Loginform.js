import React from 'react'
import { loginUser } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'

const Loginform = () => {

  const dispatch  = useDispatch()
  const handleLogin = (event) => {
    event.preventDefault()
    const cred = { username: event.target.username.value, password: event.target.password.value }
    dispatch(loginUser(cred))
    event.target.username.value = ''
    event.target.password.value = ''
  }
	return(
	<>
	<form onSubmit={handleLogin} >
     <div>
          name: <input id='name' name='username' /><br />
          password: <input id='password' type="password" name='password'/>
        </div>
        <div>
          <button id='loginbutton' type="submit">Login</button>
        </div>
     </form>
	</>)
}

export default Loginform