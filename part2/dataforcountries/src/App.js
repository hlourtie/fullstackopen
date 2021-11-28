import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Content from './components/Content'
import Solocountry from './components/Solocountry';


const App = (props) => {
const [state, setState] = useState('start')
const [countries, setCountries] = useState([]);
const [countriestodisplay,setCountriesToDisplay] = useState([]);
const [newFilter, setNewFilter] = useState('');

useEffect((filter)=>{
  axios.get(`https://restcountries.com/v3.1/all` ).then(response =>{
    console.log(response);
    setCountries(response.data);
  }).catch((error) => {
    console.error(error);
  })
},[])

const handleFilterChange = (event) =>{
  setNewFilter(event.target.value)
  setCountriesToDisplay(countries.filter(country=>filterPatern(event.target.value, country.name.common)))
 
}
const clickHandler = (event)=>{
  console.log(event.nativeEvent.srcElement.name)
  setCountriesToDisplay(countries.filter(country=>filterPatern(event.nativeEvent.srcElement.name, country.name.common)))
  setState('solo')
  }

const resetHandler = (event) =>{
  setState('start')
  setNewFilter('')
  setCountriesToDisplay([])
}

const filterPatern = (pattern, str) => new RegExp('.*' + pattern.toUpperCase()+'.*').test(str.toUpperCase()); 
if (state ==='start'){
  return (
    <div className="App">
      find countries <input onChange={handleFilterChange} value={newFilter}/>
    <Content  countries={countriestodisplay} filter={newFilter} clickHandler={clickHandler}/>
    </div>
  );}else{
    return(<div>
      <Solocountry country={countriestodisplay[0]} />
      <p><button type="button" onClick={resetHandler} >Go To Start</button></p>
    </div>)
  }
}

export default App;
