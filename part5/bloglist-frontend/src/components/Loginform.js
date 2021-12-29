import React from 'react'

const Loginform = ({ handleLogin, username, setUsername, password, setPassword }) => {

	return(
	<>
	<form onSubmit={handleLogin} >
     <div>
          name: <input value={username} onChange={({ target }) => setUsername(target.value)}/><br />
          password: <input type="password" value={password}  onChange={({ target }) => setPassword(target.value)}/>
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
     </form>
	</>)
}

export default Loginform