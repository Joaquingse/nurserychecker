<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="10" class="mx-auto">
        <v-card class="info">
          <v-card-title> Seleccione una acción: </v-card-title>
          <v-card-actions>
            <v-btn class="text" block @click.prevent=";(getIn = true), (getOut = false)"
              >Llegada (registra entrada en el centro)</v-btn
            >
          </v-card-actions>
          <v-card-actions>
            <v-btn class="text2" block @click.prevent=";(getOut = true), (getIn = false)"
              >Recogida (registra salida del centro)</v-btn
            >
          </v-card-actions>
          <v-card-item>
            <v-alert closable title="Error!!" text="El DNI no se encuentra registrado" v-if="alert === true"></v-alert>
          </v-card-item>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-if="getIn === true">
      <v-col cols="12" sm="10" class="mx-auto">
        <v-card class="info">
          <v-card-title> Llegada: </v-card-title>
          <v-card-text>  </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="text" prepend-icon="mdi-content-save-outline">Guardar</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-if="getOut === true">
      <v-col cols="12" sm="10" class="mx-auto">
        <v-card class="info">
          <v-card-title> Salida: </v-card-title>
          <v-card-text> </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="text" prepend-icon="mdi-content-save-outline">Guardar</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import emailjs from '@emailjs/browser'
import tutors from '../services/tutors'
import children from '../services/children'
import { useAuthStore } from '../stores/store'

export default {
  data() {
    return {
      service: 'service_ba77m7m',
      template: 'template_0qb9298',
      id: '8tt8XVnGREUO603K1',
      params: {
        to_name: '',
        to_email: '',
        from_name: '',
        message: ''
      },
      getIn: false,
      getOut: false,
      dni:'',
      tutor:{},
      alert: false,
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },

    async findDni() {
      const allTutors = await tutors.getTutors()
      allTutors.filter((el) => {
        if (el.dni.toUpperCase() === this.dni.toUpperCase()) {

        } else {
          this.alert = true
        }
      })
    },

    sendEmail() {
      emailjs
        .send(this.service, this.template, this.params, this.id)
        .then((res) => {
          console.log('success!!' + res.status)
          this.params.to_name = ''
          this.params.from_name = ''
          this.params.to_email = ''
          this.params.message = ''
        })
        .catch((error) => console.log(error))
    },
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

.text2 {
  color: #073b4c;
  background-color: #ef476f;
}
.text:hover {
  color: #ffffff;
  background-color: #06d6a0;
}
</style>
