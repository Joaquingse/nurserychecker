<template>
  <v-app id="app">
    <v-main>
      <v-row>
        <NavBar />
      </v-row>
      <v-row>
        <v-col cols="12">
          <RouterView />
        </v-col>
      </v-row>
      <v-row>
        <Footer />
      </v-row>
    </v-main>
  </v-app>
</template>

<script>
import { RouterLink, RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
import Footer from './components/Footer.vue'

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
  max-width: 100vw;
}


</style>
