import { useEffect, useState } from 'react'
import {Filter} from './components/Filter.jsx'
import {PersonForm} from './components/PersonForm.jsx'
import {Persons} from './components/Persons.jsx'
import servicesPersons from './services/persons.jsx'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newfilter, setFilter] = useState('')

  let filterResult = persons.filter(person => person.name.toLowerCase().includes(newfilter.toLowerCase())) 
  
  useEffect(()=>{
      servicesPersons
      .getPersons()
      .then( response =>{
        setPersons(response.data)
      })
    },[])

  const handleChange = (event) => {
    setNewName(event.target.value)
  }
  const handleChangeNumber = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilter = (event) => {
    setFilter(event.target.value)
  }
  
  const addNumber = (event) => {
    event.preventDefault()
    if(newName === '' || newNumber === '') return

    function nameCheck(persons, check) {
      return persons.find(obj => obj.name === check) !== undefined
    }

    if(nameCheck(persons, newName)){
      if(!(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`))) return
      const personUpdated = {
      name: newName,
      number: newNumber
      }
      const person = filterResult.find(per => per.name === newName)
      const id = person.id

      servicesPersons
      .updatePerson(id, personUpdated)
      .then(response => {
        setPersons(filterResult.map(pers => pers.id !== id ? pers : response.data))
        setNewName('')
        setNewNumber('')
      })
    
    }else{
      const newObject = {
      name: newName,
      number: newNumber,
      }
      servicesPersons
      .addPerson(newObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
      })
    }
  }

  return (
    <div style={{padding:'10px'}}>
      <h2>Phonebook</h2>

      <Filter newfilter={newfilter} handleFilter={handleFilter}/>

      <h2>add a new</h2>

      <PersonForm addNumber={addNumber} newName={newName} handleChange={handleChange} newNumber={newNumber} handleChangeNumber={handleChangeNumber} />
       
      <h2>Numbers</h2>
      
      <Persons filterResult={filterResult} setPersons={setPersons}/>
    </div>
  )
}

export default App