const express = require('express')
const app = express()

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
  
  app.get('/api/persons', (request, response) => {
	response.json(persons)
  })

  app.get('/api/persons/:id', (request, response)=>{
    const id = request.params.id;
    const person = persons.find(person => person.id === Number(id))
    if (person){
      response.json(person);
    }else{
      response.status(404)

      response.send(`<h1 style="color:red;">No person with id ${id}</h1>`);
    }
  })

  app.delete('/api/persons/:id', (request, response)=>{
      const id = request.params.id;
      persons = persons.filter( person => person.id !== Number(id));
      response.status(200);
      response.send(`The information with id ${id} has been deleted`);

  })
  
  app.post('/api/persons/', (request, response)=>{
    
    const person = request.body
    if(!person.name || !person.number 
      || persons.map(person=>person.name).indexOf(person.name)!== -1 
      || persons.map(person=>person.number).indexOf(person.number)!== -1){
      response.status(400);
      response.send(!person.name?"name is missing"
        :(!person.number? "number is missing"
          :(persons.map(person=>person.name).indexOf(person.name)!== -1 ? `name already exists at id ${persons.map(person=>person.name).indexOf(person.name)}`
          : `The number already exists at id ${persons.map(person=>person.number).indexOf(person.number)}`)))
    }
    //this id selection is less than ideal no idea why the exercise ask us to use a Math.random
    person.id = Math.ceil(Math.random()* 100000)
  
    persons = persons.concat(person);

    response.json(persons)
  })

  app.get('/info', (request, response)=> {
    const requestTime = new Date().toString();
    response.send(`<div><p><b>The phonebook has information on ${persons.length} people</b></p><p>${requestTime}</p></div>`)
  })
  
  const PORT = 3001
  app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
  })