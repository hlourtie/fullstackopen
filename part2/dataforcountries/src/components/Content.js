import React from "react";
import Country from './Countries';
import Solocountry from './Solocountry';

const Content = ({countries, filter, clickHandler}) =>{
	if(countries.length>10 && filter !==''){ 
		return(<p>There are too many results</p>)
	}else if(countries.length <=10 && countries.length > 1){
		return(countries.map((country, index)=><Country key={index} name={country.name.common} action={clickHandler} />))
	}else if(countries.length === 1){
		return(<div><Solocountry country={countries[0]}/></div>)
	}else{
		return (<p></p>)
	}
}

export default Content;