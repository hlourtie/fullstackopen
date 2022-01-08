import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}


const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = (body) => {
  const config = {
    headers: { Authorization: token }
  }
  const request = axios.post(baseUrl,body, config)
  return request.then(response => response.data)
}
const update = (id, body ) => {
  const config = {
    headers: { Authorization: token }
  }
  const request = axios.put(baseUrl+'/'+id,body, config)
  return request.then(response => response.data)
}
const remove = (id) => {
  const config = {
    headers: { Authorization: token }
  }
  const request = axios.delete(baseUrl+'/'+id, config)
  return request.then(response => response.data)
}
const blogService = {
  setToken,
  getAll,
  create,
  update,
  remove
}
export default blogService