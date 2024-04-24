import {useState} from 'react'
import './App.css'


const Button = ({change}) => {
    return(
      <button onClick={change}>next anectode</button>
    )
  }

function App() {

  const anectodes = [
    'If it hurts, do it more often,',
    'Adding manpower to a late software projects makes it later',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand, Good programmer write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place, therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use the console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well'
  ]

  const points = new Array(10).fill(0)
 
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState([...points])

  const handleNext = () => {
    let randomAnectode = Math.floor(Math.random() * 8)
    setSelected(randomAnectode)
  }
  const handleVote = () => {
    const votesCopy = [...votes]
    votesCopy[selected] += 1
    setVotes(votesCopy)
  }
  return (
    <>
      <div>
        {anectodes[selected]}
        <p>has {votes[selected]} votes</p>
        <Button change={handleNext}/>
        <button onClick={handleVote}>vote</button>
      </div>
    </>
  )
}

export default App
