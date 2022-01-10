import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { iniitiateUserList } from '../reducers/userListReducer'
import { Link } from 'react-router-dom'

const Userlist = ({ blogs }) => {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(iniitiateUserList())
	},[])
	const users = useSelector(state => state.userList)
const numberOfBlogs = (userid) => {
	const allUsersBlogs = blogs.filter(blog => blog.user.id === userid)
	return allUsersBlogs.length

}
	return (<><div><h2>Users</h2>
		<table><thead><tr><th>&nbsp;</th><th>blogs created</th></tr></thead><tbody>{users.map(user => (<tr key={user.id}><td><Link to={`/users/${user.id}`}>{user.name}</Link></td><td align='center'>{numberOfBlogs(user.id)}</td></tr>))}</tbody></table></div></>)

}

export default Userlist