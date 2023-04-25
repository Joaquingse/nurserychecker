<template>
  <v-col cols="12" sm="8">
    <v-card class="info pa-2">
      <v-card-title> Añadir Trabajador Nuevo: </v-card-title>
      <v-divider></v-divider>
      <v-text-field label="Nombre" placeholder="" v-model="newUser.name" variant="outlined">
      </v-text-field>
      <v-text-field label="Apellidos" placeholder="" v-model="newUser.surname" variant="outlined">
      </v-text-field>
      <v-text-field label="DNI" placeholder="" v-model="newUser.dni" variant="outlined">
      </v-text-field>
      <v-text-field label="Teléfono" placeholder="" v-model="newUser.phone" variant="outlined">
      </v-text-field>
      <v-text-field
        label="E-mail"
        placeholder=""
        v-model="newUser.email"
        :rules="emailRules"
        variant="outlined"
      >
      </v-text-field>
      <v-text-field
        label="Contraseña"
        placeholder=""
        v-model="newUser.password"
        :rules="passwordRules"
        variant="outlined"
      >
      </v-text-field>
      <v-select
        label="Centro"
        :items="center"
        placeholder="elige un centro"
        v-model="newUser.nursery"
        variant="outlined"
      >
      </v-select>
      <v-select
        label="Puesto"
        :items="role"
        v-model="newUser.role"
        v-if="store.role === 'admin'"
        variant="outlined"
      ></v-select>
      <v-select label="Puesto" :items="role2" v-model="newUser.role" variant="outlined" v-else></v-select>
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
        <v-btn @click.prevent="goBack" prepend-icon="mdi-chevron-left" class="text"> Atrás </v-btn>
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
      emailRules: [
        (value) => !!value || 'Introduce un email válido',
        (value) =>
          value.match(/^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/) || 'Error en el email'
      ],
      passwordRules: [
        (value) => !!value || 'Introduce un password válido',
        (value) =>
          value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/) ||
          'El Password debe tener por lo menos una mayúscula, una minúscula y un número'
      ],
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
