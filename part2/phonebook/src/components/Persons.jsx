export const Persons = ({filterResult}) => {
    return(
        <div>
            <ul>
            {
            filterResult.map(person => 
                <p key={Math.random()}>{person.name} {person.number}</p>
            )
            }
            </ul>        
        </div>
    )
}