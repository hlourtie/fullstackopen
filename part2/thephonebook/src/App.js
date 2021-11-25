import React, { useState } from 'react'
import Title from './components/Title'
import Content from './components/Persons'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const addName = (event) => {
    event.preventDefault();
    if ( persons.map((e)=>( e.name)).indexOf(newName) > -1){
      alert(`${newName} is already in the phonebook`);
    }else{
      const copy = persons.concat({name:newName});
      setPersons(copy);
      console.log('button clicked', event.target.value)
    }
    setNewName("");
  
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <Title text="Phonebook"/>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <Title text="Numbers"/>
      <Content persons={persons} />
    </div>
  )
}

export default App