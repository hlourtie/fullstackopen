import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Content from './components/Content'


const App = (props) => {
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

const filterPatern = (pattern, str) => new RegExp('.*' + pattern.toUpperCase()+'.*').test(str.toUpperCase()); 

  return (
    <div className="App">
    find countries <input onChange={handleFilterChange} value={newFilter}/>
    <Content  countries={countriestodisplay} filter={newFilter}/>
    
    </div>
  );
}

export default App;
