import loginService from '../services/login'
import blogService from '../services/blogs'
import { setMessage } from './messageReducer'

export const initiateUser = (user) => {
	return dispatch => {
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
		dispatch(setMessage(e.name, 'error', 5))
	}
	}
}

const userReducer = (state={}, action) => {

	switch (action.type){
		case 'LOGIN':
			return action.data
		case 'INITUSER':
			return action.data
		default : return state
	}
}

export default userReducer