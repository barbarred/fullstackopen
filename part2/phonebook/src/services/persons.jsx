import axios from "axios"

const baseUrl = 'http://localhost:3001/persons'

const getPersons = () => {
  return axios.get(baseUrl)
}

const addPerson = (newObject) => {
  return axios.post(baseUrl, newObject)
}

export default {
  getPersons,
  addPerson
}