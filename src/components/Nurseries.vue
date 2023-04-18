<template>
  <div>
    guarderias
    <v-row justify="end">
      <v-btn @click.prevent="goBack" id="text" prepend-icon="mdi-chevron-left" size="small"> Atrás </v-btn>
    </v-row>
  </div>
</template>

<script>
export default {
  methods: {
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
#text {
  color: #06d6a0;
  background-color: #073b4c;
}

#text:hover {
  color: #073b4c;
  background-color: #06d6a0;
}
</style>
