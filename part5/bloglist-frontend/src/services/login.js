import axios from 'axios'
const baseUrl = '/api/login'

const logIn = async (cred) => {
	const response = await axios.post(baseUrl, cred)
	return response.data
}
const exportedObject = {
	logIn
}
export default exportedObject