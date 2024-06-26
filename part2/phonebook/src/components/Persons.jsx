import { ButtonDelete } from './ButtonDelete.jsx'
import servicesPersons from '../services/persons.jsx'

export const Persons = ({filterResult, setPersons, setErrorMessage}) => {

    const handleRemoveOf = (id, personName) => {
      if(window.confirm(`delete ${personName}`)){
        servicesPersons
        .deletePerson(id).then(response => {
          setPersons(filterResult.filter(per => per.id !== response.data.id))
          setErrorMessage(`${personName} has been eliminated`)
          setTimeout(()=>{
          setErrorMessage(null)
        }, 4000)
        })
        return
      }
    }
    return(
        <div>
            <ul>
            {
            filterResult.map(person => 
                <p key={Math.random()}>{person.personName} {person.number} <ButtonDelete id={person.id} handleRemove={()=>handleRemoveOf(person.id, person.personName)}/> </p>
            )
            }
            </ul>        
        </div>
    )
}