//mongodb+srv://<username>:<password>@phonebook.r7zuk.mongodb.net/PhoneBook?retryWrites=true&w=majority
const mongoose = require('mongoose');

if(process.argv.length < 3){
	console.log("please provide at least your password");
	console.log("Usage: ");
	console.log("For full phoneBook: node mongo.js <password>");
	console.log("To add name to phoneBook: node mongo.js <password> <name> <number>");
	process.exit(1);
}

const password = process.argv[2];
const url =`mongodb+srv://fullstacktest:${password}@phonebook.r7zuk.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.connect(url);

const entrySchema = new mongoose.Schema({
	"name": String,
      "number": String
});

const Entry = mongoose.model('Entry', entrySchema);

if(process.argv.length === 5){
const entry = new Entry({
	"name": process.argv[3],
	"number": process.argv[4]
  });
  entry.save().then(result=> {
	  console.log(result);
	  console.log(`added ${entry.name} with number ${entry.number}`)
	  mongoose.connection.close();
  })
}else if(process.argv.length === 3){
	console.log('phonebook')
	Entry.find({}).then(result =>{
		result.forEach(entry => console.log(`${entry.name} ${entry.number}`))
		mongoose.connection.close();
	})
	
}else{
	console.log("Not properly used");
	console.log("Usage: ");
	console.log("For full phoneBook: node mongo.js <password>");
	console.log("To add name to phoneBook: node mongo.js <password> <name> <number>");
	process.exit(1);
}
