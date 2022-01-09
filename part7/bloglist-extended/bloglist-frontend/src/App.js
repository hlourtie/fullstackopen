import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Message from './components/Message'
import Noteform from './components/Noteform'
import Loginform from './components/Loginform'
import { initiateUser, logoutUser } from './reducers/userReducer'
import { initBlog } from './reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'

const App = () => {
  const [formVisible, setFormVisible] = useState(false)

  const dispatch = useDispatch()

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
  }

const blogsDisplay = () => {
    const hideWhenVisible = { display: formVisible ? 'none' : '' }
    const showWhenVisible = { display: formVisible ? '' : 'none' }
    const tempBlog = blogs.sort((a, b) => (a.likes > b.likes)? 1:-1)

  return( <> <h2>blogs</h2>
    <div>{user.name} logged in <button onClick={handleLogOut}>Logout</button></div><br />
    <div style={hideWhenVisible}><button id='new-for-button' onClick={() => setFormVisible(true)}>Create new Note</button></div>
    <div style={showWhenVisible}>
    <Noteform />
    <button onClick={() => setFormVisible(false)}>cancel</button>
    </div>
    <br />
    <br />
    <div>{tempBlog.map(blog => <Blog key={blog.id} blog={blog} token={user.id} />)}</div> </>)
    }

  return (
    <div>
      <Message />
      {user === null && loginForm()}
      {user !== null && blogsDisplay()}

    </div>
  )
}

export default App