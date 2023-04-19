<template>
  <v-container>
  <v-row>
    <v-col cols="12" sm="10" class="mx-auto box">
      <h2 style="color: white">Mi centro</h2> 
      <!-- future implementation -->
      <!-- <v-spacer></v-spacer>
      <v-btn class="text" size="small">Editar</v-btn> -->
      <v-btn @click.prevent="goBack" class="text" prepend-icon="mdi-chevron-left" size="small">
        Atrás
      </v-btn>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="12" sm="10" class="mx-auto">
      <v-card class="info">
        <v-card-title>
          {{ nursery.name }}
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          Teléfono: {{ nursery.phone }}  <br>
          E-mail: {{ nursery.email }}  <br>
          Dirección: {{ nursery.address }}  
        </v-card-text>
        <v-card-text>
          Para emergencias:
          <v-card-text>
            <v-icon icon="mdi-car-emergency" size="small"></v-icon> Emergencias: <strong>112</strong> <br>
            <v-icon icon="mdi-fire-truck" size="small"></v-icon> Bomberos: <strong>112</strong> <br>
            <v-icon icon="mdi-police-station" size="small"></v-icon> Policía Nacional: <strong>091</strong> ó <strong>928390141</strong> <br>
            <v-icon icon="mdi-police-station" size="small"></v-icon> Policía Local: <strong>092</strong> ó <strong>928 446400</strong>
            </v-card-text>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
  </v-container>
</template>

<script>
import { useAuthStore } from '../stores/store'
import nurseries from '../services/nursery.js'

export default {
  data() {
    return {
      nursery: {}
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    }
  },

  async created() {
    const store = useAuthStore()
    const response = await nurseries.getNurseries()
    response.forEach((el)=>{
      this.nursery = el
    })
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
.box {
  display: flex;
  justify-content: space-between;
}

.info {
  color: #ffffff;
  background-color: #073b4c;

}
</style>
