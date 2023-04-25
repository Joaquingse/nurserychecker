<template>
  <v-row v-if="list === true">
    <v-col>
      <v-list v-for="(child, idx) in filterChild" :key="idx" class="info" density="compact">
        <v-list-item
          :title="child.name + ' ' + child.surname"
          @click="searchChild(child._id)"
        >
        </v-list-item>
      </v-list>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    search: String,
    students: Array,
    list: Boolean
  },

  computed: {
    // funcion para filtrar por el nombre
    filterChild() {
      return this.students.filter((el) => el.name.toUpperCase().includes(this.search.toUpperCase()))
    }
  },
  methods: {
    searchChild(id) {
      this.$emit('search_child', id)
    }
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
