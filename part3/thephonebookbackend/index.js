require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Entry = require('./models/entry')
//used to parse the data coming in from post

app.use(express.json());
app.use(express.static('build'))
app.use(cors())

morgan.token('body', (req,res) => {
  return JSON.stringify({name:req.body.name, number:req.body.number})
});
app.use(morgan(`:method :url :status :res[content-length] - :response-time ms :body`))


app.get('/', (request, response) => {
	response.send('<h1>This is a  phone book</h1>')
  })
  
app.get('/api/persons/', (request, response) => {
  Entry.find({})
  .then(result =>{response.json(result);})
  .catch(error => {response.status(400).send(`Something went wrong : ${error.message}`)})
})

  app.get('/api/persons/:id', (request, response)=>{
    const id = request.params.id;
    Entry.findById(id)
    .then(entry => {
      if(entry){response.json(entry)}
    else{
      response.status(404).end()
    }})
    .catch(error =>{response.status(400).send(`Something went wrong: ${error.message}`)})
  })

  app.delete('/api/persons/:id', (request, response)=>{
      const id = request.params.id;
      Entry.findByIdAndDelete(id)
      .then(count=>{response.status(204).end()})
      .catch(error =>{response.status(400).send(`Something went wrong: ${error.message}`)})
  })
  
  app.post('/api/persons', (request, response)=>{
    const entry = request.body
    console.log(request.params);
    if(!entry.name || !entry.number){
      const mess = `${!entry.name? "name is missing ": "number is missing" }`;
      response.status(400).send(mess)
    }else{
    Entry.find({name:entry.name}, function(err, entries) {
      console.log('name check: ', entries);
      if(err) {response.status(400).send(`something went wrong`)}
      else if(entries.length) {
        response.status(response.status(409).send(`The name already exists at ${entries[0]._id}`))
      }else if(!entries.length) {
        console.log('number check: ', entries);
        Entry.find({number:entry.number}, function(err, entried) {
          console
          if(err) {response.status(400).send(`something went wrong`)}
          else if(entried.length) {
            response.status(response.status(409).send(`The number already exists at ${entried[0]._id}`))
          }else if(!entried.length) {

            const person = new Entry({
              name: entry.name,
              number: entry.number
            });
            person.save().then(savedEntry => {
              response.status(201).json(savedEntry)
            }).catch(err => {response.status(400).send(`something went wrong with the creation`)});
          }
      })}
    })
  }
    
  })

  app.put('/api/persons/:id', (request, response) => {
    //console.log("body", request.body);
      Entry.findByIdAndUpdate(request.params.id, {number:request.body.number}, {new:true})
      .then(entry => {
        console.log("response entry", entry)
        response.status(200).json(entry)})
      .catch(error => response.status(400).send(`Something went horribly wrong : ${error.message}`))
  })

  app.get('/info', (request, response)=> {
    const requestTime = new Date().toString();
    response.send(`<div><p><b>The phonebook has information on ${persons.length} people</b></p><p>${requestTime}</p></div>`)
  })
  
  const PORT = process.env.PORT||3001 ;
  app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
  })