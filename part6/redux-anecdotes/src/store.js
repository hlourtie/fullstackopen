import { combineReducers, createStore } from "redux"
import anecdoteReducer from "./reducers/anecdoteReducer"
import notificationReducer from "./reducers/notificationReducer"
import filterReducer from "./reducers/filterReducer"
import { composeWithDevTools } from 'redux-devtools-extension'


const anecdotesAtStart = [
	'If it hurts, do it more often',
	'Adding manpower to a late software project makes it later!',
	'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
	'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
	'Premature optimization is the root of all evil.',
	'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
  
  const getId = () => (100000 * Math.random()).toFixed(0)
  
  const asObject = (anecdote) => {
    return {
      content: anecdote,
      id: getId(),
      votes: 0
      }
  }
  
  const initialState = { 
	  anecdotes : anecdotesAtStart.map(asObject),
    notifications : '',
    filter : ''
	}
  
const reducer = combineReducers({
	anecdotes: anecdoteReducer,
  notifications: notificationReducer,
  filter: filterReducer
})
const store = createStore(reducer, initialState, composeWithDevTools())

export default store
