import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Message from './components/Message'
import Noteform from './components/Noteform'
import Loginform from './components/Loginform'
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
  const [formVisible, setFormVisible] = useState(false)

  useEffect(() => {
     blogService.getAll().then(blogs =>{
      setBlogs( blogs)}
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
  setFormVisible(false)
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
// const addLike = async (id,likes) => {
//   await blogService.update(id,{likes:(likes+1)})
//   const index = blogs.findIndex(blog => blog.id === id)
//   blogs[index].likes = likes + 1
//   const newBlogs = blogs
//   setBlogs(newBlogs)
// }

  const loginForm = () => {
    
  return (<div>
   <h2>Log into the application</h2>
   <Loginform handleLogin={handleLogin} username={username} setUsername={setUsername} password={password} setPassword={setPassword}/>
   </div> )}

  const blogsDisplay = () =>{
    const hideWhenVisible = { display: formVisible ? 'none' : '' }
    const showWhenVisible = { display: formVisible ? '' : 'none' }
    const tempBlog = blogs.sort((a, b) => (a.likes > b.likes)? 1:-1);

  return( <> <h2>blogs</h2> 
    <div>{user.name} logged in <button onClick={handleLogOut}>Logout</button></div><br />
    <div style={hideWhenVisible}><button onClick={() => setFormVisible(true)}>Create new Note</button></div>
    <div style={showWhenVisible}>
    <Noteform handleCreation={handleCreation} title={title} setTitle={setTitle} author={author} setAuthor={setAuthor} url={url} setUrl={setUrl} />
    <button onClick={() => setFormVisible(false)}>cancel</button>
    </div>
    <br />
    <br />

    <div>{tempBlog.map(blog =><Blog key={blog.id} blog={blog} token={user.id}/>)}</div> </>)
    }

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