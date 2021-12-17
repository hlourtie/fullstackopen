const mongoose = require('mongoose');

const url = process.env.MONGODB_URI

console.log('connecting to', url);

mongoose.connect(url)
	.then( result =>{
		console.log('connected correctly');
	})
	.catch((error) =>{
		console.log(`Could not connect: ${error.message}`);
	})

const entrySchema = new mongoose.Schema({
	"name": String,
	"number": String
});

entrySchema.set('toJSON', {
	transform: (document, returnedObj) =>{
		returnedObj.id = returnedObj._id.toString();
		delete returnedObj._id;
		delete returnedObj.__v;
	}
})

module.exports = mongoose.model('Entry', entrySchema);
