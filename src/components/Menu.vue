<template>
  <div class="mt-4 mx-auto">
    <v-col cols="12" md="8" class="pa-5">
      <v-btn size="x-large" rounded class="button"> Lista de niños </v-btn>
    </v-col>
    <v-col cols="12" md="8" class="pa-5">
      <v-btn size="x-large" rounded class="button"> Llegada-Salida </v-btn>
    </v-col>
    <v-col cols="12" md="8" class="pa-5">
      <v-btn size="x-large" rounded class="button"> Eventos (D/S/M) </v-btn>
    </v-col>
    <v-col cols="12" md="8" class="pa-5">
      <v-btn size="x-large" rounded class="button"> Usuarios </v-btn>
    </v-col>
    <v-col cols="12" md="8" class="pa-5">
      <v-btn size="x-large" rounded class="button"> Guradería/s </v-btn>
    </v-col>
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
  color: #06d6a0;
  background-color: #073b4c;
  width: 300px;
}

</style>
