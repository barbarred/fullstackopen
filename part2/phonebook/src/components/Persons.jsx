import axios from 'axios'
import { ButtonDelete } from './ButtonDelete.jsx'

export const Persons = ({filterResult, setPersons}) => {

    const handleRemoveOf = (id) => {

      axios.delete(`http://localhost:3001/persons/${id}`)
      .then(response => {
        window.confirm(`delete ${response.data.name}`)
        setPersons(filterResult.filter(per => per.id !== response.data.id))
        
      })
    }

    return(
        <div>
            <ul>
            {
            filterResult.map(person => 
                <p key={Math.random()}>{person.name} {person.number} <ButtonDelete id={person.id} handleRemove={()=>handleRemoveOf(person.id)}/> </p>
            )
            }
            </ul>        
        </div>
    )
}