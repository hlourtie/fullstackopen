  
import React,  { useState }from 'react'

const Authors = (props) => {
  const [born, setBorn] = useState(0)
  const [author, setAuthor] = useState('')
  if (!props.show) {
    return null
  }

  const updateBirthday = props.updateBirthday
  const changeBirthday = (event) =>{
    event.preventDefault()
    console.log(born, author)
    const bornNumber = parseInt(born, 10)
    updateBirthday({ variables : {author, bornNumber}})
    setBorn(0)
    setAuthor('')
  }
  const authors = props.authors

  return (<>
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

    </div>
    <div>
      <h2>Change Birthday</h2>
      <form onSubmit={changeBirthday}>
            <select value={author} onChange={(event) => setAuthor(event.target.value)}>
              {authors.map(a=>
              <option value={a.name} key={a.name}>{a.name}</option>
                )}

            </select>
      <input
            type='number'
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
      <button>Change</button>
      </form>

    </div>
    </>
  )
}

export default Authors
