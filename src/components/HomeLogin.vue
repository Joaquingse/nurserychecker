<template>
  <v-container class="">
    <v-row id="row">
      <v-col cols="12" md="8" class="mx-auto" id="a">
        <v-img
          src="https://res.cloudinary.com/burgerproject/image/upload/v1678192287/My%20images/logo_wh8syi.png"
          alt="logo"
          class="mx-auto"
        ></v-img>
      </v-col>

      <v-col cols="12" sm="10" md="8" class="mx-auto" id="b">
        <h3 id="text">Login</h3>
        <v-text-field
          label="Email"
          placeholder="Email"
          v-model="email"
          filled
          class="ma-4"
        ></v-text-field>
        <v-text-field
          label="Password"
          :type="visible ? 'text' : 'password'"
          placeholder="Password"
          v-model="password"
          filled
          class="ma-4"
          :append-icon="visible ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="visible = !visible"
        ></v-text-field>
        <v-card-actions>
          <v-spacer />
          <v-btn @click.prevent="loginUser" @keydown.enter="loginUser" class="button">
            aceptar
          </v-btn>
        </v-card-actions>
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
.button {
  color: #06d6a0;
  background-color: #073b4c;
}

.button:hover {
  border: 2px solid #073b4c;
  background-color: #118ab2;
}

#text {
  color: #ffd166;
  padding: 14px;
}

@media (min-width: 720px) {
  #row {
    display: grid;
    grid-template-areas: 'a b';
  }

  #a {
    display: block;
    grid-area: a;
    width: 50vw;
    margin: 14% auto;
  }
  #b {
    display: block;
    grid-area: b;
    width: 50vw;
    margin:10% auto;
  }
}
</style>
