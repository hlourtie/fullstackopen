const blogRouter = require('express').Router()
const Blog = require('../models/blogpost')

blogRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({}) 
	response.json(blogs.map(blog => blog.toJSON()))
})

blogRouter.post('/', async (request, response) => {
	
	const blog = new Blog(request.body)
	const result = await blog.save()
	response.status(201).json(result)
  })

blogRouter.get('/:id', async (request,response) => {
	const id = request.params.id
	const blog = await Blog.findById(id) 
	response.json(blog)
})

/*
** the body should be just the number of likes and nothing else
*/

blogRouter.put('/:id', async (request, response) => {
	const id = request.params.id; 
	const likes = request.body.likes; 
	const result = await Blog.findByIdAndUpdate(id, {likes:likes}, {runValidators:true, new:true})
	response.status(200).json(result.toJSON());
	
})
blogRouter.delete('/:id', async (request, response) => {
	const id = request.params.id
	await Blog.findByIdAndRemove(id)
	response.status(204).end()
})
module.exports = blogRouter