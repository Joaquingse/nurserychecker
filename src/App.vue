<template>
  <v-app id="app">
    <v-main>
      <v-container>
        <v-row>
          <v-col>
            <NavBar />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <RouterView />
          </v-col>
        </v-row>
        <v-row class="mt-14">
          <v-col>
            <Footer />
          </v-col>
        </v-row>
      </v-container>
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
  }
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
