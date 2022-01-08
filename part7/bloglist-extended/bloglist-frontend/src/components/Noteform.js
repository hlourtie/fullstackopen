import React from 'react'
import { useDispatch } from 'react-redux'
import { newBlogPost } from '../reducers/blogreducer'
import { setMessage } from '../reducers/messageReducer'


const Noteform = () => {
  const dispatch = useDispatch()

  const createBlog = (event) => {
    event.preventDefault()
    const newBlog ={
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value,
      likes : 0
    }
    dispatch(newBlogPost(newBlog))
    dispatch (setMessage(event.target.title.value , 5))
    event.target.title.value = ''
    event.target.author.value = ''
   event.target.url.value = ''
  }

  return(
	<>
  <div className='noteform'>
	<form onSubmit={createBlog}>
    <br />
      <br />
      <div>
      title: <input id='title' name='title' /> <br />
      author: <input id='author' name='author' /> <br />
      url: <input id='url' name='url' /> <br />
      </div>
	<br />
      <br />
      <div>
      <button id='new-note-submit-butt'type="submit">Create</button>
      </div>
    </form>
    </div>
	</>)

}

export default Noteform