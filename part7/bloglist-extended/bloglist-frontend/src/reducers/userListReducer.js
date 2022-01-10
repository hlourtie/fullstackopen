import userService from '../services/user'

export const iniitiateUserList = () => {
	return async dispatch => {
		const userList =  await userService.getAll()
		dispatch({
			type:'INITIATEUSERLIST',
			data: userList
		})
	}
}
const userListReducer = (state= [], action) => {
	switch (action.type){
		case 'INITIATEUSERLIST':
			return action.data
		default : return state
	}

}

export default userListReducer