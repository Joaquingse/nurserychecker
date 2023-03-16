<template>
  <v-row>
    <v-col cols="12">
      <div v-if="store.isLoggedIn">
        <v-app-bar color="#073B4C" class="navBar" app>
          <v-tooltip text="Menú" v-slot:activator="{ props }" location="bottom">
          <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer" v-bind="props"> </v-app-bar-nav-icon>
        </v-tooltip>
          <v-toolbar-title>Nursery Checker</v-toolbar-title>
          
          <v-tooltip text="Salir" v-slot:activator="{ props }" location="bottom">
            <v-btn variant="text" icon="mdi-logout" @click="logout" v-bind="props"></v-btn>
          </v-tooltip>
          <v-tooltip text="Mí perfil" v-slot:activator="{ props }" location="bottom"> 
          <v-btn variant="text" v-bind="props" icon="mdi-account" :to="{ name: 'profile' }"></v-btn>
            </v-tooltip>
        </v-app-bar>

        <v-navigation-drawer v-model="drawer" temporary color="rgba(117, 117, 117, 0.5)" floating>
          <v-list nav>
            <v-list-item class="navBar list" rounded :to="{ name: 'children' }">
              ALUMNOS
            </v-list-item>
            <v-list-item class="navBar list" rounded :to="{ name: 'inout' }">
              IN / OUT
            </v-list-item>
            <v-list-item class="navBar list" rounded :to="{ name: 'events' }">
              EVENTOS
            </v-list-item>
            <v-list-item class="navBar list" rounded :to="{ name: 'workers' }">
              USUARIOS
            </v-list-item>
            <v-list-item class="navBar list" rounded :to="{ name: 'nurseries' }">
              GUARDERIAS
            </v-list-item>
            <v-list-item class="navBar list" rounded @click="logout"> LOGOUT </v-list-item>
          </v-list>
        </v-navigation-drawer>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { useAuthStore } from '../stores/store'

export default {
  data() {
    return {
      store: useAuthStore(),
      drawer: false,
      group: null,

      watch: {
        group() {
          this.drawer = false
        }
      }
    }
  },
  methods: {
    logout() {
      this.store.logout()
      this.store.roleCheck(null)
      this.$router.push({ name: 'home' })
    }
  }
}
</script>

<style scoped>
.navBar {
  color: #06d6a0;
  background-color: #073b4c;
}

.list {
  padding-left: 30px;
  width: 300px;
}
</style>
