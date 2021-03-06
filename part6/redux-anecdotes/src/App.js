import React, { useEffect } from 'react'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import ConnectedNotification from './components/Notification'
import Filter from './components/Filter'
import { connect } from 'react-redux'
import { initializeAnecdotes } from './reducers/anecdoteReducer'

const App = (props) => {


  useEffect(() => {
    props.initializeAnecdotes()
  }, [props])
  return (
    <div>
      <h2>Anecdotes</h2>
      <ConnectedNotification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default connect(
  null, { initializeAnecdotes }
)(App)