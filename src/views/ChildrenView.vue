<template>
  <v-container>
    <v-row class="pr-3 ml-1" justify="end">
      <h2 class="info">Listado de alumnos</h2>
      <v-spacer></v-spacer>
      <v-btn
        :to="{ name: 'addchild' }"
        class="text"
        v-if="role === 'admin' || role === 'owner'"
        prepend-icon="mdi-plus"
      >
        Añadir
      </v-btn>
      <v-btn @click.prevent="goBack" prepend-icon="mdi-chevron-left" class="text"> Atrás </v-btn>
    </v-row>
    <v-row>
      <v-col cols="12" sm="10" md="8" class="mx-auto">
        <!-- Elemento para fitrado por nombre -->
        <v-text-field variant="solo" v-model="search" label="Búsqueda"></v-text-field>
        <!-- Componente que nos trae la lista de alumnos, en el que aplicamos el filtro -->
        <ChildrenList :childrenList="childrenList" :search="search" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ChildrenList from '../components/ChildrenList.vue'
import ChildrenProfile from '../components/ChildrenProfile.vue'
import { useAuthStore } from '../stores/store'
import children from '../services/children'

export default {
  components: {
    ChildrenList,
    ChildrenProfile
  },
  data() {
    return {
      childrenList: [],
      search: '',
      role: ''
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    }
  },
  async created() {
    const store = useAuthStore()
    this.role = store.role
    const response = await children.getChildren()
    response.forEach((el) => {
      this.childrenList.push(el)
    })
  }
}
</script>

<style scoped>
.text {
  color: #06d6a0;
  background-color: #073b4c;
  margin-left: 15px;
}
.text:hover {
  color: #ffffff;
  background-color: #06d6a0;
}

.info {
  color: #ffffff;
}
</style>
