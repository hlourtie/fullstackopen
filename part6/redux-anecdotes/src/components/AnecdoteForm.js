import React from "react"
import { useDispatch } from 'react-redux'
import { newAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"


const AnecdoteForm = () => {

	const dispatch = useDispatch()

	const createNewAnecdote = async (event) => {
		event.preventDefault()
		const anecdote = event.target.content.value
		dispatch(newAnecdote(anecdote))
		event.target.content.value = ''
		
		dispatch(setNotification(`new anecdotes '${anecdote}'`, 5))
		
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