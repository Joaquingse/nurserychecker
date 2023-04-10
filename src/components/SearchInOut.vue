<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="10" md="8" class="mx-auto">
        <v-card class="info">
          <v-card-title> Búsqueda por alumn@ </v-card-title>
          <v-card-text>
            <v-text-field
              label="Alumn@"
              placeholder="Introduzca nombre"
              v-model="kid"
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

export default {
  data() {
    return {
      students: [],
      itemChild: [],
      legals: [],
      itemTutor: [],
      dropsOff: [],
      picksUp: [],
      kid: '',
      tutor: '',
      day: ''
    }
  },
  methods: {
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
