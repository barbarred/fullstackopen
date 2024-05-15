import { useEffect, useState } from "react"
import axios from "axios"

const FullList = ({country}) => {
  
  console.log(country.length)
  
  if(country.length > 10){
    return(
      <p>Too many matches, specify another filter</p>
    )
  }else if(country.length > 2){
    return(
      <>
      <p>{country.map(cont => cont.name.common)}</p>
      <p>mas de 2</p>
      </>
    )
  }else{
  return(
    <p>{country.map(cont => cont.name.common)}</p>

  )
  }

  
}


function App() {
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState([])
  const [value, setValue] = useState('')

  useEffect(()=>{
    axios.get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response => {
        const countries = response.data
        setCountries(countries)
      })
  },[])

  
  const handleChange = (event) => {
    setValue(event.target.value)
    const countryDetails = countries.filter(count => count.name.common.toLowerCase().startsWith(value.toLowerCase()))
    
    setCountry(countryDetails)
  }


  return (
    <>
      <h1>Countries</h1>
        find countries <input value={value} onChange={handleChange}/>
      <div>
        {
          <FullList country={country}/>
        }
      </div>
    </>
  )
}

export default App
