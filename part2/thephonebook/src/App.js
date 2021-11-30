import React, { useState, useEffect } from 'react';
import Title from './components/Title';
import Content from './components/Content';
import Filter from './components/Filter';
import phonebook from './services/phonebook';

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setFilter ] = useState('')
  const [ personToDisplay, setPersonToDisplay ]= useState(persons)

  //Gets the data from the server
  useEffect(() => {
    console.log('effect')
    phonebook
      .getAll()
      .then(response => {
        console.log(response)
        setPersons(response)
        setPersonToDisplay(response)
      })
  }, [])

  //Form submit handler && other button click handlers
  const addName = (event) => {
    event.preventDefault();
    if ( (persons.map((e)=>( e.name)).indexOf(newName) > -1) && window.confirm(`${newName} is already in the phonebook replace the phone Number?`)){
      const personnel = (persons.filter(person => newName === person.name)) ;
      console.log("personnel", personnel[0]);
      phonebook.update({name:newName, number:newNumber , id:personnel[0].id}).then(response =>console.log(response));
      const copy = persons;
      copy[persons.map((e)=>( e.name)).indexOf(newName)] = {name:newName, number:newNumber , id:personnel[0].id};
   
      setPersons(copy);
      if(newFilter === ''){
      setPersonToDisplay(copy)
      }else{
        setPersonToDisplay(copy.filter(person => filterPatern(newFilter, person.name)))
      }
    }else{
      const newPhoneNumber = {name:newName, number:newNumber, id: (persons[persons.length-1].id + 1)};
      phonebook.add(newPhoneNumber);
      const copy = persons.concat(newPhoneNumber);
   
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

  const deleteHander = (event) =>
  {
    console.log("name button", event.nativeEvent.srcElement.name)
    if(window.confirm("Are you sure you want to delete this person?")){
      phonebook
        .remove(event.nativeEvent.srcElement.name)
        .then(response => console.log("delete response", response))
      const copy = persons.filter(person => person.id !== event.nativeEvent.srcElement.name);
      setPersons(copy)
      if(newFilter === ''){
        setPersonToDisplay(copy)
        }else{
          setPersonToDisplay(copy.filter(person => filterPatern(newFilter, person.name)))
        }
      window.location.reload()
    }
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
      <Content persons={personToDisplay} clickHandler={deleteHander} />
    </div>
  )
}

export default App