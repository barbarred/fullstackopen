import { useEffect } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import FilterAnecdote from './components/FilterAnecdote'
import Notification from './components/Notification'
import anecdoteServices from './services/anecdotes'
import { setAnecdote } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
 
const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    anecdoteServices
      .getAll().then(anecdotes => dispatch(setAnecdote(anecdotes)))
  }, [])

  return (
    <>
    <h2>Anecdotes</h2>
    <FilterAnecdote />
    <Notification />
    <AnecdoteList />
    <AnecdoteForm />
    </>
  )
}

export default App