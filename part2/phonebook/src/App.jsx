import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas'}
  ]) 
  const [newName, setNewName] = useState('')

  const handleChange = (event) => {
    setNewName(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()
    if(newName === '') return
    function nameCheck(persons, check) {
      return persons.find(obj => obj.name === check) !== undefined
    }

    if(nameCheck(persons, newName)){
      alert(`${newName} is already added to phonebook`)
    }else{
      const newObject = {
      name: newName,
      }
      setPersons(persons.concat(newObject))
      setNewName('')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <div>
        <ul>
          {
            persons.map(person => 
            <p key={person.name}>{person.name}</p>
            )
          }
        </ul>        
      </div>
      <h2>Numbers</h2>
      ...
    </div>
  )
}

export default App