const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())
app.use(express.static('build'))

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method);
  console.log('Path:', request.path);
  console.log('Body:', request.body);
  console.log('---');
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(requestLogger)

app.get('/', (req, res) => 
  res.send('Hello world!! This is my phonebook app, created using Node.js')
)

app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons.map(person => person.toJSON()))
  })
})

app.get('/api/persons/:id', (req, res) => {
  Person.findById(req.params.id).then(person => {
    res.json(person.toJSON())
  })
})

app.get('/info', (req, res) => {
  res.send(`
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date}</p>
  `)
})

app.delete('/api/persons/:id', (req, res) => {
  Person.deleteOne({ _id: req.params.id.toString() }).then(person => {
    console.log('deleted');
  })
  res.status(204).end()
})

// const generateId = () => {
//   const MaxId = persons.length > 0 ? 
//     Math.max(...persons.map(person => person.id)) : 0    
//   return MaxId + 1;
// }

app.post('/api/persons/', (req, res) => {
  const body = req.body

  if (!body.name === undefined) {
    return res.status(400).json({
      error: 'name missing'
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save().then(savedPerson => {
    res.json(savedPerson.toJSON())
  })
  // morgan.token('type', function (req, res) { return req.headers['name'] })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})