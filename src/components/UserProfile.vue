<template>
  <v-row>
    <v-col cols="12" sm="10" class="mx-auto">
      <!-- user data -->
      <v-card class="info" v-if="!edit && !password">
        <v-card-title>Datos de usuario </v-card-title>
        <v-divider></v-divider>
        <v-card-text> Nombre: {{ user.name }} </v-card-text>
        <v-card-text> Apellido: {{ user.surname }} </v-card-text>
        <v-card-text> DNI: {{ user.dni }} </v-card-text>
        <v-card-text> Teléfono: {{ user.phone }} </v-card-text>
        <v-card-text> E-mail: {{ user.email }} </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn @click.prevent="password = true" prepend-icon="" class="button" size="small">
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
      <!-- edit user -->
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
          <v-btn
            @click.prevent="updateInfo"
            prepend-icon="mdi-content-save-outline"
            class="text"
            size="small"
          >
            aceptar
          </v-btn>
          <v-btn
            @click.prevent="editInfo"
            prepend-icon="mdi-chevron-left"
            class="text"
            size="small"
          >
            Atrás
          </v-btn>
        </v-card-actions>
      </v-card>
      <!-- password change -->
      <v-card class="info" v-if="password">
        <v-card-text>
          <v-text-field
            label="Password actual"
            placeholder=""
            :type="visible ? 'text' : 'password'"
            v-model="currentPassword"
            variant="outlined"
            :append-icon="visible ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="visible = !visible"
          ></v-text-field>
          <v-text-field
            label="Password nuevo"
            placeholder=""
            :type="visible1 ? 'text' : 'password'"
            v-model="newPassword"
            variant="outlined"
            :append-icon="visible1 ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="visible1 = !visible1"
          ></v-text-field>
          <v-text-field
            label="Repite nuevo Password"
            placeholder=""
            :type="visible2 ? 'text' : 'password'"
            v-model="newPassword2"
            variant="outlined"
            :append-icon="visible2 ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="visible2 = !visible2"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click.prevent="passUpdate" class="text" prepend-icon="" size="small">
            Aceptar
          </v-btn>
          <v-btn @click.prevent="password = false" class="text" prepend-icon="mdi-chevron-left" size="small">
            Atrás
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import api from '../services/api'
import { useAuthStore } from '../stores/store'

export default {
  props: {
    user: Object,
  },
  data() {
    return {
      info: {},
      visible: false,
      visible1: false,
      visible2: false,
      currentPassword: '',
      newPassword: '',
      newPassword2: '',
      edit: false,
      password: false
    }
  },

  methods: {
    goBack() {
      this.$router.go(-1)
    },
    editInfo() {
      this.info = this.user
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
        this.user.name = this.info.name.toLocaleUpperCase()
        this.user.surname = this.info.surname.toLocaleUpperCase()
        this.user.dni = this.info.dni.toLocaleUpperCase()
        this.user.email = this.info.email
        this.user.phone = this.info.phone
        this.edit = !this.edit
      }
    },

    async passUpdate() {
      if (this.newPassword !== this.newPassword2) {
        return alert('El nuevo password introducido no coincide')
      } else {
        const pass = {
          currentP: this.currentPassword,
          newP: this.newPassword
        }
        const response = await api.updatePassword(this.id, pass)
        return response
      }
    }
  },

  beforeCreate () {
    this.info = this.user
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
