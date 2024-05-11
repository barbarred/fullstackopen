import { ButtonDelete } from './ButtonDelete.jsx'
import servicesPersons from '../services/persons.jsx'

export const Persons = ({filterResult, setPersons}) => {

    const handleRemoveOf = (id) => {
      servicesPersons
      .deletePerson(id)
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