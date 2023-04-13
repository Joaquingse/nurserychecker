<template>  
  <v-row>
    <v-col cols="12" class="mx-auto" v-for="(drop, idx) in drops" :key="idx">
     <v-card class="info">
        <v-card-title>
          {{ drop.child.name + ' ' + drop.child.surname }}
        </v-card-title>
        <v-card-text>
          <p> Llegada el
          {{
            new Date(drop.date).toLocaleDateString() +
            ' a las ' +
            new Date(drop.date).toLocaleTimeString()
          }}</p>
          <p>Entregado por {{ drop.who.name + ' ' + drop.who.surname }}</p>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>

</template>

<script>
export default {
  props: {
    drops: Array
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
