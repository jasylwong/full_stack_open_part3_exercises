const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
require('dotenv').config()

const url = process.env.MONGODB_URI

console.log('connecting to ', url);

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
    console.log('successfully connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB: ', error.message);
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  number: Number,
})
personSchema.plugin(uniqueValidator)

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)

// Below lines for if want to test that this file 
// in isolation can converse with MongoDB

// const Person = mongoose.model('Person', personSchema)

// Person.find({}).then(result => {
//   result.map(person => {
//     console.log(person)
//   })
//   mongoose.connection.close()
// })
