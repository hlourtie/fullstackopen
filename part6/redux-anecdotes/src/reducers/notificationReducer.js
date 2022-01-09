
export const setNotification = (content , time) =>
{
  return dispatch => {
    dispatch({type:'SETNOTIFICATION', data: content})
    setTimeout(()=>{dispatch({type:'REMOVE'})}, time * 1000)
  }
}

const notificationReducer = (state = '', action) => {
	switch (action.type){
		case 'SETNOTIFICATION':
      console.log('notification message', action.data)
      return action.data
    case 'REMOVE':
      console.log('notification cleared')
      return ''
    default : return state
	}
}

export default notificationReducer