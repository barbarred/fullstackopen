import { useDispatch, useSelector } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"

const Anecdote = ({ anecdote, votes, handleVote }) => {
    return (
        <li>
            {anecdote.content} <br/> has {votes}  <button onClick={handleVote}>vote</button>
        </li>
    )
}

const AnecdoteList = () => {
    const dispatch = useDispatch()
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
                handleVote={() => dispatch(voteAnecdote(anecdote.id))}
            />
            )}
        </ul>
    )
}

export default AnecdoteList