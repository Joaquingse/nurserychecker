<template>
  <v-container>
    <v-row justify="end">
      <v-btn @click.prevent="goBack" id="text" prepend-icon="mdi-arrow-left-bold-box-outline">
        Atrás
      </v-btn>
    </v-row>
    <v-row>
      <v-col cols="12" sm="10" md="8" class="mx-auto">
        <v-card class="pa-5">
          <v-card-title>Eventos</v-card-title>
          <v-divider />
          <v-card-items> eventos dia semana mes </v-card-items>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
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
