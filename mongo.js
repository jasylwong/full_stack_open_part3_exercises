const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}
const password = process.argv[2]

if (process.argv.length < 4) {
  console.log('give name as argument')
  process.exit(1)
}
const name = process.argv[3]

if (process.argv.length < 5) {
  console.log('give number as argument')
  process.exit(1)
}
const number = process.argv[4]

console.log(password);
console.log(name);
console.log(number);

process.exit(1)


const url = `mongodb+srv://jasylwong:${password}@cluster0-7yxwh.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology:true })

const personSchema = new mongoose.Schema({
  name: String,
  number: Number
})

const Person = mongoose.model('Person', personSchema)

// const person = new Person({
//   name: 'Jas',
//   number: 1234
// })

// person.save().then(response => {
//   console.log(`${person.name} saved`)
//   console.log(person);
//   mongoose.connection.close()
// })

Person.find({}).then(response => {
  response.forEach(person => {
    console.log(person);
  })
  mongoose.connection.close()
})
