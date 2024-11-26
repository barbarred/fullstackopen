import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import FilterAnecdote from './components/FilterAnecdote'
import Notification from './components/Notification'

const App = () => {

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