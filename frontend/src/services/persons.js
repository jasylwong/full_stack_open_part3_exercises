import axios from 'axios';
const baseUrl = "/api/persons";

const getAll = () => {
  return axios.get(baseUrl).then(response => response.data)
}

const create = (person) => {
  return axios.post(baseUrl, person).then(response => response.data)
}

const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

const update = (id, updatedPerson) => {
  const request = axios.put(`${baseUrl}${id}`, updatedPerson)
  return request.then(response => response.data)
}

export default { getAll, create, remove, update }