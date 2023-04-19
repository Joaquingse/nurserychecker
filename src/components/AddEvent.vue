<template>
  <v-row>
    <v-col cols="12" sm="10" class="mx-auto">
      <v-card class="info">
        <v-card-title>Nuevo Evento:</v-card-title>
        <!-- formulario de entrada del nuevo evento -->
        <v-card-text>
          <v-text-field label="Título" placeholder="" v-model="title" variant="outlined">
          </v-text-field>
          <v-text-field label="Fecha" type="date" placeholder="" v-model="date" variant="outlined">
          </v-text-field>
          <v-text-field
            label="Participantes"
            placeholder=""
            type="number"
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
          <v-btn
            @click.prevent="closeAdd"
            class="text"
            prepend-icon="mdi-chevron-left"
            size="small"
          >
            Atrás
          </v-btn>
          <!-- alerta por fecha incorrecta -->
          <v-dialog v-model="alert1" width="300px">
            <v-card>
              <v-card-actions>
                <v-card-text class="pa-5"> La fecha seleccionada no es correcta </v-card-text>
                <v-btn
                  icon="mdi-close-circle-outline"
                  flat
                  class="close"
                  @click.prevent="alert1 = false"
                ></v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!-- alerta por usuario no autorizado -->
          <v-dialog v-model="alert2" width="300px">
            <v-card>
              <v-card-actions>
                <v-card-text class="pa-5"> Usuario no autrizado </v-card-text>
                <v-btn
                  icon="mdi-close-circle-outline"
                  flat
                  class="close"
                  @click.prevent="alert1 = false"
                ></v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
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
      description: '',
      alert1: false,
      alert2: false
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
      const now = new Date()
      const info = {
        title: this.title,
        date: this.date,
        attendance: this.attendance,
        description: this.description
      }
      if (store.role === 'worker') {
        this.alert2 = true
      } else if (new Date(this.date) <= now) {
        console.log(new Date(this.date).toLocaleDateString() , now.toLocaleDateString())
        this.alert1 = true
      } else {
        this.closeAdd()
        const response = await events.addEvents(info)
        return response
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

.close {
  color: #073b4c;
}
</style>
