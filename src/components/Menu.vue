<template>
  <div class="mt-4 mx-auto">
    <v-btn size="x-large"  class="button" :to="{ name: 'children' }"> Lista de niños </v-btn>

    <v-btn size="x-large"  class="button" :to="{ name: 'inout' }"> Llegada-Salida </v-btn>

    <v-btn size="x-large"  class="button" :to="{ name: 'events' }"> Eventos (D/S/M) </v-btn>

    <v-btn size="x-large"  class="button" :to="{ name: 'workers' }"> Usuarios </v-btn>

    <v-btn size="x-large"  class="button" :to="{ name: 'nurseries' }"> Guradería/s </v-btn>
  </div>
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
  width: 300px;
  margin: 20px auto;
  text-align: center;
  padding-top: 15px;
}
</style>
