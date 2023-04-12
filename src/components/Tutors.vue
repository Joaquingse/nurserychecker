<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="mx-auto">
        <v-card class="info">
          <v-card-title>
            {{ child.name + ' ' + child.surname }}
          </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn-group density="compact">
              <v-btn @click="" prepend-icon="mdi-plus" class="text" size="small">
                Añadir Familiar/Tutor
                <!-- Para añadir un elemento buscamos por el DNI -->
                <v-dialog v-model="dialog" activator="parent" width="350px">
                  <v-card v-if="dniYes === false && dniNo === false">
                    <v-card-title> Añadir Familiar/Tutor </v-card-title>
                    <v-card-text>
                      <v-text-field
                        label="Introduce un DNI"
                        hide-details="auto"
                        v-model="dni"
                        variant="outlined"
                      ></v-text-field>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn class="text" @click="findDni">Comprobar DNI</v-btn>
                    </v-card-actions>
                  </v-card>
                  <!-- Si el DNI no existe, pedimos datos y añadimos el nuevo elemento
                  a la DB y al niñ@ -->
                  <v-card v-if="dniNo === true && dniYes === false">
                    <v-card-title> Añadir nuevo: </v-card-title>
                    <v-card-text>
                      <v-text-field
                        label="Nombre"
                        hide-details="auto"
                        v-model="info.name"
                      ></v-text-field>
                      <v-text-field
                        label="Apellidos"
                        hide-details="auto"
                        v-model="info.surname"
                      ></v-text-field>
                      <v-text-field
                        label="Dni"
                        hide-details="auto"
                        v-model="info.dni"
                      ></v-text-field>
                      <v-text-field
                        label="Teléfono"
                        hide-details="auto"
                        v-model="info.phone"
                      ></v-text-field>
                      <v-text-field
                        label="E-mail"
                        hide-details="auto"
                        v-model="info.email"
                      ></v-text-field>
                      <v-row class="pa-2">
                        <v-checkbox v-model="info.relation" label="Padre/Madre" value="parents">
                        </v-checkbox>
                        <v-checkbox v-model="info.relation" label="Familia" value="family">
                        </v-checkbox>
                        <v-checkbox v-model="info.relation" label="Tutor/a legal" value="others">
                        </v-checkbox>
                      </v-row>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        class="text"
                        prepend-icon="mdi-content-save-outline"
                        @click="addTutorChild"
                        >Aceptar</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                  <!-- Si existe el elemento en la DB, se lo añadimos al niñ@ -->
                  <v-card v-if="dniYes === true">
                    <v-card-title> </v-card-title>
                    <v-card-text>
                      El Familiar/Tutor ya existe, desea añadir a la lista?
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn class="text" prepend-icon="mdi-content-save-outline" @click="addTutor"
                        >Aceptar</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-btn>

              <v-btn @click="tutorInf" prepend-icon="mdi-chevron-left" class="text" size="small">
                Volver a datos del/la alumn@
              </v-btn>
            </v-btn-group>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6" v-for="(tutor, idx) in child.tutors" :key="idx">
        <v-card class="info">
          <v-card-title>
            {{ tutor.name + ' ' + tutor.surname }}
          </v-card-title>
          <v-card-text>
            <v-text-field label="Nombre" hide-details="auto" v-model="tutor.name"></v-text-field>
            <v-text-field
              label="Apellidos"
              hide-details="auto"
              v-model="tutor.surname"
            ></v-text-field>
            <v-text-field label="DNI" hide-details="auto" v-model="tutor.dni"></v-text-field>
            <v-text-field label="Teléfono" hide-details="auto" v-model="tutor.phone"></v-text-field>
            <v-text-field label="E-mail" hide-details="auto" v-model="tutor.email"></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <!-- Este boton solo guarda los cambios en la info del child -->
            <v-btn
              @click.prevent="updateTutor(tutor._id)"
              prepend-icon="mdi-content-save-outline"
              class="text"
              v-if="role !== 'worker'"
            >
              aceptar
            </v-btn>
            <v-btn
              @click.prevent="remTutor(tutor._id)"
              prepend-icon="mdi-trash-can-outline"
              class="text"
              v-if="role === 'admin' || role === 'owner'"
            >
              Eliminar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import tutors from '../services/tutors'
import children from '../services/children'
import { useAuthStore } from '../stores/store'

export default {
  props: {
    child: Object
  },
  data() {
    return {
      store: useAuthStore(),
      info: {},
      role: '',
      dialog: false,
      dni: '',
      dniYes: false,
      dniNo: false,
      tutorId: ''
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },

    tutorInf() {
      this.$emit('tutor_info')
    },

    addTutor() {
      this.dniYes = false
      this.dialog = false
      this.$emit('add_tutor', this.child._id, this.tutorId)
    },

    // accion en escucha para eliminar del array el tutor
    async remTutor(id) {
      this.$emit('remove_tutor', id)
    },

    async addTutorChild() {
      this.newTutor()
      const allTutors = await tutors.getTutors()
      allTutors.filter((el) => {
        if (this.info.dni === el.dni) {
          this.tutorId = el._id
        }
      })
      this.$emit('add_tutor_child', this.child._id, this.tutorId)
    },

    async newTutor() {
      const resTutor = await tutors.addTutor(this.info)
      this.dniNo = false
      this.dialog = false
      return resTutor
    },

    async updateTutor(id) {
      this.tutors.filter((tutor) => {
        if (tutor._id === id) {
          this.info = tutor
        } else {
          alert('Persona no encontrada')
        }
      })
      const response = await tutors.updateTutor(id, this.info)
      return response
    },
    // Funcion para buscar el dni dentro de la DB
    async findDni() {
      const allTutors = await tutors.getTutors()
      allTutors.filter((el) => {
        if (el.dni.toUpperCase() !== this.dni.toUpperCase()) {
          this.dniNo = true
          this.info.dni = this.dni
        } else {
          this.tutorId = el._id
          this.dniYes = true
        }
      })
    }
  },

  created() {
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
</style>
