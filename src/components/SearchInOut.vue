<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="10" class="mx-auto box">
        <h2 style="color: white">Consultas:</h2>
        <v-btn @click.prevent="goBack" class="text" prepend-icon="mdi-chevron-left"> Atrás </v-btn>
      </v-col>
    </v-row>
    <!-- Búsqueda por alumn@ y Búsqueda por fecha -->
    <v-row>
      <v-col cols="12" sm="10" class="mx-auto">
        <v-row>
          <!-- busqueda por alumno -->
          <v-col cols="12" md="6" class="mx-auto">
            <v-card class="info" height="145px">
              <v-card-item density="compact">
                <v-card-title class="mb-2"> Búsqueda por alumn@: </v-card-title>
                <v-card-actions class="mt-6">
                  <v-spacer></v-spacer>
                  <!-- ver listado de alumnos -->
                  <v-btn
                    variant="outlined"
                    v-if="list === false && dropsResult === false && picksResult === false"
                    @click="list = true"
                    >ver listado de alumn@s
                  </v-btn>
                  <!-- cerrar listado de alumnos -->
                  <v-btn
                    variant="outlined"
                    v-if="
                      (list === true && dropsResult === false) ||
                      (list === true && picksResult === false)
                    "
                    @click="list = false"
                    >cerrar listado</v-btn
                  >
                  <!-- cerrar la respuesta y volver al listado de alumnos -->
                  <v-btn
                    variant="outlined"
                    v-if="dropsResult === true || picksResult === true"
                    @click="closeResult"
                    >Volver</v-btn
                  >
                </v-card-actions>
              </v-card-item>
            </v-card>
          </v-col>
          <!-- busqueda por fecha -->
          <v-col cols="12" md="6" class="mx-auto">
            <v-card class="info">
              <v-card-title> Búsqueda por fecha: </v-card-title>
              <v-card-text class="box">
                <v-text-field
                  label="Fecha"
                  placeholder="Introduzca fecha"
                  type="date"
                  v-model="day"
                  variant="outlined"
                ></v-text-field>
                <v-spacer></v-spacer>
                <v-btn
                  class="text"
                  style="height: 58px"
                  prepend-icon="mdi-magnify"
                  @click.prevent="getDay"
                  >buscar
                </v-btn>
                <v-card-actions>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <!-- seleccion alumno y llegada o salida o ambos -->
        <v-card class="info mt-2" v-if="list === true">
          <v-card-text>
            <v-row class="pl-1">
              <v-checkbox v-model="dropOrPick" label="Llegadas" value="drop"> </v-checkbox>
              <v-checkbox v-model="dropOrPick" label="Salidas" value="pick"> </v-checkbox>
            </v-row>
            <v-text-field
              label="Alumn@"
              placeholder="Introduzca nombre"
              v-model="search"
              variant="solo"
            >
            </v-text-field>
            <SearchByChild
              :search="search"
              :students="students"
              :list="list"
              @search_child="searchChild"
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!--  Búsqueda por tutor // implementacion futura posible 
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
 -->
    <!-- resultados -->
    <v-row>
      <v-col cols="12" sm="10" class="mx-auto">
        <dropsInfo :drops="drops" v-if="dropsResult" />
        <picksInfo :picks="picks" v-if="picksResult" />
        <v-card v-else>
          <v-card-text> No se han encontrado resultados. </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
//import tutors from '../services/tutors'
import children from '../services/children'
import inAndOut from '../services/inAndOut'
import SearchByChild from './SearchByChild.vue'
import dropsInfo from './dropsInfo.vue'
import picksInfo from './picksInfo.vue'

export default {
  data() {
    return {
      students: [],
      search: '',
      itemChild: [],
      //legals: [],
      //itemTutor: [],
      dropsOff: [],
      drops: [],
      dropsResult: false,
      picksUp: [],
      picks: [],
      picksResult: false,
      kid: '',
      // tutor: '',
      day: '',
      list: false,
      dropOrPick: []
    }
  },
  components: {
    SearchByChild,
    dropsInfo,
    picksInfo
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },

    closeResult() {
      this.drops = []
      this.picks = []
      this.dropOrPick = []
      this.dropsResult = false
      this.picksResult = false
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
    async searchChild(id) {
      // this.students.filter((el) => {
      //   if (
      //     id === el._id
      //   ) {
      //     this.kid = el._id
      //   }
      // })
      if (this.dropOrPick.includes('drop')) {
        this.dropsOff.filter((drop) => {
          if (id === drop.child._id) {
            this.drops.push(drop)
          }
        })
        this.dropsResult = true
      }
      if (this.dropOrPick.includes('pick')) {
        this.picksUp.filter((pick) => {
          if (id === pick.child._id) {
            this.picks.push(pick)
          }
        })
        this.picksResult = true
      } else {
        this.dropsOff.filter((drop) => {
          if (id === drop.child._id) {
            this.drops.push(drop)
          }
        })
        this.dropsResult = true

        this.picksUp.filter((pick) => {
          if (id === pick.child._id) {
            this.picks.push(pick)
          }
        })
        this.picksResult = true
      }

      this.list = false
    }
  },
  async created() {
    const kids = await children.getChildren()
    //const adults = await tutors.getTutors()
    const drops = await inAndOut.getDrops()
    const picks = await inAndOut.getPicks()
    this.students = [...kids]
    //this.legals = [...adults]
    this.dropsOff = [...drops]
    this.picksUp = [...picks]
    this.students.forEach((el) => {
      this.itemChild.push(el.name + ' ' + el.surname)
    })
    // this.legals.forEach((el) => {
    //   this.itemTutor.push(el.name + ' ' + el.surname)
    // })
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
