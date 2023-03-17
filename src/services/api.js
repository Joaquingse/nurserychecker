import axios from 'axios'
import { useAuthStore } from '../stores/store'

const API = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    token: localStorage.getItem('token')
  }
})

async function login(user) {
  try {
    const response = await API.post('/auth/login', user)
    return response.data
  } catch (error) {
    return { error: error.message }
  }
}

async function getUsers() {
  const store = useAuthStore()
  try {
    const response = await API.get('/user/', {
      headers: {
        token: store.token
      }
    })
    return response.data
  } catch (error) {
    return error
  }
}

async function getUserInfo(id) {
  const store = useAuthStore()
  try {
    const response = await API.get(
      `/user/${id}`,
      { id: id },
      {
        headers: {
          token: store.token
        }
      }
    )
    return response.data
  } catch (error) {
    return error
  }
}

async function updateUserInfo(id, info) {
  const store = useAuthStore()
  try {
    const response = await API.put(
      `/user/${id}`,
      info,
      {
        headers: {
          token: store.token
        }
      }
    )
    return response.data
  } catch (error) {
    return error
  }
}

export default {
  login,
  getUsers,
  getUserInfo,
  updateUserInfo
}
