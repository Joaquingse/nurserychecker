<template>
  <v-row>
    <v-col cols="12" sm="10" class="mx-auto">
      <v-card class="info">
        <v-card-title>Nuevo Evento:</v-card-title>
        <v-card-text>
          <v-text-field label="Título" placeholder="" v-model="title" variant="outlined">
          </v-text-field>
          <v-text-field label="Fecha" type="date" placeholder="" v-model="date" variant="outlined">
          </v-text-field>
          <v-text-field
            label="Participantes"
            placeholder=""
            v-model="attendance"
            variant="outlined"
          >
          </v-text-field>
          <v-textarea label="Descripción" placeholder="" v-model="description" variant="outlined">
          </v-textarea>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            @click.prevent="newEvent"
            class="text"
            prepend-icon="mdi-content-save-outline"
            size="small"
            >Aceptar</v-btn
          >
          <v-btn @click.prevent="close" class="text" prepend-icon="mdi-chevron-left" size="small">
            Atrás
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { useAuthStore } from '../stores/store'
import events from '../services/events.js'

export default {
  props: {
    add: Boolean
  },

  data() {
    return {
      title: '',
      date: '',
      attendance: '',
      description: ''
    }
  },

  methods: {
    goBack() {
      this.$router.go(-1)
    },
    closeAdd() {
      this.$emit('close')
    },
    async newEvent() {
      const store = useAuthStore()
      const info = {
        title: this.title,
        date: this.date,
        attendance: this.attendance,
        description: this.description
      }
      const response = await events.addEvents(info)
      if (store.role !== 'user') {
        this.closeAdd()
        return response
      } else {
        alert('Usuario no autorizado')
      }
    }
  }
}
</script>

<style scoped>
.info {
  color: #ffffff;
  background-color: #073b4c;
}
.text {
  color: #073b4c;
  background-color: #06d6a0;
}

.text:hover {
  color: #ffffff;
}
</style>
