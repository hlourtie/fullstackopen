
import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { useQuery , useMutation } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS } from './queries'
import { CREATE_BOOK, UPDATE_BIRTHDAY } from './mutations'

const Notify = ({errorMessage}) => {
  if ( !errorMessage ) {
    return null
  }
  return (
    <div style={{color: 'red'}}>
    {errorMessage}
    </div>
  )
}
const App = () => {
  const [page, setPage] = useState('authors')
  const [errormes, setErrormes] = useState(null)

  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)
  const [createBook] = useMutation(CREATE_BOOK, 
    {refetchQueries:  [  {query: ALL_AUTHORS }, {query: ALL_BOOKS} ],
  onError: (error) => {
    notify(error)
  } })
  const [ updateBirthday ] = useMutation(UPDATE_BIRTHDAY, 
    {refetchQueries: [ {query: ALL_AUTHORS}], onError: (error) =>{notify(error)}
    })
  if (authors.loading || books.loading) {
    return <div>loading...</div>
  }
  const notify = (message) => {
    setErrormes(message)
    setTimeout(() => {
      setErrormes(null)
    }, 10000)
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>
      
      <Authors 
        authors={authors.data.allAuthors}
        show={page === 'authors'}
        updateBirthday={updateBirthday}
      />

      <Books
        books={books.data.allBooks}
        show={page === 'books'}
      />

      <NewBook
        createBook={createBook}
        show={page === 'add'}
      />

    </div>
  )
}

export default App