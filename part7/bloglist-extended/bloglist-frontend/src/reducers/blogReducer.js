import blogService from '../services/blogs'

export const initBlog =  () => {
	return async dispatch => {
		const blogs = await blogService.getAll()
		dispatch({
			type: 'INITBLOG',
			data: blogs
		})
	}
}

export const newBlogPost = (blog) => {
	return async dispatch => {
		const newblog =  await blogService.create(blog)
		dispatch({
			type: 'NEW',
			data: newblog
		})
	}
}

export const addLike = (blog) => {
	return async dispatch => {
		const blogToUpdate =  { ...blog, likes: blog.likes + 1 }
		await blogService.update(blogToUpdate.id, blogToUpdate)
		dispatch({
			type:'VOTE',
			data: blog.id
		})
	}
}
export const deleteBlog = (id) => {
	return async dispatch => {
		await blogService.remove(id)
		dispatch({
			type: 'DELETE',
			data: id
		})
	}
}
const blogReducer = (state=[], action) => {
	switch(action.type){
		case 'NEW':
			return state.concat(action.data)
		case 'INITBLOG':
			return action.data
		case 'VOTE':{
			const inde = state.findIndex(element => element.id === action.data)
			const newState = state
			newState[inde] = { ...newState[inde], likes:newState[inde].likes + 1 }
			return newState
		}
		case 'DELETE':{
			const inde = state.findIndex(element => element.id === action.data)
			return state.splice(inde,1)
		}
		default: return state
	}
}

export default blogReducer