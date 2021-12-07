const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
//used to parse the data coming in from post

app.use(express.json());
app.use(cors())

morgan.token('body', (req,res) => {
  return JSON.stringify({name:req.body.name, number:req.body.number})
});
app.use(morgan(`:method :url :status :res[content-length] - :response-time ms :body`))
let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (request, response) => {
	response.send('<h1>This is a  phone book</h1>')
  })
  
  app.get('/api/persons/', (request, response) => {
	response.json(persons)
  })

  app.get('/api/persons/:id', (request, response)=>{
    const id = request.params.id;
    const person = persons.find(person => person.id === Number(id))
    if (person){
      response.json(person);
    }else{
      response.status(404).send({error:`No person with id ${id} present in the phonebook`});
    }
  })

  app.delete('/api/persons/:id', (request, response)=>{
      const id = request.params.id;
      const person = persons.find(person => person.id === Number(id))
      if(person){
      persons = persons.filter( person => person.id !== Number(id));
      response.status(200).send({message:`The information with id ${id} has been deleted`});
    }else{
      response.status(404).send({error:`No person with id ${id} present in the phonebook`});
    }

  })
  
  app.post('/api/persons', (request, response)=>{
    
    const person = request.body
    console.log(request.params);
    if(!person.name || !person.number 
      || persons.map(person=>person.name).indexOf(person.name)!== -1 
      || persons.map(person=>person.number).indexOf(person.number)!== -1){
      response.status(400).send(!person.name?"name is missing"
        :(!person.number? "number is missing"
          :(persons.map(person=>person.name).indexOf(person.name)!== -1 ? `name already exists at id ${persons[persons.map(person=>person.name).indexOf(person.name)].id}`
          : `The number already exists at id ${persons[persons.map(person=>person.number).indexOf(person.number)].id}`)))
    }else{person.id = Math.ceil(Math.random()* 100000)
  
      persons = persons.concat(person);
  
      response.json(persons)}
    //this id selection is less than ideal no idea why the exercise ask us to use a Math.random
    
  })

  app.get('/info', (request, response)=> {
    const requestTime = new Date().toString();
    response.send(`<div><p><b>The phonebook has information on ${persons.length} people</b></p><p>${requestTime}</p></div>`)
  })
  
  const PORT = process.env.PORT||3001 ;
  app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
  })