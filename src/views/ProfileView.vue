<template>
  <UserProfile :user="user"/>
</template>

<script>
import UserProfile from '../components/UserProfile.vue'
import { useAuthStore } from '../stores/store'
import api from '../services/api.js'

export default {
  components: { UserProfile },
  data() {
    return {
      user: {},
    }
  },
  async beforeCreate () {
    const store = useAuthStore()
    const response = await api.getUsers()
    response.filter((el) => {
      if (store.email === el.email) {
        this.user = el
      }
    })
  },
}
</script>

<style scoped></style>
