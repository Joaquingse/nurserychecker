<template>
  <v-row>
    <v-col cols="12" sm="10" md="8" class="mx-auto">
      <v-card class="info">
        <v-card-title>Datos de Alumn@ </v-card-title>
        <v-divider></v-divider>
        <v-text-field label="Nombre" hide-details="auto" v-model="child.name"></v-text-field>
        <v-text-field label="Apellidos" hide-details="auto" v-model="child.surname"></v-text-field>
        <v-card class="info">
          <v-card-title>Familia / Tutores </v-card-title>
          <v-divider></v-divider>
          <v-expansion-panels v-for="(tutor, idx) in child.tutors" :key="idx">
            <v-expansion-panel class="info">
              <v-expansion-panel-title>
                {{ tutor.name + ' ' + tutor.surname }}
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <v-text-field
                  label="Nombre"
                  hide-details="auto"
                  v-model="tutor.name"
                ></v-text-field>
              </v-expansion-panel-text>
              <v-expansion-panel-text>
                <v-text-field
                  label="Apellidos"
                  hide-details="auto"
                  v-model="tutor.surname"
                ></v-text-field>
              </v-expansion-panel-text>
              <v-expansion-panel-text>
                <v-row class="pa-2">
                  <v-checkbox v-model="tutor.relation" label="Padre/Madre" value="parents">
                  </v-checkbox>
                  <v-checkbox v-model="tutor.relation" label="Familia" value="family"> </v-checkbox>
                  <v-checkbox v-model="tutor.relation" label="Tutor/a legal" value="others">
                  </v-checkbox>
                </v-row>
              </v-expansion-panel-text>
              <v-expansion-panel-text>
                <v-text-field label="DNI" hide-details="auto" v-model="tutor.dni"></v-text-field
              ></v-expansion-panel-text>
              <v-expansion-panel-text
                ><v-text-field
                  label="Teléfono"
                  hide-details="auto"
                  v-model="tutor.phone"
                ></v-text-field>
              </v-expansion-panel-text>
              <v-expansion-panel-text
                ><v-text-field
                  label="E-mail"
                  hide-details="auto"
                  v-model="tutor.email"
                ></v-text-field>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card>
        <v-card class="info">
          <v-card-title>Alergias</v-card-title>
          <v-divider></v-divider>
          <v-row class="pl-4">
            <v-checkbox v-model="child.alergies" label="Gluten" value="Gluten"> </v-checkbox>
            <v-checkbox v-model="child.alergies" label="Polvo" value="Polvo"> </v-checkbox>
            <v-checkbox v-model="child.alergies" label="Lactosa" value="Lactosa"> </v-checkbox>
            <v-checkbox v-model="child.alergies" label="Cítricos" value="Cítricos"> </v-checkbox>
          </v-row>
        </v-card>
        <v-card class="info">
          <v-card-title>Actividades</v-card-title>
          <v-divider></v-divider>
          <v-row class="pl-4">
            <v-checkbox v-model="child.activities" label="Inglés" value="Inglés"> </v-checkbox>
            <v-checkbox v-model="child.activities" label="Yoga" value="Yoga"> </v-checkbox>
            <v-checkbox v-model="child.activities" label="Música" value="Música"> </v-checkbox>
            <v-checkbox v-model="child.activities" label="Plástica" value="Plástica"> </v-checkbox>
          </v-row>
        </v-card>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import children from '../services/children'
import tutors from '../services/tutors'
import nursery from '../services/nursery'
import { useAuthStore } from '../stores/store'

export default {
  props: {
    child: Object
  },
  data() {
    return {
      name: ''
    }
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
