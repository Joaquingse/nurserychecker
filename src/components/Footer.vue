<template>
  <v-row >
    <v-col cols="12">
      <v-footer color="#073B4C" id="text" class="text-center d-flex flex-column" app>
        <div>
          <v-btn v-for="icon in icons" :key="icon" class="mx-3" :icon="icon" variant="text">
          </v-btn>
        </div>

        <v-spacer></v-spacer>

        <div>{{ new Date().getFullYear() }}  <strong>JoaquinGSE Dev</strong></div>
      </v-footer>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    icons: ['mdi-facebook', 'mdi-twitter', 'mdi-youtube', 'mdi-instagram']
  })
}
</script>

<style scoped>
#text {
  color: #06d6a0;
  height: 100px;
  width: 100vw;
}
</style>
