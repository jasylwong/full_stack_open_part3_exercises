const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}
const password = process.argv[2]

if (process.argv.length === 4) {
  console.log('give both name and number as arguments')
  process.exit(1)
}
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://jasylwong:${password}@cluster0-7yxwh.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology:true })

const personSchema = new mongoose.Schema({
  name: String,
  number: Number
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
  Person.find({}).then(response => {
    console.log('phonebook:')
    response.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
} else {
  const person = new Person({
    name: `${name}`,
    number: number
  })

  person.save().then(response => {
    console.log(`added ${person.name} ${person.number} to phonebook`)
    mongoose.connection.close()
  })
}