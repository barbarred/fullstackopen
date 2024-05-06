export const Filter = ({newfilter, handleFilter}) => {
    return(
        <div>
            filter shown with <input value={newfilter} onChange={handleFilter} />
        </div>
    )
}