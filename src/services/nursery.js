import axios from 'axios'
import { useAuthStore } from '../stores/store'

const API = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    token: localStorage.getItem('token')
  }
})

async function getNurseries() {
  const store = useAuthStore()
  try {
    const response = await API.get('/nursery/', {
      headers: {
        token: store.token
      }
    })
    return response.data
  } catch (error) {
    return { error: error.message }
  }
}

async function updateNursery(id,info) {
  const store = useAuthStore()
  try {
    const response = await API.put(`/nursery/${id}`, info, {
      headers: {
        token: store.token
      }
    })
    return response.data
  } catch (error) {
    return { error: error.message }
  }
}

export default {
  getNurseries,
  updateNursery
}
