
const notificationReducer = (state = '', action) => {
	switch (action.type){
		case 'LIKE':
      const not = 'you voted for ' + action.data.name
      return not
    case 'NEWANECDOTE':
      const notif = 'new anecdote created \'' +action.data.content + '\'' 
      return notif
    case 'REMOVE':
      return ''
    default : return state
	}
}

export default notificationReducer