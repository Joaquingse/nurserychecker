<template>
  <v-container class="" justify="center">
    <v-row>
      <v-col cols="12" class="mx-auto" id="row">
        <div id="a">
          <v-img
            src="https://res.cloudinary.com/burgerproject/image/upload/v1678192287/My%20images/logo_wh8syi.png"
            alt="logo"
            class="mx-auto"
          ></v-img>
        </div>

        <v-card id="b" color="rgba(255,209,102,0)" flat>
          <v-card-title id="text">Login</v-card-title>
          <v-card-text>
            <v-text-field
              label="Email"
              placeholder="Email"
              v-model="email"
              variant="outlined"
            ></v-text-field>
            <v-text-field
              label="Password"
              :type="visible ? 'text' : 'password'"
              placeholder="Password"
              v-model="password"
              variant="outlined"
              :append-icon="visible ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="visible = !visible"
            ></v-text-field>
          </v-card-text>

          <v-card-actions>
            <v-spacer />
            <v-btn @click.prevent="loginUser" @keydown.enter="loginUser" class="button">
              aceptar
            </v-btn>
          </v-card-actions>
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
  font-weight: 600;
  padding: 14px;
}

@media (min-width: 720px) {
  #row {
    display: grid;
    grid-template-areas: 'a b';
  }

  #a {
    grid-area: a;
    width: 40vw;
    align-self: center;
  }
  #b {
    grid-area: b;
    width: 40vw;
    padding-top: 50px;
  }
}
</style>
