const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
	name:{
		type:String,
		required:true
	},
	username:{
		type:String,
		required:true,
		unique: true,
		minLength:3
	},
	password:{
		type:String
	}
})
userSchema.set('toJSON', {
	transform: (document, returnedObject) => {
	  returnedObject.id = returnedObject._id.toString()
	  delete returnedObject._id
	  delete returnedObject.__v
	  delete returnedObject.password
	}
  })
  userSchema.plugin(uniqueValidator)
  module.exports = mongoose.model('User', userSchema)