import React from 'react'

const Loginform = ({ handleLogin, username, setUsername, password, setPassword }) => {
// we here need to remodel the entire loging steps to got to redux state/store it should be easieer than pass the entire shlong along

	return(
	<>
	<form onSubmit={handleLogin} >
     <div>
          name: <input id='name' value={username} onChange={({ target }) => setUsername(target.value)}/><br />
          password: <input id='password' type="password" value={password}  onChange={({ target }) => setPassword(target.value)}/>
        </div>
        <div>
          <button id='loginbutton' type="submit">Login</button>
        </div>
     </form>
	</>)
}

export default Loginform