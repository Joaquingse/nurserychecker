<template>

   <v-card class="info">
    <v-card-title>
      {{ tutor.name + ' ' +  tutor.surname }}
    </v-card-title>
    <v-card-text>
      <v-text-field label="Nombre" hide-details="auto" v-model="tutor.name"></v-text-field>
      <v-text-field label="Apellidos" hide-details="auto" v-model="tutor.surname"></v-text-field>
      <v-text-field label="DNI" hide-details="auto" v-model="tutor.dni"></v-text-field>
      <v-text-field label="Teléfono" hide-details="auto" v-model="tutor.phone"></v-text-field>
      <v-text-field label="E-mail" hide-details="auto" v-model="tutor.email"></v-text-field>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
          <!-- Este boton solo guarda los cambios en la info del child -->
          <v-btn @click.prevent="updateTutor(tutor._id)" prepend-icon="mdi-content-save-outline" class="text" v-if="role !== 'worker'">
            aceptar
          </v-btn>
          <v-btn @click.prevent="deleteTutor(tutor._id)" prepend-icon="mdi-trash-can-outline" class="text"  v-if="role === 'admin' || role === 'owner'">
            Eliminar
          </v-btn>
    </v-card-actions>
   </v-card>

</template>

<script>
import tutors from '../services/tutors'
import children from '../services/children'
import { useAuthStore } from '../stores/store'

  export default {
    props: {
      tutor: {}
    },
    data() {
      return {
        store: useAuthStore(),
        info: {},
        role:''
      }
    },
    methods: {
      goBack() {
      this.$router.go(-1)
    },
    async updateTutor(id) {
      this.info = this.tutor
      const response = await tutors.updateTutor(id, this.info)
      this.$router.push({ name: 'children' })
      return response
    } ,
    async remTutor(id) {
      const response = await tutors.deleteTutor(id)
      return response
    }
    },
    created() {
      this.role = this.store.role
    }
    
  }
</script>

<style scoped>
.text {
  color: #073b4c;
  background-color: #06d6a0;
}

.info {
  color: #ffffff;
  background-color: #073b4c;
}

.text:hover {
  color: #ffffff;
  background-color: #06d6a0;
}

</style>