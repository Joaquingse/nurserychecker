<template>
      <v-container>
        <v-row>
          <v-col cols="12" sm="10" class="mx-auto mt-15">
            <v-card class="info" variant="outlined">
              <v-card-title>Error 404</v-card-title>
              <v-card-item>
                <v-img
                  src="https://res.cloudinary.com/burgerproject/image/upload/v1678192287/My%20images/logo_wh8syi.png"
                  alt="logo"
                  width="300px"
                  class="mx-auto"
                ></v-img>
              </v-card-item>
              <v-card-text
                ><p style="text-align: center">
                  La página que estás buscando no existe.
                </p></v-card-text
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  @click.prevent="goBack"
                  class="text"
                  prepend-icon="mdi-chevron-left"
                  size="small"
                  >Volver</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
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
.text {
  color: #073b4c;
  background-color: #06d6a0;
  margin-left: 15px;
}

.text:hover {
  color: #ffffff;
  border: 2px solid white;
}

.info {
  color: #ffffff;
  background-color: #073b4c;
}
</style>