<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="10" md="8" class="mx-auto box">
        <h2 style="color: white">Consultas:</h2>
        <v-btn @click.prevent="goBack" class="text" prepend-icon="mdi-chevron-left"> Atrás </v-btn>
      </v-col>
    </v-row>
    <!-- Búsqueda por alumn@ -->
    <v-row>
      <v-col cols="12" sm="10" md="8" class="mx-auto">
        <v-card class="info">
          <v-card-item density="compact">
            <v-card-title class=""> Búsqueda por alumn@ </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn variant="outlined" v-if="list === false && dropsResult === false" @click="list = true, noDrop = false"
                >ver listado de alumn@s
              </v-btn>
              <v-btn variant="outlined" v-if="list === true && dropsResult === false" @click="list = false"
                >cerrar listado</v-btn
              >
              <v-btn variant="outlined" v-if="dropsResult === true" @click="closeResult"
                >Volver</v-btn
              >
            </v-card-actions>
          </v-card-item>

          <v-card-text>
            <v-text-field
              label="Alumn@"
              placeholder="Introduzca nombre"
              v-model="search"
              variant="solo"
              v-if="list === true"
            >
            </v-text-field>
            <SearchByChild
              :search="search"
              :students="students"
              :list="list"
              @search_child="searchChild"
            />
            <dropsInfo :drops="drops" v-if="dropsResult" />
            <v-card-item v-if="noDrop === true">
              <v-card-text>
                No se han encontrado resultados.
              </v-card-text>
            </v-card-item>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <!-- Búsqueda por tutor -->
    <v-row>
      <v-col cols="12" sm="10" md="8" class="mx-auto">
        <v-card class="info">
          <v-card-title> Búsqueda por tutor </v-card-title>
          <v-card-text>
            <v-text-field
              label="Tutor"
              placeholder="Introduzca nombre"
              v-model="tutor"
              variant="outlined"
            ></v-text-field>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn class="text" prepend-icon="mdi-magnify" @click.prevent="">buscar </v-btn>
            </v-card-actions>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <!-- Búsqueda por fecha -->
    <v-row>
      <v-col cols="12" sm="10" md="8" class="mx-auto">
        <v-card class="info">
          <v-card-title> Búsqueda por fecha </v-card-title>
          <v-card-text>
            <v-text-field
              label="Fecha"
              placeholder="Introduzca fecha"
              type="date"
              v-model="day"
              variant="outlined"
            ></v-text-field>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn class="text" prepend-icon="mdi-magnify" @click.prevent="getDay">buscar </v-btn>
            </v-card-actions>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import tutors from '../services/tutors'
import children from '../services/children'
import inAndOut from '../services/inAndOut'
import SearchByChild from './SearchByChild.vue'
import dropsInfo from './dropsInfo.vue'

export default {
  data() {
    return {
      students: [],
      search: '',
      itemChild: [],
      legals: [],
      itemTutor: [],
      dropsOff: [],
      picksUp: [],
      kid: '',
      tutor: '',
      day: '',
      list: false,
      drops: [],
      dropsResult: false,
      picks: [],
      picksResult: false,
      noDrop: false,
    }
  },
  components: {
    SearchByChild,
    dropsInfo
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },

    closeResult() {
      this.drops = []
      this.dropsResult = false
      this.list = true
    },

    async getDay() {
      const date = new Date(this.day).toLocaleDateString()
      this.dropsOff.filter((el) => {
        const day = new Date(el.date).toLocaleDateString()
        if (day === date) {
          console.log(el)
        }
      })
      this.picksUp.filter((el) => {
        const day = new Date(el.date).toLocaleDateString()
        if (day === date) {
          console.log(el)
        }
      })
    },
    async searchChild(a, b) {
      this.students.filter((el) => {
        if (a + ' ' + b === el.name + ' ' + el.surname) {
          this.kid = el._id
        }
      })
      this.dropsOff.filter((drop) => {
        if (this.kid !== drop.child._id.toLocaleString()) {
          this.noDrop = true
          this.dropsResult = false
        } else {
          this.drops.push(drop)
          this.dropsResult = true
        }
      })
      this.list = false
    }
  },
  async created() {
    const kids = await children.getChildren()
    const adults = await tutors.getTutors()
    const drops = await inAndOut.getDrops()
    const picks = await inAndOut.getPicks()
    this.students = [...kids]
    this.legals = [...adults]
    this.dropsOff = [...drops]
    this.picksUp = [...picks]
    this.students.forEach((el) => {
      this.itemChild.push(el.name + ' ' + el.surname)
    })
    this.legals.forEach((el) => {
      this.itemTutor.push(el.name + ' ' + el.surname)
    })
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
  background-color: #06d6a0;
}
.box {
  display: flex;
  justify-content: space-between;
}
</style>
