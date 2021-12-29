import React from 'react'

const Noteform = ({ handleCreation, title,setTitle,author,setAuthor,url,setUrl }) => {return(
	<>
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
	</>)

}

export default Noteform