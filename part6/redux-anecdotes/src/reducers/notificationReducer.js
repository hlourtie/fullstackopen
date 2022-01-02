
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
      return action.data
    case 'REMOVE':
      return ''
    default : return state
	}
}

export default notificationReducer