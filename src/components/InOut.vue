<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="10" class="mx-auto box">
        <h2 style="color: white">Elige una opción:</h2>
        <v-btn @click.prevent="goBack" class="text"  prepend-icon="mdi-chevron-left" size="small"> Atrás </v-btn>
      </v-col>
    </v-row>
    <!-- Seleccion consultas, llegada o salida -->
    <v-row>
      <v-col cols="12" sm="10" class="mx-auto">
        <v-card class="info">
          <v-card-actions>
            <v-btn class="text" block prepend-icon="mdi-magnify" :to="{ name: 'search' }">
              Consultar
            </v-btn>
          </v-card-actions>

          <v-card-actions>
            <v-btn class="text" block @click.prevent=";(getIn = true), (getOut = false)"
              >Llegada (entrada en el centro)</v-btn
            >
          </v-card-actions>
          <v-card-actions>
            <v-btn class="text2" block @click.prevent=";(getOut = true), (getIn = false)"
              >Recogida (salida del centro)</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <!-- registro llegada -->
    <v-row v-if="getIn === true">
      <v-col cols="12" sm="10" class="mx-auto">
        <v-card class="info">
          <v-card-title class="box">
            Llegada:
            <v-btn
              icon="mdi-close-circle-outline"
              flat
              class="close"
              @click="getIn = false"
            ></v-btn>
          </v-card-title>
          <v-card-text class="box">
            <!-- Busqueda por DNI -->
            <v-text-field
              label="DNI"
              placeholder="Introduzca DNI"
              v-model="dni"
              variant="outlined"
            ></v-text-field>
            <v-btn class="text btn" prepend-icon="mdi-magnify" @click.prevent="findDniIn"
              >buscar
              <v-dialog v-if="alert === true" activator="parent" max-width="400px">
                <v-card>
                  <v-card-text> El DNI introducido no se encuentra registrado </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn class="text" @click="alert = false">Cerrar</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <!-- registro Salida -->
    <v-row v-if="getOut === true">
      <v-col cols="12" sm="10" class="mx-auto">
        <v-card class="info">
          <v-card-title class="box"> Salida: 
            <v-btn
              icon="mdi-close-circle-outline"
              flat
              class="close"
              @click="getOut = false"
            ></v-btn>
          </v-card-title>
          <v-card-text class="box">
            <!-- Busqueda por DNI -->
            <v-text-field
              label="DNI"
              placeholder="Introduzca DNI"
              v-model="dni"
              variant="outlined"
            ></v-text-field>
            <v-btn class="text btn" prepend-icon="mdi-magnify" @click="findDniOut"
              >buscar
              <v-dialog v-if="alert === true" activator="parent" max-width="400px">
                <v-card>
                  <v-card-text> El DNI introducido no se encuentra registrado </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn class="text" @click="alert = false">Cerrar</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <!-- Datos y registro llegada -->
    <v-row v-if="selectIn === true">
      <v-col cols="12" sm="10" class="mx-auto">
        <v-card class="info">
          <v-card-title class="box">
            {{ tutor.name + ' ' + tutor.surname }}
            <v-btn
              icon="mdi-close-circle-outline"
              flat
              class="close"
              @click="selectIn = false"
            ></v-btn>
          </v-card-title>
          <v-card-text>
            Alumn@/s:
            <v-checkbox
              v-for="(kid, idx) in kids"
              :key="idx"
              v-model="kidId"
              :label="kid.name + ' ' + kid.surname"
              :value="kid._id"
              multiple
            >
            </v-checkbox>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="text" prepend-icon="mdi-content-save-outline" @click="saveIn"
              >Guardar</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <!-- Datos y registro salida -->
    <v-row v-if="selectOut === true">
      <v-col cols="12" sm="10" class="mx-auto">
        <v-card class="info">
          <v-card-title class="box">
            {{ tutor.name + ' ' + tutor.surname }}             
            <v-btn
              icon="mdi-close-circle-outline"
              flat
              class="close"
              @click="selectOut = false"
            ></v-btn>
          </v-card-title>
          <v-card-text>
            Alumn@/s:
            <v-checkbox
              v-for="(kid, idx) in kids"
              :key="idx"
              v-model="kidId"
              :label="kid.name + ' ' + kid.surname"
              :value="kid._id"
              multiple
            >
            </v-checkbox>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="text" prepend-icon="mdi-content-save-outline" @click="saveOut"
              >Guardar</v-btn
            >
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
import inAndOut from '../services/inAndOut'
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
      dni: '',
      tutors: [],
      tutor: {},
      alert: false,
      selectIn: false,
      selectOut: false,
      students: [],
      parents: [],
      kids: [],
      mails: [],
      kidId: []
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },

    findDniIn() {
      this.tutors.filter((el) => {
        if (this.dni.toUpperCase() !== el.dni.toUpperCase() || this.dni === '') {
          this.alert = true
        } else {
          this.selectIn = true
          this.getIn = false
          this.tutor = el
          this.getKids()
          this.alert = false
          this.dni = ''
        }
      })
    },

    findDniOut() {
      this.tutors.filter((el) => {
        if (this.dni.toUpperCase() === el.dni.toUpperCase()) {
          this.selectOut = true
          this.getOut = false
          this.tutor = el
          this.getKids()
          this.alert = false
          this.dni = ''
        } else {
          this.alert = true
        }
      })
    },

    getKids() {
      this.students.filter((el) => {
        // usamos .some() para buscar dentro el array de tutores el ID dentro de cada objeto
        if (el.tutors.some((e) => e._id === this.tutor._id)) {
          this.kids.push(el)
          el.tutors.filter((parent) => {
            if (parent.relation === 'parents' && !this.mails.includes(parent.email)) {
              this.mails.push(parent.email)
            }
            if (
              parent.relation === 'parents' &&
              !this.parents.includes(`${parent.name + ' ' + parent.surname}`)
            ) {
              this.parents.push(`${parent.name + ' ' + parent.surname}`)
            }
          })
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

    saveIn() {
      this.selectIn = false
      const dateIn = {
        child: '',
        date: new Date(),
        who: this.tutor._id
      }
      this.kids.filter((el) => {
        this.kidId.forEach((id) => {
          if (id === el._id) {
            dateIn.child = el._id
            this.params.to_name = this.parents
            this.params.from_name = 'Pepa Pig Nursery'
            this.params.to_email = this.mails
            this.params.message = `El/la alumn@ ${
              el.name + ' ' + el.surname
            } ha llegado al centro, entregado por ${this.tutor.name + ' ' + this.tutor.surname}`

            this.sendEmail()
            this.kidIn(dateIn)
          }
        })
      })
      this.kids = []
      this.kidId = []
    },

    saveOut() {
      this.selectOut = false
      const dateOut = {
        child: '',
        date: new Date(),
        who: this.tutor._id
      }
      this.kids.filter((el) => {
        this.kidId.forEach((id) => {
          if (id === el._id) {
            dateOut.child = el._id
            this.params.to_name = this.tutor.name
            this.params.from_name = 'Pepa Pig Nursery'
            this.params.to_email = this.mails
            this.params.message = `El/la alumn@ ${
              el.name + ' ' + el.surname
            } ha llegado al centro, entregado por ${this.tutor.name + ' ' + this.tutor.surname}`

            this.sendEmail()
            this.kidOut(dateOut)
          }
        })
      })
      this.kids = []
      this.kidId = []
    },

    async kidIn(info) {
      const response = await inAndOut.addDrops(info)
      return response
    },

    async kidOut(info) {
      const response = await inAndOut.addPicks(info)
      return response
    }
  },

  async created() {
    const response = await tutors.getTutors()
    this.tutors = response
    const allchild = await children.getChildren()
    this.students = allchild
  }
}
</script>

<style scoped>
.info {
  color: #ffffff;
  background-color: #073b4c;
}

.close {
  color: #06d6a0;
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
.text:hover,
.text2:hover {
  color: #ffffff;
  border: 2px solid white;
}
.box {
  display: flex;
  justify-content: space-between;
}

.btn {
  margin-left: 10px;
  height: 58px;
}
</style>
