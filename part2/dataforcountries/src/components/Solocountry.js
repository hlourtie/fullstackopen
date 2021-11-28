import React from "react";

const Solocountry = ({country})=> {
	console.log(country.languages);
	const languages = Object.values(country.languages);
	console.log(languages);
	return(
	<><h3>{country.name.common}</h3>
		capital:  {country.capital[0]}<br /> 
		The people drive on the {country.car.side}
		<h4>Languages</h4>
		<ul>
		{languages.map((val,index)=><li key={index}>{val}</li>)}
		</ul>
		<img src={country.flags.png} alt="" size="80%" />
	</>)
}
export default Solocountry