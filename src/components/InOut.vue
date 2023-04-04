<template>
  <v-row>
    <v-col cols="12" sm="10" class="mx-auto">

      <!-- formulario para enviar email -->
      <v-card class="info">
        <v-card-title> llegadas y salidas </v-card-title>
        <v-card-text>
          <v-text-field label="Nombre" hide-details="auto" v-model="params.to_name" placeholder="Para:"></v-text-field>
          <v-text-field label="E-mail" hide-details="auto" v-model="params.to_email" placeholder="e-mail:"></v-text-field>
          <v-text-field label="De" hide-details="auto" v-model="params.from_name" placeholder="de:"></v-text-field>
          <v-textarea label="Mensaje" hide-details="auto" v-model="params.message" placeholder="Escribe tu mensaje:"></v-textarea>
        </v-card-text>
        <v-card-actions>
          <v-btn @click.prevent="sendEmail" class="text">Enviar</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import emailjs from '@emailjs/browser'

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
      }
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    sendEmail() {
      emailjs
        .send(this.service, this.template, this.params, this.id)
        .then((res) => console.log('success!!' + res.status))
        .catch((error) => console.log(error))
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
  color: #06d6a0;
  background-color: #073b4c;
}
.text:hover {
  color: #073b4c;
  background-color: #06d6a0;
}
</style>
