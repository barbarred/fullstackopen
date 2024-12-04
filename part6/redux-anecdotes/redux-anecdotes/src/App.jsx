import { useEffect } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import FilterAnecdote from './components/FilterAnecdote'
import Notification from './components/Notification'
import { useDispatch } from 'react-redux'
import { initializateAnecdotes } from './reducers/anecdoteReducer'
 
const App = () => {
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(initializateAnecdotes())
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