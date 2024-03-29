import axios from 'axios'
import { getTransitionRawChildren } from 'vue'
import { useAuthStore } from '../stores/store'

const API = axios.create({
  baseURL: 'https://nursery-checker.onrender.com/api',
  headers: {
    token: localStorage.getItem('token')
  }
})

async function getChildren() {
  const store = useAuthStore()
  try {
    const response = await API.get('/child/', {
      headers: {
        token: store.token
      }
    })
    return response.data
  } catch (error) {
    return { error: error.message }
  }
}

async function getChild(id) {
  const store = useAuthStore()
  try {
    const response = await API.get(`/child/${id}`, 
    {id: id}, 
    {
      headers: {
        token: store.token
      }
    })
    return response.data
  } catch (error) {
    return { error: error.message }
  }
}

async function addChild(newChild) {
  const store = useAuthStore()
  try {
    const response = await API.post('/child/add', newChild, {
      headers: {
        token: store.token
      }
    })
    return response.data
  } catch (error) {
    return { error: error.message }
  }
}

async function updateChild(id,info) {
  const store = useAuthStore()
  try {
    const response = await API.put(`/child/${id}`, info, {
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
  getChildren,
  getChild,
  addChild,
  updateChild,
  
}
