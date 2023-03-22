<template>
  <v-col cols="12" sm="8">
    <v-card class="info">
      <v-card-title> Añadir Trabajador Nuevo: </v-card-title>
      <v-divider></v-divider>
      <v-text-field label="Nombre" placeholder="" v-model="newUser.name"> </v-text-field>
      <v-text-field label="Apellidos" placeholder="" v-model="newUser.surname"> </v-text-field>
      <v-text-field label="DNI" placeholder="" v-model="newUser.dni"> </v-text-field>
      <v-text-field label="Teléfono" placeholder="" v-model="newUser.phone"> </v-text-field>
      <v-text-field label="E-mail" placeholder="" v-model="newUser.email"> </v-text-field>
      <v-text-field label="Contraseña" placeholder="" v-model="newUser.password"> </v-text-field>
      <v-select
        label="Centro"
        :items="center"
        placeholder="elige un centro"
        v-model="newUser.nursery"
      >
      </v-select>
      <v-select
        label="Puesto"
        :items="role"
        v-model="newUser.role"
        v-if="store.role === 'admin'"
      ></v-select>
      <v-select label="Puesto" :items="role2" v-model="newUser.role" v-else></v-select>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          @click.prevent="addUser"
          prepend-icon="mdi-content-save-outline"
          class="text"
          :to="{ name: 'workers' }"
        >
          aceptar
        </v-btn>
        <v-btn @click.prevent="goBack" prepend-icon="mdi-arrow-left-bold-box-outline" class="text">
          Atrás
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<script>
import { useAuthStore } from '../stores/store'
import api from '../services/api'
import nursery from '../services/nursery'

export default {
  data() {
    return {
      store: useAuthStore(),
      newUser: {
        name: '',
        surname: '',
        dni: '',
        phone: '',
        email: '',
        password: '',
        nursery: '',
        role: ''
      },
      role: ['admin', 'owner', 'chief', 'worker'],
      role2: ['chief', 'worker'],
      nursery: [],
      center: []
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    async addUser() {
      this.nursery.filter((el) => {
        if (el.name === this.newUser.nursery) {
          this.newUser.nursery = el.id
        }
      })
      const response = await api.signup(this.newUser)
      return response
    }
  },
  async created() {
    const response = await nursery.getNurseries()
    response.forEach((el) => {
      this.nursery.push({ id: el._id, name: el.name })
    })
    this.nursery.forEach((el) => this.center.push(el.name))
  }
}
</script>

<style scoped>
.text {
  color: #073b4c;
  background-color: #06d6a0;
  width: fit-content;
}

.info {
  color: #ffffff;
  background-color: #073b4c;
}

.text:hover {
  color: #ffffff;
  background-color: #06d6a0;
}
</style>
