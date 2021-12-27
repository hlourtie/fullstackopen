import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Message from './components/Message'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [className, setClassName] = useState(null)
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  useEffect(() => {
     blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try { 
        const userres = await loginService.logIn({username, password})
        blogService.setToken(userres.token)
        setUsername('')
        setPassword('')
        setUser(userres)
    }catch(e){
      setMessage('Wrong Credentials')
      setClassName('error')
      setTimeout(()=>{
        setMessage(null)
        setClassName(null)
      }, 5000)
    }
  }
  
const handleCreation = async (event) =>{
event.preventDefault()
try{
  const newBlog = await blogService.create({title:title, author:author, url:url, likes:0})
  const tempblog = blogs.concat(newBlog)
  setBlogs(tempblog)
  setTitle('')
  setAuthor('')
  setUrl('')
}catch(e){
  setMessage(e.message)
  setClassName('error')
  setTimeout(()=>{
    setMessage(null)
    setClassName(null)
  }, 5000)
  }
}

  const loginForm = () => (<div>
   <h2>Log into the application</h2>
     <form onSubmit={handleLogin} >
     <div>
          name: <input value={username} onChange={({ target }) => setUsername(target.value)}/><br />
          password: <input type="password" value={password}  onChange={({ target }) => setPassword(target.value)}/>
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
     </form>
   </div> )

  const blogsDisplay = () =>( <> <h2>blogs</h2> 
  <div>{user.name} logged in <button onClick={handleLogOut}>Logout</button></div>
  <div>
    <form onSubmit={handleCreation}>
    <br />
      <br />
      <div>
      title: <input value={title}  onChange={({ target }) => setTitle(target.value)}/> <br />
      author: <input  value={author}  onChange={({ target }) => setAuthor(target.value)} /> <br />
      url: <input value={url}  onChange={({ target }) => setUrl(target.value)} /> <br />
      </div>
      <br />
      <br />
      <div>
      <button type="submit">Create</button>
      </div>
    </form>
  </div>
  <div><p>{blogs.map(blog =>
    <Blog key={blog.id} blog={blog} />)
  }</p></div> </>)

  const handleLogOut = (event) =>{
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