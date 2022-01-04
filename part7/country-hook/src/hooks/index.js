import { useState, useEffect } from "react";
import axios from 'axios';

export const useCountry = (name) => {
	const [country, setCountry] = useState(null)

	useEffect(() => {
		const uri = `https://restcountries.com/v2/name/${name}?fullText=true`
 axios.get(uri).then(response => setCountry({found : true, data:response.data[0]})).catch(e=>  setCountry({found:false}))
	
	}, [name])

	return country
}