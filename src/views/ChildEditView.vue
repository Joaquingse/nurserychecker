<template>
  <v-container>
    <v-row v-if="tutorInfo === false">
      <v-col cols="12" sm="10" md="8" class="mx-auto">
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
              size="small"
              >Editar Familia/Tutores
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="10" md="8" class="mx-auto">
        <EditChild :child="child" v-if="tutorInfo === false" />
        <Tutors
          :child="child"
          v-else
          @remove_tutor="removeTutor"
          @tutor_info="tutorInf"
          @add_tutor_child="addTutor"
          @add_tutor="addTutor"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import EditChild from '../components/EditChild.vue'
import Tutors from '../components/Tutors.vue'
import children from '../services/children'
import tutors from '../services/tutors'
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
      tutorInfo: false,
      info: {}
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
    },

    async addTutor(id, tutorId) {
      this.child.tutors.push(tutorId)
      const response = await children.updateChild(id, { tutors: this.child.tutors })
      this.child.tutors = response.tutors
    }
  },
  async beforeMount() {
    const response = await children.getChild(this.id)
    this.child = response
    this.tutors = this.child.tutors
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
