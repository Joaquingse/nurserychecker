import axios from 'axios'
import { useAuthStore } from '../stores/store'

const API = axios.create({
  baseURL: 'https://nursery-checker.onrender.com/api',
  headers: {
    token: localStorage.getItem('token')
  }
})

async function getDrops() {
  const store = useAuthStore()
  try {
    const response = await API.get('/inout/drops', {
      headers: {
        token: store.token
      }
    })
    return response.data
  } catch (error) {
    return { error: error.message }
  }
}

async function getDrop(id) {
  const store = useAuthStore()
  try {
    const response = await API.get(`/inout/drops?${child= id}`, {
      headers: {
        token: store.token
      }
    })
    return response.data
  } catch (error) {
    return { error: error.message }
  }
}

async function getPicks() {
  const store = useAuthStore()
  try {
    const response = await API.get('/inout/picks', {
      headers: {
        token: store.token
      }
    })
    return response.data
  } catch (error) {
    return { error: error.message }
  }
}

async function getPick(id) {
  const store = useAuthStore()
  try {
    const response = await API.get(`/inout/picks?${child= id}`, {
      headers: {
        token: store.token
      }
    })
    return response.data
  } catch (error) {
    return { error: error.message }
  }
}


async function addDrops(info) {
  const store = useAuthStore()
  try {
    const response = await API.post('/inout/drop', info, {
      headers: {
        token: store.token
      }
    })
    return response.data
  } catch (error) {
    return { error: error.message }
  }
}

async function addPicks(info) {
  const store = useAuthStore()
  try {
    const response = await API.post('/inout/pick', info, {
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
  getDrops,
  getDrop,
  getPicks,
  getPick,
  addDrops,
  addPicks,
}