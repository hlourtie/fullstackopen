const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator')

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
  .then( () => {
    console.log('connected correctly')
  })
  .catch((error) => {
    console.log(`Could not connect: ${error.message}`)
  })

const entrySchema = new mongoose.Schema({
  'name':{
    type:String,
    minlength:3,
    required:true,
    unique:true
  } ,
  'number': {
    type:String,
    minlength:8,
    required:true,
    unique:true
  }
})
entrySchema.plugin(uniqueValidator)

entrySchema.set('toJSON', {
  transform: (document, returnedObj) => {
    returnedObj.id = returnedObj._id.toString()
    delete returnedObj._id
    delete returnedObj.__v
  }
})

module.exports = mongoose.model('Entry', entrySchema)
