import React from "react"
import { useDispatch } from 'react-redux'
import { newAnecdote } from "../reducers/anecdoteReducer"



const AnecdoteForm = () => {

	const dispatch = useDispatch()

	const createNewAnecdote = (event) => {
		event.preventDefault()
		dispatch(newAnecdote(event.target.content.value))
		event.target.content.value = ''
	}
	return (<>
		<h2>create new</h2>
      <form onSubmit={createNewAnecdote}>
        <div><input name='content' /></div>
        <button type='submit'>create</button>
      </form>
	  </>
	)
}

export default AnecdoteForm