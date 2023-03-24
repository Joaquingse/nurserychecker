<template>
  <v-row>
    <v-col>
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
    filterChild() {
      return this.childrenList.filter((el) =>
        el.name.toUpperCase().includes(this.search.toUpperCase())
      )
    }
  }
}
</script>

<style scoped></style>
