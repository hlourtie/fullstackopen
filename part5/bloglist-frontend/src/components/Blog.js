import React, {useState} from 'react'
import blogService from '../services/blogs'

const Blog = ({blog,token}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  const [likes, setLikes] = useState(blog.likes)
  const [visible, setVisible] = useState(false)

  console.log("blog user id", blog.user.id)
  console.log("token", token)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  const isUser = {display : (token === blog.user.id) ?'':'none' }
  const addLike = async (id) => {
    const newobject = await blogService.update(id,{likes:(likes+1)})
    setLikes(newobject.likes)
  }

  const deleteBlog = async (id) => {
    if(window.confirm("Are you sure you want to delete this person?")){
      await blogService.remove(id)
      window.location.reload()
    }
  }
  return(
  <>
  <table style={blogStyle}>
    <tbody>
    <tr><td>{blog.title} {blog.author}&nbsp;&nbsp;
    <button style={hideWhenVisible} onClick={()=>(setVisible(true))}>view</button>
    <button style={showWhenVisible} onClick={()=>(setVisible(false))}>hide</button>
    <button style={isUser} onClick={()=>(deleteBlog(blog.id))}>delete</button>
    </td></tr>
    <tr><td><div style={showWhenVisible}> {blog.url}</div></td></tr>
    <tr><td><div style={showWhenVisible}>likes {likes} <button onClick={()=>{addLike(blog.id)}}>Like</button></div></td></tr>
    </tbody>
  </table>
    
  </>
)}

export default Blog