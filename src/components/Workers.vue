<template>
  <v-card class="info">
    <v-card-title>
      {{ user.name.toLocaleUpperCase() }} {{ user.surname.toLocaleUpperCase() }}
    </v-card-title>
    <v-card-text>
      DNI: {{ user.dni }} <br />
      Teléfono: {{ user.phone }} <br />
      E-mail: {{ user.email }}
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn class="text" v-if="role === 'admin'" prepend-icon="mdi-trash-can-outline">Eliminar</v-btn>
      <v-btn class="text" v-if="role === 'admin'" prepend-icon="mdi-square-edit-outline">Editar</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import api from '../services/api'
import { useAuthStore } from '../stores/store'

export default {
  data() {
    return {
      role:''
    }
  },
  props: {
    user: {}
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    }
  },
   async created(){
    const store = useAuthStore()
    this.role = store.role
  },
  computed: {
    infoUser(){
      if(this.user.role !== 'admin') {
        console.log(this.user)
       }
    }
  }
}
</script>

<style scoped>
.text {
  color: #073b4c;
  background-color: #06d6a0;
}

.text:hover {
  color: #ffffff;
}
.info {
  color: #ffffff;
  background-color: #073b4c;
}
</style>
