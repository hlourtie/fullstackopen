export const setMessage = (content ,messageType , time) =>
{
  return dispatch => {
    dispatch({ type:'SETNOTIFICATION', data:{ content: content , type: messageType } })
    setTimeout(() => { dispatch({ type:'REMOVE' })}, time * 1000)
  }
}

const messageReducer = (state = '', action) => {
	switch (action.type){
		case 'SETNOTIFICATION':
      return action.data
    case 'REMOVE':
      console.log('notification cleared')
      return ''
    default : return state
	}
}

export default messageReducer