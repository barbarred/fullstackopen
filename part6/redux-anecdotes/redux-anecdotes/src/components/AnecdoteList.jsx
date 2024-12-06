import { useDispatch, useSelector } from "react-redux"
import { vote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const Anecdote = ({ anecdote, votes, idToVote }) => {
    const id = idToVote
    const dispatch = useDispatch()

    const handleVote = () => {
        dispatch(vote(id, votes, anecdote.content))
        dispatch(setNotification(`you voted '${anecdote.content}'`))
        setTimeout(()=>{
            dispatch(setNotification(''))
        }, 5000)
    }
    return (
        <li>
            {anecdote.content} <br/> has {votes}  <button onClick={handleVote}>vote</button>
        </li>
    )
}

const AnecdoteList = () => {
  
    const anecdotes = useSelector(state => {
        if(state.filter === '') return state.anecdotes
        return state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
    })
    const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes)

    return (
        <ul>
            {sortedAnecdotes.map(anecdote => 
            <Anecdote 
                key={anecdote.id} 
                anecdote={anecdote} 
                votes={anecdote.votes}
                idToVote={anecdote.id}
            />
            )}
        </ul>
    )
}

export default AnecdoteList