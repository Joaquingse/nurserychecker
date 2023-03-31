<template>
  <v-row>
    <v-col cols="12" sm="10" md="8" class="mx-auto">
      <v-card class="info" v-if="tutorInfo === false">
        <v-card-title class="title">
          <p>Datos de Alumn@</p>

          <v-btn class="text" prepend-icon="mdi-square-edit-outline" @click.prevent="tutorsInfo"
            >Editar Familiar/Tutor
          </v-btn>
        </v-card-title>

        <v-divider></v-divider>

        <v-text-field label="Nombre" hide-details="auto" v-model="child.name"></v-text-field>
        <v-text-field label="Apellidos" hide-details="auto" v-model="child.surname"></v-text-field>
        <div id="row">
          <div id="a">
            <v-radio-group inline label="Comedor" v-model="child.dinner">
              <v-radio label="Sí" :value="true"></v-radio>
              <v-radio label="No" :value="false"></v-radio>
            </v-radio-group>
          </div>
          <div id="b">
            <v-radio-group inline label="Recogida temprana" v-model="child.early">
              <v-radio label="Sí" :value="true"></v-radio>
              <v-radio label="No" :value="false"></v-radio>
            </v-radio-group>
          </div>
        </div>
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
        <v-card-actions>
          <v-spacer></v-spacer>
          <!-- Este boton solo guarda los cambios en la info del child -->
          <v-btn @click.prevent="updateChild" prepend-icon="mdi-content-save-outline" class="text">
            aceptar
          </v-btn>
          <v-btn @click.prevent="goBack" prepend-icon="mdi-chevron-left" class="text">
            Cancelar
          </v-btn>
        </v-card-actions>
      </v-card>

      <v-container v-if="tutorInfo === true">
        <v-row class="pr-3 ml-1" justify="end">
          <h2>Familiares/Tutores</h2>
          <v-spacer></v-spacer>
          <v-btn
            :to="{  }"
            class="text"
            v-if="role === 'admin' || role === 'owner'"
            prepend-icon="mdi-plus"
          >
            Añadir
          </v-btn>
          <v-btn @click.prevent="tutorInfo = !tutorInfo" prepend-icon="mdi-chevron-left" class="text ml-4">
            Atrás
          </v-btn>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6" v-for="(tutor, idx) in tutors" :key="idx">
            <Tutors :tutor="tutor" />
          </v-col>
        </v-row>
      </v-container>
    </v-col>
  </v-row>
</template>

<script>
import children from '../services/children'
import tutors from '../services/tutors'
import { useAuthStore } from '../stores/store'
import Tutors from './Tutors.vue'

export default {
  components: {
    Tutors
  },
  props: {
    child: Object
  },
  data() {
    return {
      store: useAuthStore(),
      tutorInfo: false,
      tutors: [],
      newInfo: {
        name: '',
        surname: '',
        dni: '',
        email: '',
        pnone: ''
      },
      role:''
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    tutorsInfo() {
      this.tutorInfo = true
      this.tutors = this.child.tutors
    },
    async updateChild() {
      const response = await children.updateChild(this.child._id, this.child)
      this.$router.push({ name: 'children' })
      return response
    }
    /*     async updateTutor(id) {
      const response = await tutors.updateTutor(id, this.newInfo)
      this.$router.push({ name: 'children' })
      return response
    } 
    */
  },
  created(){
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

p, h2 {
  display: inline-block;
  color: white;
}

.title {
  display: flex;
  justify-content: space-between;
}

@media (min-width: 500px) {
  #row {
    display: grid;
    grid-template-areas: 'a b';
    width: 100%;
  }

  #a {
    display: inline-block;
    grid-area: a;
    width: 40vw;
    padding: 10px;
  }
  #b {
    display: inline-block;
    grid-area: b;
    width: 40vw;
    padding: 10px;
  }
}
</style>
