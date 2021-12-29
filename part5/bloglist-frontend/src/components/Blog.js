import React, { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({ blog,token }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  Blog.propTypes = {
    token: PropTypes.string.isRequired
  }
  const [likes, setLikes] = useState(blog.likes)
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  const isUser = { display : (token === blog.user.id) ?'':'none' }
  const addLike = async (id) => {
    const newobject = await blogService.update(id, { likes:(likes+1) } )
    setLikes(newobject.likes)
  }

  const deleteBlog = async (id) => {
    if(window.confirm('Are you sure you want to delete this person?')){
      await blogService.remove(id)
      window.location.reload()
    }
  }
  return(
    <><div className='testBlogClass'>
      <table style={blogStyle}>
        <tbody>
          <tr><td>{blog.title} {blog.author}&nbsp;&nbsp;
            <button style={hideWhenVisible} className='viewButton' onClick={() => (setVisible(true))}>view</button>
            <button style={showWhenVisible} onClick={() => (setVisible(false))}>hide</button>
            <button style={isUser} onClick={() => (deleteBlog(blog.id))}>delete</button>
          </td></tr>
          <tr><td><div className='urlrow' style={showWhenVisible}> {blog.url}</div></td></tr>
          <tr><td><div className='likesrow' style={showWhenVisible}>likes {likes} <button onClick={() => {addLike(blog.id)}}>Like</button></div></td></tr>
        </tbody>
      </table>
      </div>
    </>
  ) }

export default Blog