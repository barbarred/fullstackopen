import axios from "axios"

const baseUrl = 'http://localhost:3001/persons'

const getPersons = () => {
  return axios.get(baseUrl)
}

const addPerson = (newObject) => {
  return axios.post(baseUrl, newObject)
}

const deletePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

export default {
  getPersons,
  addPerson,
  deletePerson
}