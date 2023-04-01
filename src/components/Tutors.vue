<template>
  <v-row>
    <v-col cols="12" sm="6" v-for="(tutor, idx) in tutors" :key="idx">
      <v-card class="info">
        <v-card-title>
          {{ tutor.name + ' ' + tutor.surname }}
        </v-card-title>
        <v-card-text>
          <v-text-field label="Nombre" hide-details="auto" v-model="tutor.name"></v-text-field>
          <v-text-field
            label="Apellidos"
            hide-details="auto"
            v-model="tutor.surname"
          ></v-text-field>
          <v-text-field label="DNI" hide-details="auto" v-model="tutor.dni"></v-text-field>
          <v-text-field label="Teléfono" hide-details="auto" v-model="tutor.phone"></v-text-field>
          <v-text-field label="E-mail" hide-details="auto" v-model="tutor.email"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <!-- Este boton solo guarda los cambios en la info del child -->
          <v-btn
            @click.prevent="updateTutor(tutor._id)"
            prepend-icon="mdi-content-save-outline"
            class="text"
            v-if="role !== 'worker'"
          >
            aceptar
          </v-btn>
          <v-btn
            @click.prevent="remTutor(tutor._id)"
            prepend-icon="mdi-trash-can-outline"
            class="text"
            v-if="role === 'admin' || role === 'owner'"
          >
            Eliminar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import tutors from '../services/tutors'
import { useAuthStore } from '../stores/store'

export default {
  props: {
    tutors: Array
  },
  data() {
    return {
      store: useAuthStore(),
      info: {},
      role: ''
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    async updateTutor(id) {
      this.tutors.filter((tutor) => {
        if (tutor._id === id) {
          this.info = tutor
        } else {
          alert('Persona no encontrada')
        }
      })
      const response = await tutors.updateTutor(id, this.info)
      return response
    },
    // accion en escucha que recibe el componente EditChild para eliminar del array el tutor
    async remTutor(id) {
      this.$emit('remove_tutor', id)
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
