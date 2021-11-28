import React, {useState, useEffect} from "react";
import axios from 'axios';

const Solocountry = ({country})=> {
	const [weather, setWeather]= useState([])
	console.log(country.languages);
	const languages = Object.values(country.languages);

	useEffect(()=>{
		axios.get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_WEATHERAPI_KEY}&query=${country.capital[0]}`).then(response =>{
		  console.log(response);
		  setWeather(response.data);
		}).catch((error) => {
		  console.error(error);
		})
	  },[])
	if(!weather.current){return(
		<><h3>{country.name.common}</h3>
			capital:  {country.capital[0]}<br /> 
			The people drive on the {country.car.side}
			<h4>Languages</h4>
			<ul>
			{languages.map((val,index)=><li key={index}>{val}</li>)}
			</ul>
			<img src={country.flags.png} alt="" size="80%" />
		</>)}else{
	return(
	<><h3>{country.name.common}</h3>
		capital:  {country.capital[0]}<br /> 
		The people drive on the {country.car.side}
		<h4>Languages</h4>
		<ul>
		{languages.map((val,index)=><li key={index}>{val}</li>)}
		</ul>
		<img src={country.flags.png} alt="" size="80%" />
		<h4>Weather in  {country.capital[0]}</h4>
		{console.log("whats the weather like", weather.current)}
		Temperature: {weather.current.temperature} Celsius <br />
		<img src={weather.current.weather_icons[0]} alt="weathericon"/><br />
		Wind: {weather.current.wind_speed} mph direction  {weather.current.wind_dir}
	</>)}
}
export default Solocountry