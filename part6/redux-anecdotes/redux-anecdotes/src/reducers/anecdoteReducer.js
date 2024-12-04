import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    newAnecdote(state, action){
      state.push(action.payload)
    },
    voteAnecdote(state, action){
      const id = action.payload
      const anectodeToVote = state.find(n => n.id === id)
      const anecdoteVoted = {
        ...anectodeToVote,
        votes: anectodeToVote.votes + 1
        
      }
      return state.map(anectode => 
        anectode.id !== id ? anectode : anecdoteVoted
      )
    },
    setAnecdote(state, action){
      return action.payload
    }
  }
})

export const initializateAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdote(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnec = await anecdoteService.createNew(content)
    dispatch(newAnecdote(newAnec))
  }
}

export const { newAnecdote, voteAnecdote,setAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer