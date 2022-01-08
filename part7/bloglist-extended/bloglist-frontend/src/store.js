import { combineReducers, createStore, applyMiddleware } from 'redux'
import blogReducer from './reducers/blogReducer'
import messageReducer from './reducers/messageReducer'
import filterReducer from './reducers/filterReducer'
import userReducer from './reducers/userReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'


const initialState = {
	blogs : [],
	message: {},
	filter: false,
	user:{}
}

const reducer = combineReducers ({
	blog:blogReducer,
	message:messageReducer,
	filter: filterReducer,
	user: userReducer
})

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunk)))
export default store