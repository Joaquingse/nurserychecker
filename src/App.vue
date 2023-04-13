<template>
  <v-app id="app">
    <v-main>
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
  }
}
</script>

<style scoped>
#app {
  background-color: #118ab2;
  height: 100vh;
  margin: 0;
  max-width: 100vw;
}
</style>
