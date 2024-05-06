import { useState } from 'react'
import {Filter} from './components/Filter.jsx'
import {PersonForm} from './components/PersonForm.jsx'
import {Persons} from './components/Persons.jsx'

const App = () => {
  const [persons, setPersons] = useState([
    {name: 'Alex', number: 1612902},
    {name: 'Pepe', number: 64188837},
    {name: 'Rorri', number: 1523654},
    {name: 'Mari', number: 1478524},
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newfilter, setFilter] = useState('')


  const handleChange = (event) => {
    setNewName(event.target.value)
  }
  const handleChangeNumber = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilter = (event) => {
    setFilter(event.target.value)
  }
  
  const filterResult = persons.filter(person => person.name.toLowerCase().includes(newfilter.toLowerCase())) 

  const addNumber = (event) => {
    event.preventDefault()
    if(newName === '' || newNumber === '') return
    function nameCheck(persons, check) {
      return persons.find(obj => obj.name === check) !== undefined
    }
    function numberCheck(persons, numCheck){
        return persons.find(objN => objN.number === numCheck) !== undefined
      }
    if(nameCheck(persons, newName) || numberCheck(persons, newNumber)){
      alert(`The name: ${newName} or the number: ${newNumber} is already added to phonebook`)
    }else{
      const newObject = {
      name: newName,
      number: newNumber,
      }
      setPersons(persons.concat(newObject))
      setNewName('')
      setNewNumber('')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter newfilter={newfilter} handleFilter={handleFilter}/>

      <h2>add a new</h2>

      <PersonForm addNumber={addNumber} newName={newName} handleChange={handleChange} newNumber={newNumber} handleChangeNumber={handleChangeNumber} />
       
      <h2>Numbers</h2>
      
      <Persons filterResult={filterResult}/>
    </div>
  )
}

export default App