import { useEffect, useState } from "react"
import axios from "axios"

function App() {
  const [country, setCountries] = useState('')
  const [value, setValue] = useState('')
  const [result, setResult] = useState({})

  useEffect(()=>{
    if(!country) return
    axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${country}`)
      .then(response => {
        console.log(response.data.name.common)
        setResult(response.data)
      })
  },[country])

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  const onSearch = (event) => {
    event.preventDefault()
    setCountries(value)
  }
  console.log(result.area)

  return (
    <>
      <h1>Countries</h1>
      <form onSubmit={onSearch}>
        find countries <input value={value} onChange={handleChange}/>
        <button type="submit">buscar</button>
      </form>
      <div>
       {country}
       {result.area}
      </div>
    </>
  )
}

export default App
