import axios from 'axios'
import { useAuthStore } from '../stores/store'

const API = axios.create({
  baseURL: 'https://nursery-checker.onrender.com/api',
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

async function signup(newUser) {
  try {
    const response = await API.post('/auth/signup', newUser)
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

async function updatePassword(id, info) {
  const store = useAuthStore()
  try {
    const response = await API.post(
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

async function remUser(id){
  const store = useAuthStore()
  try {
    const response = await API.delete(
      `/user/${id}`,
      {id:id},
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
  signup,
  getUsers,
  getUserInfo,
  updateUserInfo,
  updatePassword,
  remUser
}
