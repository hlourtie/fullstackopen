import React from 'react'
import { Link } from 'react-router-dom'

const Menu = () => {
	return (<>
	<Link to='/'>blogs</Link> &nbsp;&nbsp;&nbsp;
	<Link to='/users'>users</Link> &nbsp;&nbsp;&nbsp;
	</>)
}

export default Menu