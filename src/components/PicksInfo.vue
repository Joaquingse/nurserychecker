<template>
  <v-row >
    <!-- si el array viene sin datos -->
    <v-col cols="12" class="mx-auto" v-if="picks.length === 0">
      <v-card>
        <v-card-text> No se han encontrado resultados de salidas del centro. </v-card-text>
      </v-card>
    </v-col>
    <!-- si el array tiene datos -->
    <v-col v-else cols="12" class="mx-auto" v-for="(pick, idx) in picks" :key="idx">
      <v-card class="info" flat density="compact" variant="flat">
        <v-card-title>
          {{ pick.child.name + ' ' + pick.child.surname }}
        </v-card-title>
        <v-card-text>
          <p>
            Salida el
            {{
              new Date(pick.date).toLocaleDateString() +
              ' a las ' +
              new Date(pick.date).toLocaleTimeString()
            }}
          </p>
          <p>Recogido por {{ pick.who.name + ' ' + pick.who.surname }}</p>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    picks: Array
  },
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
