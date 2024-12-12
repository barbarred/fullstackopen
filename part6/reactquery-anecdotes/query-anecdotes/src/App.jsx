import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, updateVote } from '../requests'
import { useReducer } from 'react'
import NotificationContext from './NotificationContext'

const notificationReducer = (state, action) => {
  switch (action.type){
    case "ADD":
      return "anecdote added successfully"
    case "VOTE":
      return `anecdote '${action.payload}' voted`
    case "RESET":
      return ''
    case "ERROR":
      return `${action.payload}`
    default:
      return state
  }
}

const App = () => { 
  const [notification, notificationDispath] = useReducer(notificationReducer, '')
  const queryClient = useQueryClient()

  const newVoteMotation = useMutation({
    mutationFn: updateVote,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['anecdotes']})
    }
  })

  const handleVote = (anecdote) => {
    const newVote = anecdote.votes + 1
    newVoteMotation.mutate({...anecdote, votes: newVote })
    notificationDispath({type: 'VOTE', payload: anecdote.content})
    setTimeout(() => {
      notificationDispath({type: 'RESET'})
    }, 5000)
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes
  })
  if(result.isLoading){
    return <div>loading data ...</div>
  }
  if(result.isError){
    return <div>anecdote service not available due to problems in server</div>
  }
  
  const anecdotes = result.data

  return (
    <NotificationContext.Provider value={[notification, notificationDispath]} >
    <div>
      <h3>Anecdote app</h3>
    
      <Notification notification={notification}/>
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
    </NotificationContext.Provider>
  )
}

export default App
