<template>
  <v-row justify="center">
    <v-col cols="12" sm="8">
      <v-card class="info">
        <v-card-title> Añadir Alumn@: </v-card-title>
        <v-divider></v-divider>
        <v-text-field label="Nombre" placeholder="" v-model="name"> </v-text-field>
        <v-text-field label="Apellidos" placeholder="" v-model="surname"> </v-text-field>
        <v-text-field label="Centro" placeholder="" v-model="nursery"> </v-text-field>

        <v-radio-group inline label="Comedor" v-model="dinner">
          <v-radio label="Sí" :value="true"></v-radio>
          <v-radio label="No" :value="false"></v-radio>
        </v-radio-group>

        <v-radio-group inline label="Recogida temprana" v-model="early">
          <v-radio label="Sí" :value="true"></v-radio>
          <v-radio label="No" :value="false"></v-radio>
        </v-radio-group>
        <p> Alergias:</p>
        <v-row justify="center" class="pa-2">
          <v-checkbox v-model="alergies" label="Gluten" value="Gluten"> </v-checkbox>
          <v-checkbox v-model="alergies" label="Polvo" value="Polvo"> </v-checkbox>
          <v-checkbox v-model="alergies" label="Lactosa" value="Lactosa"> </v-checkbox>
          <v-checkbox v-model="alergies" label="Cítricos" value="Cítricos"> </v-checkbox>
        </v-row>

        <p> Actividades:</p>
        <v-row justify="center" class="pa-2">
          <v-checkbox v-model="activities" label="Inglés" value="Inglés"> </v-checkbox>
          <v-checkbox v-model="activities" label="Yoga" value="Yoga"> </v-checkbox>
          <v-checkbox v-model="activities" label="Música" value="Música"> </v-checkbox>
          <v-checkbox v-model="activities" label="Arte" value="Arte"> </v-checkbox>
        </v-row>

        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            prepend-icon="mdi-chevron-right"
            class="text"
          >
            Siguiente
            <v-dialog v-model="dialog2" activator="parent" width="auto">
          <v-card>
            <v-card-text>
              Añadir Tutor: 
            </v-card-text>
            <v-text-field
        label="Nombre"
        placeholder="Introduzca el nombre"
        hide-details="auto"
        v-model="infoTutor.name"
      ></v-text-field>
      <v-text-field
        label="Apellidos"
        placeholder="Introduzca los apellidos"
        hide-details="auto"
        v-model="infoTutor.surname"
      ></v-text-field>
      <v-text-field
        label="DNI"
        placeholder="Introduzca el DNI"
        hide-details="auto"
        v-model="infoTutor.dni"
      ></v-text-field>
      <v-text-field
        label="Teléfono"
        placeholder="Introduzca el teléfono"
        hide-details="auto"
        v-model="infoTutor.phone"
      ></v-text-field>
      <v-text-field
        label="E-mail"
        placeholder="Introduzca el e-mail"
        hide-details="auto"
        v-model="infoTutor.email"
      ></v-text-field>
      <v-text-field
        label="Relación"
        placeholder="Introduzca la relación"
        hide-details="auto"
        v-model="infoTutor.relation"
      ></v-text-field>
            <v-card-actions>
              <v-spacer/>
              <v-btn class="text"  @click="edit">Aceptar</v-btn>
              <v-btn class="text"  @click="dialog2 = false">Cancelar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog> 
          </v-btn>
          <v-btn
            @click.prevent="goBack"
            prepend-icon="mdi-chevron-left"
            class="text"
          >
            Atrás
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import children from '../services/children'
import tutors from '../services/tutors'
import { useAuthStore } from '../stores/store'

export default {
  data() {
    return {
      name: '',
      surname: '',
      nursery: '',
      dinner: false,
      early: false,
      alergies: [],
      activities: [],
      tutors: {},
      childInfo: {},
      infoTutor: {}
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    async newChild() {
      this.childInfo = {
        name: this.name,
        surname: this.surname,
        nursery: this.nursery,
        dinner: this.dinner,
        early: this.early,
        alergies: this.alergies,
        activities: this.activities
      }
      console.log(this.childInfo)
    }
  }
}
</script>

<style scoped>
.text {
  color: #073b4c;
  background-color: #06d6a0;
  width: fit-content;
}

.text:hover {
  color: #ffffff;
  background-color: #06d6a0;
}

.info {
  color: #ffffff;
  background-color: #073b4c;
}

p {
  padding-left: 8px;
}
</style>
