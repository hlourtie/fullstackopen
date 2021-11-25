import React, { useState } from 'react'
import Title from './components/Title'
import Content from './components/Persons'
import Filter from './components/Filter'
const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 0 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 1 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 2 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 3 }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setFilter ] = useState('')
  const [ personToDisplay, setPersonToDisplay ]= useState(persons)

  //Form submit handler
  const addName = (event) => {
    event.preventDefault();
    if ( persons.map((e)=>( e.name)).indexOf(newName) > -1){
      alert(`${newName} is already in the phonebook`);
    }else{
      const copy = persons.concat({name:newName, number:newNumber, id: persons.length});
      setPersons(copy);
      
      if(newFilter === ''){
      setPersonToDisplay(copy)
      }else{
        setPersonToDisplay(copy.filter(person => filterPatern(newFilter, person.name)))
      }
    }
    setNewName("");
    setNewNumber("");
  }

//onchange handlers
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event)=>{
    setFilter(event.target.value)
    setPersonToDisplay(persons.filter(person => filterPatern(event.target.value, person.name)))
  }

  //filter regex expression
  const filterPatern = (pattern, str) => new RegExp('.*' + pattern.toUpperCase()+'.*').test(str.toUpperCase()); 
  
  return (
    <div>
      <Title text="Phonebook"/>
      <Filter value={newFilter} onChange={handleFilterChange}/>
      <Title text="Add new phone number"/>
      <form onSubmit={addName}>
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