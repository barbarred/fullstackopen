import { filterChange } from "../reducers/filterReducer"
import { useDispatch } from "react-redux"

const Filter = () => {
    const dispatch = useDispatch()
    
    const handleFilter = (event) => {
        const lastSearch = event.target.value
        dispatch(filterChange(lastSearch))
    }

    return (
        <div>
            filter <input onChange={handleFilter} />
        </div>
    )
}

export default Filter