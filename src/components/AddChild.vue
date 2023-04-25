<template>
  <v-row class="mt-2 mb-2">
    <v-col cols="12">
      <v-card class="info">
        <v-card-title> Añadir Alumn@: </v-card-title>
        <v-divider></v-divider>
        <v-text-field label="Nombre" placeholder="" v-model="name"> </v-text-field>
        <v-text-field label="Apellidos" placeholder="" v-model="surname"> </v-text-field>
        <v-select label="Centro" :items="center" placeholder="elige un centro" v-model="nursery">
        </v-select>

        <v-radio-group inline label="Comedor" v-model="dinner">
          <v-radio label="Sí" :value="true"></v-radio>
          <v-radio label="No" :value="false"></v-radio>
        </v-radio-group>

        <v-radio-group inline label="Recogida temprana" v-model="early">
          <v-radio label="Sí" :value="true"></v-radio>
          <v-radio label="No" :value="false"></v-radio>
        </v-radio-group>
        <p>Alergias:</p>
        <v-row class="pa-2">
          <v-checkbox v-model="alergies" label="Gluten" value="Gluten"> </v-checkbox>
          <v-checkbox v-model="alergies" label="Polvo" value="Polvo"> </v-checkbox>
          <v-checkbox v-model="alergies" label="Lactosa" value="Lactosa"> </v-checkbox>
          <v-checkbox v-model="alergies" label="Cítricos" value="Cítricos"> </v-checkbox>
        </v-row>

        <p>Actividades:</p>
        <v-row class="pa-2">
          <v-checkbox v-model="activities" label="Inglés" value="Inglés"> </v-checkbox>
          <v-checkbox v-model="activities" label="Yoga" value="Yoga"> </v-checkbox>
          <v-checkbox v-model="activities" label="Música" value="Música"> </v-checkbox>
          <v-checkbox v-model="activities" label="Plástica" value="Plástica"> </v-checkbox>
        </v-row>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn prepend-icon="mdi-chevron-right" class="text">
            Siguiente
            <!-- el boton siguiente nos abre un pop up para introducir un tutor -->
            <v-dialog v-model="dialog" activator="parent">
              <v-card class="tutor mx-auto">
                <v-card-text> Añadir Tutor: </v-card-text>
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
                <v-row class="pa-2">
                  <v-checkbox v-model="infoTutor.relation" label="Padre/Madre" value="parents">
                  </v-checkbox>
                  <v-checkbox v-model="infoTutor.relation" label="Familia" value="family">
                  </v-checkbox>
                  <v-checkbox v-model="infoTutor.relation" label="Tutor/a legal" value="others">
                  </v-checkbox>
                </v-row>
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

                <v-card-actions>
                  <v-spacer />
                  <v-btn class="text" @click="newChild">Aceptar</v-btn>
                  <v-btn class="text" @click="dialog = false">Cancelar</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-btn>
          <v-btn @click.prevent="goBack" prepend-icon="mdi-chevron-left" class="text">
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
import nursery from '../services/nursery'
import { useAuthStore } from '../stores/store'

export default {
  data() {
    return {
      name: '',
      surname: '',
      childTutor: [],
      nursery: '',
      dinner: false,
      early: false,
      alergies: [],
      activities: [],
      childInfo: {},
      infoTutor: {},
      dialog: false,
      center: [],
      nurseries: []
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    //funcion para crear el tutor
    async newTutor() {
      const resTutor = await tutors.addTutor(this.infoTutor)
      return resTutor
    },
    //creamos el niño
    async newChild() {
      //empezamos creando el tutor
      this.newTutor()
      //seleccionamos el centro al que pertenecera
      this.nurseries.filter((nur) => {
        if (this.nursery === nur.name) {
          this.nursery = nur.id
        }
      })
      //despues de crear el tutor lo seleccionamos para añadirlo con el 'push'
      const allTutors = await tutors.getTutors()
      allTutors.filter((el) => {
        if (this.infoTutor.dni === el.dni) {
          this.childTutor.push(el._id)
        }})
      //actualizamos la info del alumno que va a grabarse en la DB
      this.childInfo = {
        name: this.name,
        surname: this.surname,
        tutors: this.childTutor,
        nursery: this.nursery,
        dinner: this.dinner,
        early: this.early,
        alergies: this.alergies,
        activities: this.activities
        }
      const resChild = children.addChild(this.childInfo)
      //cerramos el popup
      this.dialog = false
      //y redirigimos al listado de alumnos
      this.$router.push({ name: 'children' })
      return resChild
    },
  },
  //traemos los centros, y añadimos la info en un array 'center para la seleccion'
  async created() {
    const response = await nursery.getNurseries()
    response.forEach((el) => this.nurseries.push({ id: el._id, name: el.name }))
    this.nurseries.forEach((el) => this.center.push(el.name))
  },
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
  padding: 0 15px;
}

p {
  padding-left: 8px;
}

.tutor {
  width: 300px;
  padding: 0 15px;
}

@media (min-width: 500px) {
  .tutor {
    width: 50vw;
  }
}
</style>
