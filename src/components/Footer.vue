<template>
  <v-row>
    <v-col cols="12">
      <v-footer color="#073B4C" id="text">
        <v-spacer></v-spacer>
        <div>{{ new Date().getFullYear() }} <strong>JoaquinGSE Dev&#9400&#8482</strong></div>
        <v-spacer></v-spacer>
        <div>
          <v-btn v-for="icon in icons" :key="icon" :icon="icon.icon" :href="icon.link" variant="text">
          </v-btn>
        </div>
        <v-spacer></v-spacer>
      </v-footer>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    icons: [{icon:'mdi-linkedin', link:'https://www.linkedin.com/in/joaquingse/'}, {icon:'mdi-github', link: 'https://github.com/Joaquingse'}]
  })
}
</script>

<style scoped>
#text {
  color: #06d6a0;
  height: 80px;
  width: 100vw;
  bottom: 0;
  left: 0;
  position: absolute;
}

.border {
  border: 1px solid white;
}

</style>
