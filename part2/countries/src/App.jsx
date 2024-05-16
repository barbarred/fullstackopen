import { useEffect, useState } from "react"
import axios from "axios"


const FullListView = ({country, value}) => {
  if(value === '') return

  if(country.length > 10){
    return (
      <p>Too many matches, specify another filter</p>
    )
  }
}

const ListView = ({country, value}) => {
  if(value === '') return


  if(country.length > 1 && country.length < 10 ){
    return(
      <>
      <ul>
        {country.map(cont =>
          <li key={cont.name.common}>{cont.name.common} <button>show</button> </li>
        )}
      </ul>
      </>
    )
  }
}

const CountryView = ({country, value}) => {
  if(value === '') return

  if(country.length === 1){
    return(
      <>
      {country.map(cont =>
        <div key={cont.name.common}>
          <h1>{cont.name.common}</h1>
          <p>{cont.capital[0]}</p>
          <p>{cont.area}</p>
          <p style={{fontWeight:'bold'}}>languages:</p>
          <ul>
          {
            Object.values(cont.languages).map(value => <li>{value}</li> )
          }
          </ul>
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
    let lastValue = event.target.value
    setValue(lastValue)
    const countryDetails = countries.filter(count => count.name.common.toLowerCase().includes(value.toLowerCase()))
    if(value === '') return
    setCountry(countryDetails)
  }


  return (
    <>
        find countries <input value={value} onChange={handleChange}/>
      <div>
        {
          <>
          <FullListView country={country} value={value}/>
          <ListView country={country} value={value}/>
          <CountryView country={country} value={value}/>
          </>
        }
      </div>
    </>
  )
}

export default App
