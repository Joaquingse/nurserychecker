<template>
  <v-row>
    <v-col>
      <!-- Componente que nos trae los datos de la lista y que recibe el filtrado si lo hay -->
      <ChildrenProfile v-for="(child, idx) in filterChild" :key="idx" :child="child" />
    </v-col>
  </v-row>
</template>

<script>
import ChildrenProfile from './ChildrenProfile.vue'
export default {
  components: {
    ChildrenProfile
  },
  props: {
    childrenList: Array,
    search: String
  },
  computed: {
    // funcion para filtrar por el nombre
    filterChild() {
      return this.childrenList.filter((el) =>
        el.name.toUpperCase().includes(this.search.toUpperCase())
      )
    }
  },

}
</script>

<style scoped></style>
