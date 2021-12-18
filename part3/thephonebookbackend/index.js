require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Entry = require('./models/entry')
//used to parse the data coming in from post

app.use(express.static('build'))
app.use(express.json());
app.use(cors())

morgan.token('body', (req,res) => {
  return JSON.stringify({name:req.body.name, number:req.body.number})
});
app.use(morgan(`:method :url :status :res[content-length] - :response-time ms :body`))

app.get('/', (request, response) => {
	response.send('<h1>This is a  phone book</h1>')
  })
  
app.get('/api/persons/', (request, response, next) => {
  Entry.find({})
  .then(result =>{response.json(result);})
  .catch(error => next(error))
})

  app.get('/api/persons/:id', (request, response, next)=>{
    const id = request.params.id;
    Entry.findById(id)
    .then(entry => {
      if(entry){response.json(entry)}
    else{
      response.status(404).end()
    }})
    .catch(error =>next(error))
  })

  app.delete('/api/persons/:id', (request, response, next)=>{
      const id = request.params.id;
      Entry.findByIdAndDelete(id)
      .then(count=>{response.status(204).end()})
      .catch(error =>{next(error)})
  })
  
  app.post('/api/persons', (request, response,next)=>{
    const entry = new Entry({name: request.body.name, number:request.body.number})
    console.log(request.params);
    
    // if(!entry.name || !entry.number){
    //   const mess = `${!entry.name? "name is missing ": "number is missing" }`;
    //   response.status(400).send(mess)
    // }else{
        // Entry.find({number:entry.number}, function(err, entried) {
        //   console
        //   if(err) {next(err)}
        //   else if(entried.length) {
        //     response.status(response.status(409).send(`The number already exists at ${entried[0]._id}`))
        //   }else if(!entried.length) {

            // const person = new Entry({
            //   name: entry.name,
            //   number: entry.number
            // });
            entry.save().then(savedEntry => {
              response.status(201).json(savedEntry)
            }).catch(err => next(err));
          // }
        // })
    })

  app.put('/api/persons/:id', (request, response, next) => {
    //console.log("body", request.body);
      Entry.findByIdAndUpdate(request.params.id, {number:request.body.number}, {runValidators:true, new:true})
      .then(entry => {
        console.log("response entry", entry)
        response.status(200).json(entry)})
      .catch(error => next(error))
  })

  app.get('/info', (request, response)=> {
    const requestTime = new Date().toString();
    Entry.find({})
  .then(result =>{ response.send(`<div><p><b>The phonebook has information on ${result.length} people</b></p><p>${requestTime}</p></div>`)})
  .catch(error => next(error))
   
  })

  const undefinedEndPoint= (request, response) =>{
    response.status(404).send({error: 'wrong endpoint'});
  }
  
  app.use(undefinedEndPoint);

  const myErrorHandler = (error, request, response, next) =>{
    console.error(error.message)
    next(error)
  }

  app.use(myErrorHandler)
  

  const PORT = process.env.PORT||3001 ;
  app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
  })