<template>
  <v-row>
    <v-col cols="12" sm="8" class="mt-2 mx-auto">
      <v-btn size="x-large" class="button" :to="{ name: 'children' }"> Lista de alumn@s </v-btn>

      <v-btn size="x-large" class="button" :to="{ name: 'inout' }"> Llegada/Recogida </v-btn>

      <v-btn size="x-large" class="button" :to="{ name: 'events' }"> Eventos (D/S/M) </v-btn>

      <v-btn size="x-large" class="button" :to="{ name: 'workers' }"> Usuari@s </v-btn>

      <v-btn size="x-large" class="button" :to="{ name: 'nurseries' }"> Guradería/s </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import { useAuthStore } from '../stores/store'

export default {
  data() {
    return {
      store: useAuthStore()
    }
  },
  methods: {}
}
</script>

<style scoped>
.button {
  display: block;
  color: #06d6a0;
  background-color: #073b4c;
  
  margin: 20px auto;
  text-align: center;
  padding-top: 15px;
}
</style>
