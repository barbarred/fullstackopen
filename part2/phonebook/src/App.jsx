import { useState } from 'react'

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

      <div>
        filter shown with <input value={newfilter} onChange={handleFilter} />
      </div>
      <form onSubmit={addNumber}>

      <h2>add a new</h2>
        <div>
          name: <input value={newName} onChange={handleChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleChangeNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        <ul>
          {
            filterResult.map(person => 
            <p key={Math.random()}>{person.name} {person.number}</p>
            )
          }
        </ul>        
      </div>
    </div>
  )
}

export default App