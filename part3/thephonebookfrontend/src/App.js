import React, { useState, useEffect } from 'react';
import Title from './components/Title';
import Content from './components/Content';
import Filter from './components/Filter';
import Notification from './components/Notification';
import phonebook from './services/phonebook';



const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setFilter ] = useState('')
  const [ personToDisplay, setPersonToDisplay ]= useState(persons)
  const [message, setMessage]= useState(null)
  const [className, setClassName] = useState("success")

  //Gets the data from the server
  useEffect(() => {
    console.log('effect')
    phonebook.getAll()
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
      
      let copy = persons;
      phonebook
        .update({name:newName, number:newNumber , id:personnel[0].id})
        .then(()=>{
          setMessage(`${newName} has been updated to the phonebook`);
          setClassName("succes");
          
          copy[persons.map((e)=>( e.name)).indexOf(newName)] = {name:newName, number:newNumber , id:personnel[0].id};
          setPersons(copy);
          if(newFilter === ''){
            setPersonToDisplay(copy)
            }else{
              setPersonToDisplay(copy.filter(person => filterPatern(newFilter, person.name)))
            }
          setTimeout(() => {
            setMessage(null)
            setClassName(null)
          }, 5000)
        })
        .catch(error=>{
          const mess = String(error.response.data);
          if(mess.indexOf('ValidationError') !== -1){
          setMessage(mess.substring(mess.indexOf(':')+1, mess.indexOf('<br>')));
          }else{
            setMessage(error.message);
          }
          setClassName("error");
          setTimeout(() => {
            setMessage(null)
            setClassName(null)
          }, 5000)
        });;
      
   
      // setPersons(copy);
      // if(newFilter === ''){
      // setPersonToDisplay(copy)
      // }else{
      //   setPersonToDisplay(copy.filter(person => filterPatern(newFilter, person.name)))
      // }
    }else{
      const newPhoneNumber = {name:newName, number:newNumber, id: (persons[persons.length-1].id + 1)};
      let copy = persons;
      phonebook
        .add(newPhoneNumber)
        .then(()=>{
          setMessage(`${newName} has been added to the phonebook`);
          setClassName("success");
          copy = persons.concat(newPhoneNumber);
          setPersons(copy);
          if(newFilter === ''){
            setPersonToDisplay(copy)
          }else{
            setPersonToDisplay(copy.filter(person => filterPatern(newFilter, person.name)))
          }
          setTimeout(() => {
            setMessage(null)
            setClassName(null)
          }, 5000)
        })
        .catch(error=>{
          console.log(error);
          const mess = String(error.response.data);
          if(mess.indexOf('ValidationError') !== -1){
          setMessage(mess.substring(mess.indexOf(':')+1, mess.indexOf('<br>')));
          }else{
            setMessage(error.message);
          }
          setClassName(`error`);
          setTimeout(() => {
            setMessage(null)
            setClassName(null)
          }, 5000)
        });  
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
        .catch( error =>{
          setMessage(error.message);
          setClassName("error");
          setTimeout(() => {
            setMessage(null)
            setClassName(null)
          }, 5000)
        }

        )
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
      <Notification message={message} className={className}/>
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