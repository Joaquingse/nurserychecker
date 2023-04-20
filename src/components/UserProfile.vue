<template>
  <v-row>
    <v-col cols="12" sm="10" class="mx-auto">
      <v-card class="info" v-if="!edit && !password">
        <v-card-title>Datos de usuario </v-card-title>
        <v-divider></v-divider>
        <v-card-text> Nombre: {{ name.toLocaleUpperCase() }} </v-card-text>
        <v-card-text> Apellido: {{ surname.toLocaleUpperCase() }} </v-card-text>
        <v-card-text> DNI: {{ dni.toLocaleUpperCase() }} </v-card-text>
        <v-card-text> Teléfono: {{ phone }} </v-card-text>
        <v-card-text> E-mail: {{ email }} </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn @click.prevent="" prepend-icon="" class="button" size="small">
            Cambiar password
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            class="text"
            @click.prevent="editInfo"
            prepend-icon="mdi-square-edit-outline"
            size="small"
          >
            Editar
          </v-btn>
          <v-btn @click.prevent="goBack" class="text" prepend-icon="mdi-chevron-left" size="small">
            Atrás
          </v-btn>
        </v-card-actions>
      </v-card>
      <v-card class="info pa-2" v-if="edit && !password">
        <v-card-title>Nuevos datos de usuario </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-text-field
            label="Nombre"
            placeholder=""
            v-model="info.name"
            variant="outlined"
          ></v-text-field>
          <v-text-field
            label="Apellido"
            placeholder=""
            v-model="info.surname"
            variant="outlined"
          ></v-text-field>
          <v-text-field
            label="DNI"
            placeholder=""
            v-model="info.dni"
            variant="outlined"
          ></v-text-field>
          <v-text-field
            label="Teléfono"
            placeholder=""
            v-model="info.phone"
            variant="outlined"
          ></v-text-field>
          <v-text-field
            label="E-mail"
            placeholder=""
            v-model="info.email"
            variant="outlined"
          ></v-text-field>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click.prevent="updateInfo" prepend-icon="mdi-content-save-outline" class="text" size="small">
            aceptar
          </v-btn>
          <v-btn @click.prevent="editInfo" prepend-icon="mdi-chevron-left" class="text" size="small">
            Atrás
          </v-btn>
        </v-card-actions>
      </v-card>
      <v-card class="info" v-if="password"></v-card>
    </v-col>
  </v-row>
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
      edit: false,
      password: false,
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
.text {
  color: #073b4c;
  background-color: #06d6a0;
}

.button {
  color: #ffffff;
  background-color: #ef476f;
}

.info {
  color: #ffffff;
  background-color: #073b4c;
}

.text:hover,
.button:hover {
  color: #ffffff;
  background-color: #06d6a0;
}
</style>
