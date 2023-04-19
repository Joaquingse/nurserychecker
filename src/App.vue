<template>
  <v-app id="app">
    <v-main v-if="$route.matched.length === 0">
      <v-row>
        <v-col cols="12" sm="10" class="mx-auto mt-15">
          <v-card class="info" variant="outlined">
            <v-card-title>Error 404</v-card-title>
            <v-card-item>
              <v-img
                src="https://res.cloudinary.com/burgerproject/image/upload/v1678192287/My%20images/logo_wh8syi.png"
                alt="logo"
                width="300px"
                class="mx-auto"
              ></v-img>
            </v-card-item>
            <v-card-text><p style="text-align:center">La página que estás buscando no existe.</p></v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click.prevent="goBack" class="text" prepend-icon="mdi-chevron-left" size="small">Volver</v-btn>
              <v-btn class="text" :to="{ name: 'menu'}" prepend-icon="mdi-home-variant-outline" size="small">Ir a la página principal</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>

          </v-card>
        </v-col>
      </v-row>
      <Footer />
    </v-main>
    <v-main v-else>
      <NavBar />
      <RouterView />
      <Footer />
    </v-main>
  </v-app>
</template>

<script>
import { RouterLink, RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
import Footer from './components/Footer.vue'
import { useAuthStore } from './stores/store'

export default {
  components: {
    NavBar,
    Footer
  },
  data() {
    return {}
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    }
  },
}
</script>

<style scoped>
#app {
  background-color: #118ab2;
  min-height: 100vh;
  margin: 0;
  max-width: 100vw;
}

.text {
  color: #073b4c;
  background-color: #06d6a0;
  margin-left: 15px;
}

.text:hover {
  color: #ffffff;
  border: 2px solid white;
}

.info {
  color: #ffffff;
  background-color: #073b4c;
}
</style>
