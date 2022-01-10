import React from 'react'

const User = ({ userPassed, blogPassed }) => {
	console.log(userPassed)
	console.log(blogPassed)
	return (<>
	<h2>{userPassed.name}</h2>
	<h3>Added Blogs</h3>
	<ul>{blogPassed.map(blog => (<li key={blog.id}> {blog.title}</li>))}</ul>

	</>)
}

export default User