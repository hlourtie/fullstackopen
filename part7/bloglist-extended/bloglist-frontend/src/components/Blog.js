import React,{ useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { addLike, deleteBlog } from '../reducers/blogreducer'
import { setMessage } from '../reducers/messageReducer'

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
  const dispatch =  useDispatch()
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const isUser = { display : (token === blog.user.id) ?'':'none' }

  const liking = async (id) => {
    dispatch(addLike (id, blog ))
    dispatch(setMessage(`you have liked ${ blog.content }`))
  }

  const delBlog = async (id) => {
    if(window.confirm('Are you sure you want to delete this blog?')){
      dispatch(deleteBlog(id))
    }
  }
  return(
    <><div className='testBlogClass'>
      <table style={blogStyle}>
        <tbody>
          <tr><td>{blog.title} {blog.author}&nbsp;&nbsp;
            <button style={hideWhenVisible} className='viewButton' onClick={() => (setVisible(true))}>view</button>
            <button style={showWhenVisible} onClick={() => (setVisible(false))}>hide</button>
            <button style={isUser} className='deleteButton' onClick={() => (delBlog(blog.id))}>delete</button>
          </td></tr>
          <tr><td><div className='urlrow' style={showWhenVisible}> {blog.url}</div></td></tr>
          <tr><td><div className='likesrow' style={showWhenVisible}>likes {blog.likes} <button className='likebutton' onClick={() => {liking(blog.id)}}>Like</button></div></td></tr>
        </tbody>
      </table>
      </div>
    </>
  ) }

export default Blog