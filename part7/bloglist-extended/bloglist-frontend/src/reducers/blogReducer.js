import blogService from '../services/blogs'

export const initBlog =  () => {
	return async dispatch => {
		const blogs = await blogService.getAll()
		console.log(blogs)
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
		console.log(blog)
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
export const addComment = (blog, comment) => {
	blog.comments.unshift(comment)
	return async dispatch => {
		await blogService.addComm(blog.id, blog)
		dispatch({
			type: 'ADDCOMMENT',
			data:{
				id: blog.id,
				com: blog.comments
			}
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
		case 'ADDCOMMENT':{
			const index = state.findIndex(element => element.id === action.data.id)
			const newState = state
			state[index] = { ...newState[index], comments:action.data.com }
			return newState
		}
		case 'DELETE':{
			const inde = state.findIndex(element => element.id === action.data)
			const newState = state
			newState.splice(inde,1)
			console.log(newState)
			return newState
		}
		default: return state
	}
}

export default blogReducer