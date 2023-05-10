<template>
  <v-container>
    <v-row class="roww" align-sm="center">
      <v-col cols="12" sm="8" md="6" class="mx-auto">
        <v-img
          src="https://res.cloudinary.com/burgerproject/image/upload/v1678192287/My%20images/logo_wh8syi.png"
          alt="logo"
        ></v-img>
        <v-card color="rgba(0,0,0,0)" flat>
          <v-card-text>
            Aplicación desarrollada gracias al proyecto iniciado por
            <strong
              ><a href="https://www.fulp.es/" target="_blank" class="fulp"
                >La Fundación Universitadia de Las Palmas</a
              ></strong>, la cual nos puso en manos de <strong
              ><a href="https://reboot.academy/" target="_blank" class="reboot"
                >Reboot Academy</a
              ></strong>.
        </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="8" md="5" class="mx-auto">
        <v-card color="rgba(0,0,0,0)" flat>
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
              @keydown.enter="loginUser"
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn @click.prevent="loginUser" class="button" size="small"> aceptar </v-btn>
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
.fulp {
  color: orange;
  font-family: 'CircularStd', sans-serif;
  text-decoration: none;
}

.reboot {
  font-family: Darker Grotesque,sans-serif;
  text-decoration: none;
  color: rgb(60, 234, 234);
}
.button {
  color: #06d6a0;
  background-color: #073b4c;
  bottom: 15px;
}

.button:hover {
  border: 2px solid #073b4c;
  background-color: #118ab2;
  color: #073b4c;
}

#text {
  color: #ffd166;
  font-weight: 600;
}
.roww {
  height: 75vh;
}


</style>
