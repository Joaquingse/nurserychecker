import axios from 'axios'
import { useAuthStore } from '../stores/store'

const API = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    token: localStorage.getItem('token')
  }
})

async function getEvents() {
  const store = useAuthStore()
  try {
    const response = await API.get('/event/', {
      headers: {
        token: store.token
      }
    })
    return response.data
  } catch (error) {
    return { error: error.message }
  }
}

async function addEvents(info) {
  const store = useAuthStore()
  try {
    const response = await API.post('/event/new', info, {
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
  getEvents,
  addEvents
}