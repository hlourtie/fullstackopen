import axios from "axios";
const baseURL="http://localhost:3001/persons/"; 

const getAll = () =>{
	const req = axios.get(baseURL);
	return req.then(response => response.data);
}

const add = (newPhoneNumber) =>{
	const req = axios.post(baseURL,newPhoneNumber);
	return req.then(response => response.data);
}

const remove = (id) => {
	const req = axios.delete(baseURL+id);
	return req.then(response =>response)
}

const update = (person) => {
	const req = axios.put(baseURL+person.id, person)
	return req.then(response => response)
}
// eslint-disable-next-line 
export default { getAll, add, remove,update}