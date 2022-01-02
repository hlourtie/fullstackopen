import { combineReducers, createStore, applyMiddleware } from "redux"
import anecdoteReducer from "./reducers/anecdoteReducer"
import notificationReducer from "./reducers/notificationReducer"
import filterReducer from "./reducers/filterReducer"
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'


  
  const initialState = { 
	  anecdotes : [],
    notifications : '',
    filter : ''
	}
  
const reducer = combineReducers({
	anecdotes: anecdoteReducer,
  notifications: notificationReducer,
  filter: filterReducer
})
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunk)))

export default store
