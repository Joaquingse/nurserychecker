<template>
  <v-col cols="12" md="8" l="6" class="mx-auto">
    <v-card class="info" v-if="!edit">
      <v-card-title>Datos de usuario </v-card-title>
      <v-divider></v-divider>
      <v-card-text> Nombre: {{ name.toLocaleUpperCase() }} </v-card-text>
      <v-card-text> Apellido: {{ surname.toLocaleUpperCase() }} </v-card-text>
      <v-card-text> DNI: {{ dni.toLocaleUpperCase() }} </v-card-text>
      <v-card-text> Teléfono: {{ phone }} </v-card-text>
      <v-card-text> E-mail: {{ email }} </v-card-text>
      <v-divider></v-divider>
      <v-card-actions class="button">
                <v-spacer></v-spacer>
        <v-btn id="text" @click.prevent="editInfo" prepend-icon="mdi-square-edit-outline">
          Editar
        </v-btn>
        <v-btn @click.prevent="goBack" id="text" prepend-icon="mdi-arrow-left"> Atrás </v-btn>
      </v-card-actions>
    </v-card>
    <v-card class="info" v-else>
      <v-card-title>Nuevos datos de usuario </v-card-title>
      <v-divider></v-divider>
      <v-text-field
        label="Nombre"
        placeholder="Introduzca su nuevo nombre"
        hide-details="auto"
        v-model="info.name"
      ></v-text-field>
      <v-text-field
        label="Apellido"
        placeholder="Introduzca su nuevo apellido"
        hide-details="auto"
        v-model="info.surname"
      ></v-text-field>
      <v-text-field
        label="DNI"
        placeholder="Introduzca su nuevo DNI"
        hide-details="auto"
        v-model="info.dni"
      ></v-text-field>
      <v-text-field
        label="Teléfono"
        placeholder="Introduzca su nuevo teléfono"
        hide-details="auto"
        v-model="info.phone"
      ></v-text-field>
      <v-text-field
        label="E-mail"
        placeholder="Introduzca su nuevo e-mail"
        hide-details="auto"
        v-model="info.email"
      ></v-text-field>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click.prevent="updateInfo" id="text" prepend-icon="mdi-content-save-outline">
          aceptar
        </v-btn>
        <v-btn @click.prevent="editInfo" id="text"> Atrás </v-btn>
      </v-card-actions>
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
      id: '',
      info: {},
      edit: false
    }
  },
  async created() {
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
    this.dni = userInfo.dni
    this.email = userInfo.email
    this.phone = userInfo.phone
    this.info.name = userInfo.name
    this.info.surname = userInfo.surname
    this.info.dni = userInfo.dni
    this.info.email = userInfo.email
    this.info.phone = userInfo.phone
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    editInfo() {
      this.edit = !this.edit
    },
    async updateInfo() {
      const store = useAuthStore()
      if (!store.isLoggedIn) {
        alert('Usuario no logeado')
      }
      const response = await api.updateUserInfo(this.id, this.info)
      if (response === 'error') {
        Alert('No se pudo actualizar')
      } else {
        this.name = this.info.name.toLocaleUpperCase()
        this.surname = this.info.surname.toLocaleUpperCase()
        this.dni = this.info.dni.toLocaleUpperCase()
        this.email = this.info.email
        this.phone = this.info.phone
        this.edit = !this.edit
      }
    }
  }
}
</script>

<style scoped>
#text {
  color: #073b4c;
  background-color: #06d6a0;
}

.info {
  color: #ffffff;
  background-color: #073b4c;
}

#text:hover {
  color: #ffffff;
  background-color: #06d6a0;
}
</style>
