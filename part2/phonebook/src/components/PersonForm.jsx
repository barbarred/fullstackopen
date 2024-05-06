
export const PersonForm = ({addNumber, newName, handleChange, newNumber, handleChangeNumber}) => {
    return(
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
    )
}


