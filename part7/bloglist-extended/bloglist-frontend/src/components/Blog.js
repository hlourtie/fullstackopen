import React from 'react'
import { useDispatch } from 'react-redux'
import { addLike, addComment } from '../reducers/blogReducer'
import { setMessage } from '../reducers/messageReducer'

const Blog = ({ blog }) => {


  const dispatch =  useDispatch()


  //const isUser = { display : (token === blog.user.id) ?'':'none' }

  const liking = async (blog) => {
    dispatch(addLike ( blog ))
    dispatch(setMessage(`you have liked ${ blog.title }`, 'success', 5))
  }

  // const delBlog = async (blog) => {
  //   if(window.confirm('Are you sure you want to delete this blog?')){
  //     dispatch(deleteBlog(blog.id))
  //   }
  // }
  //<button style={isUser} className='deleteButton' onClick={() => (delBlog(blog))}>delete</button>

  let textInput = React.createRef()

  const addCom = async (blog) => {

      const newComment = textInput.current.value
      dispatch(addComment(blog, newComment))
      textInput.current.value = ''
  }
  console.log('user', blog)
  return(
    <><div className='testBlogClass'>
        <h2>{blog.title}  &nbsp;&nbsp; {blog.author}</h2>
          <div className='urlrow' > <a href={blog.url}>{blog.url}</a></div>
          <div className='likesrow'>likes {blog.likes} <button className='likebutton' onClick={() => {liking(blog)}}>Like</button></div>
          <div>added by {blog.user.name}</div>
          <h2>Commnents</h2>
          <div>
            <input ref={textInput} id='comment' name='comment'/><button type='button' onClick={() => {addCom(blog)}}>Add commnet</button>
          <ul>
           { blog.comments.map((comment,index) => <li key={index}>{comment}</li>)}
           </ul>
          </div>
      </div>
    </>
  ) }

export default Blog