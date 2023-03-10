<template>
  <v-row>
    <v-col cols="12">
      <div v-if="store.isLoggedIn">
        <v-app-bar color="#073B4C" class="navBar" app>
          <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"> </v-app-bar-nav-icon>
          <v-toolbar-title>Nursery Checker</v-toolbar-title>
          <v-btn variant="text" icon="mdi-logout" @click="logout"></v-btn>
          <v-btn variant="text" icon="mdi-dots-vertical" :to="{ name: 'profile' }"></v-btn>
        </v-app-bar>

        <v-navigation-drawer
          v-model="drawer"
          temporary
          height="fit-content"
          color="transparent"
        >
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
            <v-list-item class="navBar list" rounded  @click="logout">
              LOGOUT
            </v-list-item>
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
  width: 240px;
}
</style>
