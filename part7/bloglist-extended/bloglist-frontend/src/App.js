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
import { Switch, Route, useHistory, useRouteMatch, Link } from 'react-router-dom'
import { iniitiateUserList } from './reducers/userListReducer'
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Button,
} from '@material-ui/core'

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
const blogIDroute = useRouteMatch('/blog/:id')
const blogSelected = blogIDroute? blogs.filter(blog => blog.id === blogIDroute.params.id)[0] : null
const blogsDisplay = () => {
    const hideWhenVisible = { display: formVisible ? 'none' : '' }
    const showWhenVisible = { display: formVisible ? '' : 'none' }
    const tempBlog = blogs.sort((a, b) => (a.likes > b.likes)? 1:-1)

  return( <>
    <div><Menu /> {user.name} logged in <Button variant='contained' onClick={handleLogOut}>Logout</Button></div><br />
    <Message />
    <Switch>
    <Route path='/users/:id'>
      <User userPassed={userSelected} blogPassed={blogPassed}/>
    </Route>
    <Route path='/users'>
      <Userlist blogs={blogs} />
    </Route>
    <Route path='/blog/:id'>
    <h2>Blog</h2>
    <Blog blog={blogSelected} />
    </Route>
    <Route path='/'>
    <h2>Blog app</h2>
    <div style={hideWhenVisible}><Button variant='contained' id='new-for-button' onClick={() => setFormVisible(true)}>Create new Blog</Button></div>
    <div style={showWhenVisible}>
    <Blogform />
    <button onClick={() => setFormVisible(false)}>cancel</button>
    </div>
    <br />
    <br />
    <div><TableContainer component={Paper}><Table><TableBody>{tempBlog.map(blog => <TableRow key={blog.id}><TableCell  ><Link to={`/blog/${blog.id}`} key={blog.id} >{blog.title}</Link></TableCell></TableRow>)}</TableBody></Table></TableContainer></div> </Route>
    </Switch></>)
    }

  return (
    <Container>
    <div>
      {user === null && loginForm()}
      {user !== null && blogsDisplay()}
    </div>
    </Container>
  )
}

export default App