import React, { useState } from 'react'
import Title from './components/Title'
import Content from './components/Persons'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 0  }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setFilter ] = useState('')
  const [ personToDisplay, setPersonToDisplay ]= useState(persons)

  const addName = (event) => {
    event.preventDefault();
    if ( persons.map((e)=>( e.name)).indexOf(newName) > -1){
      alert(`${newName} is already in the phonebook`);
    }else{
      const copy = persons.concat({name:newName, number:newNumber, id: persons.length});
      setPersons(copy);
      console.log('button clicked', event.target.value)
    }
    setNewName("");
    setNewNumber("");
  
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event)=>{
    setFilter(event.target.value)
    setPersonToDisplay(persons.filter(person => fuzzyMatch(event.target.value, person.name)))
    console.log(personToDisplay);

  }
  const fuzzyMatch = (pattern, str) => new RegExp('.*' + pattern.split('').map(letter => '\\' + letter + '.*').join('')).test(str); 
  return (
    <div>
      <Title text="Phonebook"/>
      <form onSubmit={addName}>
        <div>
          filter: <input value={newFilter} onChange={handleFilterChange}/>
        </div>
      <Title text="Add new phone number"/>
        <div>
          name: <input value={newName} onChange={handleNameChange}/><br />
          number: <input value={newNumber} onChange={handleNumChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <Title text="Numbers"/>
      <Content persons={personToDisplay} />
    </div>
  )
}

export default App