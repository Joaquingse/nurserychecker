<template>
  <v-container class="row">
    <v-row>
      <v-col cols="12" sm="10" md="8" class="mx-auto">
        <v-img
          src="https://res.cloudinary.com/burgerproject/image/upload/v1678192287/My%20images/logo_wh8syi.png"
          alt="logo"
          class="mx-auto logo"
        ></v-img>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="10" md="8" class="mx-auto">
        <v-card class="pa-4 login">
          <v-card-title id="text">Login</v-card-title>
          <v-text-field
            label="Email"
            placeholder="Email"
            v-model="email"
            filled
            rounded
            dense
          ></v-text-field>
          <v-text-field
            label="Password"
            :type="visible ? 'text' : 'password'"
            placeholder="Password"
            v-model="password"
            filled
            rounded
            dense
            :append-icon="visible ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="visible = !visible"
          ></v-text-field>
          <v-btn @click.prevent="loginUser" @keydown.enter="loginUser"> aceptar </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import api from '../services/api'
import { useAuthStore } from '../stores/store'
import { RouterLink } from 'vue-router'

export default {
  data() {
    return {
      visible: false,
      email: '',
      password: '',
      authStore: useAuthStore(),
      role: ''
    }
  },
  methods: {
    async loginUser() {
      const user = {
        email: this.email,
        password: this.password
      }
      const response = await api.login(user)
      if (response.error) {
        alert('password or email wrong')
      } else {
        this.authStore.login(response.token, response.email)
        const users = await api.getUsers()
        users.filter((user) => {
          if (user.email === this.email) {
            this.role = user.role
          }
        })
        this.authStore.roleCheck(this.role)
        this.$router.push({ name: 'menu' })
      }
    }
  }
}
</script>

<style scoped>
@media (min-width: 720px) {
  .row {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  .logo {
    margin-top: 40%;
  }
  .login {
    margin-top: 10%;
  }
}
</style>
