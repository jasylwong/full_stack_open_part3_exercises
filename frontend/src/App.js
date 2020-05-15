import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import Form from './components/Form';
import Persons from './components/Persons';
import Notification from './components/Notification';
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [confMessage, setConfirmMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService.getAll().then(resolve => {
      setPersons(resolve)
    })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = { name: newName, number: newNumber}
    
    if (persons.map(person => person.name).includes(newName)) {
      const findId = persons.find(p => p.name === newName).id
      personService.update(findId, newPerson)
        .then(returnedPerson => {
          setPersons(persons.map(p => (p.id !== findId ? p : returnedPerson)))
        })
        .catch(error => {
          setErrorMessage(`${newName} has already been removed from server` )
          setTimeout(() => {setErrorMessage(null)}, 3000)
          setPersons(persons.filter(p => p.id !== findId))
        })
    } else if (persons.map(person => person.number).includes(newNumber)) {
      window.alert(`The number '${newNumber}' is already used by someone else`)
    } else {
      personService.create(newPerson).then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setConfirmMessage(`${newName} added`)
        setTimeout(() => {setConfirmMessage(null)}, 3000)
      })
    }
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  const filteredPersons = (people) => { 
    return ( filter === ''
      ? people
      : people.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
    )
  }

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService.remove(person.id).then(
        setPersons(
          persons.filter(p => (p.id !== person.id ? person : null))
        )
      )
      .catch(error => {
        console.log('error!')
        window.alert(`${person.name} already deleted`)
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={confMessage} borderColor='confirmation' />
      <Notification message={errorMessage} borderColor='error' />
      <Filter filter={filter} handleFilter={handleFilter}/>
      <h2>Add a new</h2>
      <Form addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons 
        filteredPersons={filteredPersons(persons)} 
        persons={persons} 
        deletePerson={deletePerson}
      />
    </div>
  )
}

export default App;
