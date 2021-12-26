const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('blog numbers', async () => {
	await api
	.get('/api/blogs')
	.expect(200)
	.expect('Content-Type', /application\/json/)
})

test('id is present', async () => { 

	const result = await api.get('/api/blogs')
	//console.log(result.body)
	const response = result.body[0];
	//console.log("response", response);
	expect(response.id).toBeDefined()
})

test('is properly created', async () => {
	const testValue = {
		title: "this is a test title 2",
        author: "Henry Lourtie",
        url: "https://reactpatterns.com/",
        likes: 7,
	}
	const result = await api.post("/api/blogs").send(testValue);
	expect(result.statusCode).toBe(201)
	expect(result.body.id).toBeDefined()
})

test('is missing likes put to 0', async () => {
	const testValue = {
		title: "this is a test title 2",
        author: "Henry Lourtie",
        url: "https://reactpatterns.com/"
	}
	const result = await api.post("/api/blogs").send(testValue);
	expect(result.statusCode).toBe(201)
	expect(result.body.likes).toBe(0)
})

test.only('is url or title return bad request', async () => {
	const testValue = {
        author: "Henry Lourtie"
	}
	const result = await api.post("/api/blogs").send(testValue);
	expect(result.statusCode).toBe(400)
})

afterAll(() => {
	mongoose.connection.close()
  })