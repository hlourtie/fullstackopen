import React, { useState } from 'react'



const Noteform = ({ handleCreation }) => {
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const submitAction = (event) => {
    event.preventDefault()
    handleCreation({ title:title, author:author, url: url, likes: 0 })
    setAuthor('')
    setTitle('')
    setUrl('')
  }

  return(
	<>
  <div className='noteform'>
	<form onSubmit={submitAction}>
    <br />
      <br />
      <div>
      title: <input id='title' value={title}  onChange={({ target }) => setTitle(target.value)}/> <br />
      author: <input id='author' value={author}  onChange={({ target }) => setAuthor(target.value)} /> <br />
      url: <input id='url' value={url}  onChange={({ target }) => setUrl(target.value)} /> <br />
      </div>
	<br />
      <br />
      <div>
      <button type="submit">Create</button>
      </div>
    </form>
    </div>
	</>)

}

export default Noteform