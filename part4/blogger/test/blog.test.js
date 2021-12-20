const listHelper = require('../utils/list_helper')

const blogs = [
	{
	  _id: "5a422a851b54a676234d17f7",
	  title: "React patterns",
	  author: "Michael Chan",
	  url: "https://reactpatterns.com/",
	  likes: 7,
	  __v: 0
	},
	{
	  _id: "5a422aa71b54a676234d17f8",
	  title: "Go To Statement Considered Harmful",
	  author: "Edsger W. Dijkstra",
	  url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
	  likes: 5,
	  __v: 0
	},
	{
	  _id: "5a422b3a1b54a676234d17f9",
	  title: "Canonical string reduction",
	  author: "Edsger W. Dijkstra",
	  url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
	  likes: 12,
	  __v: 0
	},
	{
	  _id: "5a422b891b54a676234d17fa",
	  title: "First class tests",
	  author: "Robert C. Martin",
	  url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
	  likes: 10,
	  __v: 0
	},
	{
	  _id: "5a422ba71b54a676234d17fb",
	  title: "TDD harms architecture",
	  author: "Robert C. Martin",
	  url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
	  likes: 0,
	  __v: 0
	},
	{
	  _id: "5a422bc61b54a676234d17fc",
	  title: "Type wars",
	  author: "Robert C. Martin",
	  url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
	  likes: 2,
	  __v: 0
	}  
  ]
test('dummy returns one', () => {

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe(' Testing Total Likes', ()=>{
	const listWithNone = []

	const listWith1 = [{
		likes:23
	}]

	const listWith2 =[{
	likes:23
	},{
	likes:45
	}]

	const listWith3 =[{
			likes:23
	},{
		likes:45
	},{
		likes:21
	}]
	test('When list has no elements', () => {
		const result = listHelper.totalLikes(listWithNone)
		expect(result).toBe(0)
	})
	test('When list has 1 element', () => {
		const result = listHelper.totalLikes(listWith1)
		expect(result).toBe(23)
	})

	test('When list has 2 elements', () => {
		const result = listHelper.totalLikes(listWith2)
		expect(result).toBe(68)
	})
	test('When list has 3 elements', () => {
		const result = listHelper.totalLikes(listWith3)
		expect(result).toBe(89)
	})
})

describe("testing favorites", () =>{
	
	test('look for favorites', () =>{
		const result = listHelper.favoriteBlog(blogs);
		expect(result).toStrictEqual({
			_id: "5a422b3a1b54a676234d17f9",
			title: "Canonical string reduction",
			author: "Edsger W. Dijkstra",
			url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
			likes: 12,
			__v: 0
		  })
	})
})

describe('testing the top blogger', ()=>{

	test('look for topblogger', () =>{
			const result = listHelper.mostBlogs(blogs);
			expect(result).toStrictEqual({
				author: "Robert C. Martin",
				blogs: 3
			  })
	})})

describe('testing the most likked blogger', ()=>{

	test ('look for mostLikes', () =>{
			const result = listHelper.mostLikes(blogs);
			expect(result).toStrictEqual({
				author: "Edsger W. Dijkstra",
				likes: 17
				})
	})})