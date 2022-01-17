const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
	title: {
		type:String,
		required: true
	},
	author: String,
	url: {
		type:String,
		required: true
	},
	likes:{ 
		type:Number, 
		default: 0	
	},
	visible:{ 
		type:Boolean,
		default:false
	 },
	user:{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		default:"61c98912473cbb947a05ccfb"
	},
	comments:{
		type:Array,
		default:[]
	}
  })

blogSchema.set('toJSON', {
	transform: (document, returnedObject) => {
	  returnedObject.id = returnedObject._id.toString()
	  delete returnedObject._id
	  delete returnedObject.__v
	}
  })

module.exports = mongoose.model('Blogpost', blogSchema)