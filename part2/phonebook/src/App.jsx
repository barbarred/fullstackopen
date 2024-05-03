import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    {}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')


  const handleChange = (event) => {
    setNewName(event.target.value)
  }
  const handleChangeNumber = (event) => {
    setNewNumber(event.target.value)
  }

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
      <form onSubmit={addNumber}>
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
            persons.map(person => 
            <p key={Math.random()}>{person.name} {person.number}</p>
            )
          }
        </ul>        
      </div>
    </div>
  )
}

export default App