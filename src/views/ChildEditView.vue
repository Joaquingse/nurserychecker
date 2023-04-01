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
            <v-btn
              prepend-icon="mdi-square-edit-outline"
              class="text"
              @click="tutorInf"
              v-if="tutorInfo === false"
              >Editar Familia/Tutores</v-btn
            >
            <v-btn-group v-else density="compact">
              <v-btn @click="" prepend-icon="mdi-plus" class="text" size="small">
                Añadir Familiar/Tutor
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
      <v-col>
        <EditChild :child="child" v-if="tutorInfo === false" />
        <Tutors :tutors="tutors" v-else @remove_tutor="removeTutor" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import EditChild from '../components/EditChild.vue'
import Tutors from '../components/Tutors.vue'
import children from '../services/children'
import { useAuthStore } from '../stores/store'

export default {
  components: {
    EditChild,
    Tutors
  },
  props: {
    id: String
  },
  data() {
    return {
      store: useAuthStore(),
      child: {},
      tutors: [],
      tutorInfo: false
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },

    tutorInf() {
      this.tutorInfo = !this.tutorInfo
    },

    async removeTutor(id) {
      //buscamos el tutor a eliminar
      const idx = this.tutors.findIndex((el) => el._id === id)
      //lo eliminamos del array
      this.tutors.splice(idx, 1)
      if (
        (this.store.isLoggedIn && this.store.role === 'admin') ||
        (this.store.isLoggedIn && this.store.role === 'owner')
      ) {
        //mandamos la informacion a la DB donde se encuentra el child
        //y actualizamos el array de tutores
        const response = await children.updateChild(this.child._id, { tutors: [...this.tutors] })
        return response
      } else {
        return alert('No tiene permiso para borrar usuarios')
      }
    }
  },
  async created() {
    if (this.store.role !== 'worker') {
      const response = await children.getChild(this.id)
      this.child = response
      this.tutors = response.tutors
    }
  }
}
</script>

<style scoped>
h2 {
  color: white;
  margin-left: 15px;
}

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
