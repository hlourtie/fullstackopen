import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Message from './components/Message'
import Blogform from './components/Blogform'
import Loginform from './components/Loginform'
import Userlist from './components/Userlist'
import User from './components/User'
import Menu from './components/Menu'
import { initiateUser, logoutUser } from './reducers/userReducer'
import { initBlog } from './reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route, useHistory, useRouteMatch } from 'react-router-dom'
import { iniitiateUserList } from './reducers/userListReducer'

const App = () => {
  const [formVisible, setFormVisible] = useState(false)

  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
		dispatch(iniitiateUserList())
	},[])

	const users = useSelector(state => state.userList)

  useEffect(() => {
    dispatch(initBlog())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('blogappUser')
    if (loggedUserJSON !== 'null') {
      const userlogged = JSON.parse(loggedUserJSON)
      dispatch(initiateUser(userlogged))
    }
  }, [ dispatch ])

  const user = useSelector(state => state.user)
  const blogs = useSelector(state => state.blog)
  const loginForm = () => {
  return (<div>
   <h2>Log into the application</h2>
   <Loginform />
   </div> )}


const handleLogOut = (event) => {
  event.preventDefault()

  dispatch(logoutUser())
  history.push('/')
  }
const userId = useRouteMatch('/users/:id')
const userSelected = userId ? users.find(userElem => userElem.id === userId.params.id) : null
const blogPassed = userId? blogs.filter(blog => blog.user.id === userId.params.id ) : null
const blogsDisplay = () => {
    const hideWhenVisible = { display: formVisible ? 'none' : '' }
    const showWhenVisible = { display: formVisible ? '' : 'none' }
    const tempBlog = blogs.sort((a, b) => (a.likes > b.likes)? 1:-1)

  return( <>
    <div><Menu /> {user.name} logged in <button onClick={handleLogOut}>Logout</button></div><br />
    <Message />
    <Switch>
    <Route path='/users/:id'>
      <User userPassed={userSelected} blogPassed={blogPassed}/>
    </Route>
    <Route path='/users'>
      <Userlist blogs={blogs} />
    </Route>
    <Route path='/'>
    <h2>blogs</h2>
    <div style={hideWhenVisible}><button id='new-for-button' onClick={() => setFormVisible(true)}>Create new Blog</button></div>
    <div style={showWhenVisible}>
    <Blogform />
    <button onClick={() => setFormVisible(false)}>cancel</button>
    </div>
    <br />
    <br />
    <div>{tempBlog.map(blog => <Blog key={blog.id} blog={blog} token={user.id} />)}</div> </Route>
    </Switch></>)
    }

  return (
    <div>
      {user === null && loginForm()}
      {user !== null && blogsDisplay()}
    </div>
  )
}

export default App