import React from "react"
import { addLike } from "../reducers/anecdoteReducer"
import { useSelector, useDispatch } from 'react-redux'

const AnecdoteList = () => {

	const dispatch = useDispatch()
	const tempanecdotes = useSelector(state => state)
	const anecdotes = tempanecdotes.sort((a,b) => a.votes > b.votes ? -1 : 1 )
	const vote = (id) => {
		dispatch(addLike(id))
	  }
	return (<><h2>Anecdotes</h2>
		{console.log(anecdotes)}
		{anecdotes.map(anecdote =>
			<div key={anecdote.id}>
			<div>
				{anecdote.content}
			</div>
			<div>
				has {anecdote.votes}
				<button onClick={() => vote(anecdote.id)}>vote</button>
			</div>
			</div>
		)}</>)
	}
export default AnecdoteList
	