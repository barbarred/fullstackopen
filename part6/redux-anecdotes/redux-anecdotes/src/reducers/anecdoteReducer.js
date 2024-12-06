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
      return state.map(anectode => 
        anectode.id !== id ? anectode : anectodeToVote
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

export const vote = (id, votes, content) => {
  return async dispatch => {
    const anecdoteVoted = await anecdoteService.voteAnect(id, votes, content)
    dispatch(voteAnecdote(anecdoteVoted))
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdote(anecdotes))
  }
}

export const { newAnecdote, voteAnecdote,setAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer