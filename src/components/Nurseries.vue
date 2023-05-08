<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="8" class="mx-auto box">
        <h2 style="color: white">Centro:</h2>
        <!-- future implementation -->
        <v-spacer></v-spacer>
        <v-btn @click.prevent="edit = true" class="text" size="small" v-if="!edit && store.role !== 'worker'">Editar</v-btn>
        <v-btn @click.prevent="goBack" class="text" prepend-icon="mdi-chevron-left" size="small">
          Atrás
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="8" class="mx-auto">
        <v-card class="info" v-if="!edit">
          <v-card-title>
            {{ nursery.name }}
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            Teléfono: {{ nursery.phone }} <br />
            E-mail: {{ nursery.email }} <br />
            Dirección: {{ nursery.address }}
          </v-card-text>
          <v-card-text>
            Para emergencias:
            <v-card-text>
              <v-icon icon="mdi-car-emergency" size="small"></v-icon> Emergencias:
              <strong>112</strong> <br />
              <v-icon icon="mdi-fire-truck" size="small"></v-icon> Bomberos: <strong>112</strong>
              <br />
              <v-icon icon="mdi-police-station" size="small"></v-icon> Policía Nacional:
              <strong>091</strong> ó <strong>928390141</strong> <br />
              <v-icon icon="mdi-police-station" size="small"></v-icon> Policía Local:
              <strong>092</strong> ó <strong>928446400</strong>
            </v-card-text>
          </v-card-text>
        </v-card>
        <v-card class="info" v-else>
          <v-card-title>
            {{ nursery.name }}
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-text-field
              label="Teléfono"
              placeholder=""
              v-model="nursery.phone"
              variant="outlined"
            >
            </v-text-field>
            <v-text-field label="E-mail" placeholder="" v-model="nursery.email" variant="outlined">
            </v-text-field>
            <v-text-field
              label="Dirección"
              placeholder=""
              v-model="nursery.address"
              variant="outlined"
            >
            </v-text-field>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn class="text" size="small" @click.prevent="update">Aceptar</v-btn>
            </v-card-actions>
          </v-card-text>
          <v-card-text>
            Para emergencias:
            <v-card-text>
              <v-icon icon="mdi-car-emergency" size="small"></v-icon> Emergencias:
              <strong>112</strong> <br />
              <v-icon icon="mdi-fire-truck" size="small"></v-icon> Bomberos: <strong>112</strong>
              <br />
              <v-icon icon="mdi-police-station" size="small"></v-icon> Policía Nacional:
              <strong>091</strong> ó <strong>928390141</strong> <br />
              <v-icon icon="mdi-police-station" size="small"></v-icon> Policía Local:
              <strong>092</strong> ó <strong>928446400</strong>
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
      store: useAuthStore(),
      nursery: {},
      edit: false
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },

    async update() {
      const response = await nurseries.updateNursery(this.nursery._id,this.nursery)
      this.edit = false
      return response
    },
  },

  async created() {
    const response = await nurseries.getNurseries()
    response.forEach((el) => {
      this.nursery = el
    })
  }
}
</script>

<style scoped>
.text {
  color: #06d6a0;
  background-color: #073b4c;
  margin-left: 15px;
}
.text:hover {
  color: #ffffff;
  background-color: #06d6a0;
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
