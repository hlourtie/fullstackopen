const jwt = require('jsonwebtoken')
const blogRouter = require('express').Router()
const Blog = require('../models/blogpost')
const User = require('../models/user')
const userExtractor = require('../utils/middleware').userExtractor

blogRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
	response.json(blogs.map(blog => blog.toJSON()))
})

blogRouter.post('/', userExtractor, async (request, response) => {
	 const body = request.body
	const user = request.user 
	console.log(user)
	const blog = new Blog({
		title: body.title,
		author: body.author,
		url:body.url,
		likes:body.likes,
		user: user
	})
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

blogRouter.put('/:id', userExtractor, async (request, response) => {
	const id = request.params.id; 
	const likes = request.body.likes; 
	const result = await Blog.findByIdAndUpdate(id, {likes:likes}, {runValidators:true, new:true})
	response.status(200).json(result.toJSON());
	
})

blogRouter.delete('/:id', userExtractor, async (request, response) => {
	const id = request.params.id
	const user = request.user
	const blog = await Blog.findById(id)
	if(blog.user.toString() !== user ){
		return response.status(401).json({error: 'you are not the owner of this blogpost'})
	}
	await Blog.findByIdAndRemove(id)
	response.status(204).end()
})
module.exports = blogRouter