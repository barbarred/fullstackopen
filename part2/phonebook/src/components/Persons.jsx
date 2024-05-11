import { ButtonDelete } from './ButtonDelete.jsx'
import servicesPersons from '../services/persons.jsx'

export const Persons = ({filterResult, setPersons}) => {

    const handleRemoveOf = (id, person) => {
      if(window.confirm(`delete ${person}`)){
        servicesPersons
        .deletePerson(id)
        .then(response => {
          setPersons(filterResult.filter(per => per.id !== response.data.id))
        })
        return
      }
    }
    return(
        <div>
            <ul>
            {
            filterResult.map(person => 
                <p key={Math.random()}>{person.name} {person.number} <ButtonDelete id={person.id} handleRemove={()=>handleRemoveOf(person.id, person.name)}/> </p>
            )
            }
            </ul>        
        </div>
    )
}