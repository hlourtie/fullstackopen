import React from 'react'

const Loginform = ({ handleLogin, username, setUsername, password, setPassword }) => {

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