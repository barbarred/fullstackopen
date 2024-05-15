import { useEffect, useState } from "react"
import axios from "axios"

const FullList = ({country, value}) => {
  
  if(value === '') return

  if(country.length > 10){
    return(
      <p>Too many matches, specify another filter</p>
    )
  }else if(country.length > 1){
    return(
      <>
      <ul>
        {country.map(cont =>
          <li>{cont.name.common}</li>
        )}
      </ul>
      <p>mas de 2</p>
      </>
    )
  }else{

  const languages = country.map(len => len.languages)
  const len = languages[0]
  console.log(len)

  return(
    <>
    {country.map(cont =>
      <div>
        <p>{cont.name.common}</p>
        <img src={cont.flags.png} alt="" />
      </div>
    )}
    </>
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
    if(value === '') return
    setCountry(countryDetails)
  }


  return (
    <>
      <h1>Countries</h1>
        find countries <input value={value} onChange={handleChange}/>
      <div>
        {
          <FullList country={country} value={value}/>
        }
      </div>
    </>
  )
}

export default App
