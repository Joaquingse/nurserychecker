<template>
  <v-col cols="12" md="8" l="6" class="mx-auto">
    <v-card>
      <v-card-title>Datos de usuario </v-card-title>
      <v-spacer></v-spacer>
      <v-card-text> Nombre: {{ name.toLocaleUpperCase() }} </v-card-text>
      <v-card-text> Apellido: {{ surname.toLocaleUpperCase() }} </v-card-text>

      <v-spacer></v-spacer>
      <v-card-item>
          <v-btn @click.prevent="goBack" rounded id="text"> Atrás </v-btn>
      </v-card-item>
    
    </v-card>
  </v-col>
</template>

<script>
import api from '../services/api'
import { useAuthStore } from '../stores/store'

export default {
  data() {
    return {
      name: '',
      surname: '',
      dni: '',
      phone: '',
      email: '',
      id: ''
    }
  },
  async beforeCreate() {
    const store = useAuthStore()
    const response = await api.getUsers()
    response.filter((el) => {
      if (store.email === el.email) {
        this.id = el._id
      }
    })
    const userInfo = await api.getUserInfo(this.id)
    this.name = userInfo.name
    this.surname = userInfo.surname
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
#text {
  color: #06d6a0;
  background-color: #073b4c;
}

#text:hover {
  color: #073b4c;
  background-color: #06d6a0;
}
</style>
