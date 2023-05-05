<template>
  <v-container>
    <v-row justify="end" class="pr-3 mt-1">
      <v-btn
        :to="{ name: 'adduser' }"
        class="text"
        v-if="role === 'admin' || role === 'owner'"
        prepend-icon="mdi-plus"
        size="small"
      >
        Añadir
      </v-btn>
      <v-btn @click.prevent="goBack" class="text" prepend-icon="mdi-chevron-left" size="small">
        Atrás
      </v-btn>
    </v-row>
    <v-row justify="start">
      <v-col cols="12" sm="6" md="4" v-for="(user, idx) in users" :key="idx">
        <Workers :user="user" @remove_user="deleteUser" @edit_user="updateInfo" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Workers from '../components/Workers.vue'
import api from '../services/api'
import { useAuthStore } from '../stores/store'

export default {
  data() {
    return {
      users: [],
      role: ''
    }
  },
  components: {
    Workers
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    async deleteUser(id) {
      const store = useAuthStore()
      const idx = this.users.findIndex((el) => el._id === id)
      if (store.isLoggedIn && this.role === 'admin') {
        const response = await api.remUser(id)
        this.users.splice(idx, 1)
        return response
      } else {
        return alert('No tiene permiso para borrar usuarios')
      }
    },
    async updateInfo(id, info) {
      const store = useAuthStore()
      if (this.role !== 'admin' && this.role !== 'owner') {
        alert('No tiene permiso para realizar esta acción')
      }
      const response = await api.updateUserInfo(id, info)
      if (response === 'error') {
        Alert('No se pudo actualizar')
      }

      /*      const response = await api.updateUserInfo(id)
      if (response === 'error') {
        Alert('No se pudo actualizar')
      } else {
        this.name = 
        this.surname = 
        this.dni = 
        this.email = 
        this.phone = 
      } */
    }
  },
  async created() {
    const store = useAuthStore()
    const response = await api.getUsers()
    response.filter((el) => {
      if (el.role !== 'admin') this.users.push(el)
    })
    this.users.sort((a,b) =>{
      if (a.name < b.name) {
        return -1
      }
    })
    this.role = store.role
  
  }
}
</script>

<style scoped>
.text {
  color: #06d6a0;
  background-color: #073b4c;
  margin-left: 15px;
}
.text:hover {
  color: #ffffff;
  background-color: #06d6a0;
}
</style>
