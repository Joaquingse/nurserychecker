import axios from 'axios'
import { useAuthStore } from '../stores/store'

const API = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    token: localStorage.getItem('token')
  }
})

async function getTutors() {
  const store = useAuthStore()
  try {
    const response = await API.get('/tutor/', {
      headers: {
        token: store.token
      }
    })
    return response.data
  } catch (error) {
    return { error: error.message }
  }
}

async function addTutor(newTutor) {
  const store = useAuthStore()
  try {
    const response = await API.post('/tutor/add', newTutor, {
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
  getTutors,
  addTutor
}