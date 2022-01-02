import anecdoteService from '../services/anecdotes'


//const initialState = anecdoteService.getAll().then(anecdotes => anecdotes)

export const addLike = (anecdote) =>{
  return async dispatch => {
    const anecdoteTosend = { ...anecdote, votes : anecdote.votes + 1 }
    await anecdoteService.vote(anecdoteTosend)
    dispatch ( {
    type:'LIKE',
    data:{ 
      id : anecdote.id,
      name: anecdote.content 
    }})}
  }

export const newAnecdote = (content) =>{

  return async dispatch => {
    const anecdote =  await anecdoteService.createNew(content)
    dispatch({
      type: 'NEWANECDOTE',
      data: anecdote
  })}
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type : 'INITANECDOTES',
      data : anecdotes
  })
  }
}

const anecdoteReducer = (state = [] , action) => {
  switch (action.type){
    case 'LIKE':
      const ind = state.findIndex(element => element.id === action.data.id)
      const newstate = state; 
      newstate[ind] = { ...newstate[ind], votes : newstate[ind].votes + 1 }
      return newstate
    
    case 'NEWANECDOTE':
      const newAnecdote  =  action.data
      return state.concat(newAnecdote)

    case 'INITANECDOTES':
      return action.data
      
    default :return state
  }
}

export default anecdoteReducer