<template>
  <v-row>
    <v-col cols="12" sm="10" md="8" class="mx-auto">
      <AddChild />
    </v-col>
  </v-row>
</template>

<script>
import AddChild from '../components/AddChild.vue'

export default {
  components: { AddChild }
}
</script>

<style scoped></style>
