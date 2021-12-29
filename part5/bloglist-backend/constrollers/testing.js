const router = require('express').Router()
const Blog = require('../models/blogpost')


router.post('/reset', async (request, response) => {
  await Blog.deleteMany({})
  response.status(204).end()
})

module.exports = router