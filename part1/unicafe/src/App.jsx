import { useState } from 'react'
import './App.css'


const Button = (props) => {
  return (
    <button onClick={props.handleClick}>{props.text}</button>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const total = good + neutral + bad
  const ptsGood = good * 1
  const ptsNeutral = neutral * 0 
  const ptsBad = bad * -1
  const sumaTotalPts = ptsGood + ptsNeutral + ptsBad
  let avg = (sumaTotalPts / total)
  isNaN(avg) ? avg = 0 : avg

  let positive = parseFloat(good/total*100)
  isNaN(positive) ? positive = 0 : positive

  return {total, avg, positive}
  
}


function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  let {total, avg, positive} = Statistics({good, neutral, bad})

  const handleSetGood = () => {
    const updatedGood = good + 1
    setGood(updatedGood)
  }
  
  const handleSetNeutral = () => {
    setNeutral(neutral + 1)
  }

  const handleSetBad = () => {
    setBad(bad + 1)
  }

  

  return (
    <>
      <div>
        <h2>give feedback</h2>
        <div>
          <Button handleClick={handleSetGood} text="good"/>
          <Button handleClick={handleSetNeutral} text="neutral"/>
          <Button handleClick={handleSetBad} text="bad"/>
        </div>

        <h2>statistics</h2>
        <p>good {good}</p>
        <p>neutral {neutral}</p>
        <p>bad {bad}</p>
        <p>all {total}</p>
        <p>average {avg}</p>
        <p>positive {positive}%</p>
      </div>
    </>
  )
}

export default App
