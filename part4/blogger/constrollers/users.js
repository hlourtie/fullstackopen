const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.post('/', async (request, response)=>{
	const body = request.body
	const saltRounds = 10
	const passwordHash = await bcrypt.hash(body.password, saltRounds)
	if(body.password.length < 3 ){
		response.status(400).send('The password needs to be 3 characters long at least')
	}else{
	const user = new User({
		username: body.username,
		name:body.name,
		password:passwordHash
	})
	const result = await user.save()
	response.status(201).json(result)
}
})

userRouter.get('/', async (request, response) => {
	const results =  await User.find({})
	response.json(results.map( res => res.toJSON()))
})
module.exports = userRouter