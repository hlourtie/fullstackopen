import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const createNew = async (content) => {
  const newAnecdote = asObject(content)
  const response =  await axios.post(baseUrl, newAnecdote)
  return response.data
}

const vote = async (anecdote) => {
  const response = await axios.put(baseUrl+'/' + anecdote.id, anecdote )
  return response.data
}
const anecdoteService = { getAll, createNew, vote  }
export default anecdoteService