import { createSlice } from "@reduxjs/toolkit"


const getId = () => (100000 * Math.random()).toFixed(0)


const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    newAnecdote(state, action){
      const content = action.payload
      state.push({
        content,
        id: getId(),
        votes: 0
      })
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

/*
const anecdoteReducer = (state = initialState, action) => {

  switch(action.type) {
    case 'VOTE': {
      const id = action.payload.id
      const anectodeToVote = state.find(n => n.id === id)
      const anecdoteVoted = {
        ...anectodeToVote,
        votes: anectodeToVote.votes + 1
      }
      return state.map(anectode => 
        anectode.id !== id ? anectode : anecdoteVoted
      )
    }
    case 'NEW_ANECDOTE':
      return [...state, action.payload]

  }

  return state
}

export const newAnecdote = (content) => {
  return {
    type: 'NEW_ANECDOTE',
    payload: {
      content: content,
      votes: 0,
      id: getId()
    }
  }
}

export const voteAnecdote = (id) => {
  return {
    type: 'VOTE',
    payload: {
      id: id
    }
  }
}
export default anecdoteReducer
*/

export const { newAnecdote, voteAnecdote,setAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer