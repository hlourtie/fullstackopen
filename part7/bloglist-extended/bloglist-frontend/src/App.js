import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Message from './components/Message'
import Noteform from './components/Noteform'
import Loginform from './components/Loginform'
import blogService from './services/blogs'
import loginService from './services/login'
import { setMessage } from './reducers/messageReducer'

const App = () => {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [className, setClassName] = useState(null)
  const [formVisible, setFormVisible] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs( blogs)}
    )
  }, [])
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('blogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
        const userres = await loginService.logIn({ username, password })
        window.localStorage.setItem(
          'blogappUser', JSON.stringify(userres)
        )
        blogService.setToken(userres.token)
        setUsername('')
        setPassword('')
        setUser(userres)
    }catch(e){
      setMessage('Wrong Credentials','error' , 5)
    }
  }
const handleCreation = async (body) => {
try{
  const newBlog = await blogService.create({ title:body.title, author:body.author, url:body.url, likes:0 })
  const tempblog = blogs.concat(newBlog)
  setBlogs(tempblog)
  setFormVisible(false)
}catch(e){
  setMessage(e.message , 5)
  setClassName('error')
  setTimeout(() => {
    setClassName(null)
  }, 5000)
  }
}

  const loginForm = () => {

  return (<div>
   <h2>Log into the application</h2>
   <Loginform handleLogin={handleLogin} username={username} setUsername={setUsername} password={password} setPassword={setPassword}/>
   </div> )}

  const blogsDisplay = () => {
    const hideWhenVisible = { display: formVisible ? 'none' : '' }
    const showWhenVisible = { display: formVisible ? '' : 'none' }
    const tempBlog = blogs.sort((a, b) => (a.likes > b.likes)? 1:-1)

  return( <> <h2>blogs</h2>
    <div>{user.name} logged in <button onClick={handleLogOut}>Logout</button></div><br />
    <div style={hideWhenVisible}><button id='new-for-button' onClick={() => setFormVisible(true)}>Create new Note</button></div>
    <div style={showWhenVisible}>
    <Noteform handleCreation={ handleCreation } />
    <button onClick={() => setFormVisible(false)}>cancel</button>
    </div>
    <br />
    <br />

    <div>{tempBlog.map(blog => <Blog key={blog.id} blog={blog} token={user.id}/>)}</div> </>)
    }

  const handleLogOut = (event) => {
    event.preventDefault()
    setUser(null)
    }
  return (
    <div>
      <Message message={message} className={className} />
      {user === null && loginForm()}
      {user !== null && blogsDisplay()}

    </div>
  )
}

export default App