import { useState, useEffect } from "react";
import axios from 'axios';

export const useCountry = (name) => {
	const [country, setCountry] = useState(null)
	
	useEffect(() => {
		const uri = `https://restcountries.com/v2/name/${name}?fullText=true`
		const controller = new AbortController();
		
		const fetchCountry = async () =>{
			try{
				const response =  await axios.get(uri, {signal: controller.signal} )
				setCountry({found : true, data:response.data[0]})
			}catch (error){
				setCountry({found:false, data:{}})
			}
			controller.abort()
		} 
		fetchCountry()
	}, [name])
	if (!name )return null
	return country
}