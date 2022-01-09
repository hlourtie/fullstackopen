import loginService from '../services/login'
import blogService from '../services/blogs'
import { setMessage } from './messageReducer'

export const initiateUser = (user) => {
	return dispatch => {
		console.log('user', user)
		blogService.setToken(user.token)
		dispatch({
			type:'INITUSER',
			data: user
		})
	}
}

export const loginUser = (cred) => {
	return async dispatch => {
		try {
		const userdata = await loginService.logIn(cred)
		window.localStorage.setItem(
			'blogappUser', JSON.stringify(userdata)
		)
		blogService.setToken(userdata.token)
		dispatch({
			type:'LOGIN',
			data: userdata
		})
	}catch (e){
		dispatch(setMessage('Wrong credentials', 'error', 5))
	}
	}
}

export const logoutUser = () => {
	window.localStorage.setItem(
		'blogappUser', null
	)
	return dispatch => {
		dispatch({
			type: 'LOGOUT'
		})
	}
}

const userReducer = (state= null, action) => {

	switch (action.type){
		case 'LOGIN':
			return action.data
		case 'INITUSER':
			return action.data
		case 'LOGOUT':
			return null
		default : return state
	}
}

export default userReducer