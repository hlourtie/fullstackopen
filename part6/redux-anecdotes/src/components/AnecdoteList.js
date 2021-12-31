import React from "react"
import { addLike } from "../reducers/anecdoteReducer"
import { useSelector, useDispatch } from 'react-redux'

const AnecdoteList = () => {

	const filterPatern = (pattern, str) => new RegExp('.*' + pattern.toUpperCase()+'.*').test(str.toUpperCase()); 
	const dispatch = useDispatch()
	const newFilter = useSelector(state=>state.filter)
	console.log('newFilter', newFilter)
	const tempanecdotes = useSelector(state => state.anecdotes)
	const filteredAnecdotes = newFilter ? tempanecdotes.filter(anecdote => filterPatern(newFilter, anecdote.content)):tempanecdotes
	const anecdotes = filteredAnecdotes.sort((a,b) => a.votes > b.votes ? -1 : 1 )
	const vote = (id, content) => {
		dispatch(addLike(id, content))
		setTimeout(()=>{dispatch({type:'REMOVE'})}, 5000)
	  }
	return (<>
		{anecdotes.map(anecdote =>
			<div key={anecdote.id}>
			<div>
				{anecdote.content}
			</div>
			<div>
				has {anecdote.votes} &nbsp;&nbsp;&nbsp;
				<button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
			</div>
			</div>
		)}</>)
	}
export default AnecdoteList
	